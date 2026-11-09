export const reservationStyles=`
/* Constrain every grid item so its carousel cannot enlarge the page. */
body:has(#reserve) .inner{width:100%;min-width:0;max-width:1160px}
#reserve{width:100%;max-width:100%;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:18px;align-items:start;scroll-margin-top:22px}
#reserve>.booking-step{width:100%;max-width:100%;min-width:0;overflow:hidden;margin:0;padding:24px;color:#233f2f;animation:none}
#reserve .step-heading{margin-bottom:18px;min-width:0}
#reserve .step-heading h2{color:#183d2c;font-size:20px}
#reserve .step-heading p{color:#4f6858;font-size:12px}
#reserve .step-heading>span{color:#214d36;background:#e1ebdb}
#reserve .scroll-box{width:100%;max-width:100%;min-width:0;position:relative}
#reserve .scroll-controls{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:0 0 12px;color:#46614f}
#reserve .scroll-controls small{font-size:11px;color:#536b5a;line-height:1.7}
#reserve .scroll-buttons{display:flex;gap:7px;flex-shrink:0}
#reserve .scroll-button{display:grid;place-items:center;width:38px;height:36px;padding:0;border:1px solid #bccdb5;border-radius:11px;background:#fffdf7;color:#234c34;font:700 22px Tahoma,sans-serif;box-shadow:0 2px 0 #d4dfca;cursor:pointer}
#reserve .scroll-button:hover{background:#e3eedb;transform:none}
#reserve .scroll-button:active{box-shadow:none;transform:translateY(1px)}
#reserve .date-scroll,#reserve .slots-grid{width:100%;max-width:100%;min-width:0;display:flex;flex-wrap:nowrap;gap:12px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:#6c8b64 #e4eadc;padding:4px 2px 15px;touch-action:pan-x pan-y}
#reserve .date-scroll::-webkit-scrollbar,#reserve .slots-grid::-webkit-scrollbar{height:7px}
#reserve .date-scroll::-webkit-scrollbar-thumb,#reserve .slots-grid::-webkit-scrollbar-thumb{background:#6c8b64;border-radius:8px}
#reserve .date-scroll::-webkit-scrollbar-track,#reserve .slots-grid::-webkit-scrollbar-track{background:#e4eadc;border-radius:8px}
#reserve .date-chip{flex:0 0 145px;min-width:0;max-width:170px;padding:15px 12px;color:#294b35;background:#f5f8ef;border:1px solid #cddac5;white-space:normal;scroll-snap-align:start;box-shadow:0 3px 0 #dfe7d6;font-size:12px;line-height:1.8;transition:background .18s,border-color .18s}
#reserve .date-chip small{color:#516b57;font-size:11px}
#reserve .date-chip.selected{background:#214e36;border-color:#214e36;color:#fff;box-shadow:0 4px 0 #afc6a5}
#reserve .date-chip.selected small{color:#e1eed8}
#reserve .slot-card{flex:0 0 215px;max-width:260px;min-width:0;min-height:120px;scroll-snap-align:start;justify-content:center;background:#f6f9f1;border:1px solid #c8d7c0;color:#193e2b;padding:18px 15px}
#reserve .slot-card[hidden]{display:none}
#reserve .slot-card input{left:12px;top:12px;width:15px;height:15px;accent-color:#21643c}
#reserve .slot-time{color:#183f2b;font-size:16px;padding-left:20px;font-weight:800}
#reserve .slot-time i{color:#4a6752}
#reserve .availability{color:#27603c;font-size:11px}
#reserve .availability b{background:#26804b}
#reserve .slot-card:has(input:checked){background:#e9f4e5;border:2px solid #2c7844;box-shadow:0 4px 0 #bfd3b4}
#reserve .slot-card.full{opacity:1;background:#eceee7;border-color:#d4d9ce;cursor:not-allowed}
#reserve .slot-card.full .slot-time,#reserve .slot-card.full .availability{color:#526154}
#reserve .slot-card.full .availability b{background:#6d796c}
#reserve .capacity-track{background:#dce6d6}#reserve .capacity-track span{background:#398854}
#reserve .reservation-fields-scroll{max-height:min(62svh,600px);overflow-y:auto;overscroll-behavior-y:contain;scrollbar-width:thin;scrollbar-color:#6c8b64 #e4eadc;padding:2px 5px 14px 2px;min-width:0}
#reserve .reservation-fields{grid-template-columns:minmax(0,1fr);gap:18px;min-width:0}
#reserve .reservation-fields>label{min-width:0;color:#213f2d;font-size:13px;line-height:1.8;font-weight:700;gap:7px}
#reserve .reservation-fields label>small{color:#4f6655;font-size:11px;font-weight:400}
#reserve .reservation-fields input,#reserve .reservation-fields select{width:100%;min-width:0;color:#203b2b;background:#fff;border:1px solid #b9cbb0;caret-color:#214c35;font-size:15px;font-weight:400;padding:14px;border-radius:12px}
#reserve .reservation-fields input::placeholder{color:#5a6f60;opacity:1;font-size:13px}
#reserve .reservation-submit{padding-top:16px;border-top:1px solid #d2ddca;background:transparent}
#reserve .reservation-submit button{width:100%;justify-content:center;margin:0;min-height:52px}
#reserve .empty{min-width:0;flex:1;color:#4f6554;background:#f3f6ee}
@media(min-width:1000px){
 #reserve{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);grid-template-rows:auto 1fr;align-items:stretch}
 #reserve>.booking-step:nth-of-type(1){grid-column:1;grid-row:1}
 #reserve>.booking-step:nth-of-type(2){grid-column:1;grid-row:2}
 #reserve>.booking-step:nth-of-type(3){grid-column:2;grid-row:1 / span 2;display:flex;flex-direction:column;min-height:0}
 #reserve .reservation-fields-scroll{flex:1;max-height:460px}
 #reserve .reservation-submit{margin-top:auto}
}
@media(max-width:600px){
 body:has(#reserve) .inner{padding-inline:14px}
 #reserve>.booking-step{padding:20px 17px;border-radius:20px 20px 34px 20px}
 #reserve .date-chip{flex-basis:132px}
 #reserve .slot-card{flex-basis:200px}
 #reserve .step-heading h2{font-size:18px}
 #reserve .scroll-controls small{font-size:10px}
 #reserve .reservation-fields-scroll{max-height:58svh}
}
@media(prefers-reduced-motion:reduce){#reserve *{scroll-behavior:auto!important;transition:none!important}}
`;
export async function registrationRequirements(db){
 const required={name:true,phone:true,quantity:true};
 const rows=(await db.prepare("SELECT key,value FROM app_settings WHERE key IN ('registration_required_name','registration_required_phone','registration_required_quantity')").all()).results;
 for(const row of rows){const name=row.key.slice('registration_required_'.length);if(Object.hasOwn(required,name)&&['0','1'].includes(String(row.value)))required[name]=String(row.value)==='1';}
 return required;
}
export const supportContact='<p class="reservation-support">جهت ارتباط با پشتیبانی با شماره زیر تماس حاصل فرمایید: <a href="tel:+981132311119" dir="ltr">01132311119</a></p>';
export const inlineErrorStyles=`
.field-error,.inline-form-error{display:block;margin:8px 0 0;padding:9px 12px;border:1px solid #c98970;border-radius:9px;background:#fff0e9;color:#762e1e!important;font-size:12px!important;font-weight:500;line-height:1.9;white-space:normal;overflow-wrap:anywhere}
.field-error[hidden],.inline-form-error[hidden]{display:none!important}
[aria-invalid=true]:not([type=radio]):not([type=hidden]){border-color:#c98970!important;outline:2px solid #c9897044;outline-offset:1px}
.inline-form-error{margin:0 0 16px;flex-basis:100%}.slot-field-error{margin-top:12px}.quantity-availability{display:block;font-size:11px;font-weight:400;line-height:1.8}
.review-card .review-details{display:grid;gap:12px;margin:22px 0}.review-entry{padding:12px 16px;border:1px solid #8d916344;border-radius:12px}.review-entry dt{color:#d9c28b;font-size:12px;margin-bottom:5px}.review-entry dd{margin:0;line-height:1.9;overflow-wrap:anywhere}.review-actions{display:flex;gap:12px;flex-wrap:wrap}.review-card .review-intro{line-height:2}
.reservation-support{font-size:12px!important;font-weight:500;line-height:2!important;text-align:center;margin:18px 0 0!important;color:inherit!important}.reservation-support a{display:inline-block;color:inherit;text-decoration:underline;text-underline-offset:4px;white-space:nowrap;font-weight:700}.reservation-support a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
`;

