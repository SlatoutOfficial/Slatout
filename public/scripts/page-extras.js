(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var mount=document.querySelector('.service-page-shell')||document.body;
var cs=getComputedStyle(document.body),HI=(cs.getPropertyValue('--hi')||'#FF6A13').trim(),HM=(cs.getPropertyValue('--hm')||'#FF8A00').trim();
var CC=[HM,HI,'#FFC83D','#fff'];
function burst(x,y){if(reduce)return;for(var i=0;i<18;i++){var d=document.createElement('i');d.className='v4-p'+(i%3?'':' st');d.style.background=CC[i%4];mount.appendChild(d);var a=Math.random()*6.283,v=50+Math.random()*90;d.animate([{transform:'translate('+x+'px,'+y+'px)',opacity:1},{transform:'translate('+(x+Math.cos(a)*v)+'px,'+(y+Math.sin(a)*v+40)+'px) scale(.2)',opacity:0}],{duration:700+Math.random()*400,easing:'cubic-bezier(.15,.7,.3,1)'}).onfinish=(function(n){return function(){n.remove()}})(d)}}
/* ===== hero scene: one signature shape per room ===== */
var hero=$('.rx'),slug=location.pathname.split('/').filter(Boolean).pop();
var m=(document.title||'');var sg=(document.querySelector('link[rel=canonical]')||{}).href||'';sg=sg.split('/').filter(Boolean).pop()||'digital-marketing';
function hs(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
var F={
'digital-marketing':function(i,u,t){var y=-1+((u*3+t*.11)%1)*2,w=1-(y+1)/2*.9;return[(hs(i)-.5)*2*w,y*.95,0]},
'finance-tax-compliance':function(i,u,t){var b=i%7,h=.25+.65*(.5+.5*Math.sin(t*.7+b*.9));return[-.9+b*.3+(hs(i+9)-.5)*.1,.9-hs(i)*h*1.8,0]},
'technology-ai-solutions':function(i,u,t){var L=[-.8,-.27,.27,.8],a=i%4,n=3+a%2+1,k=(i>>2)%n,x=L[a],y=(k+.5)/n*1.6-.8;if(i%5==0&&a<3){var n2=3+(a+1)%2+1,k2=(i*7)%n2,f=(t*.35+hs(i))%1;return[x+(L[a+1]-x)*f,y+(((k2+.5)/n2*1.6-.8)-y)*f,1]}return[x+(hs(i)-.5)*.07,y+(hs(i+3)-.5)*.07,0]},
'branding-marketing':function(i,u,t){var a=u*6.283,r=(i%2?.55:.8)+.14*Math.sin(3*a+t*.8)+.06*Math.sin(5*a-t);return[Math.cos(a+t*.1)*r,Math.sin(a+t*.1)*r,0]},
'content-strategy':function(i,u,t){var r=i%9,len=.35+.6*hs(r+4),f=(t*.18+r*.11)%1,x=-.9+hs(i)*len*2;if(hs(i)>f*1.2+.1)x=-.9;return[x,-.85+r*.21+(hs(i+5)-.5)*.03,0]},
'programmatic-advertising':function(i,u,t){var k=i%4,r=((t*.22+k/4)%1),a=u*6.283*3+k;return[Math.cos(a)*r,Math.sin(a)*r*.85,0]},
'offline-business-launch':function(i,u,t){var n=Math.min(i,215),gx=n%18,gy=Math.floor(n/18),pin=(n*37%41==0);return[-.95+gx*.112,-.7+gy*.13-(pin?.22+.1*Math.sin(t*2+n):0)+Math.sin(t*.8+gx*.5+gy*.4)*.015,pin?1:0]},
'ecommerce-marketplace-growth':function(i,u,t){var c=i%6,r=Math.floor(i/6)%6,l=Math.floor(i/36)%4,h=2+Math.floor(1.99*(1+Math.sin(t*.5+c+r*1.7)));if(l>=h)return[(c-r)*.17,-3,0];return[(c-r)*.17+(hs(i)-.5)*.02,(c+r)*.085-.55-l*.17,0]},
'business-development-outsourcing':function(i,u,t){var H=[[-.7,-.3],[0,-.6],[.7,-.2],[-.3,.5],[.5,.55],[0,0]],a=i%6,b=(a+1+(i%3))%6;if(i%4==0){var f=(t*.3+hs(i))%1;return[H[a][0]+(H[b][0]-H[a][0])*f,H[a][1]+(H[b][1]-H[a][1])*f,1]}var an=t*.6+i;return[H[a][0]+Math.cos(an)*.09,H[a][1]+Math.sin(an)*.09,0]},
'business-setup-registration':function(i,u,t){var s=u*5,k=Math.floor(s),f=s-k,X=[[-.7,.7],[.7,.7],[.7,-.1],[0,-.8],[-.7,-.1],[-.7,.7]],a=X[Math.min(k,4)],b=X[Math.min(k+1,5)],pu=.02*Math.sin(t*2+i);return[a[0]+(b[0]-a[0])*f+pu,a[1]+(b[1]-a[1])*f+pu,0]}
};
if(hero){
 var cv=document.createElement('canvas');cv.className='v4-scene';cv.setAttribute('aria-hidden','true');hero.prepend(cv);
 var ctx=cv.getContext('2d'),form=F[sg]||F['digital-marketing'],lines=/technology|business-dev|branding/.test(sg);
 var DPR=Math.min(2,devicePixelRatio||1),W,H,mob=innerWidth<820,N=mob?150:360,P=[],px=-9999,py=-9999,on=true,T0=performance.now();
 function size(){var b=hero.getBoundingClientRect();W=cv.width=b.width*DPR;H=cv.height=b.height*DPR;mob=innerWidth<820}
 size();addEventListener('resize',size);
 for(var i=0;i<N;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,r:1.3+hs(i)*2.4,c:i%3});
 hero.addEventListener('pointermove',function(e){var b=hero.getBoundingClientRect();px=(e.clientX-b.left)*DPR;py=(e.clientY-b.top)*DPR});
 hero.addEventListener('pointerleave',function(){px=py=-9999});
 new IntersectionObserver(function(e){on=e[0].isIntersecting}).observe(hero);
 (function f(now){if(on){var t=(now-T0)/1000;ctx.clearRect(0,0,W,H);
   var cx=W*(mob?.5:.74),cy=H*(mob?.86:.5),sc=Math.min(W*(mob?.36:.26),H*.34);
   for(var i=0;i<N;i++){var p=P[i],q=form(i,i/N,t),tx=cx+q[0]*sc,ty=cy+q[1]*sc;
    p.vx+=(tx-p.x)*.02;p.vy+=(ty-p.y)*.02;
    var dx=p.x-px,dy=p.y-py,d2=dx*dx+dy*dy,R=150*DPR;if(d2<R*R&&d2>1){var d=Math.sqrt(d2),fr=(1-d/R)*7*DPR;p.vx+=dx/d*fr;p.vy+=dy/d*fr}
    p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;if(q[1]<-2.5)continue;
    var r=(p.r+(q[2]?1.5:0))*DPR*(1+.22*Math.sin(t*2+i));
    ctx.globalAlpha=(mob?.35:.5)*(p.c===2?.6:1);ctx.fillStyle=p.c===1?HM:HI;ctx.beginPath();ctx.arc(p.x,p.y,r,0,6.283);ctx.fill();
    if(lines&&i>0){var o=P[i-1],ld=(p.x-o.x)*(p.x-o.x)+(p.y-o.y)*(p.y-o.y);if(ld<(sc*.16)*(sc*.16)){ctx.globalAlpha=.12;ctx.strokeStyle=HI;ctx.lineWidth=DPR;ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(p.x,p.y);ctx.stroke()}}}}
  if(!reduce)requestAnimationFrame(f)})(performance.now());
}
/* ===== plain-English terms ===== */
$$('.v4-t').forEach(function(c){var b=$('.v4-tb',c);b.addEventListener('click',function(){var o=c.classList.toggle('open');b.setAttribute('aria-expanded',o);mark('learn')});c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--sx',(e.clientX-r.left)+'px');c.style.setProperty('--sy',(e.clientY-r.top)+'px')})});
/* ===== explorer's compass ===== */
var steps=[['read','Read the room','Reach "What is included"','#included'],['observe','Observe yourself','Tick what sounds like your business','#observe'],['try','Try it','Move a slider or switch in the lab','#try'],['inside','Look inside','Open a part or tick a deliverable','#included'],['learn','Learn the words','Open a key term','#glossary'],['ask','Ask a question','Open any FAQ','#faq']].filter(function(s){return $(s[3])});
var done={};try{done=JSON.parse(sessionStorage.getItem('v4.'+sg)||'{}')}catch(e){}
var cp=document.createElement('div');cp.className='v4-cp';
cp.innerHTML='<div class="v4-panel" id="v4-pn" role="region" aria-label="Your exploration of this room"><h2>Explore this room</h2><p>Small steps, real answers. Nothing is sent until you choose to.</p><ul>'+steps.map(function(s){return '<li data-k="'+s[0]+'"><a href="'+s[3]+'"><i></i><span><b>'+s[1]+'</b><br><small>'+s[2]+'</small></span></a></li>'}).join('')+'</ul><a class="btn btn-p go" href="#enquire"><span>Share what I explored</span></a></div>'+
'<button class="v4-cb" type="button" aria-expanded="false" aria-controls="v4-pn"><span class="v4-ring"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="bg" cx="18" cy="18" r="16"/><circle class="fg" cx="18" cy="18" r="16"/></svg><b>0/'+steps.length+'</b></span><span class="v4-hint"><small>Explore this room</small><span class="v4-nx">Start anywhere</span></span></button>';
mount.appendChild(cp);
var btn=$('.v4-cb',cp);btn.addEventListener('click',function(){var o=cp.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&cp.classList.contains('open')){cp.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus()}});
function render(){var n=0,nx=null;steps.forEach(function(s){var d=!!done[s[0]];if(d)n++;else if(!nx)nx=s;$('li[data-k='+s[0]+']',cp).classList.toggle('done',d)});
 cp.style.setProperty('--p',(n/steps.length).toFixed(3));$('.v4-ring b',cp).textContent=n+'/'+steps.length;
 $('.v4-nx',cp).textContent=n===steps.length?'Room explored. Well done!':'Next: '+nx[1];cp.classList.toggle('full',n===steps.length);$('.v4-panel h2',cp).textContent=n===steps.length?'You explored this room':'Explore this room'}
var celebrated=false;
function mark(k){if(done[k]||!steps.some(function(s){return s[0]===k}))return;done[k]=1;try{sessionStorage.setItem('v4.'+sg,JSON.stringify(done))}catch(e){}
 render();var r=btn.getBoundingClientRect();burst(r.left+30,r.top+20);
 if(Object.keys(done).length===steps.length&&!celebrated){celebrated=true;setTimeout(function(){cp.classList.add('open');btn.setAttribute('aria-expanded','true');burst(r.left+60,r.top-30)},500)}}
render();(function s(){cp.classList.toggle('seen',scrollY>innerHeight*.45)})();addEventListener('scroll',function(){cp.classList.toggle('seen',scrollY>innerHeight*.45)},{passive:true});
var inc=$('#included');if(inc)new IntersectionObserver(function(e,o){if(e[0].isIntersecting){mark('read');o.disconnect()}},{threshold:.2}).observe(inc);
document.addEventListener('change',function(e){var t=e.target;if(t.closest&&t.closest('#observe'))mark('observe');if(t.closest&&t.closest('.xp'))mark('inside')},true);
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;if(t.closest('.xp-t button,.xp input,.xp label'))mark('inside');if(t.closest('.lab'))mark('try');if(t.closest('.faq-list summary,.fq summary'))mark('ask')},true);
document.addEventListener('input',function(e){if(e.target.closest&&e.target.closest('.lab'))mark('try')},true);
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.btn-p,[data-stack-toggle]');if(t&&!t.closest('.v4-cp'))burst(e.clientX,e.clientY)},true);
})();
