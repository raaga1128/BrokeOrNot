/* ============================================================
   BrokeOrNot - app.js
   Student Expense Manager
   ============================================================ */

const G=id=>document.getElementById(id);
const fmt=n=>'\u20b9'+Math.round(Math.max(n,0)).toLocaleString('en-IN');
const now=new Date(),mK=`${now.getFullYear()}-${now.getMonth()+1}`,dom=now.getDate(),dim=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
let S=JSON.parse(localStorage.getItem('bon4')||'{}');
if(!S.budget)S.budget=0;
if(!S.months)S.months={};
if(!S.months[mK])S.months[mK]={transactions:[]};
if(!S.unlocked)S.unlocked=[];
const txs=()=>S.months[mK].transactions;
const save=()=>localStorage.setItem('bon4',JSON.stringify(S));

function goTo(p){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));G(p).classList.add('active');if(p==='pd')rDash();}
function atab(t){document.querySelectorAll('.atab').forEach((x,i)=>x.classList.toggle('active',['si','su'][i]===t));G('ssi').classList.toggle('active',t==='si');G('ssu').classList.toggle('active',t==='su');}
function doSI(){const em=G('siem').value.trim(),pw=G('sipw').value;if(!em||!pw){showToast('Fill in all fields!');return;}S.userName=S.userName||em.split('@')[0];save();eDash(S.userName);}
function doSU(){const nm=G('sunm').value.trim(),em=G('suem').value.trim(),pw=G('supw').value;if(!nm||!em||!pw){showToast('Fill in all fields!');return;}S.userName=nm;save();eDash(nm);}
function doG(){S.userName=S.userName||'Student';save();eDash(S.userName);}
function doLo(){setAlertMode(null);window._alertMode=null;goTo('ph');}
function eDash(nm){G('nnm').textContent=nm;G('nav2').textContent=nm.charAt(0).toUpperCase();G('enm').textContent=nm.split(' ')[0];G('nday').textContent='Day '+dom+' of '+dim;goTo('pd');}
function sBud(id){const v=parseFloat(G(id).value);if(!v||v<=0){showToast('Enter a valid budget!');return;}S.budget=v;save();G(id).value='';showToast('Budget set to '+fmt(v)+'!');rDash();}

function aExp(di,ai,ci){
  const desc=G(di).value.trim(),amt=parseFloat(G(ai).value),cat=G(ci).value;
  if(!amt||amt<=0){showToast('Enter a valid amount!');return;}
  txs().push({id:Date.now()+'',desc:desc||CATS[cat].l,amount:amt,category:cat,date:new Date().toISOString()});
  save();G(di).value='';G(ai).value='';
  showToast(CATS[cat].i+' '+fmt(amt)+' added!');
  rDash();
  setTimeout(function(){if(window._alertMode)triggerPopup(window._alertMode);},80);
}

function dTx(id){S.months[mK].transactions=txs().filter(t=>t.id!==id);save();showToast('Removed!');rDash();}
function clrAll(){if(!confirm('Clear all transactions?'))return;S.months[mK].transactions=[];save();rDash();showToast('Cleared!');}

const CATS={
  food:          {i:'\ud83c\udf54',l:'Food',          c:'#FF9500',b:'#FFF4E6'},
  transport:     {i:'\ud83d\ude8c',l:'Transport',     c:'#3D8BFF',b:'#EDF4FF'},
  entertainment: {i:'\ud83c\udfae',l:'Entertainment', c:'#7B4FFF',b:'#F3EEFF'},
  education:     {i:'\ud83d\udcda',l:'Education',     c:'#00C2A8',b:'#E6FAF8'},
  health:        {i:'\ud83d\udc8a',l:'Health',        c:'#00C896',b:'#E6FAF2'},
  clothing:      {i:'\ud83d\udc55',l:'Clothing',      c:'#FF3DA8',b:'#FFF0F8'},
  other:         {i:'\ud83d\udce6',l:'Other',         c:'#8A8A9A',b:'#F4F4F6'}
};