// This self-contained validator is used by the Worker and serialized into the browser.
export function validateReservationField({value,kind='text',required=false,maxLength=200,options=[]}){
 const raw=String(value??'').trim();const digits=s=>String(s).replace(/[۰-۹٠-٩]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.includes(c)?'۰۱۲۳۴۵۶۷۸۹'.indexOf(c):'٠١٢٣٤٥٦٧٨٩'.indexOf(c));
 if(!raw)return required?'تکمیل این فیلد الزامی است.':'';
 if(raw.length>maxLength)return 'اطلاعات این فیلد بیش از حد مجاز است.';
 const normalized=digits(raw);
 if(kind==='quantity'){const n=Number(normalized);if(!Number.isInteger(n)||n<1||n>5)return 'تعداد هر رزرو باید بین ۱ تا ۵ نفر باشد.';}
 if(kind==='phone'&&!/^09\d{9}$/.test(normalized.replace(/[ -]/g,'')))return 'شماره همراه معتبر و ۱۱ رقمی وارد کنید؛ مانند 09123456789.';
 if(kind==='national_id'){
  if(!/^\d{10}$/.test(normalized)||/^(\d)\1{9}$/.test(normalized))return 'کد ملی معتبر و ۱۰ رقمی وارد کنید.';
  let sum=0;for(let i=0;i<9;i++)sum+=Number(normalized[i])*(10-i);const r=sum%11;
  if(Number(normalized[9])!==(r<2?r:11-r))return 'کد ملی واردشده معتبر نیست.';
 }
 if(kind==='select'&&!options.includes(raw))return 'یکی از گزینه‌های همین فهرست را انتخاب کنید.';
 if(kind==='date'){
  if(!/^\d{4}\/\d{2}\/\d{2}$/.test(normalized))return 'تاریخ شمسی معتبر به شکل ۱۴۰۵/۰۸/۲۲ وارد کنید.';
  const [y,m,d]=normalized.split('/').map(Number);let valid=false;
  if(y>=1300&&y<=1600&&m>=1&&m<=12&&d>=1&&d<=31){
   const fmt=new Intl.DateTimeFormat('en-u-ca-persian',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'UTC'});
   const parts=t=>Object.fromEntries(fmt.formatToParts(new Date(t)).map(p=>[p.type,p.value]));
   for(let day=18;day<=23;day++){const start=Date.UTC(y+621,2,day,12),p=parts(start);if(Number(p.year)===y&&Number(p.month)===1&&Number(p.day)===1){const result=parts(start+((m<=6?(m-1)*31:186+(m-7)*30)+d-1)*86400000);valid=Number(result.year)===y&&Number(result.month)===m&&Number(result.day)===d;break}}
  }
  if(!valid)return 'تاریخ شمسی واردشده معتبر نیست.';
 }
 return '';
}

