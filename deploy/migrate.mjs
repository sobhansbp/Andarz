import { DatabaseSync } from 'node:sqlite';
const path=process.env.DB_PATH || '/var/lib/andarzgoo/site.sqlite';
const db=new DatabaseSync(path);db.exec('PRAGMA foreign_keys=ON; BEGIN IMMEDIATE');
try {
 db.exec(`CREATE TABLE IF NOT EXISTS event_fields (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL REFERENCES events(id), label TEXT NOT NULL, required INTEGER NOT NULL DEFAULT 1);
 CREATE TABLE IF NOT EXISTS booking_answers (id INTEGER PRIMARY KEY, booking_id INTEGER NOT NULL REFERENCES bookings(id), field_id INTEGER NOT NULL REFERENCES event_fields(id), label TEXT NOT NULL, value TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0, window_start INTEGER NOT NULL);`);
 for (const [table,column,definition] of [['bookings','status',"TEXT NOT NULL DEFAULT 'active'"],['bookings','checked_in_at','TEXT'],['slots','active','INTEGER NOT NULL DEFAULT 1'],['event_fields','kind',"TEXT NOT NULL DEFAULT 'text'"],['event_fields','options',"TEXT NOT NULL DEFAULT ''"],['events','image_url',"TEXT NOT NULL DEFAULT ''"],['events','theme',"TEXT NOT NULL DEFAULT 'default'"],['events','terms',"TEXT NOT NULL DEFAULT ''"],['events','terms_json',"TEXT NOT NULL DEFAULT ''"],['event_fields','enabled','INTEGER NOT NULL DEFAULT 1']]) {
  if(!db.prepare(`PRAGMA table_info(${table})`).all().some(row=>row.name===column))db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
 }
 db.exec(`CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
 INSERT OR IGNORE INTO app_settings(key,value) SELECT 'main_event_id',CAST(id AS TEXT) FROM events ORDER BY active DESC,CASE WHEN theme='fatemieh' THEN 0 ELSE 1 END,id DESC LIMIT 1;
 UPDATE events SET theme='fatemieh',color='#224b3d' WHERE id=(SELECT CAST(value AS INTEGER) FROM app_settings WHERE key='main_event_id');`);
 db.prepare("INSERT INTO event_fields(event_id,label,required,kind,options,enabled) SELECT e.id,?,1,'select',?,1 FROM events e JOIN app_settings a ON a.key='main_event_id' AND e.id=CAST(a.value AS INTEGER) WHERE NOT EXISTS(SELECT 1 FROM event_fields f WHERE f.event_id=e.id AND f.label=?)").run('کودک زیر ۹ سال به همراه دارم','بله\nخیر','کودک زیر ۹ سال به همراه دارم');
 db.exec('COMMIT');console.log('Database migration completed.');
} catch (e) { db.exec('ROLLBACK'); console.error('Migration failed:',e.message);process.exitCode=1; }
db.close();