const ROAST_LEVELS=[
  {maxRem:20, emoji:'\ud83d\udc80', sev:'FINANCIALLY DECEASED',
   title:"THE MONTH ISN'T OVER. YOUR MONEY IS.",
   body:"Only 20% of your budget remains and the month is still breathing. You, however, are not. You've achieved something special — being broke before the bills even showed up. Your wallet has left the chat. Your bank account is in therapy. Somewhere, a financial advisor is crying and they don't even know why. It's because of you.",
   bg:'linear-gradient(135deg,#FF3D6B,#FF6B2B)'},
  {maxRem:30, emoji:'\ud83d\udea8', sev:'CRITICAL',
   title:"ONLY 30% LEFT. START PRACTISING YOUR BROKE FACE.",
   body:"You're down to your last 30%. That's not a budget anymore — that's a countdown. At this pace, you'll be calculating whether you can afford one Maggi or two by next week. The answer is one. It's always one.",
   bg:'linear-gradient(135deg,#FF6B2B,#FF9500)'},
  {maxRem:40, emoji:'\ud83d\ude30', sev:'ALARMING',
   title:"YOU'VE SPENT 60% OF YOUR BUDGET. BOLD STRATEGY.",
   body:"More than half is gone. 60% of your money has left the building and the month is still very much present. Your daily safe spend is shrinking faster than your will to check this app.",
   bg:'linear-gradient(135deg,#FF9500,#FFB020)'},
  {maxRem:50, emoji:'\ud83d\ude2c', sev:'WARNING',
   title:"HALFWAY THROUGH YOUR MONEY. NOT HALFWAY THROUGH THE MONTH.",
   body:"Half your budget is gone. Half. The month has not gotten the memo and is continuing as scheduled. This is the part where we politely suggest you stop opening food delivery apps. Politely.",
   bg:'linear-gradient(135deg,#FFB020,#FFD23F)'},
  {maxRem:80, emoji:'\ud83d\udc40', sev:'HEADS UP',
   title:"YOU'VE ALREADY SPENT 20% OF YOUR BUDGET.",
   body:"Nothing alarming yet — but we're watching. 20% gone and the month is just warming up. This is fine. Totally fine. Just... maybe don't order from three different apps today.",
   bg:'linear-gradient(135deg,#00C2A8,#3D8BFF)'}
];

const POPUPS={
  critical:[
    {icon:'\ud83d\udea8', sev:'CRITICAL ALERT', title:'STOP. READ THIS.', body:"You're in the CRITICAL zone. Every rupee you spend now is a rupee your future self will cry about. Think. Please."},
    {icon:'\ud83d\udcb8', sev:'CRITICAL ALERT', title:'ANOTHER ONE?? REALLY??', body:"You've added yet another expense when you can barely afford to breathe financially. Impressive audacity, honestly."},
    {icon:'\ud83e\udd21', sev:'CRITICAL ALERT', title:'SPEEDRUNNING BROKE%', body:"30% budget left and you're still spending. The finish line is \u20b90. Do you WANT to get there? Because you're winning."}
  ],
  deceased:[
    {icon:'\ud83d\udc80', sev:'FINANCIALLY DECEASED', title:"THE MONTH ISN'T OVER. YOU ARE.", body:"20% left. You just spent more. This is not a drill. This is a financial emergency. PUT THE PHONE DOWN."},
    {icon:'\ud83e\ude66', sev:'FINANCIALLY DECEASED', title:'ADDING EXPENSES AT 20% BUDGET??', body:"Your wallet has filed a police report. The suspect is you. The crime is this transaction. You have the right to remain broke."},
    {icon:'\u2620\ufe0f',  sev:'FINANCIALLY DECEASED', title:'ARE YOU OKAY?? LIKE ACTUALLY??', body:"This expense happened at sub-20% budget. Somewhere a financial advisor felt a disturbance in the force. It was you."}
  ]
};

let popIdx={critical:0,deceased:0};
window._alertMode=null;

