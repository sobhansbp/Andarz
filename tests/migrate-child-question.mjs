import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const directory=mkdtempSync(join(tmpdir(),'andarzgoo-child-migration-')),database=join(directory,'site.sqlite');
let migrationRun=0;const migrate=async()=>{const previous=process.env.DB_PATH;process.env.DB_PATH=database;try{await import(new URL('../deploy/migrate.mjs',import.meta.url).href+'?migration-test='+migrationRun++)}finally{if(previous===undefined)delete process.env.DB_PATH;else process.env.DB_PATH=previous}};
try{
 let db=new DatabaseSync(database);
 db.exec("CREATE TABLE events(id INTEGER PRIMARY KEY,title TEXT,description TEXT,location TEXT,color TEXT,active INTEGER);CREATE TABLE slots(id INTEGER PRIMARY KEY,event_id INTEGER,date TEXT,start TEXT,end TEXT,capacity INTEGER);CREATE TABLE bookings(id INTEGER PRIMARY KEY,slot_id INTEGER,name TEXT,phone TEXT,quantity INTEGER,code TEXT);INSERT INTO events VALUES(1,'Test','','Test','#224b3d',1);INSERT INTO slots VALUES(1,1,'2026-11-13','17:30','18:30',50);INSERT INTO bookings VALUES(1,1,'Test','09000000000',1,'ABCDEF123456');");db.close();
 await migrate();db=new DatabaseSync(database);const question=db.prepare("SELECT * FROM event_fields WHERE label='کودک زیر ۹ سال به همراه دارم'").get();assert(question);assert.equal(question.event_id,1);assert.equal(question.required,1);assert.equal(question.kind,'select');assert.equal(question.options,'بله\nخیر');assert.equal(question.enabled,1);
 db.prepare('UPDATE event_fields SET required=0,enabled=0 WHERE id=?').run(question.id);db.close();await migrate();
 db=new DatabaseSync(database);const repeated=db.prepare('SELECT * FROM event_fields WHERE id=?').get(question.id);assert.equal(db.prepare('SELECT COUNT(*) n FROM event_fields').get().n,1);assert.equal(repeated.required,0);assert.equal(repeated.enabled,0);assert.equal(db.prepare('SELECT quantity FROM bookings WHERE id=1').get().quantity,1);db.close();
 console.log('PASS: child question added once, existing bookings and admin settings preserved across migrations.');
}finally{rmSync(directory,{recursive:true,force:true})}
