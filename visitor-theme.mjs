export const visitorTheme=`<style>
/* A continuous, muted palette through conditions, booking, review and ticket. */
body:has(:is(.terms,#reserve,.review-card,.ticket-card)){
 --visitor-surface:rgba(37,45,33,.96);--visitor-inset:#1d281e;--visitor-line:rgba(191,168,110,.4);--visitor-text:#f2eddf;--visitor-muted:#c0c7b3;--visitor-gold:#d7bf87;
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
body:has(#reserve) #reserve .step-heading>span{background:#32382a;color:var(--visitor-gold);border:1px solid #746744}
body:has(#reserve) #reserve .scroll-controls,body:has(#reserve) #reserve .scroll-controls small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .scroll-button{background:#273223;color:#e4d1a0;border:1px solid #80714a;box-shadow:0 2px 0 #10170f}
body:has(#reserve) #reserve .scroll-button:hover{background:#35402d}
body:has(#reserve) #reserve .date-scroll,body:has(#reserve) #reserve .slots-grid,body:has(#reserve) #reserve .reservation-fields-scroll{scrollbar-color:#9d8b5d #202b1e}
body:has(#reserve) #reserve .date-scroll::-webkit-scrollbar-thumb,body:has(#reserve) #reserve .slots-grid::-webkit-scrollbar-thumb{background:#9d8b5d}
body:has(#reserve) #reserve .date-scroll::-webkit-scrollbar-track,body:has(#reserve) #reserve .slots-grid::-webkit-scrollbar-track{background:#202b1e}
body:has(#reserve) #reserve .date-chip{background:#2c3828;border:1px solid #6b7958;color:var(--visitor-text);box-shadow:none}
body:has(#reserve) #reserve .date-chip small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .date-chip.selected{background:#445137;border:1px solid #cfb674;color:#fff4d6;box-shadow:0 3px 0 #746440}
body:has(#reserve) #reserve .date-chip.selected small{color:#e7dfbf}
body:has(#reserve) #reserve .slot-card{background:#2c3828;border:1px solid #6b7958;color:var(--visitor-text);box-shadow:none}
body:has(#reserve) #reserve .slot-time{color:var(--visitor-text)}
body:has(#reserve) #reserve .slot-time i{color:var(--visitor-muted)}
body:has(#reserve) #reserve .availability{color:#c3ddae}
body:has(#reserve) #reserve .availability b{background:#a3c087}
body:has(#reserve) #reserve .slot-card input{accent-color:#d1b573}
body:has(#reserve) #reserve .slot-card:has(input:checked){background:#3c4d33;border:2px solid #c5ad70;box-shadow:0 3px 0 #70603c}
body:has(#reserve) #reserve .capacity-track{background:#43513b}
body:has(#reserve) #reserve .capacity-track span{background:#a3be85}
body:has(#reserve) #reserve .slot-card.full{background:#1d241d;border-color:#46513f;opacity:1}
body:has(#reserve) #reserve .slot-card.full .slot-time,body:has(#reserve) #reserve .slot-card.full .availability{color:#b8c0ac}
body:has(#reserve) #reserve .slot-card.full .availability b{background:#a0aa91}
body:has(#reserve) #reserve .reservation-fields>label{color:var(--visitor-text)}
body:has(#reserve) #reserve .reservation-fields label>small{color:var(--visitor-muted)}
body:has(#reserve) #reserve .reservation-fields input,body:has(#reserve) #reserve .reservation-fields select{
 background:#172318;color:var(--visitor-text);border:1px solid #687653;caret-color:#eed6a0;color-scheme:dark
}
body:has(#reserve) #reserve .reservation-fields input::placeholder{color:#b8c2ac;opacity:1}
body:has(#reserve) #reserve .reservation-fields input:focus,body:has(#reserve) #reserve .reservation-fields select:focus{outline:2px solid #c7af71;border-color:#c7af71}
body:has(#reserve) #reserve .reservation-submit{border-color:var(--visitor-line)}
body:has(#reserve) #reserve .empty{background:#202c20;border-color:var(--visitor-line);color:var(--visitor-muted)}
@media print{
 body:has(.ticket-card){background:#fff;color:#172b1d}
 body:has(.ticket-card) .ticket-card{background:#fff;box-shadow:none;color:#172b1d;border-color:#64735c}
 body:has(.ticket-card) .ticket-card p,body:has(.ticket-card) .ticket-card h2,body:has(.ticket-card) .ticket-card .ticket-kicker{color:#172b1d}
 body:has(.ticket-card) .ticket-card strong{color:#172b1d;background:#fff}
 body:has(.ticket-card) .header,body:has(.ticket-card) footer,body:has(.ticket-card) button{display:none}
}
</style>`;