function setAlertMode(mode){
  var e=G('alertEdge'),l=G('alertLeft'),r=G('alertRight');
  e.className=mode?'on '+mode:'';
  l.className=mode||'';
  r.className=mode||'';
}

function triggerPopup(mode){
  if(!mode)return;
  var pool=POPUPS[mode];
  var p=pool[popIdx[mode]%pool.length];
  popIdx[mode]++;
  var popup=G('criticalPopup');
  var flash=G('screenFlash');
  flash.style.display='block';
  flash.className='flash';
  setTimeout(function(){flash.className='';flash.style.display='none';},600);
  G('cpIcon').textContent=p.icon;
  G('cpSev').textContent=p.sev;
  G('cpTitle').textContent=p.title;
  G('cpBody').textContent=p.body;
  popup.style.display='flex';
  popup.className='show';
  clearTimeout(window._popupTimer);
  window._popupTimer=setTimeout(function(){
    popup.className='hide';
    setTimeout(function(){popup.className='';popup.style.display='none';},280);
  },3500);
  popup.onclick=function(){
    clearTimeout(window._popupTimer);
    popup.className='hide';
    setTimeout(function(){popup.className='';popup.style.display='none';},280);
  };
}

const ACHS=[
  {id:'fe',  i:'\ud83c\udfaf', n:'First Transaction',   d:'Added your first expense. The beginning of the end.',      k:function(){return txs().length>=1;}},
  {id:'bs',  i:'\ud83d\udcb8', n:'Big Spender',          d:'Single expense over \u20b91000. Living large!',              k:function(){return txs().some(function(t){return t.amount>=1000;});}},
  {id:'bset',i:'\ud83c\udfe6', n:'Budget Boss',           d:"Set a monthly budget. Now stick to it.",                  k:function(){return S.budget>0;}},
  {id:'ten', i:'\ud83d\udcca', n:'Consistent Spender',   d:'10+ transactions. You really commit.',                    k:function(){return txs().length>=10;}},
  {id:'food',i:'\ud83c\udf54', n:'Foodie Mode',           d:'5+ food transactions. Your stomach > savings.',           k:function(){return txs().filter(function(t){return t.category==='food';}).length>=5;}},
  {id:'mm',  i:'\ud83c\udfc5', n:'Month Survivor',        d:'Data across multiple months!',                            k:function(){return Object.keys(S.months).length>=2;}},
  {id:'20',  i:'\ud83d\udd25', n:'Habitual Spender',      d:'20+ transactions. No shame.',                             k:function(){return txs().length>=20;}}
];

