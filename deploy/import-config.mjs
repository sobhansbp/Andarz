import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync, mkdtempSync, chmodSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function importConfiguration(db, config) {
  const columns = ['title','description','location','color','active','image_url','theme','terms','terms_json'];
  if (config.version !== 1 || !config.event || !config.slots?.length || config.slots.length > 500 || !Array.isArray(config.fields) || config.fields.length > 30) throw Error('Invalid configuration bundle.');
  if (columns.some(k => config.event[k] === undefined)) throw Error('Missing exhibition settings.');
  const keys = new Set();
  for (const s of config.slots) {
    const key = JSON.stringify([s.date,s.start,s.end]);
    if (s.reserved_capacity!==undefined&&(!Number.isInteger(s.reserved_capacity)||s.reserved_capacity<0||s.reserved_capacity>s.capacity)) throw Error('Invalid reserved capacity.');
    if (keys.has(key) || !/^\d{4}-\d{2}-\d{2}$/.test(s.date) || !/^\d{2}:\d{2}$/.test(s.start) || !/^\d{2}:\d{2}$/.test(s.end) || s.start >= s.end || !Number.isInteger(s.capacity) || s.capacity < 1 || ![0,1].includes(s.active)) throw Error('Invalid or duplicate source session.');
    keys.add(key);
  }
  const fieldLabels = new Set();
  for (const f of config.fields) {
    if (!f.label || fieldLabels.has(f.label) || ![0,1].includes(f.required) || ![0,1].includes(f.enabled) || !['text','national_id','phone','date','select'].includes(f.kind)) throw Error('Invalid or duplicate source field.');
    fieldLabels.add(f.label);
  }
  db.exec('PRAGMA foreign_keys=ON; BEGIN IMMEDIATE');
  try {
    let id = db.prepare("SELECT e.id FROM events e JOIN app_settings a ON a.key='main_event_id' AND e.id=CAST(a.value AS INTEGER)").get()?.id;
    if (!id) {
      id = Number(db.prepare(`INSERT INTO events(${columns.join(',')}) VALUES(${columns.map(()=>'?').join(',')})`).run(...columns.map(k=>config.event[k])).lastInsertRowid);
      db.prepare("INSERT INTO app_settings(key,value) VALUES('main_event_id',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(String(id));
    } else {
      db.prepare(`UPDATE events SET ${columns.map(k=>k+'=?').join(',')} WHERE id=?`).run(...columns.map(k=>config.event[k]),id);
    }
    // Preserve row IDs referenced by existing bookings and historical answers.
    // Sessions/fields omitted from the source are closed, never deleted.
    db.prepare('UPDATE slots SET active=0 WHERE event_id=?').run(id);
    for (const s of config.slots) {
      const matches = db.prepare('SELECT id,reserved_capacity FROM slots WHERE event_id=? AND date=? AND start=? AND end=?').all(id,s.date,s.start,s.end);
      if (matches.length > 1) throw Error(`Duplicate local session: ${s.date} ${s.start}. Import rolled back.`);
      if (matches.length) {
        const sid = matches[0].id;
        const used = db.prepare("SELECT COALESCE(SUM(quantity),0) n FROM bookings WHERE slot_id=? AND status='active'").get(sid).n;
        const held=s.reserved_capacity??matches[0].reserved_capacity??0;
        if (used+held > s.capacity) throw Error(`Capacity below existing bookings: ${s.date} ${s.start}. Import rolled back.`);
        db.prepare('UPDATE slots SET capacity=?,active=?,reserved_capacity=? WHERE id=?').run(s.capacity,s.active,held,sid);
      } else db.prepare('INSERT INTO slots(event_id,date,start,end,capacity,active,reserved_capacity) VALUES(?,?,?,?,?,?,?)').run(id,s.date,s.start,s.end,s.capacity,s.active,s.reserved_capacity??0);
    }
    db.prepare('UPDATE event_fields SET enabled=0 WHERE event_id=?').run(id);
    for (const f of config.fields) {
      const matches = db.prepare('SELECT id FROM event_fields WHERE event_id=? AND label=?').all(id,f.label);
      if (matches.length > 1) throw Error(`Duplicate local field: ${f.label}. Import rolled back.`);
      if (matches.length) db.prepare('UPDATE event_fields SET required=?,kind=?,options=?,enabled=? WHERE id=?').run(f.required,f.kind,f.options,f.enabled,matches[0].id);
      else db.prepare('INSERT INTO event_fields(event_id,label,required,kind,options,enabled) VALUES(?,?,?,?,?,?)').run(id,f.label,f.required,f.kind,f.options,f.enabled);
    }
    db.exec('COMMIT');
    return { eventId:id, sessions:config.slots.length, fields:config.fields.length };
  } catch (error) { db.exec('ROLLBACK'); throw error; }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.getuid?.() !== 0) throw Error('Run as root using deploy/sync-config.sh.');
  const { execFileSync } = await import('node:child_process');
  const serviceState = execFileSync('systemctl',['show','andarzgoo','--property=ActiveState','--value'],{encoding:'utf8'}).trim();
  if (serviceState !== 'inactive' && serviceState !== 'failed') throw Error('Stop andarzgoo before importing.');
  const config = JSON.parse(readFileSync(new URL('./cloudflare-config.json',import.meta.url),'utf8'));
  const database = '/var/lib/andarzgoo/site.sqlite';
  mkdirSync('/root/andarzgoo-backups',{recursive:true,mode:0o700});
  const backup = mkdtempSync('/root/andarzgoo-backups/config-') + '/site.sqlite';
  if (!statSync(database).isFile()) throw Error('Existing database is missing.');
  let db = new DatabaseSync(database);
  db.prepare('VACUUM INTO ?').run(backup);
  db.close();
  chmodSync(backup,0o600);
  console.log('Database backup:',backup);
  process.env.DB_PATH=database;
  await import('./migrate.mjs');
  if (process.exitCode) throw Error('Schema migration failed; configuration was not imported.');
  db = new DatabaseSync(database);
  try { console.log('Configuration imported:',importConfiguration(db,config)); }
  finally { db.close(); }
}
