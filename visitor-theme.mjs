export const visitorTheme=`<style>
/* A continuous, muted palette through conditions, booking, review and ticket. */
body:has(:is(.terms,#reserve,.review-card,.ticket-card)){
 --visitor-surface:rgba(40,51,37,.96);--visitor-inset:#243021;--visitor-line:rgba(210,181,112,.5);--visitor-text:#f2eddf;--visitor-muted:#d2cbb8;--visitor-gold:#d7bf87;
 background-color:#101911;color:var(--visitor-text)
}
body:has(:is(.review-card,.ticket-card)){
 background:linear-gradient(180deg,rgba(10,20,13,.9),rgba(10,20,13,.93)),url('/static/bani-hashem.jpg') center/cover fixed
}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .header{background:rgba(16,25,18,.94);border-bottom:1px solid var(--visitor-line);color:var(--visitor-text)}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .identity small{color:var(--visitor-muted)}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .inner>h1{color:var(--visitor-text)}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .inner>.eyebrow{color:var(--visitor-gold)}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) footer{background:rgba(13,22,15,.94);border-top:1px solid var(--visitor-line);color:var(--visitor-muted)}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .navbutton{background:#243223;border:1px solid var(--visitor-line);color:var(--visitor-text)}
body:has(.terms) .terms,body:has(#reserve) #reserve>.booking-step,
body:has(.review-card) .review-card,body:has(.ticket-card) .ticket-card{
 background:var(--visitor-surface);border:1px solid var(--visitor-line);color:var(--visitor-text);box-shadow:0 15px 40px #0002;backdrop-filter:blur(10px)
}
body:has(.terms) .terms h2,body:has(.review-card) .review-card h2,body:has(.ticket-card) .ticket-card h2{color:var(--visitor-gold)}
body:has(.terms) .terms-copy,body:has(.terms) .terms label{color:var(--visitor-text)}
body:has(.terms) .terms input{accent-color:#b79c60}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .btn.dark{
 background:linear-gradient(125deg,#d7c18b,#b39a63);border:1px solid #d7bf87;color:#182318;box-shadow:0 3px 0 #665a3c,0 10px 24px #0002
}
body:has(:is(.terms,#reserve,.review-card,.ticket-card)) .btn.dark:disabled{background:#354131;color:#bfc6b2;border-color:#58634a;box-shadow:none;cursor:not-allowed}
body:has(.review-card) .review-card p,body:has(.ticket-card) .ticket-card p{color:var(--visitor-text)}
body:has(.review-card) .review-card button[type=button]{background:#263223;color:var(--visitor-text);border:1px solid var(--visitor-line);padding:14px 18px;font:inherit}
body:has(.ticket-card) .ticket-card a{color:var(--visitor-gold)}
body:has(.ticket-card) .ticket-card strong{color:#ead6a7;background:#1e2b1f;border:1px dashed #9b8857;border-radius:12px;padding:16px;text-align:center;letter-spacing:.08em}
body:has(.ticket-card) .ticket-kicker{color:var(--visitor-gold);font-weight:700}
body:has(#reserve) #reserve .step-heading h2{color:var(--visitor-text)}
body:has(#reserve) #reserve .step-heading p{color:var(--visitor-muted)}
body:has(#reserve) #reserve .step-heading>span{background:#3e422b;color:var(--visitor-gold);border:1px solid #746744}
body:has(#reserve) #reserve .scroll-controls,body:has(#reserve) #reserve .scroll-controls small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .scroll-button{background:#2d3928;color:#e4d1a0;border:1px solid #80714a;box-shadow:0 2px 0 #10170f}
body:has(#reserve) #reserve .scroll-button:hover{background:#46452e}
body:has(#reserve) #reserve .date-scroll,body:has(#reserve) #reserve .slots-grid,body:has(#reserve) #reserve .reservation-fields-scroll{scrollbar-color:#b29a63 #2d281e}
body:has(#reserve) #reserve .date-scroll::-webkit-scrollbar-thumb,body:has(#reserve) #reserve .slots-grid::-webkit-scrollbar-thumb{background:#9d8b5d}
body:has(#reserve) #reserve .date-scroll::-webkit-scrollbar-track,body:has(#reserve) #reserve .slots-grid::-webkit-scrollbar-track{background:#2d281e}
body:has(#reserve) #reserve .date-chip{background:#35422e;border:1px solid #92805a;color:var(--visitor-text);box-shadow:none}
body:has(#reserve) #reserve .date-chip small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .date-chip.selected{background:#5c5033;border:1px solid #dfc78b;color:#fff4d6;box-shadow:0 3px 0 #746440}
body:has(#reserve) #reserve .date-chip.selected small{color:#e7dfbf}
body:has(#reserve) #reserve .slot-card{background:#35422e;border:1px solid #92805a;color:var(--visitor-text);box-shadow:none}
body:has(#reserve) #reserve .slot-time{color:var(--visitor-text)}
body:has(#reserve) #reserve .slot-time i{color:var(--visitor-muted)}
body:has(#reserve) #reserve .availability{color:#ded0a8}
body:has(#reserve) #reserve .availability b{background:#c8ad70}
body:has(#reserve) #reserve .slot-card input{accent-color:#d1b573}
body:has(#reserve) #reserve .slot-card:has(input:checked){background:#514e32;border:2px solid #dbc185;box-shadow:0 3px 0 #70603c}
body:has(#reserve) #reserve .capacity-track{background:#5a5139}
body:has(#reserve) #reserve .capacity-track span{background:#c8ad70}
body:has(#reserve) #reserve .slot-card.full{background:#2b3426;border-color:#726b53;opacity:1}
body:has(#reserve) #reserve .slot-card.full .slot-time,body:has(#reserve) #reserve .slot-card.full .availability{color:#c6bda7}
body:has(#reserve) #reserve .slot-card.full .availability b{background:#a0aa91}
body:has(#reserve) #reserve .reservation-fields>label{color:var(--visitor-text)}
body:has(#reserve) #reserve .reservation-fields label>small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .reservation-fields input,body:has(#reserve) #reserve .reservation-fields select{
 background:#233020;color:var(--visitor-text);border:1px solid #8e805c;caret-color:#eed6a0;color-scheme:dark
}
body:has(#reserve) #reserve .reservation-fields input::placeholder{color:#c6bca4;opacity:1}
body:has(#reserve) #reserve .reservation-fields input:focus,body:has(#reserve) #reserve .reservation-fields select:focus{outline:2px solid #c7af71;border-color:#c7af71}
body:has(#reserve) #reserve .reservation-submit{border-color:var(--visitor-line)}
body:has(#reserve) #reserve .empty{background:#202c20;border-color:var(--visitor-line);color:var(--visitor-muted)}
body:has(.terms) .terms{background:transparent;border:0;box-shadow:none;backdrop-filter:none;padding:0;max-width:860px}
body:has(.terms) .terms>h2{margin-bottom:22px}
body:has(.terms) .conditions-intro{color:var(--visitor-gold);font-size:16px;line-height:2;margin-bottom:25px}
.conditions-list{list-style:none;display:grid;gap:16px;margin:0;padding:0;counter-reset:none}
.condition-item{display:flex;align-items:center;gap:20px;padding:24px;background:linear-gradient(110deg,rgba(53,61,35,.88),rgba(34,45,29,.93));border:1px solid rgba(188,159,91,.65);border-radius:20px;backdrop-filter:blur(8px);box-shadow:inset 0 1px 0 rgba(224,203,149,.08),0 7px 20px #0002;min-width:0}
body:has(.terms) .condition-item p{margin:0;color:#f0e7d0;white-space:pre-wrap;line-height:2.2;font-size:15px;overflow-wrap:anywhere}
.condition-number{display:grid;place-items:center;flex:0 0 44px;min-height:46px;border:1px solid #ab8b4e;background:linear-gradient(140deg,#96763d,#6d542e);border-radius:12px;color:#fff0cb;box-shadow:inset 0 1px 0 #e2c98a33,0 2px 5px #0003;font-weight:700;font-size:17px}
.conditions-confirm{margin-top:24px;background:var(--visitor-surface);padding:22px 26px;border:1px solid var(--visitor-line);border-radius:18px}
body:has(.terms) .conditions-confirm label{margin-top:0;line-height:2;font-size:14px}
@media(max-width:600px){.condition-item{padding:20px 17px;gap:14px;border-radius:17px}.condition-number{flex-basis:35px;min-height:39px;font-size:15px}body:has(.terms) .condition-item p{font-size:14px}.conditions-confirm{padding:20px 17px}.conditions-confirm button{width:100%;font-size:12px;padding:15px 12px}}
@media print{
 body:has(.ticket-card){background:#fff;color:#172b1d}
 body:has(.ticket-card) .ticket-card{background:#fff;box-shadow:none;color:#172b1d;border-color:#64735c}
 body:has(.ticket-card) .ticket-card p,body:has(.ticket-card) .ticket-card h2,body:has(.ticket-card) .ticket-card .ticket-kicker{color:#172b1d}
 body:has(.ticket-card) .ticket-card strong{color:#172b1d;background:#fff}
 body:has(.ticket-card) .header,body:has(.ticket-card) footer,body:has(.ticket-card) button{display:none}
}
</style>`;

