import base64, os, sqlite3, secrets, hashlib, hmac, time, urllib.request, urllib.parse, html
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from http.cookies import SimpleCookie
from pathlib import Path
from datetime import datetime

ROOT=Path(__file__).parent
DB=os.environ.get('DB_PATH',str(ROOT/'site.db'))
SECRET=os.environ.get('SECRET_KEY','development-only-change-me')
ADMIN=os.environ.get('ADMIN_PASSWORD','')
DEV=os.environ.get('DEV_MODE')=='1'

def db():
 c=sqlite3.connect(DB,timeout=20); c.row_factory=sqlite3.Row; c.execute('PRAGMA foreign_keys=ON'); return c
with db() as c:
 c.executescript('''CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY,title TEXT NOT NULL,category TEXT NOT NULL,body TEXT NOT NULL,created TEXT NOT NULL); CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY,title TEXT NOT NULL,description TEXT,location TEXT,theme TEXT DEFAULT '#224b3d',image TEXT,active INTEGER DEFAULT 1); CREATE TABLE IF NOT EXISTS slots(id INTEGER PRIMARY KEY,event_id INTEGER NOT NULL REFERENCES events(id),date TEXT NOT NULL,start TEXT NOT NULL,end TEXT NOT NULL,capacity INTEGER NOT NULL CHECK(capacity>0)); CREATE TABLE IF NOT EXISTS bookings(id INTEGER PRIMARY KEY,slot_id INTEGER NOT NULL REFERENCES slots(id),name TEXT NOT NULL,phone TEXT NOT NULL,quantity INTEGER NOT NULL,code TEXT UNIQUE NOT NULL,created INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS otp(phone TEXT PRIMARY KEY,hash TEXT NOT NULL,expires INTEGER NOT NULL,attempts INTEGER DEFAULT 0,sent INTEGER NOT NULL);''')
E=lambda x:html.escape(str(x or ''),quote=True)
def sign(v): return v+'.'+hmac.new(SECRET.encode(),v.encode(),hashlib.sha256).hexdigest()
def check(v):
 try:
  a,b=v.rsplit('.',1); return hmac.compare_digest(sign(a),v) and int(a)>time.time()
 except: return False

