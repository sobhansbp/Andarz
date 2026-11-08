import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import worker from './worker.js';

if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD must be set');
const sql = new DatabaseSync(process.env.DB_PATH || './data/andarzgoo.sqlite');
sql.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
sql.exec(`CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, location TEXT NOT NULL, color TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS slots (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL REFERENCES events(id), date TEXT NOT NULL, start TEXT NOT NULL, end TEXT NOT NULL, capacity INTEGER NOT NULL CHECK(capacity>0));
CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, slot_id INTEGER NOT NULL REFERENCES slots(id), name TEXT NOT NULL, phone TEXT NOT NULL, quantity INTEGER NOT NULL CHECK(quantity>0), code TEXT UNIQUE NOT NULL, created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
const DB={prepare(query){let args=[];return {bind(...values){args=values;return this},async first(){return sql.prepare(query).get(...args) ?? null},async all(){return {results:sql.prepare(query).all(...args)}},executeSync(){const r=sql.prepare(query).run(...args);return {meta:{changes:Number(r.changes)}}},async run(){return this.executeSync()}}},async batch(statements){sql.exec('BEGIN IMMEDIATE');try{const results=statements.map(statement=>statement.executeSync());sql.exec('COMMIT');return results}catch(error){sql.exec('ROLLBACK');throw error}}};
const server=createServer(async (req,res)=>{try {
 const host=req.headers.host || 'localhost';
 const headers=new Headers(); for (const [key,value] of Object.entries(req.headers)) if (value!==undefined) headers.set(key,Array.isArray(value)?value.join(', '):value);
 headers.delete('CF-Connecting-IP');
 const clientIP=req.headers['x-real-ip']; if(typeof clientIP==='string' && /^[0-9a-fA-F:.]+$/.test(clientIP)) headers.set('CF-Connecting-IP',clientIP);
 // The reverse proxy must set X-Forwarded-Proto and remove client-supplied values.
 const proto=req.headers['x-forwarded-proto']==='https'?'https':'http';
 const init={method:req.method,headers}; if(!['GET','HEAD'].includes(req.method)){init.body=req;init.duplex='half'}
 const response=await worker.fetch(new Request(`${proto}://${host}${req.url}`,init),{DB,ADMIN_PASSWORD:process.env.ADMIN_PASSWORD});
 res.statusCode=response.status;response.headers.forEach((value,key)=>res.setHeader(key,value));if(response.body){const {Readable}=await import('node:stream');Readable.fromWeb(response.body).pipe(res)}else res.end();
 }catch(error){console.error('request error',error);if(!res.headersSent)res.writeHead(500);res.end('Server error')}});
server.listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Listening on localhost'));