function rDash(){
  var bud=S.budget,all=txs(),spent=all.reduce(function(s,t){return s+t.amount;},0),rem=bud-spent;
  var pct=bud>0?Math.min(spent/bud*100,100):0;
  var hd=bud>0||all.length>0;
  G('emp').style.display=hd?'none':'flex';
  G('dc').style.display=hd?'block':'none';
  if(!hd)return;

  if(bud>0){G('nrem').style.display='inline-flex';G('nrem').textContent=fmt(rem)+' left';}
  var wr=G('wsr');wr.textContent=fmt(rem);wr.className='wsv '+(pct<50?'safe':pct<80?'warn':'danger');
  G('wss2').textContent=fmt(spent);
  G('wssu').textContent='of '+fmt(bud)+' budget';
  var dl=dim-dom+1;
  var safeD=dl>0?Math.max(rem/dl,0):0;
  G('wsd').textContent=fmt(safeD)+'/day safe';
  var tod=all.filter(function(t){return new Date(t.date).toDateString()===now.toDateString();}).reduce(function(s,t){return s+t.amount;},0);
  G('wst').textContent=fmt(tod);
  var moods=[[0,'\ud83d\ude0a Budget pristine!'],[25,'\ud83d\ude0c Solid!'],[45,'\ud83d\ude42 Decent.'],[60,'\ud83d\ude2c Slow down...'],[75,'\ud83d\ude30 Uh oh...'],[90,'\ud83d\udc80 You are cooked.']];
  var moodHit=moods.filter(function(m){return pct>=m[0];}).pop()||moods[0];
  G('wsm').textContent=moodHit[1];
  G('wsf').style.width=pct+'%';
  G('wsp').textContent=Math.round(pct)+'% spent';
  G('wsdl').textContent=dl+' days left';
  G('sh').textContent=fmt(all.length?Math.max.apply(null,all.map(function(t){return t.amount;})):0);
  G('sc2').textContent=all.length;
  var ct={};all.forEach(function(t){ct[t.category]=(ct[t.category]||0)+t.amount;});
  var top=Object.entries(ct).sort(function(a,b){return b[1]-a[1];})[0];
  G('st').textContent=top?CATS[top[0]].i:'\u2014';
  G('sa').textContent=fmt(dom>0?spent/dom:0);

  // Roast banner
  var remPct=bud>0?(rem/bud)*100:100;
  var hit=bud>0?ROAST_LEVELS.find(function(r){return remPct<=r.maxRem;}):null;
  var alertMode=null;
  if(bud>0&&remPct<=20)alertMode='deceased';
  else if(bud>0&&remPct<=30)alertMode='critical';
  setAlertMode(alertMode);
  window._alertMode=alertMode;
  var rb=G('rbar');
  if(hit){
    var sevHtml='<span style="display:inline-flex;align-items:center;font-family:Space Mono,monospace;font-size:.62rem;font-weight:700;padding:4px 12px;border-radius:100px;background:rgba(255,255,255,.2);color:#fff;letter-spacing:.06em;margin-bottom:10px;">'+hit.emoji+' '+hit.sev+'</span>';
    G('rt').innerHTML=sevHtml+'<br>'+hit.title;
    G('rb').textContent=hit.body;
    rb.style.display='block';
    rb.style.background=hit.bg;
  } else {
    rb.style.display='none';
  }

  // Category chart
  var cc=G('cch');
  var ents=Object.entries(ct).sort(function(a,b){return b[1]-a[1];});
  if(!ents.length){
    cc.innerHTML='<div class="et"><div class="eti">\ud83d\udcca</div><div class="etx">Add expenses to see breakdown</div></div>';
  } else {
    cc.innerHTML=ents.map(function(e){
      var cfg=CATS[e[0]],a=e[1],p=spent>0?(a/spent*100).toFixed(1):0;
      return '<div class="cbrow"><div class="cbico" style="background:'+cfg.b+'">'+cfg.i+'</div><div class="cbi"><div class="cbh"><span class="cbn">'+cfg.l+'</span><span class="cba">'+fmt(a)+' ('+p+'%)</span></div><div class="cbt"><div class="cbf" style="width:'+p+'%;background:'+cfg.c+'"></div></div></div></div>';
    }).join('');
  }

  // Heatmap
  var dm={};
  all.forEach(function(t){var d=new Date(t.date).getDate();dm[d]=(dm[d]||0)+t.amount;});
  var hmx=Math.max.apply(null,Object.values(dm).concat([1]));
  var h='';
  for(var i=1;i<=dim;i++){
    var a=dm[i]||0,al=a>0?0.15+a/hmx*0.7:0,it=i===dom;
    h+='<div class="hd '+(it?'today':'')+'" data-tip="Day '+i+': '+fmt(a)+'" style="background:'+(a>0?'rgba(255,107,43,'+al+')':'#F4EFE8')+';color:'+(it?'var(--or)':i>dom?'#D0C8BF':'#8A8070')+'">'+i+'</div>';
  }
  G('hmap').innerHTML=h;

  // Transactions
  var txEl=G('txl');
  if(!all.length){
    txEl.innerHTML='<div class="et"><div class="eti">\ud83e\uddfe</div><div class="etx">No transactions yet!</div></div>';
  } else {
    txEl.innerHTML=[].concat(all).sort(function(a,b){return new Date(b.date)-new Date(a.date);}).map(function(t){
      var cfg=CATS[t.category],d=new Date(t.date);
      return '<div class="txi"><div class="txic" style="background:'+cfg.b+'">'+cfg.i+'</div><div class="txb"><div class="txn">'+t.desc+'</div><div class="txm">'+d.toLocaleDateString('en-IN',{day:'numeric',month:'short'})+' \u00b7 '+d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})+' \u00b7 '+cfg.l+'</div></div><div class="txa2">'+fmt(t.amount)+'</div><button class="txd" onclick="dTx(\''+t.id+'\')">\ud83d\uddd1\ufe0f</button></div>';
    }).join('');
  }

  // Predictions
  var aT=Object.values(S.months).flatMap(function(m){return m.transactions||[];});
  var mc=Object.keys(S.months).length;
  var pg=G('pg');
  if(aT.length<5){
    pg.innerHTML='<div class="et" style="grid-column:1/-1"><div class="eti">\ud83d\udd2e</div><div class="etx">Keep spending across months to unlock predictions.</div></div>';
  } else {
    var pt={};aT.forEach(function(t){pt[t.category]=(pt[t.category]||0)+t.amount;});
    pg.innerHTML=Object.entries(pt).sort(function(a,b){return b[1]-a[1];}).slice(0,4).map(function(e){
      var avg=Math.round(e[1]/mc),cfg=CATS[e[0]];
      return '<div class="pc"><div class="pbg">PREDICTED</div><div class="pico">'+cfg.i+'</div><div class="pcat">'+cfg.l+'</div><div class="pamt">'+fmt(avg)+'</div><div class="pnote">avg/month \u00b7 '+mc+' month'+(mc>1?'s':'')+'</div></div>';
    }).join('');
  }

  // Trend
  var tEl=G('tc');
  var mos=Object.entries(S.months).slice(-6);
  if(mos.length<2){
    tEl.innerHTML='<div class="et"><div class="eti">\ud83d\udcc8</div><div class="etx">Need data from multiple months.</div></div>';
  } else {
    var mx2=Math.max.apply(null,mos.map(function(e){return (e[1].transactions||[]).reduce(function(s,t){return s+t.amount;},0);}).concat([1]));
    tEl.innerHTML=mos.map(function(e){
      var tot=(e[1].transactions||[]).reduce(function(s,t){return s+t.amount;},0);
      var p=tot/mx2*100;
      var parts=e[0].split('-');
      var lbl=new Date(parts[0],parts[1]-1).toLocaleDateString('en-IN',{month:'short',year:'2-digit'});
      return '<div class="tbar"><span class="tlbl">'+lbl+'</span><div class="ttrk"><div class="tfl" style="width:'+p+'%;background:linear-gradient(90deg,var(--te),var(--bl))"></div></div><span class="tval">'+fmt(tot)+'</span></div>';
    }).join('');
  }

  // Achievements
  G('achl').innerHTML=ACHS.map(function(a){
    var ok=a.k();
    if(ok&&S.unlocked.indexOf(a.id)===-1){S.unlocked.push(a.id);save();setTimeout(function(){showToast('\ud83c\udfc6 Badge: '+a.n+'!');},500);}
    return '<div class="ai '+(ok?'ok':'')+'"><div class="aem">'+a.i+'</div><div><div class="an">'+a.n+'</div><div class="ad">'+a.d+'</div></div><div class="as">'+(ok?'\u2705':'\ud83d\udd12')+'</div></div>';
  }).join('');
}

function dTab(n){
  document.querySelectorAll('.dtb').forEach(function(t,i){t.classList.toggle('active',['ov','tx','pr','ba'][i]===n);});
  document.querySelectorAll('.dtc').forEach(function(c){c.classList.remove('active');});
  G('dt'+n).classList.add('active');
}

var toastT;
function showToast(msg){
  var t=G('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show');},2500);
}

document.addEventListener('keydown',function(e){
  if(e.key==='Enter'){
    var ap=document.querySelector('.page.active');
    if(ap&&ap.id==='pl'){G('ssi').classList.contains('active')?doSI():doSU();}
  }
});

if(S.userName)eDash(S.userName);