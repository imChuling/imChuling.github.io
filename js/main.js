/* respect the OS "reduce motion" setting — used to calm autoplay motion (rain, parallax)
   for visitors who asked for it. Has no effect on the default experience. */
const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ============ preloader : frosted glass melts clear ============ */
(function(){
  const loader=document.getElementById('loader'),num=loader.querySelector('.l-num'),bar=loader.querySelector('.l-bar');
  const glyphs=el=>{
    const wrap=document.createElement('span');wrap.className='glyphs';wrap.setAttribute('aria-hidden','true');
    [...el.dataset.text].forEach((ch,i)=>{
      const g=document.createElement('span');g.className='g';
      const s=document.createElement('span');s.textContent=ch===' '?' ':ch;s.style.setProperty('--i',i);
      g.appendChild(s);wrap.appendChild(g);
    });
    el.appendChild(wrap);
  };
  glyphs(loader.querySelector('.l-title'));glyphs(document.querySelector('.hero-name'));
  const glass=(blur,alpha)=>{
    const f='blur('+blur.toFixed(2)+'px) saturate('+(1+.05*Math.min(blur/30,1)).toFixed(3)+')';
    loader.style.webkitBackdropFilter=f;loader.style.backdropFilter=f;
    loader.style.background='rgba(238,239,238,'+alpha.toFixed(3)+')';
  };
  const D=REDUCE?500:1900;
  /* wait for the display face (or 1.2s), then run on a frame clock so a load stall can't skip the count */
  Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,1200))]).then(()=>{
    requestAnimationFrame(()=>requestAnimationFrame(start));
  });
  function start(){
    loader.classList.add('l-in');
    let t=0,last=performance.now();
    (function tick(now){
      t+=Math.min(now-last,50);last=now;
      const u=Math.min(t/D,1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
      num.textContent=String(Math.round(e*100)).padStart(3,'0');
      bar.style.transform='scaleX('+e+')';
      glass(30-25*e,.62-.44*e);                  /* the page develops behind the name as the count climbs */
      if(u<1){requestAnimationFrame(tick);return;}
      setTimeout(land,300);
    })(last);
  }
  function land(){
    loader.classList.add('l-out');loader.classList.add('done');glass(0,0);
    heroIn();   /* .hero-ready lifts the page name's glyphs as .l-out drops the poster's */
    setTimeout(()=>loader.remove(),1900);
  }
})();

/* ============ hero lines stagger in ============ */
function heroIn(){
  document.querySelector('.hero').classList.add('hero-ready');
  document.querySelectorAll('.h-line').forEach((l,i)=>{
    setTimeout(()=>l.classList.add('in'),i*160);
    setTimeout(()=>l.classList.add('free'),i*160+1250);  /* release the mask once the line has landed */
  });
}

/* ============ cursor ============ */
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function ringLoop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ringLoop);})();
document.querySelectorAll('[data-hover],a').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
});

/* ============ cursor tag : a pill that trails the pointer on separate elastic axes ============ */
(function(){
  const tag=document.querySelector('.cursor-tag');
  let tx=mx,ty=my,vx=0,vy=0;
  (function loop(){
    vx=(vx+(mx-tx)*.13)*.68;vy=(vy+(my-ty)*.10)*.72;
    tx+=vx;ty+=vy;
    tag.style.left=tx+'px';tag.style.top=ty+'px';
    requestAnimationFrame(loop);
  })();
  const show=el=>{
    tag.replaceChildren(el.dataset.tag,Object.assign(document.createElement('span'),{className:'cursor-tag-arrow',textContent:'↗'}));
    tag.classList.toggle('light',el.dataset.tagTheme==='light');
    tag.classList.remove('off');tag.classList.add('on');document.body.classList.add('tagging');
  };
  const hide=()=>{tag.classList.remove('on');tag.classList.add('off');document.body.classList.remove('tagging');};
  document.querySelectorAll('[data-tag]').forEach(el=>{
    el.addEventListener('mouseenter',()=>show(el));
    el.addEventListener('mouseleave',hide);
  });
})();
/* ============ hero strips : parallax INSIDE the pill (never escapes its frame) ============ */
addEventListener('scroll',()=>{
  if(REDUCE)return;
  const sy=Math.min(scrollY,600);
  document.querySelectorAll('.h-line .strip .ph').forEach((ph,i)=>{
    ph.style.transform=`scale(1.14) translateX(${(i%2?1:-1)*sy*.018}px)`;
  });
},{passive:true});

