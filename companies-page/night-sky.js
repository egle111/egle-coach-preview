(()=>{
 const canvas=document.querySelector('.hero__sky'),ctx=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.hero');
 const pointer={x:0,y:0,active:false};
 let w=0,h=0,stars=[],meteors=[],last=0,next=1,elapsed=0,frame;
 // Deterministic placement prevents the background jumping on resize.
 let seed=42;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);seed=42;stars=Array.from({length:Math.min(155,Math.max(45,Math.round(w*h/8500)))},()=>({x:random(),y:random(),r:.35+random()*.85,a:.12+random()*.45,p:random()*Math.PI*2,s:.45+random()*.7,twinkle:random()<.18}));draw(0)}
 function draw(dt){elapsed+=dt;ctx.clearRect(0,0,w,h);
 const heroBottom=Math.max(0,Math.min(h,hero.getBoundingClientRect().bottom));
 if(heroBottom>0){
  const points=stars.map(s=>({x:s.x*w+(motion.matches?0:Math.sin(elapsed*.14+s.p)*12),y:s.y*h+(motion.matches?0:Math.cos(elapsed*.12+s.p)*10)}));
  ctx.save();ctx.beginPath();ctx.rect(0,0,w,heroBottom);ctx.clip();
  const reach=Math.min(150,w*.18);
  for(let i=0;i<points.length;i++){let linked=0;for(let j=i+1;j<points.length;j++){
   const a=points[i],b=points[j],distance=Math.hypot(a.x-b.x,a.y-b.y);
   if(distance<reach&&linked<3){ctx.strokeStyle=`rgba(222,225,232,${(1-distance/reach)*.19})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();linked++;}
  }}
  if(pointer.active&&!motion.matches){
   for(const point of points){const distance=Math.hypot(point.x-pointer.x,point.y-pointer.y);if(distance<150){
    ctx.strokeStyle=`rgba(243,241,235,${(1-distance/150)*.5})`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(point.x,point.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();
   }}
  }
  for(const point of points){ctx.fillStyle='rgba(243,241,235,.45)';ctx.beginPath();ctx.arc(point.x,point.y,1,0,Math.PI*2);ctx.fill();}
  ctx.restore();
 }

 for(const s of stars){const a=s.a*(s.twinkle&&!motion.matches?.5+.5*Math.pow((Math.sin(elapsed*s.s+s.p)+1)/2,2):1);ctx.fillStyle=`rgba(220,228,240,${a})`;ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);ctx.fill();}
 if(!motion.matches){next-=dt;if(next<=0){meteors.push({x:w*(.18+Math.random()*.72),y:h*Math.random()*.35,age:0,life:1.25+Math.random()*.6});next=2.2+Math.random()*2.6}
 meteors=meteors.filter(m=>m.age<m.life);for(const m of meteors){m.age+=dt;const t=m.age/m.life,x=m.x-t*140,y=m.y+t*Math.min(h*.6,440),a=Math.sin(Math.PI*t)*.65;const length=75;const dx=-.32,dy=.95;const g=ctx.createLinearGradient(x-dx*length,y-dy*length,x,y);g.addColorStop(0,'rgba(210,225,250,0)');g.addColorStop(1,`rgba(230,239,255,${a})`);ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-dx*length,y-dy*length);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle=`rgba(246,249,255,${a})`;ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}}
 }
 function loop(t){draw(last?Math.min((t-last)/1000,.05):0);last=t;frame=requestAnimationFrame(loop)}
 function start(){cancelAnimationFrame(frame);last=0;if(!document.hidden&&!motion.matches)frame=requestAnimationFrame(loop);else draw(0)}
 hero.addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;pointer.active=event.pointerType!=='touch'});
 hero.addEventListener('pointerleave',()=>{pointer.active=false});
 addEventListener('scroll',()=>{pointer.active=false},{passive:true});
 addEventListener('resize',resize);addEventListener('scroll',()=>{if(motion.matches)draw(0)},{passive:true});document.addEventListener('visibilitychange',start);motion.addEventListener('change',()=>{meteors=[];start()});resize();start();
})();
