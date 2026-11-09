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
function initializeReservation(){
 const root=document.querySelector('#reserve');if(!root)return;
 const dates=[...root.querySelectorAll('.date-chip')],slots=[...root.querySelectorAll('.slot-card')];
 const timeTrack=root.querySelector('#reservation-times');
 const announcement=root.querySelector('#chosen-date-summary');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function selectDate(day){
  dates.forEach(button=>{const selected=button.dataset.date===day;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected))});
  slots.forEach(slot=>{slot.hidden=slot.dataset.day!==day;if(slot.hidden)slot.querySelector('input').checked=false});
  if(timeTrack)timeTrack.scrollLeft=0;
  let date=dates.find(button=>button.dataset.date===day);if(announcement&&date)announcement.textContent='سانس‌های '+date.querySelector('span').textContent;
 }
 dates.forEach(button=>button.addEventListener('click',()=>selectDate(button.dataset.date)));
 if(dates.length)selectDate(dates[0].dataset.date);
 root.querySelectorAll('[data-scroll-target]').forEach(button=>button.addEventListener('click',()=>{
  const target=root.querySelector('#'+button.dataset.scrollTarget);if(!target)return;
  target.scrollBy({left:Number(button.dataset.scrollDirection)*Math.max(180,target.clientWidth*.7),behavior:reduced?'auto':'smooth'});
 }));
}
export const reservationScript='<script>('+initializeReservation.toString()+')();</script>';