/* ============ story scrollytelling ============ */
(function(){
  const track=document.querySelector('.story-track');
  const steps=document.querySelectorAll('.story-step');
  const visuals=document.querySelectorAll('.story-visual .ph');
  function update(){
    const r=track.getBoundingClientRect();
    const total=r.height-innerHeight;
    const prog=Math.min(Math.max(-r.top/total,0),1);
    const idx=Math.min(Math.floor(prog*steps.length),steps.length-1);
    steps.forEach((s,i)=>s.classList.toggle('active',i===idx));
    visuals.forEach((v,i)=>v.classList.toggle('active',i===idx));
  }
  addEventListener('scroll',update,{passive:true});
  update();
})();

/* ============ reveal ============ */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ============ generative sound-visualization art (muted) ============ */
function genArt(canvas,seed){
  const dpr=Math.min(devicePixelRatio||1,2);
  const w=canvas.clientWidth||600,h=canvas.clientHeight||500;
  canvas.width=w*dpr;canvas.height=h*dpr;
  const x=canvas.getContext('2d');x.scale(dpr,dpr);
  let s=seed||7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
  /* paper base */
  const bg=x.createLinearGradient(0,0,w,h);
  bg.addColorStop(0,'#E9EAEC');bg.addColorStop(1,'#DFE3E6');
  x.fillStyle=bg;x.fillRect(0,0,w,h);
  /* layered waveform strands — a frozen piece of sound */
  const inks=['rgba(90,104,128,','rgba(124,125,130,','rgba(154,148,158,','rgba(38,39,44,'];
  const L=34;
  for(let i=0;i<L;i++){
    const yBase=h*.18+ (h*.64)*(i/L);
    const amp=(8+rnd()*30)*Math.sin(Math.PI*i/L);
    const freq=.004+rnd()*.012,ph=rnd()*6.28;
    x.beginPath();
    for(let px=0;px<=w;px+=3){
      const y=yBase+Math.sin(px*freq+ph)*amp+Math.sin(px*freq*2.7+ph*2)*amp*.3;
      px===0?x.moveTo(px,y):x.lineTo(px,y);
    }
    x.strokeStyle=inks[i%4]+(.10+rnd()*.25)+')';
    x.lineWidth=i%9===0?1.4:.7;
    x.stroke();
  }
  /* sparse vertical ticks — like a score */
  for(let i=0;i<14;i++){
    const tx=rnd()*w;
    x.fillStyle='rgba(38,39,44,'+(.06+rnd()*.12)+')';
    x.fillRect(tx,h*.5-(rnd()*h*.3),1,rnd()*h*.45);
  }
}
document.querySelectorAll('.gen-art').forEach((c,i)=>{
  requestAnimationFrame(()=>genArt(c,7+i*131));
});

/* ============ rain window : FROSTED GLASS + physical droplets ============
   雾层 = 底图的高斯模糊快照 + 白纱 → 真正的毛玻璃(擦开才见清晰图)
   水珠 = 凝结→积累→突滑→走停→吞并→变细消亡 的状态机                    */