function inlineFormTools(form,scope=form){
 const boxes=new Map();let pending=false;
 function controls(name){return [...form.elements].filter(el=>el.name===name&&el.type!=='hidden')}
 function box(name){
  if(boxes.has(name))return boxes.get(name);
  const el=document.createElement('p');el.className=name==='_form'?'inline-form-error':'field-error';el.dataset.inlineError=name;el.hidden=true;el.setAttribute('aria-live','polite');el.id='form-error-'+Math.random().toString(36).slice(2);
  const row=[...scope.querySelectorAll('[data-review-field]')].find(e=>e.dataset.reviewField===name);
  const input=controls(name)[0];const group=name==='slot'?scope.querySelector('#reservation-times'):null;
  if(row)row.append(el);else if(group){el.classList.add('slot-field-error');group.after(el)}else if(input?.closest('label'))input.closest('label').append(el);else if(name==='_form'&&form.querySelector('.reservation-submit'))form.querySelector('.reservation-submit').prepend(el);else scope.prepend(el);
  for(const field of controls(name)){const descriptions=(field.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean);field.setAttribute('aria-describedby',[...descriptions,el.id].join(' '))}
  boxes.set(name,el);return el;
 }
 function set(name,message){const el=message?box(name):boxes.get(name);if(el){el.textContent=message||'';el.hidden=!message}for(const field of controls(name)){if(message)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid')}}
 function clear(){for(const name of boxes.keys())set(name,'')}
 function show(errors,focus=false){clear();for(const [name,message] of Object.entries(errors||{}))if(message)set(name,String(message));if(focus){const first=Object.keys(errors||{}).find(k=>errors[k]);if(first)setTimeout(()=>{const field=controls(first).find(e=>!e.disabled&&e.getClientRects().length);const target=field||boxes.get(first);if(!target)return;if(!field)target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'center',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},0)}}
 async function send(success,failed=()=>{}){
  if(pending)return;pending=true;const data=new FormData(form),button=form.querySelector('button[type=submit],button:not([type])'),caption=button?.textContent,wasDisabled=button?.disabled,wasInert=form.inert;
  if(button){button.disabled=true;button.textContent='در حال بررسی…'}form.inert=true;form.setAttribute('aria-busy','true');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);let navigating=false;
  try{
   const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'},credentials:'same-origin',signal:controller.signal});
   if(!response.headers.get('Content-Type')?.includes('application/json'))throw Error('Unexpected response');
   const result=await response.json();if(response.ok&&result.ok){clear();navigating=typeof result.redirect==='string'&&/^\/(?!\/)/.test(result.redirect);await success(result)}else{failed(result);show(result.errors||{_form:'امکان ثبت اطلاعات وجود ندارد. دوباره بررسی کنید.'},true)}
  }catch{navigating=false;show({_form:'ارتباط با سرور برقرار نشد. اطلاعات شما حفظ شده است؛ دوباره تلاش کنید.'},true)}
  finally{clearTimeout(timer);if(!navigating){pending=false;form.inert=wasInert;form.removeAttribute('aria-busy');if(button){button.disabled=wasDisabled;button.textContent=caption}}}
 }
 return {set,clear,show,send};
}

function initializeReservation(tools,validate){
 const root=document.querySelector('#reserve');
 const rootTools=root?tools(root):null;let review=null,lastErrors={};
 const digits=s=>String(s).replace(/[۰-۹٠-٩]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.includes(c)?'۰۱۲۳۴۵۶۷۸۹'.indexOf(c):'٠١٢٣٤٥٦٧٨٩'.indexOf(c));
 function redirect(path){if(typeof path==='string'&&/^\/ticket\/[A-F0-9]{12}$/.test(path))location.assign(path)}
 function updateAvailability(data){
  if(!root||!Array.isArray(data.availability))return;
  for(const s of data.availability){const radio=[...root.querySelectorAll('[name=slot]')].find(el=>Number(el.value)===Number(s.id));if(!radio)continue;const card=radio.closest('.slot-card'),remaining=Math.max(0,Number(s.remaining)||0);card.dataset.remaining=remaining;radio.disabled=remaining===0;if(radio.disabled)radio.checked=false;card.classList.toggle('full',remaining===0);const label=card.querySelector('.availability');if(label){const dot=document.createElement('b');label.replaceChildren(dot,document.createTextNode(remaining?remaining.toLocaleString('fa-IR')+' نفر باقی‌مانده':'تکمیل ظرفیت'))}const bar=card.querySelector('.capacity-track span');if(bar)bar.style.width=(s.capacity?Math.min(100,remaining/s.capacity*100):0)+'%';}
  for(const day of root.querySelectorAll('.date-chip')){const count=[...root.querySelectorAll('.slot-card')].filter(card=>card.dataset.day===day.dataset.date&&Number(card.dataset.remaining)>0).length;day.querySelector('small').textContent=count.toLocaleString('fa-IR')+' سانس باز'}
  quantityHint();
 }
 function attachReview(section){
  review=section;section.dataset.inlineReady='1';const form=section.querySelector('#reservation-confirm');if(!form)return;form.noValidate=true;const ui=tools(form,section);
  section.querySelector('[data-reservation-back]')?.addEventListener('click',()=>{if(root){section.remove();review=null;root.style.display='';rootTools.show(lastErrors,Boolean(Object.keys(lastErrors).length));if(!Object.keys(lastErrors).length)root.scrollIntoView({block:'start'})}else history.back()});
  form.addEventListener('submit',event=>{event.preventDefault();ui.send(result=>redirect(result.redirect),result=>{lastErrors=result.errors||{};updateAvailability(result);if(root)rootTools.show(lastErrors)})});
 }
 const initial=document.querySelector('.review-card');if(initial)attachReview(initial);
 if(!root)return;
 root.noValidate=true;
 const dates=[...root.querySelectorAll('.date-chip')],slots=[...root.querySelectorAll('.slot-card')],quantity=root.elements.namedItem('quantity');
 const timeTrack=root.querySelector('#reservation-times'),announcement=root.querySelector('#chosen-date-summary');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const quantityMessage=document.createElement('small');quantityMessage.className='quantity-availability';quantity.closest('label').append(quantityMessage);
 function quantityHint(){if(!root)return;const input=root.querySelector('[name=slot]:checked');const remaining=input?Number(input.closest('.slot-card').dataset.remaining):null;quantity.max=remaining===null?'5':String(Math.min(5,Math.max(1,remaining)));quantityMessage.textContent=remaining===null?'حداکثر ۵ نفر در هر رزرو.':'ظرفیت باقی‌مانده این سانس: '+remaining.toLocaleString('fa-IR')+' نفر؛ حداکثر هر رزرو ۵ نفر.';}
 function validateInput(input){
  const kind=input.name==='name'?'person':input.name==='phone'?'phone':input.name==='quantity'?'quantity':input.dataset.kind||'text';
  let message=validate({value:input.value,kind,required:input.required,maxLength:input.name==='name'?100:200,options:input.tagName==='SELECT'?[...input.options].map(o=>o.value).filter(Boolean):[]});
  if(input.validity.badInput)message='عدد معتبر وارد کنید.';
  if(!message&&input.name==='quantity'){const chosen=root.querySelector('[name=slot]:checked');if(chosen){const remaining=Number(chosen.closest('.slot-card').dataset.remaining);if(Number(digits(input.value)||(input.required?'0':'1'))>remaining)message='برای این سانس فقط '+remaining.toLocaleString('fa-IR')+' نفر ظرفیت باقی مانده است.';}}
  rootTools.set(input.name,message);return message;
 }
 const fields=[...root.querySelectorAll('input:not([type=hidden]):not([type=radio]),select,textarea')];
 function selectDate(day){dates.forEach(button=>{const selected=button.dataset.date===day;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected))});slots.forEach(slot=>{slot.hidden=slot.dataset.day!==day;if(slot.hidden)slot.querySelector('input').checked=false});if(timeTrack)timeTrack.scrollLeft=0;const date=dates.find(button=>button.dataset.date===day);if(announcement&&date)announcement.textContent='سانس‌های '+date.querySelector('span').textContent;rootTools.set('slot','');quantityHint();validateInput(quantity);}
 dates.forEach(button=>button.addEventListener('click',()=>selectDate(button.dataset.date)));if(dates.length)selectDate(dates[0].dataset.date);else quantityHint();
 for(const input of fields){input.addEventListener('input',()=>validateInput(input));input.addEventListener('change',()=>validateInput(input));input.addEventListener('blur',()=>validateInput(input))}
 root.querySelectorAll('[name=slot]').forEach(input=>input.addEventListener('change',()=>{rootTools.set('slot','');quantityHint();validateInput(quantity)}));
 root.querySelectorAll('[data-scroll-target]').forEach(button=>button.addEventListener('click',()=>{const target=root.querySelector('#'+button.dataset.scrollTarget);if(target)target.scrollBy({left:Number(button.dataset.scrollDirection)*Math.max(180,target.clientWidth*.7),behavior:reduced?'auto':'smooth'})}));
 root.addEventListener('submit',event=>{
  event.preventDefault();const errors={};for(const input of fields){const message=validateInput(input);if(message)errors[input.name]=message}if(!root.querySelector('[name=slot]:checked:not(:disabled)'))errors.slot='تاریخ و سانس بازدید را انتخاب کنید.';
  if(Object.keys(errors).length){rootTools.show(errors,true);return;}
  rootTools.send(result=>{if(typeof result.review!=='string')return;lastErrors={};const template=document.createElement('template');template.innerHTML=result.review;const section=template.content.querySelector('.review-card');if(!section)return;root.style.display='none';root.after(section);attachReview(section);section.tabIndex=-1;section.focus({preventScroll:true});section.scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});},result=>{lastErrors=result.errors||{};updateAvailability(result)});
 });
}

