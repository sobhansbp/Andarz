ALTER TABLE event_fields ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
INSERT OR IGNORE INTO app_settings(key,value)
SELECT 'main_event_id',CAST(id AS TEXT) FROM events
ORDER BY active DESC,CASE WHEN theme='fatemieh' THEN 0 ELSE 1 END,id DESC LIMIT 1;
UPDATE events SET theme='fatemieh',color='#224b3d'
WHERE id=(SELECT CAST(value AS INTEGER) FROM app_settings WHERE key='main_event_id');