const PH_GRADS={
  stage:['#DCD1D6','#E3DAD0'],gear:['#D2DBE1','#D3D5E0'],
  retro:['#DDD8CE','#C9C2B4'],abstract:['#D3D5E0','#D2DBE1']
};
function phSnapshot(ph,w,h){
  /* blurred frosted copy of whatever is behind the fog */
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const g=c.getContext('2d');
  const img=ph.querySelector('img');
  g.filter='blur(8px)';
  if(img&&img.complete){
    g.drawImage(img,-20,-20,w+40,h+40);
  }else{
    let type='abstract';for(const k in PH_GRADS)if(ph.classList.contains(k))type=k;
    const lg=g.createLinearGradient(0,0,w,h);
    lg.addColorStop(0,PH_GRADS[type][0]);lg.addColorStop(1,PH_GRADS[type][1]);
    g.fillStyle=lg;g.fillRect(-20,-20,w+40,h+40);
  }
  g.filter='none';
  g.fillStyle='rgba(244,246,248,.25)';g.fillRect(0,0,w,h);  /* frost veil */
  return c;
}
function rainify(container){
  const canvas=container.querySelector('.rain-fog');
  if(!canvas)return;
  let w,h;const x=canvas.getContext('2d');
  const snaps=new Map();
  function activePh(){return container.querySelector('.ph.active')||container.querySelector('.ph');}
  function snap(){
    const ph=activePh();
    if(!snaps.has(ph))snaps.set(ph,phSnapshot(ph,w,h));
    return snaps.get(ph);
  }
  function size(){
    w=container.clientWidth;h=container.clientHeight;
    canvas.width=w;canvas.height=h;
    snaps.clear();
    x.globalAlpha=1;x.drawImage(snap(),0,0);
  }
  size();addEventListener('resize',size);

  /* --- droplet state machines --- */
  /* dew = static residue droplets on the glass (also left behind by runs) */
  const beads=Array.from({length:60},()=>({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.6}));
  function addBead(nx,ny,nr){
    if(beads.length>120)beads.splice(Math.floor(Math.random()*30),1);
    beads.push({x:nx,y:ny,r:nr});
  }
  /* a raindrop's life : SPLAT (hits glass) → SIT (clings) → RUN (slides) */
  const sliders=[];
  function spawnSlider(){
    const d={x:Math.random()*w,y:Math.random()*h*.55,r:2.2+Math.random()*1.8,
             vy:0,state:'splat',sit:40+Math.random()*160,jog:0,lastRes:0};
    d.lastRes=d.y;
    sliders.push(d);
    /* impact splat : irregular burst + satellite micro-drops */
    x.globalCompositeOperation='destination-out';
    for(let k=0;k<5;k++){
      const a=Math.random()*6.28,dist=d.r*(0.4+Math.random()*1.4);
      x.beginPath();x.arc(d.x+Math.cos(a)*dist,d.y+Math.sin(a)*dist,d.r*(.5+Math.random()*.6),0,7);
      x.fillStyle='rgba(0,0,0,.5)';x.fill();
    }
    x.globalCompositeOperation='source-over';
    for(let k=0;k<3;k++){
      addBead((d.x+(Math.random()-.5)*d.r*7)/w,(d.y+(Math.random()-.5)*d.r*7)/h,.5+Math.random()*.9);
    }
  }
  let spawnTimer=0;

  /* pause the whole simulation when off-screen */
  let onScreen=false;
  new IntersectionObserver(es=>{onScreen=es[0].isIntersecting;},{threshold:.02}).observe(container);

  let wiping=false,lx=0,ly=0;
  container.addEventListener('mousemove',e=>{
    const r=container.getBoundingClientRect();
    const cx=e.clientX-r.left,cy=e.clientY-r.top;
    x.globalCompositeOperation='destination-out';
    const steps=wiping?Math.ceil(Math.hypot(cx-lx,cy-ly)/6)||1:1;
    for(let i=1;i<=steps;i++){
      const bx=lx+(cx-lx)*i/steps,by=ly+(cy-ly)*i/steps;
      const g=x.createRadialGradient(bx,by,0,bx,by,46);
      g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');
      x.fillStyle=g;x.beginPath();x.arc(bx,by,46,0,7);x.fill();
    }
    x.globalCompositeOperation='source-over';
    lx=cx;ly=cy;wiping=true;
    container.classList.add('rain-done');
  });
  container.addEventListener('mouseleave',()=>wiping=false);

  function step(){
    /* slow re-frosting with the blurred snapshot (not flat white) */
    x.globalCompositeOperation='source-over';
    x.globalAlpha=.012;x.drawImage(snap(),0,0);x.globalAlpha=1;

    /* static condensation beads (dew) */
    beads.forEach(b=>{
      const px=b.x*w,py=b.y*h;
      x.globalCompositeOperation='destination-out';
      x.beginPath();x.arc(px,py,b.r,0,7);x.fillStyle='rgba(0,0,0,.18)';x.fill();
      x.globalCompositeOperation='source-over';
      x.beginPath();x.arc(px-b.r*.3,py-b.r*.3,b.r*.4,0,7);x.fillStyle='rgba(255,255,255,.18)';x.fill();
    });

    /* raindrop life cycle */
    spawnTimer++;
    if(spawnTimer>26&&sliders.length<16){spawnTimer=0;spawnSlider();}
    for(let i=sliders.length-1;i>=0;i--){
      const d=sliders[i];

      if(d.state==='splat'){d.state='sit';}
      else if(d.state==='sit'){
        d.sit--;
        /* condensation feeds it while it clings */
        d.r+=.002;
        if(d.sit<=0||d.r>4.2)d.state='run';
      }
      else{ /* run : stick-slip, follows micro-imperfections */
        d.vy+=d.r*.0045;
        d.vy=Math.min(d.vy,2.0);
        if(Math.random()<.018&&d.vy<.5){d.state='sit';d.sit=20+Math.random()*60;d.vy=0;}
        /* occasional lateral jog, decays — not a sine sway */
        if(Math.random()<.05)d.jog=(Math.random()-.5)*1.6;
        d.jog*=.9;
        d.y+=d.vy;
        d.x+=d.jog;

        /* absorb dew on the path → grow */
        for(let bi=beads.length-1;bi>=0;bi--){
          const b=beads[bi];
          if(Math.abs(b.x*w-d.x)<d.r+3&&Math.abs(b.y*h-d.y)<d.r+3){
            d.r=Math.min(d.r+b.r*.18,4.8);
            beads.splice(bi,1);
          }
        }
        /* mass loss ∝ distance travelled → the further it runs, the thinner */
        d.r-=.0085*Math.max(d.vy,.3);
        /* leaves tiny residue droplets along the path, like a real run */
        if(d.y-d.lastRes>9){
          d.lastRes=d.y;
          if(Math.random()<.8)addBead(d.x/w+(Math.random()-.5)*.004,(d.y-d.r*2)/h,.4+Math.random()*.7);
        }
      }

      /* draw : head clears glass; wake is thin & tied to remaining mass */
      x.globalCompositeOperation='destination-out';
      if(d.state==='run'){
        x.beginPath();x.arc(d.x,d.y-d.r*1.1,d.r*.45,0,7);
        x.fillStyle='rgba(0,0,0,'+(.22*Math.min(d.r/3,1))+')';x.fill();
      }
      x.beginPath();x.arc(d.x,d.y,d.r,0,7);
      x.fillStyle='rgba(0,0,0,.65)';x.fill();
      x.globalCompositeOperation='source-over';
      x.beginPath();x.arc(d.x-d.r*.35,d.y-d.r*.35,d.r*.4,0,7);x.fillStyle='rgba(255,255,255,.35)';x.fill();
      x.beginPath();x.arc(d.x,d.y+d.r*.55,d.r*.48,0,7);x.fillStyle='rgba(90,104,128,.12)';x.fill();

      /* dies : whatever's left becomes one more dew bead */
      if(d.y>h+12){sliders.splice(i,1);}
      else if(d.r<1.05){addBead(d.x/w,d.y/h,.8);sliders.splice(i,1);}
    }
    /* condensation keeps the dew population alive */
    if(beads.length<55&&Math.random()<.1)addBead(Math.random(),Math.random(),.5+Math.random()*1.2);
  }
  /* 预下雨 : age the glass before anyone sees it — drops mid-run, trails half-faded */
  if(!REDUCE){
    for(let i=0;i<440;i++)step();
    (function loop(){
      requestAnimationFrame(loop);
      if(onScreen)step();
    })();
  }
  /* reduced-motion : the frosted snapshot from size() is already drawn, and the
     wipe handler stays live — so it's a calm static glass you can still clear. */
}
document.querySelectorAll('.rain').forEach(rainify);

/* ============ 3D tilt frames ============ */
document.querySelectorAll('.tilt').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const nx=((e.clientX-r.left)/r.width)*2-1;
    const ny=((e.clientY-r.top)/r.height)*2-1;
    el.style.transform=`perspective(1100px) rotateY(${nx*3.4}deg) rotateX(${-ny*3.4}deg)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='';});
});
