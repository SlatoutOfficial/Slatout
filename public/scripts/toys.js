/* SLATOUT — service-page interactive demonstrations (progressive enhancement).
   Each service page has <div data-toy="<slug>">; the matching demo renders into it.
   All numbers are illustrative and the page text says so. No data leaves the browser. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; }
  function inr(n) { return '\u20B9' + Math.round(n).toLocaleString('en-IN'); }
var TOY={};
TOY['business-setup-registration']={h:'Which structure fits? Compare them side by side.',l:'Pick a structure to see how it trades off liability, funding, compliance and flexibility.',n:'Indicative comparison only. We confirm the right fit after assessing your ownership, funding plans and activity.',f:function(b){
 var D=[['Sole proprietorship',[0,0,1,1],'Individuals testing an idea with the lightest compliance. No separate legal entity.'],['Partnership firm',[1,1,1,3],'Small groups of trusted partners. Partners are personally liable.'],['LLP',[4,2,2,4],'Professional firms and partnerships that want limited liability with lighter compliance.'],['One Person Company',[4,2,3,1],'Solo founders who want limited liability in a company structure.'],['Private Limited Company',[4,5,4,4],'Startups planning to raise equity funding or issue ESOPs.']];
 var M=['Liability protection','Ease of raising equity funding','Compliance workload (higher = more filings)','Ownership flexibility'];
 b.innerHTML='<div><h3>Choose a structure</h3><div class="chips" id="t1c"></div></div><div id="t1o"></div>';
 var c=$('#t1c',b),o=$('#t1o',b);
 function show(i){$$('button',c).forEach(function(x,k){x.setAttribute('aria-pressed',k===i)});
  o.innerHTML=M.map(function(m,k){return '<div class="mr"><span>'+m+'</span><div class="pips">'+[0,1,2,3,4].map(function(p){return '<i class="'+(p<D[i][1][k]?'on':'')+'"></i>'}).join('')+'</div></div>'}).join('')+'<p class="extra"><strong>Best for:</strong> '+D[i][2]+'</p>'}
 D.forEach(function(d,i){var x=el('button','chip',d[0]);x.type='button';x.onclick=function(){show(i)};c.appendChild(x)});show(4)}};
TOY['technology-ai-solutions']={h:'Watch one enquiry travel: manual versus automated.',l:'Send a test enquiry through both versions of the same four steps.',n:'Illustrative timings. Real results depend on your process and tools.',f:function(b){
 var ST=['Capture','Log','Notify','Follow up'];
 b.innerHTML='<div><h3>Choose how your team works today</h3><div class="chips"><button class="chip" type="button" aria-pressed="true" data-m="0">Manually</button><button class="chip" type="button" aria-pressed="false" data-m="1">With automation</button></div><p class="extra" style="margin-bottom:20px"></p><button class="btn btn-p" type="button" id="t2r">Send a test enquiry</button></div><div><div class="flow" id="t2f">'+ST.map(function(s){return '<div class="nd">'+s+'<small>&nbsp;</small></div>'}).join('')+'</div><p class="big2" id="t2t">Press the button to start.</p></div>';
 var mode=0,busy=false,nds=$$('.nd',b),ex=$('.extra',b),t=$('#t2t',b);
 var TX=['Every step waits for a person: logging, replying, remembering to follow up.','Each step triggers the next one instantly: captured, logged, notified, followed up.'];ex.textContent=TX[0];
 $$('[data-m]',b).forEach(function(x){x.onclick=function(){mode=+x.dataset.m;$$('[data-m]',b).forEach(function(y){y.setAttribute('aria-pressed',y===x)});ex.textContent=TX[mode]}});
 var W=[['in the inbox','waiting for someone','waiting for a reply','easy to forget'],['done','done','done','scheduled']];
 $('#t2r',b).onclick=function(){if(busy)return;busy=true;nds.forEach(function(n){n.className='nd';n.lastChild.innerHTML='&nbsp;'});t.textContent=mode?'Running…':'Waiting…';
  var d=reduce?0:(mode?260:1100),k=0;(function step(){if(k>0)nds[k-1].className='nd dn';if(k===4){t.textContent=mode?'Done in seconds.':'Typically hours to days.';busy=false;return}
   nds[k].className='nd on';nds[k].lastChild.textContent=W[mode][k];k++;setTimeout(step,d)})()}}};
TOY['offline-business-launch']={h:'Score three sites before you sign a lease.',l:'Adjust each site on five factors. The comparison updates as you move the sliders.',n:'A simplified version of our site comparison. A real study uses catchment, footfall and competitor data.',f:function(b){
 var F=['Footfall','Visibility','Rent fit','Competition nearby (lower is better)','Customer match'],V=[[8,6,4,8,6],[6,7,7,4,8],[5,4,9,3,5]],sel=0;
 b.innerHTML='<div><h3>Choose a site to adjust</h3><div class="chips" id="t3s"></div><div class="ctl" id="t3c" style="margin-top:22px"></div></div><div id="t3o"></div>';
 var s=$('#t3s',b),c=$('#t3c',b),o=$('#t3o',b);
 function sc(v){var w=[3,2,2,2,3],t=0;for(var i=0;i<5;i++)t+=w[i]*(i===3?10-v[i]:v[i]);return Math.round(t/12*10)}
 function out(){var r=V.map(sc),m=Math.max.apply(null,r),w=r.indexOf(m);o.innerHTML='<h3>Site score</h3>'+r.map(function(x,i){return '<div class="bd'+(i===w?' w':'')+'"><span>Site '+'ABC'[i]+'</span><div><i style="width:'+x+'%"></i></div><b>'+x+'</b></div>'}).join('')+'<p class="big2" style="margin-top:14px">Site '+'ABC'[w]+' leads.</p>'}
 function ctl(){c.innerHTML=F.map(function(f,i){return '<div class="rg"><label for="t3'+i+'">'+f+' <b>'+V[sel][i]+'</b></label><input id="t3'+i+'" type="range" min="0" max="10" value="'+V[sel][i]+'"></div>'}).join('');
  $$('input',c).forEach(function(x,i){x.oninput=function(){V[sel][i]=+x.value;x.previousElementSibling.lastChild.textContent=x.value;out()}})}
 ['Site A','Site B','Site C'].forEach(function(n,i){var x=el('button','chip',n);x.type='button';x.setAttribute('aria-pressed',i===0);x.onclick=function(){sel=i;$$('button',s).forEach(function(y,k){y.setAttribute('aria-pressed',k===i)});ctl()};s.appendChild(x)});ctl();out()}};
TOY['branding-marketing']={h:'Tune a brand in three choices.',l:'Choose a personality and watch the same business change character.',n:'Strategy decides these choices before a logo is drawn. This is a simplified demonstration.',f:function(b){
 var G=[['Tone',['Bold','Calm']],['Style',['Classic','Modern']],['Energy',['Playful','Serious']]],sel=[0,1,0];
 b.innerHTML='<div class="ctl" id="t4c"></div><div><div class="bp1" id="t4p"><h4>Your Brand</h4><p>Make it unmistakably yours.</p><span>Get started</span></div><p class="extra" id="t4d"></p></div>';
 var c=$('#t4c',b),p=$('#t4p',b),d=$('#t4d',b);
 function ap(){var T=sel[0],St=sel[1],E=sel[2];
  p.style.setProperty('--ff',St?'Jost,Futura,sans-serif':'Georgia,"Times New Roman",serif');p.style.setProperty('--fw',T?300:700);p.style.setProperty('--tt',T?'none':'uppercase');
  p.style.setProperty('--bg',E?'#0F1B2D':'#FFE45C');p.style.setProperty('--fg',E?'#fff':'#1a1a1a');p.style.setProperty('--ac',T?'#2E7D6B':'#E8451E');p.style.setProperty('--rd',E?'3px':'26px');
  d.textContent='A '+G[0][1][T].toLowerCase()+', '+G[1][1][St].toLowerCase()+', '+G[2][1][E].toLowerCase()+' brand.'}
 G.forEach(function(g,gi){var w=el('div','','<h3>'+g[0]+'</h3><div class="chips"></div>');g[1].forEach(function(n,ni){var x=el('button','chip',n);x.type='button';x.setAttribute('aria-pressed',sel[gi]===ni);x.onclick=function(){sel[gi]=ni;$$('button',w).forEach(function(y,k){y.setAttribute('aria-pressed',k===ni)});ap()};$('.chips',w).appendChild(x)});c.appendChild(w)});ap()}};
TOY['content-strategy']={h:'Plan a month of content.',l:'Pick a pillar, then click days to assign it. Watch the balance.',n:'A sample planner. Our editorial calendars map every piece to a pillar, channel and funnel stage.',f:function(b){
 var PL=['Educate','Proof','Promote','Culture','Rest'],cal=[0,1,3,0,2,0,4, 0,1,0,3,2,0,4, 0,1,3,0,2,0,4, 0,1,0,3,2,0,4],br=0;
 b.innerHTML='<div><h3>Pick a pillar, then click days</h3><div class="chips" id="t5c" style="margin-bottom:18px"></div><div class="cal" id="t5g"></div></div><div id="t5o"></div>';
 var c=$('#t5c',b),g=$('#t5g',b),o=$('#t5o',b);
 function draw(){g.innerHTML=['M','T','W','T','F','S','S'].map(function(d){return '<button class="dw" tabindex="-1" aria-hidden="true">'+d+'</button>'}).join('')+cal.map(function(v,i){return '<button type="button" class="'+(v<4?'pc'+v:'')+'" data-i="'+i+'" aria-label="Day '+(i+1)+': '+PL[v]+'">'+(v<4?PL[v][0]:'')+'</button>'}).join('');
  $$('[data-i]',g).forEach(function(x){x.onclick=function(){cal[+x.dataset.i]=br;draw()}});
  var n=[0,0,0,0,0];cal.forEach(function(v){n[v]++});var mx=Math.max(n[0],n[1],n[2],n[3],1);var pub=28-n[4],pr=pub?Math.round(n[2]/pub*100):0;
  o.innerHTML='<h3>Your balance</h3>'+PL.slice(0,4).map(function(p,i){return '<div class="bd'+(i===2&&pr>35?'':'')+'"><span>'+p+'</span><div><i style="width:'+Math.round(n[i]/28*100*3)+'%;background:'+(['#FF8A00','#fff','#777','#a85d00'][i])+'"></i></div><b>'+n[i]+'</b></div>'}).join('')+'<p class="big2" style="margin-top:14px">'+pub+' posting days</p><p class="extra">'+(pr>35?'Heavy on promotion: audiences switch off. Shift some days to education or proof.':(pub<12?'Few posting days: consistency beats bursts.':'Healthy mix: value first, promotion earns its place.'))+'</p>'}
 PL.forEach(function(p,i){var x=el('button','chip',p);x.type='button';x.setAttribute('aria-pressed',i===0);x.onclick=function(){br=i;$$('button',c).forEach(function(y,k){y.setAttribute('aria-pressed',k===i)})};c.appendChild(x)});draw()}};
TOY['digital-marketing']={h:'Where does a month of ad budget go?',l:'Move the sliders to see how budget turns into clicks, leads and customers.',n:'Illustrative maths with your own assumptions. Real results depend on offer, market and execution.',f:function(b){
 var R=[['Monthly ad budget',10000,500000,10000,50000,inr],['Cost per click',5,100,1,20,inr],['Click to lead rate',1,15,.5,4,function(v){return v+'%'}],['Lead to customer rate',5,50,1,20,function(v){return v+'%'}],['Average order value',500,50000,500,5000,inr]],V=R.map(function(r){return r[4]});
 b.innerHTML='<div class="ctl" id="t6c"></div><div id="t6o"></div>';var c=$('#t6c',b),o=$('#t6o',b);
 function out(){var cl=V[0]/V[1],ld=cl*V[2]/100,cu=ld*V[3]/100,rv=cu*V[4];
  o.innerHTML='<h3>What that budget produces</h3><div class="fb" style="width:100%">'+Math.round(cl).toLocaleString('en-IN')+' clicks</div><div class="fb" style="width:'+Math.max(18,V[2]*6)+'%">'+Math.round(ld).toLocaleString('en-IN')+' leads</div><div class="fb" style="width:'+Math.max(14,V[2]*V[3]/100*28)+'%">'+(cu<10?cu.toFixed(1):Math.round(cu))+' customers</div><div class="kp"><div><span class="big2">'+inr(rv)+'</span><small>Revenue</small></div><div><span class="big2">'+(ld?inr(V[0]/ld):'—')+'</span><small>Cost per lead</small></div><div><span class="big2">'+(rv/V[0]).toFixed(1)+'x</span><small>Return on ad spend</small></div></div>'}
 c.innerHTML=R.map(function(r,i){return '<div class="rg"><label for="t6'+i+'">'+r[0]+' <b>'+r[5](V[i])+'</b></label><input id="t6'+i+'" type="range" min="'+r[1]+'" max="'+r[2]+'" step="'+r[3]+'" value="'+V[i]+'"></div>'}).join('');
 $$('input',c).forEach(function(x,i){x.oninput=function(){V[i]=+x.value;x.previousElementSibling.lastChild.textContent=R[i][5](V[i]);out()}});out()}};
TOY['ecommerce-marketplace-growth']={h:'Is your marketplace advertising profitable?',l:'Enter a month of numbers to see ACoS, ROAS and TACoS, and whether ads beat your margin.',n:'ACoS = ad spend ÷ ad sales. ROAS = ad sales ÷ ad spend. TACoS = ad spend ÷ total sales.',f:function(b){
 var R=[['Ad spend',5000,200000,1000,40000,inr],['Sales from ads',10000,1000000,5000,160000,inr],['Total sales (ads + organic)',20000,2000000,5000,420000,inr],['Product margin before ads',10,60,1,30,function(v){return v+'%'}]],V=R.map(function(r){return r[4]});
 b.innerHTML='<div class="ctl" id="t7c"></div><div id="t7o"></div>';var c=$('#t7c',b),o=$('#t7o',b);
 function out(){var tot=Math.max(V[2],V[1]),ac=V[0]/V[1]*100,ro=V[1]/V[0],ta=V[0]/tot*100,ok=ac<V[3];
  o.innerHTML='<h3>Your numbers</h3><div class="kp"><div><span class="big2">'+ac.toFixed(1)+'%</span><small>ACoS</small></div><div><span class="big2">'+ro.toFixed(1)+'x</span><small>ROAS</small></div><div><span class="big2">'+ta.toFixed(1)+'%</span><small>TACoS</small></div></div><span class="badge '+(ok?'ok':'no')+'">'+(ok?'Ads pay for themselves: ACoS is below your margin':'Ads cost more than your margin on ad sales')+'</span><p class="extra">Break-even ACoS equals your margin ('+V[3]+'%). Launch campaigns often run above it on purpose; mature ones should not.</p>'}
 c.innerHTML=R.map(function(r,i){return '<div class="rg"><label for="t7'+i+'">'+r[0]+' <b>'+r[5](V[i])+'</b></label><input id="t7'+i+'" type="range" min="'+r[1]+'" max="'+r[2]+'" step="'+r[3]+'" value="'+V[i]+'"></div>'}).join('');
 $$('input',c).forEach(function(x,i){x.oninput=function(){V[i]=+x.value;x.previousElementSibling.lastChild.textContent=R[i][5](V[i]);out()}});out()}};
TOY['programmatic-advertising']={h:'Run a real-time auction.',l:'Every impression is auctioned while the page loads. Run one in slow motion.',n:'A simplified, slowed-down simulation. Real auctions complete in a fraction of a second.',f:function(b){
 var AU=['Mobile · Evening · Sports fan · Hyderabad','Smart TV · Night · Movie viewer · Mumbai','Desktop · Morning · Business reader · Delhi','Mobile · Afternoon · Shopper · Bengaluru'],busy=false;
 b.innerHTML='<div><div class="imp" id="t8i">An impression is about to load…</div><div id="t8b"></div><button class="btn btn-p" type="button" id="t8r" style="margin-top:18px">Run an auction</button></div><div><div class="tv" id="t8v"><b>Winning ad plays here</b></div></div>';
 var bd=$('#t8b',b),tv=$('#t8v',b),im=$('#t8i',b),n=0;
 $('#t8r',b).onclick=function(){if(busy)return;busy=true;tv.className='tv';tv.innerHTML='<b>Auction in progress…</b>';im.textContent='Impression: '+AU[n++%AU.length];
  var bids=[0,0,0,0].map(function(){return 18+Math.round(Math.random()*62)}),w=bids.indexOf(Math.max.apply(null,bids));
  bd.innerHTML=['Advertiser A','Advertiser B','Advertiser C','Advertiser D'].map(function(x,i){return '<div class="bd" id="bd'+i+'"><span>'+x+'</span><div><i></i></div><b>—</b></div>'}).join('');
  var d=reduce?0:700;setTimeout(function(){bids.forEach(function(v,i){var r=$('#bd'+i,bd);$('i',r).style.width=v+'%';$('b',r).textContent='₹'+v})},d/2);
  setTimeout(function(){$('#bd'+w,bd).classList.add('w');tv.className='tv win';tv.innerHTML='<b>Advertiser '+'ABCD'[w]+' wins<br><span style="color:var(--e1)">₹'+bids[w]+' per thousand</span></b>';busy=false},d*2.2)}}};
TOY['business-development-outsourcing']={h:'Define your ideal customer.',l:'Choose who you want to reach. We turn it into a research and outreach brief.',n:'A simplified version of our ideal customer profile (ICP) work.',f:function(b){
 var G=[['Industry',['Technology','Manufacturing','Healthcare','Retail','Education','Logistics']],['Company size',['Startup','SME','Enterprise']],['Who you want to reach',['Founder or MD','Head of Sales','Procurement','IT head']],['Where',['Local','India-wide','International']]],sel=[0,1,0,1];
 var ANG=['an ROI and growth angle','a pipeline and conversion angle','a cost, compliance and reliability angle','an integration and security angle'],CH=['calls and meetings alongside email','email, LinkedIn and calls','email and LinkedIn, within local outreach rules'];
 b.innerHTML='<div class="ctl" id="t9c"></div><div id="t9o"></div>';var c=$('#t9c',b),o=$('#t9o',b);
 function out(){var g=function(i){return G[i][1][sel[i]]},RG=['near you','across India','across international markets'];
  o.innerHTML='<h3>Your ideal customer profile</h3><p class="big2">'+g(1)+' '+g(0).toLowerCase()+' companies '+RG[sel[3]]+'.</p><p class="extra">We would research target accounts, then reach <strong>'+g(2)+'</strong> with '+ANG[sel[2]]+', using '+CH[sel[3]]+'.</p><div class="ob"><span>Target-account list</span><span>Decision-maker research</span><span>Outreach messaging</span><span>Meeting handover</span></div>'}
 G.forEach(function(gr,gi){var w=el('div','','<h3>'+gr[0]+'</h3><div class="chips"></div>');gr[1].forEach(function(n,ni){var x=el('button','chip',n);x.type='button';x.setAttribute('aria-pressed',sel[gi]===ni);x.onclick=function(){sel[gi]=ni;$$('button',w).forEach(function(y,k){y.setAttribute('aria-pressed',k===ni)});out()};$('.chips',w).appendChild(x)});c.appendChild(w)});out()}};
TOY['finance-tax-compliance']={h:'What compliance applies to your business?',l:'Switch on what is true for you. We list the obligations that typically follow.',n:'Indicative list. Actual obligations depend on structure, turnover and activity, and we confirm them for you.',f:function(b){
 var Q=[['I have employees',['Payroll processing','TDS on salary','PF and ESI','Professional tax']],['I sell goods or services (GST)',['GST returns','Input tax credit reconciliation','E-invoicing and e-way bills']],['I am a company or LLP',['ROC annual filing','Director KYC','Statutory records','Audit (where applicable)']],['I have foreign clients or investors',['FEMA reporting','Withholding tax','Transfer pricing review']],['I am raising funds',['Due diligence support','Valuation and modelling','Investor reporting']],['I received a notice',['Notice response','Assessment support','Appeals and representation']]],on={0:1,1:1};
 b.innerHTML='<div><h3>Tick what applies</h3><div class="chips" id="t10c"></div></div><div id="t10o"></div>';var c=$('#t10c',b),o=$('#t10o',b);
 function out(){var L=[];Q.forEach(function(q,i){if(on[i])q[1].forEach(function(x){if(L.indexOf(x)<0)L.push(x)})});o.innerHTML='<h3>Typical obligations</h3>'+(L.length?'<p class="big2">'+L.length+' areas, one team.</p><div class="ob">'+L.map(function(x,i){return '<span style="animation-delay:'+i*30+'ms">'+x+'</span>'}).join('')+'</div>':'<p class="extra">Switch something on to see what typically applies.</p>')}
 Q.forEach(function(q,i){var x=el('button','chip',q[0]);x.type='button';x.setAttribute('aria-pressed',!!on[i]);x.onclick=function(){on[i]=!on[i];x.setAttribute('aria-pressed',!!on[i]);out()};c.appendChild(x)});out()}};


  var host = $('[data-toy]');
  if (host && TOY[host.getAttribute('data-toy')]) {
    TOY[host.getAttribute('data-toy')].f(host);
    ['t1o','t2t','t3o','t5o','t6o','t7o','t8v','t9o','t10o'].forEach(function (id) {
      var n = host.querySelector('#' + id); if (n) { n.setAttribute('aria-live', 'polite'); }
    });
    host.classList.add('is-ready');
  }
})();