def page(title,body): return f'''<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(title)} | مجموعه شهید اندرزگو</title><link rel="stylesheet" href="/static/style.css"></head><body><header class="header"><a class="brand" href="/"> <span class="brandmark">✺</span><span>شهید اندرزگو</span></a><nav><a href="/#about">درباره ما</a><a href="/#work">فعالیت‌ها</a><a href="/#news">خبرها</a><a href="/events">رویدادها</a></nav><a class="navbutton" href="/events">رویدادهای مجموعه <span>↙</span></a></header>{body}<footer><div><strong>مجموعه شهید اندرزگو</strong><p>کنار هم، برای ساختن فردایی روشن‌تر.</p></div><div><p>بابل، مازندران</p><a href="https://instagram.com/shahidandarzgoo">اینستاگرام ↗</a>　<a href="/admin">مدیریت</a></div></footer><div class="mobile-nav"><a href="/">⌂<small>خانه</small></a><a href="/#work">✳<small>فعالیت‌ها</small></a><a class="nav-feature" href="/events">✦<small>رویدادها</small></a><a href="/#news">▤<small>خبرها</small></a><a href="https://instagram.com/shahidandarzgoo">◎<small>اینستاگرام</small></a></div></body></html>'''
def layout(title,content):return page(title,f'<main class="inner"><div class="eyebrow">مجموعه شهید اندرزگو / {E(title)}</div><h1>{E(title)}</h1>{content}</main>')
class Handler(BaseHTTPRequestHandler):
 def send(self,s,status=200,cookie=None,typ='text/html; charset=utf-8'):
  b=s.encode() if isinstance(s,str) else s; self.send_response(status); self.send_header('Content-Type',typ); self.send_header('Content-Length',str(len(b))); self.send_header('X-Content-Type-Options','nosniff'); self.send_header('Referrer-Policy','same-origin');
  if cookie:self.send_header('Set-Cookie',cookie)
  self.end_headers(); self.wfile.write(b)
 def redirect(self,path,cookie=None):
  self.send_response(303); self.send_header('Location',path)
  if cookie:self.send_header('Set-Cookie',cookie)
  self.end_headers()
 def auth(self):
  c=SimpleCookie(); c.load(self.headers.get('Cookie','')); return 'admin' in c and check(c['admin'].value)
 def form(self):
  n=min(int(self.headers.get('Content-Length',0)),100000); return {k:v[0] for k,v in urllib.parse.parse_qs(self.rfile.read(n).decode(),keep_blank_values=True).items()}
 def do_GET(self):
  p=urllib.parse.urlsplit(self.path).path
  if p.startswith('/static/'):
   name=p.removeprefix('/static/'); file=ROOT/'static'/name
   if name == 'hero.jpg' and not file.is_file(): return self.send(base64.b64decode((ROOT/'static/hero.jpg.b64').read_text()),typ='image/jpeg')
   if '/' in name or not file.is_file(): return self.send('Not found',404)
   return self.send(file.read_bytes(),typ='text/css; charset=utf-8' if name.endswith('.css') else ('image/jpeg' if name.endswith('.jpg') else 'image/png'))
  with db() as c:
   if p=='/':
    posts=c.execute('SELECT * FROM posts ORDER BY id DESC LIMIT 3').fetchall(); events=c.execute('SELECT * FROM events WHERE active=1 ORDER BY id DESC LIMIT 2').fetchall()
    news=''.join(f'<a class="news-card" href="/post/{r["id"]}"><span>{E(r["category"])}</span><h3>{E(r["title"])}</h3><p>{E(r["body"][:100])}…</p><b>خواندن خبر ←</b></a>' for r in posts) or '<div class="empty">خبرهای تازه مجموعه به‌زودی اینجا منتشر می‌شوند.</div>'
    ev=''.join(f'<a class="event-mini" href="/event/{r["id"]}"><span>رویداد مجموعه</span><h3>{E(r["title"])}</h3><p>{E(r["location"])}</p><b>جزئیات و ثبت‌نام ←</b></a>' for r in events) or '<p>به‌زودی رویدادهای تازه را اینجا می‌بینید.</p>'
    return self.send(page('خانه',f'''<main><section class="hero"><div class="hero-shade"></div><div class="hero-content"><h1>مجموعه فرهنگی<br><em>شهید اندرزگو</em></h1><p>خانواده، همدلی و خدمت</p><div class="actions"><a class="btn gold" href="/#work">فعالیت‌های مجموعه <span>↙</span></a><a class="btn outline" href="/events">رویدادها ←</a></div></div></section><div class="quick-links"><a href="/#work"><span>✳</span>فعالیت‌ها</a><a href="/events"><span>✦</span>رویدادها</a><a href="/#news"><span>▤</span>خبرهای مجموعه</a><a href="https://instagram.com/shahidandarzgoo"><span>◎</span>همراه ما باشید</a></div><section class="intro section" id="about"><div><div class="eyebrow">درباره مجموعه <span>✳</span></div><h2>درباره <em>مجموعه</em></h2></div><div class="intro-copy"><p>مجموعه شهید اندرزگو در بابل، با تکیه بر همراهی مردم، در مسیر خدمت به خانواده‌ها و جامعه قدم برمی‌دارد.</p><p>از فعالیت‌های فرهنگی و مرکز خانواده و جمعیت استان مازندران تا خیریه، گروه جهادی و خدمت در موکب کربلا؛ هر قدم فرصتی است برای نزدیک‌تر شدن دل‌ها.</p><a class="text-link" href="/#work">بیشتر درباره فعالیت‌ها <span>←</span></a></div></section><section class="work section" id="work"><div class="section-head"><div><div class="eyebrow">مسیرهای همراهی <span>✳</span></div><h2>با هم، برای <em>مردم</em></h2></div><p></p></div><div class="work-grid"><article><span class="num">۰۱</span><div class="icon">✳</div><h3>خانواده و جمعیت</h3><p>همراه خانواده‌ها، برای رشد و آینده‌ای روشن‌تر.</p></article><article><span class="num">۰۲</span><div class="icon">♡</div><h3>خیریه و همدلی</h3><p>دست‌هایی که در کنار هم، گرهی از زندگی باز می‌کنند.</p></article><article><span class="num">۰۳</span><div class="icon">✺</div><h3>گروه جهادی</h3><p>حضور داوطلبانه و خدمت در کنار مردم.</p></article><article><span class="num">۰۴</span><div class="icon">✧</div><h3>موکب کربلا</h3><p>میزبانی و خدمت به زائران در مسیر عشق.</p></article></div></section><section class="event-section section"><div><div class="eyebrow light">در کنار هم <span>✳</span></div><h2>رویدادهای <em>مجموعه</em></h2><p>برنامه‌های پیش رو را ببینید.</p><a class="btn gold" href="/events">همه رویدادها ↙</a></div><div class="event-list">{ev}</div></section><section class="section" id="news"><div class="section-head"><div><div class="eyebrow">خبرهای مجموعه <span>✳</span></div><h2>تازه‌ترین <em>خبرها</em></h2></div><p></p></div><div class="news-grid">{news}</div></section><section class="join"><span>✳</span><h2>همراه ما باشید.</h2><p>قصه‌های مجموعه را در اینستاگرام دنبال کنید.</p><a class="btn outline" href="https://instagram.com/shahidandarzgoo">ما را در اینستاگرام دنبال کنید ↗</a></section></main>'''))
   if p=='/events':
    rows=c.execute('SELECT * FROM events WHERE active=1 ORDER BY id DESC').fetchall(); content=''.join(f'<a class="listing" href="/event/{r["id"]}"><span>رویداد رایگان</span><h2>{E(r["title"])}</h2><p>{E(r["description"])}</p><b>مشاهده و ثبت‌نام ←</b></a>' for r in rows) or '<div class="empty">در حال حاضر رویدادی برای ثبت‌نام وجود ندارد.</div>'; return self.send(layout('رویدادها',content))
   if p.startswith('/post/'):
    r=c.execute('SELECT * FROM posts WHERE id=?',(p.split('/')[-1],)).fetchone(); return self.send(layout(r['title'],f'<p class="tag">{E(r["category"])}</p><div class="prose">{E(r["body"]).replace(chr(10),"<br>")}</div>') if r else layout('پیدا نشد',''),200 if r else 404)
   if p.startswith('/event/'):
    r=c.execute('SELECT * FROM events WHERE id=? AND active=1',(p.split('/')[-1],)).fetchone()
    if not r:return self.send(layout('رویداد پیدا نشد',''),404)
    slots=c.execute('SELECT s.*, COALESCE(SUM(b.quantity),0) used FROM slots s LEFT JOIN bookings b ON b.slot_id=s.id WHERE s.event_id=? GROUP BY s.id ORDER BY s.date,s.start',(r['id'],)).fetchall(); options=''.join(f'<option value="{s["id"]}" {"disabled" if s["used"]>=s["capacity"] else ""}>{E(s["date"])} | {E(s["start"])} تا {E(s["end"])} | ظرفیت باقی‌مانده: {s["capacity"]-s["used"]}</option>' for s in slots)
    return self.send(page(r['title'],f'''<main class="inner"><div class="event-hero" style="--theme:{E(r['theme'])}"><div class="eyebrow light">رویداد مجموعه / ثبت‌نام رایگان</div><h1>{E(r['title'])}</h1><p>{E(r['description'])}</p><p>⌖ {E(r['location'])}</p></div><div class="booking"><div><div class="eyebrow">همراه ما باشید</div><h2>ثبت‌نام در رویداد</h2><p>بازه حضور و تعداد بلیت را انتخاب کنید. برای نهایی شدن رزرو، شماره همراه شما تأیید می‌شود.</p></div><form action="/otp" method="post" class="form"><input type="hidden" name="event_id" value="{r['id']}"><label>بازه حضور<select name="slot" required>{options}</select></label><label>نام و نام خانوادگی<input name="name" required maxlength="100"></label><label>شماره همراه<input name="phone" required inputmode="tel" placeholder="۰۹۱۲..." dir="ltr"></label><label>تعداد بلیت<input name="quantity" type="number" min="1" max="10" value="1" required></label><button class="btn dark" {"disabled" if not slots else ""}>دریافت کد تأیید ←</button></form></div></main>'''))
   if p=='/admin':
    if not self.auth():return self.send(layout('ورود مدیریت','<form method="post" action="/login" class="form narrow"><label>رمز مدیریت<input type="password" name="password" required></label><button class="btn dark">ورود</button></form>'))
    posts=c.execute('SELECT * FROM posts ORDER BY id DESC').fetchall(); events=c.execute('SELECT * FROM events ORDER BY id DESC').fetchall(); bookings=c.execute('SELECT b.*,e.title,s.date,s.start FROM bookings b JOIN slots s ON s.id=b.slot_id JOIN events e ON e.id=s.event_id ORDER BY b.id DESC LIMIT 100').fetchall()
    return self.send(layout('پنل مدیریت',f'''<div class="admin-top"><p>خبر، رویداد و ظرفیت‌ها را از همین‌جا مدیریت کنید.</p><a href="/logout">خروج</a></div><div class="admin-grid"><section class="panel"><h2>انتشار خبر</h2><form action="/admin/post" method="post" class="form"><label>عنوان<input name="title" required></label><label>دسته‌بندی<input name="category" required placeholder="مثلاً خانواده"></label><label>متن خبر<textarea name="body" required></textarea></label><button class="btn dark">انتشار خبر</button></form></section><section class="panel"><h2>ساخت رویداد</h2><form action="/admin/event" method="post" class="form"><label>نام رویداد<input name="title" required></label><label>توضیحات<textarea name="description"></textarea></label><label>مکان<input name="location"></label><label>رنگ زمینه<input type="color" name="theme" value="#224b3d"></label><button class="btn dark">ساخت رویداد</button></form></section><section class="panel"><h2>افزودن بازه حضور</h2><form action="/admin/slot" method="post" class="form"><label>رویداد<select name="event_id" required>{''.join(f'<option value="{e["id"]}">{E(e["title"])}</option>' for e in events)}</select></label><label>تاریخ<input type="date" name="date" required></label><label>از ساعت<input type="time" name="start" required></label><label>تا ساعت<input type="time" name="end" required></label><label>ظرفیت<input type="number" name="capacity" min="1" required></label><button class="btn dark">افزودن بازه</button></form></section><section class="panel"><h2>محتوای منتشرشده</h2>{''.join(f'<p>{E(x["title"])} <form method="post" action="/admin/delete-post" class="inline"><input type="hidden" name="id" value="{x["id"]}"><button>حذف</button></form></p>' for x in posts) or '<p>هنوز خبری ثبت نشده است.</p>'}<h3>رویدادها</h3>{''.join(f'<p>{E(x["title"])} — {"فعال" if x["active"] else "غیرفعال"} <form method="post" action="/admin/toggle" class="inline"><input type="hidden" name="id" value="{x["id"]}"><button>تغییر وضعیت</button></form></p>' for x in events)}</section></div><section class="panel"><h2>آخرین ثبت‌نام‌ها</h2><div class="table"><table><tr><th>نام</th><th>شماره</th><th>رویداد</th><th>بازه</th><th>تعداد</th><th>کد</th></tr>{''.join(f'<tr><td>{E(b["name"])}</td><td>{E(b["phone"])}</td><td>{E(b["title"])}</td><td>{E(b["date"])} {E(b["start"])}</td><td>{b["quantity"]}</td><td>{E(b["code"])}</td></tr>' for b in bookings)}</table></div></section>'''))
   if p=='/logout':return self.redirect('/admin','admin=; Max-Age=0; HttpOnly; SameSite=Strict; Path=/')
  self.send(layout('پیدا نشد',''),404)
 def do_POST(self):
  p=urllib.parse.urlsplit(self.path).path; f=self.form()
  if p=='/login':
   if ADMIN and hmac.compare_digest(f.get('password',''),ADMIN):return self.redirect('/admin','admin='+sign(str(int(time.time()+28800)))+'; HttpOnly; SameSite=Strict; Path=/'+('' if DEV else '; Secure'))
   return self.send(layout('ورود ناموفق','<p>رمز نادرست است یا رمز مدیریت تنظیم نشده است.</p><a href="/admin">بازگشت</a>'),403)
  if p.startswith('/admin/'):
   if not self.auth():return self.send('Forbidden',403)
   try:
    with db() as c:
     if p=='/admin/post':c.execute('INSERT INTO posts(title,category,body,created) VALUES(?,?,?,?)',(f['title'],f['category'],f['body'],datetime.now().isoformat()))
     elif p=='/admin/event':c.execute('INSERT INTO events(title,description,location,theme) VALUES(?,?,?,?)',(f['title'],f['description'],f['location'],f['theme'] if len(f['theme'])==7 and f['theme'].startswith('#') else '#224b3d'))
     elif p=='/admin/slot':c.execute('INSERT INTO slots(event_id,date,start,end,capacity) VALUES(?,?,?,?,?)',(int(f['event_id']),f['date'],f['start'],f['end'],int(f['capacity'])))
     elif p=='/admin/delete-post':c.execute('DELETE FROM posts WHERE id=?',(f['id'],))
     elif p=='/admin/toggle':c.execute('UPDATE events SET active=1-active WHERE id=?',(f['id'],))
    return self.redirect('/admin')
   except (ValueError,KeyError,sqlite3.Error):return self.send(layout('خطا','<p>اطلاعات واردشده معتبر نیست.</p><a href="/admin">بازگشت</a>'),400)
  if p=='/otp':
   phone=f.get('phone','').translate(str.maketrans('۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩','01234567890123456789')).replace(' ','').replace('-',''); name=f.get('name','').strip()
   try: slot=int(f['slot']); quantity=int(f['quantity']); event=int(f['event_id'])
   except (ValueError,KeyError):return self.send(layout('خطا','اطلاعات نامعتبر است.'),400)
   if len(phone)!=11 or not phone.startswith('09') or not phone.isdigit() or not name or len(name)>100 or not 1<=quantity<=10:return self.send(layout('خطا','شماره همراه، نام یا تعداد بلیت معتبر نیست.'),400)
   with db() as c:
    valid=c.execute('SELECT s.id FROM slots s JOIN events e ON s.event_id=e.id WHERE s.id=? AND e.id=? AND e.active=1',(slot,event)).fetchone(); old=c.execute('SELECT sent FROM otp WHERE phone=?',(phone,)).fetchone()
    if not valid:return self.send(layout('خطا','بازه انتخابی معتبر نیست.'),400)
    if old and time.time()-old['sent']<60:return self.send(layout('کمی صبر کنید','برای درخواست دوباره کد، یک دقیقه صبر کنید.'),429)
    code=str(secrets.randbelow(900000)+100000); digest=hmac.new(SECRET.encode(),(phone+code).encode(),hashlib.sha256).hexdigest()
    key=os.environ.get('KAVENEGAR_API_KEY'); template=os.environ.get('KAVENEGAR_TEMPLATE')
    if key and template:
     try:
      data=urllib.parse.urlencode({'receptor':phone,'token':code,'template':template}).encode(); req=urllib.request.Request('https://api.kavenegar.com/v1/'+urllib.parse.quote(key,safe='')+'/verify/lookup.json',data=data); response=urllib.request.urlopen(req,timeout=10); import json; result=json.load(response)
      if result.get('return',{}).get('status')!=200:raise ValueError('provider error')
     except Exception:return self.send(layout('ارسال ناموفق','ارسال پیامک انجام نشد؛ لطفاً بعداً تلاش کنید.'),503)
    elif not DEV:return self.send(layout('سرویس پیامک آماده نیست','ثبت‌نام پس از اتصال سرویس پیامک فعال می‌شود.'),503)
    c.execute('INSERT OR REPLACE INTO otp(phone,hash,expires,attempts,sent) VALUES(?,?,?,?,?)',(phone,digest,int(time.time()+300),0,int(time.time())))
   fields=''.join(f'<input type="hidden" name="{k}" value="{E(v)}">' for k,v in {'phone':phone,'name':name,'slot':slot,'quantity':quantity}.items())
   return self.send(layout('تأیید شماره همراه',f'<p>کد تأیید را برای شماره {E(phone)} وارد کنید.</p>{"<p>کد آزمایشی: <strong>"+code+"</strong></p>" if DEV and not key else ""}<form action="/book" method="post" class="form narrow">{fields}<label>کد تأیید<input name="code" inputmode="numeric" required></label><button class="btn dark">ثبت نهایی</button></form>'))
  if p=='/book':
   try:
    phone=f['phone']; code=f['code']; slot=int(f['slot']); quantity=int(f['quantity']); name=f['name'].strip()
    if not 1<=quantity<=10 or not name or len(name)>100:raise ValueError()
    with db() as c:
     c.execute('BEGIN IMMEDIATE'); row=c.execute('SELECT * FROM otp WHERE phone=?',(phone,)).fetchone(); digest=hmac.new(SECRET.encode(),(phone+code).encode(),hashlib.sha256).hexdigest()
     if not row or row['expires']<time.time() or row['attempts']>=5 or not hmac.compare_digest(row['hash'],digest):
      c.execute('UPDATE otp SET attempts=attempts+1 WHERE phone=?',(phone,)); c.commit(); return self.send(layout('کد نامعتبر','کد نادرست یا منقضی شده است.'),400)
     s=c.execute('SELECT s.capacity,COALESCE(SUM(b.quantity),0) used FROM slots s JOIN events e ON e.id=s.event_id LEFT JOIN bookings b ON b.slot_id=s.id WHERE s.id=? AND e.active=1 GROUP BY s.id',(slot,)).fetchone()
     if not s or s['capacity']-s['used']<quantity:return self.send(layout('ظرفیت کافی نیست','لطفاً بازه دیگری انتخاب کنید.'),409)
     ref=secrets.token_hex(4).upper(); c.execute('INSERT INTO bookings(slot_id,name,phone,quantity,code,created) VALUES(?,?,?,?,?,?)',(slot,name,phone,quantity,ref,int(time.time()))); c.execute('DELETE FROM otp WHERE phone=?',(phone,)); c.commit()
    return self.send(layout('ثبت‌نام انجام شد',f'<div class="success"><p>حضور شما ثبت شد. کد پیگیری خود را نگه دارید.</p><strong dir="ltr">{ref}</strong><p>تعداد بلیت: {quantity}</p><a href="/events">بازگشت به رویدادها</a></div>'))
   except (KeyError,ValueError,sqlite3.Error):return self.send(layout('خطا','ثبت‌نام انجام نشد.'),400)
  self.send('Not found',404)
if __name__=='__main__':
 print('http://127.0.0.1:8000',flush=True); ThreadingHTTPServer(('127.0.0.1',8000),Handler).serve_forever()
