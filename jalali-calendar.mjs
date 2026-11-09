function bootCalendar(){
 const normalize=s=>String(s).replace(/[۰-۹٠-٩]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.includes(c)?'۰۱۲۳۴۵۶۷۸۹'.indexOf(c):'٠١٢٣٤٥٦٧٨٩'.indexOf(c));
 const formatter=new Intl.DateTimeFormat('en-u-ca-persian',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'UTC'});
 const parts=date=>Object.fromEntries(formatter.formatToParts(date).map(x=>[x.type,Number(x.value)]));
 const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
 const fa=n=>Number(n).toLocaleString('fa-IR');
 const firstDay=(y,m)=>{for(let d=18;d<=23;d++){let nowruz=Date.UTC(y+621,2,d,12),p=parts(nowruz);if(p.year===y&&p.month===1&&p.day===1)return new Date(nowruz+(m<=6?(m-1)*31:186+(m-7)*30)*86400000)}return null};
 document.querySelectorAll('[data-jalali]').forEach((input,index)=>{
  const wrap=document.createElement('div');wrap.className='jalali-control';
  const trigger=document.createElement('button');trigger.type='button';trigger.textContent='تقویم شمسی';trigger.className='calendar-toggle';trigger.setAttribute('aria-expanded','false');
  const panel=document.createElement('div');panel.className='jalali-popover';panel.hidden=true;panel.id='jalali-picker-'+index;panel.setAttribute('role','group');panel.setAttribute('aria-label','انتخاب تاریخ شمسی');trigger.setAttribute('aria-controls',panel.id);
  input.insertAdjacentElement('afterend',wrap);wrap.append(trigger,panel);
  const today=parts(new Date());let year=today.year,month=today.month;
  const hide=()=>{panel.hidden=true;trigger.setAttribute('aria-expanded','false')};
  const show=()=>{const match=normalize(input.value).match(/^(\d{4})\/(\d{2})\/(\d{2})$/);if(match&&Number(match[1])>=1300&&Number(match[1])<=1600&&Number(match[2])>=1&&Number(match[2])<=12){year=Number(match[1]);month=Number(match[2])}panel.hidden=false;trigger.setAttribute('aria-expanded','true');render()};
  trigger.addEventListener('click',()=>panel.hidden?show():hide());
  input.addEventListener('input',()=>input.setCustomValidity(''));
  input.addEventListener('change',()=>{let v=normalize(input.value);input.setCustomValidity(v&&!/^\d{4}\/\d{2}\/\d{2}$/.test(v)?'تاریخ شمسی را مانند ۱۴۰۵/۰۸/۱۸ وارد کنید.':'')});
  function render(){panel.replaceChildren();
   let header=document.createElement('div');header.className='calendar-header';
   const move=(label,delta)=>{let b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>{month+=delta;if(month>12){month=1;year++}if(month<1){month=12;year--}year=Math.max(1300,Math.min(1600,year));render()});return b};
   let title=document.createElement('strong');title.textContent=months[month-1]+' '+fa(year);header.append(move('ماه قبل',-1),title,move('ماه بعد',1));panel.append(header);
   let grid=document.createElement('div');grid.className='calendar-grid';['ش','ی','د','س','چ','پ','ج'].forEach(day=>{let span=document.createElement('span');span.textContent=day;span.className='calendar-weekday';grid.append(span)});
   let first=firstDay(year,month);if(!first)return;let offset=(first.getUTCDay()+1)%7;for(let i=0;i<offset;i++){let span=document.createElement('span');span.setAttribute('aria-hidden','true');grid.append(span)}
   for(let d=1;d<=31;d++){let current=parts(new Date(first.getTime()+(d-1)*86400000));if(current.month!==month)break;let val=year+'/'+String(month).padStart(2,'0')+'/'+String(d).padStart(2,'0');let b=document.createElement('button');b.type='button';b.textContent=fa(d);b.setAttribute('aria-label',fa(d)+' '+months[month-1]+' '+fa(year));b.setAttribute('aria-pressed',String(normalize(input.value)===val));if(normalize(input.value)===val)b.className='calendar-chosen';b.addEventListener('click',()=>{input.value=val;input.setCustomValidity('');input.dispatchEvent(new Event('change',{bubbles:true}));hide();trigger.focus()});grid.append(b)}
   panel.append(grid);let close=document.createElement('button');close.type='button';close.textContent='بستن تقویم';close.className='calendar-close';close.addEventListener('click',()=>{hide();trigger.focus()});panel.append(close);
  }
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();hide();trigger.focus()}});
 });
}
export const calendarEnhancement='<script>('+bootCalendar.toString()+')();</script>';