function initializeAdminForms(tools,validate){
 for(const form of document.querySelectorAll('form[method=post]')){
  if(new URL(form.action).pathname==='/admin/login')continue;
  const ui=tools(form);form.noValidate=true;
  const inputs=()=>[...form.elements].filter(el=>['INPUT','TEXTAREA','SELECT'].includes(el.tagName)&&el.type!=='hidden'&&el.type!=='submit'&&el.type!=='checkbox'&&!el.disabled);
  function check(el){let message='';if(el.validity.valueMissing)message='تکمیل این فیلد الزامی است.';else if(el.validity.badInput||el.validity.stepMismatch)message='عدد صحیح معتبر وارد کنید.';else if(el.validity.rangeUnderflow)message='این مقدار نباید کمتر از '+Number(el.min).toLocaleString('fa-IR')+' باشد.';else if(el.validity.rangeOverflow)message='این مقدار نباید بیشتر از '+Number(el.max).toLocaleString('fa-IR')+' باشد.';else if(!el.validity.valid)message='اطلاعات این فیلد معتبر نیست.';else if(el.hasAttribute('data-jalali'))message=validate({value:el.value,kind:'date',required:el.required});ui.set(el.name,message);return message;}
  for(const type of ['input','change','focusout'])form.addEventListener(type,event=>{if(inputs().includes(event.target))check(event.target)});
  form.addEventListener('submit',event=>{event.preventDefault();const errors={};for(const input of inputs()){const message=check(input);if(message)errors[input.name]=message}if(Object.keys(errors).length){ui.show(errors,true);return;}ui.send(result=>{if(typeof result.redirect==='string'&&/^\/(?!\/)/.test(result.redirect))location.assign(result.redirect)})});
 }
}
export const reservationScript='<script>('+initializeReservation.toString()+')('+inlineFormTools.toString()+','+validateReservationField.toString()+');</script>';
export const adminFormScript='<script>('+initializeAdminForms.toString()+')('+inlineFormTools.toString()+','+validateReservationField.toString()+');</script>';
