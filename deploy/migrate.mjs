import { DatabaseSync } from 'node:sqlite';
const path=process.env.DB_PATH || '/var/lib/andarzgoo/site.sqlite';
const db=new DatabaseSync(path);db.exec('PRAGMA foreign_keys=ON; BEGIN IMMEDIATE');
try {
 db.exec(`CREATE TABLE IF NOT EXISTS event_fields (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL REFERENCES events(id), label TEXT NOT NULL, required INTEGER NOT NULL DEFAULT 1);
 CREATE TABLE IF NOT EXISTS booking_answers (id INTEGER PRIMARY KEY, booking_id INTEGER NOT NULL REFERENCES bookings(id), field_id INTEGER NOT NULL REFERENCES event_fields(id), label TEXT NOT NULL, value TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0, window_start INTEGER NOT NULL);`);
 for (const [table,column,definition] of [['bookings','status',"TEXT NOT NULL DEFAULT 'active'"],['bookings','checked_in_at','TEXT'],['slots','active','INTEGER NOT NULL DEFAULT 1'],['event_fields','kind',"TEXT NOT NULL DEFAULT 'text'"],['event_fields','options',"TEXT NOT NULL DEFAULT ''"],['events','image_url',"TEXT NOT NULL DEFAULT ''"],['events','theme',"TEXT NOT NULL DEFAULT 'default'"]]) {
  if(!db.prepare(`PRAGMA table_info(${table})`).all().some(row=>row.name===column))db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
 }
 db.exec('COMMIT');console.log('Database migration completed.');
} catch (e) { db.exec('ROLLBACK'); console.error('Migration failed:',e.message);process.exitCode=1; }
db.close();