export const sharedBackdropStyles=`<style>
:root{--page-background-image:url('/static/bani-hashem.jpg')}
html{min-height:100%;background:#101e17}
body{position:relative;isolation:isolate;min-height:100svh;background:#101e17!important}
body::before{content:'';position:fixed;inset:-24px;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(8,23,16,.45),rgba(8,23,16,.7)),var(--page-background-image) center/cover no-repeat!important;filter:blur(14px)!important;opacity:.72!important}
body>.inner>h1{color:#f5ecda}body>.inner>.eyebrow{color:#deca9f}
body>.inner>p,body>.inner>.admin-lead>p,body>.inner>.admin-actions,body>.inner>.admin-search>a{color:#e8dfc9}
body>.inner>a{color:#dfc58e}
body>.inner>form.narrow{color:#f2eddf;padding:25px;background:rgba(40,51,37,.96);border:1px solid #9d885b;border-radius:18px}
body:has(.hero)::before{display:none}
body:has(.hero) .hero{background-image:linear-gradient(90deg,rgba(9,17,13,.88),rgba(9,17,13,.26) 70%),var(--page-background-image)}
@media print{html,body{background:#fff!important}body::before{display:none!important}body>.inner>h1,body>.inner>.eyebrow,body>.inner>p,body>.inner>.admin-actions{color:#243c2b}}
</style>`;
