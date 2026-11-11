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
    scrollTo(0,0);
    loader.classList.add('l-in');
    let t=0,last=performance.now();
    (function tick(now){
      t+=Math.min(now-last,50);last=now;
      const u=Math.min(t/D,1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
      num.textContent=String(Math.round(e*100)).padStart(3,'0');
      bar.style.transform='scaleX('+e+')';
      glass(30-25*e,1-.82*e);                     /* starts opaque, melts to .18 as counter climbs */
      if(u<1){requestAnimationFrame(tick);return;}
      setTimeout(gate,250);
    })(last);
  }
  function gate(){
    loader.classList.add('l-gate');
    loader.querySelectorAll('.l-enter button').forEach(b=>b.addEventListener('click',()=>{
      const wantSound=b.dataset.sound==='1';
      let audioCtx=null;
      if(wantSound){const C=window.AudioContext||window.webkitAudioContext;audioCtx=new C({latencyHint:'playback'});audioCtx.resume();}
      document.dispatchEvent(new CustomEvent('score:enter',{detail:{sound:wantSound,audioCtx}}));
      if(wantSound&&audioCtx)window.__scoreCtx=audioCtx;
      land();
    },{once:true}));
  }
  function land(){
    loader.classList.add('l-out');loader.classList.add('done');glass(0,0);
    const nav=document.querySelector('nav');if(nav)nav.classList.add('nav-visible');
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
/* positions go through `translate` (compositor-only) rather than left/top, which relaid and repainted every frame;
   a follower that has caught up writes nothing */
const place=(el,x,y)=>{el.style.translate=x.toFixed(1)+'px '+y.toFixed(1)+'px';};
place(dot,mx,my);place(ring,rx,ry);
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;place(dot,mx,my);});
(function ringLoop(){const dx=mx-rx,dy=my-ry;if(Math.abs(dx)>.05||Math.abs(dy)>.05){rx+=dx*.15;ry+=dy*.15;place(ring,rx,ry);}requestAnimationFrame(ringLoop);})();
document.querySelectorAll('[data-hover],a').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
});

/* ============ cursor tag : a pill that trails the pointer on separate elastic axes ============ */
(function(){
  const tag=document.querySelector('.cursor-tag');
  let tx=mx,ty=my,vx=0,vy=0;place(tag,tx,ty);
  (function loop(){
    vx=(vx+(mx-tx)*.13)*.68;vy=(vy+(my-ty)*.10)*.72;
    if(Math.abs(vx)>.02||Math.abs(vy)>.02||Math.abs(mx-tx)>.05||Math.abs(my-ty)>.05){tx+=vx;ty+=vy;place(tag,tx,ty);}
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
  const last=steps.length-1;
  /* chapter k owns the third of the track around k/last, so the settle points sit mid-range */
  function range(){const r=track.getBoundingClientRect();return {top:r.top+scrollY,total:r.height-innerHeight};}
  function progress(){const {top,total}=range();return Math.min(Math.max((scrollY-top)/total,0),1);}
  const stepsBox=document.querySelector('.story-steps');
  const pinned=document.querySelector('.story .sticky');
  /* chapter rail : one tick per chapter and a marker that leans with the hand before the page turns */
  const rail=document.createElement('div');rail.className='story-rail';rail.setAttribute('aria-hidden','true');
  rail.innerHTML='<i></i>'.repeat(steps.length)+'<b></b>';pinned.appendChild(rail);
  const marker=rail.lastChild;
  let shown=0,pull=0,relaxT=0;
  const PULL=90;   /* wheel distance that turns a chapter */
  function lean(v){
    pull=v;const f=Math.max(-1,Math.min(1,v/PULL));
    pinned.classList.toggle('leaning',f!==0);
    pinned.style.setProperty('--lean',f.toFixed(3));pinned.style.setProperty('--lean-a',Math.abs(f).toFixed(3));
    marker.style.translate='0 '+((shown+f*.6)*16).toFixed(1)+'px';
  }
  function update(){
    const idx=Math.round(progress()*last);
    if(idx!==shown){shown=idx;marker.style.translate='0 '+((shown+Math.max(-1,Math.min(1,pull/PULL))*.6)*16).toFixed(1)+'px';}
    steps.forEach((s,i)=>s.classList.toggle('active',i===idx));
    visuals.forEach((v,i)=>v.classList.toggle('active',i===idx));
    if(stepsBox){const a=steps[idx];stepsBox.style.overflowY=a&&a.scrollHeight>stepsBox.clientHeight?'auto':'hidden';}
  }
  /* two consecutive same-direction scrolls advance to the next/prev chapter */
  let settle,prevIdx=null,flicks=0,flickDir=0,flickTime=0;
  function snap(){
    if(innerWidth<=880)return;
    const {top,total}=range();
    if(scrollY<top||scrollY>top+total)return;
    const p=progress(),raw=p*last,nearest=Math.round(raw);
    const frac=raw-nearest,dir=frac>0?1:frac<0?-1:0,now=Date.now();
    if(dir!==0&&prevIdx===nearest&&now-flickTime<800){
      if(dir===flickDir){flicks++;} else {flicks=1;flickDir=dir;}
      if(flicks>=2){
        const next=Math.max(0,Math.min(last,nearest+dir));
        flicks=0;flickTime=now;prevIdx=next;
        scrollTo({top:top+next/last*total,behavior:REDUCE?'auto':'smooth'});
        return;
      }
    }else{flicks=dir!==0?1:0;flickDir=dir;}
    flickTime=now;prevIdx=nearest;
    const target=top+nearest/last*total;
    if(Math.abs(target-scrollY)>2)scrollTo({top:target,behavior:REDUCE?'auto':'smooth'});
  }
  addEventListener('scroll',()=>{update();clearTimeout(settle);settle=setTimeout(snap,140);},{passive:true});
  /* wheel / trackpad : the page doesn't scroll between chapters, the hand pulls on it. Every bit of
     wheel travel leans the chapter and moves the rail marker, so even a tiny nudge is answered; the
     nudges add up, and once they reach PULL the chapter turns. Left alone, a lean eases back.
     One gesture turns exactly one chapter, however far it travels. The gesture is
     held while its inertia runs out, so the momentum can't carry into a second chapter. Inertia only
     ever decays, so once the turn has played, anything that isn't decay is the hand again : the
     speed picking back up, a reversal, or a separate wheel notch. That keeps slow, small, continuous
     scrolling turning pages too. Past the first or last chapter the page scrolls normally again.
     Keyboard, scrollbar and touch still use snap() above. */
  let held=false,heldAt=0,heldDir=0,idleT=0,low=Infinity,lastAt=0;
  const release=()=>{held=false;low=Infinity;};
  function turn(idx,top,total,dir){
    held=true;heldAt=Date.now();heldDir=dir;low=Infinity;
    clearTimeout(relaxT);lean(0);
    scrollTo({top:top+idx/last*total,behavior:REDUCE?'auto':'smooth'});
  }
  /* listened for on the story only, so wheel scrolling everywhere else stays on the compositor */
  document.querySelector('.story').addEventListener('wheel',e=>{
    if(innerWidth<=880||e.ctrlKey||!e.deltaY||document.documentElement.classList.contains('sheet-open'))return;
    const {top,total}=range(),end=top+total,y=scrollY;
    const dy=e.deltaY*(e.deltaMode===1?40:e.deltaMode===2?innerHeight:1),dir=dy>0?1:-1,mag=Math.abs(dy);
    const now=Date.now(),gap=now-lastAt;lastAt=now;
    if(held){
      e.preventDefault();
      clearTimeout(idleT);idleT=setTimeout(release,160);
      const since=now-heldAt;
      const fresh=since>500&&(dir!==heldDir||(mag>=low+3&&mag>=low*1.5)||(gap>45&&mag>=3))||since>250&&dir!==heldDir&&mag>=3;
      if(since>300)low=Math.min(low,mag);   /* the push itself is still rising before that */
      if(!fresh)return;
      held=false;
    }
    const inside=y>=top-1&&y<=end+1;
    if(!inside){
      /* arriving : stop on the first (or, coming back up, the last) chapter instead of flying through */
      if(y<top&&y+dy>=top){e.preventDefault();turn(0,top,total,dir);idleT=setTimeout(release,160);}
      else if(y>end&&y+dy<=end){e.preventDefault();turn(last,top,total,dir);idleT=setTimeout(release,160);}
      return;
    }
    /* a chapter taller than its box scrolls inside itself first */
    if(stepsBox&&stepsBox.contains(e.target)&&stepsBox.scrollHeight>stepsBox.clientHeight+1){
      const room=dir>0?stepsBox.scrollHeight-stepsBox.clientHeight-stepsBox.scrollTop:stepsBox.scrollTop;
      if(room>1)return;
    }
    const idx=Math.round(progress()*last),to=pull+dy,next=idx+(to>0?1:-1);
    clearTimeout(relaxT);
    if(next<0||next>last){lean(0);return;}   /* off either end : the page scrolls on */
    e.preventDefault();
    if(Math.abs(to)<PULL){lean(to);relaxT=setTimeout(()=>lean(0),1100);return;}
    turn(next,top,total,to>0?1:-1);
    clearTimeout(idleT);idleT=setTimeout(release,160);
  },{passive:false});
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
  if(img&&img.complete&&img.naturalWidth){
    /* cover, centred — match object-fit:cover exactly so fog aligns with the image beneath */
    const imgR=img.naturalWidth/img.naturalHeight,boxR=w/h;
    let sw,sh;
    if(imgR>boxR){sh=img.naturalHeight;sw=sh*boxR;}
    else{sw=img.naturalWidth;sh=sw/boxR;}
    const sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;
    g.drawImage(img,sx,sy,sw,sh,0,0,w,h);
  }else{
    let type='abstract';for(const k in PH_GRADS)if(ph.classList.contains(k))type=k;
    const lg=g.createLinearGradient(0,0,w,h);
    lg.addColorStop(0,PH_GRADS[type][0]);lg.addColorStop(1,PH_GRADS[type][1]);
    g.fillStyle=lg;g.fillRect(0,0,w,h);
  }
  g.filter='none';
  g.fillStyle='rgba(170,176,186,.55)';g.fillRect(0,0,w,h);  /* frost veil */
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
    if(!w||!h)return;                    /* hidden (narrow layouts): a 0-size canvas can't be drawn */
    x.globalAlpha=1;x.drawImage(snap(),0,0);
  }
  size();addEventListener('resize',size);
  const repaint=()=>{x.globalAlpha=1;x.drawImage(snap(),0,0);};
  /* a photo that finishes loading after the first snapshot recolours the existing fog in place (source-atop
     keeps the wiped holes and drop trails). The slow re-frost can't do this: at alpha .006 an 8-bit canvas
     rounds any colour difference under ~83 levels to zero, so the gradient frost would never turn into the photo */
  const retint=()=>{
    snaps.clear();if(!w||!h)return;
    x.globalAlpha=1;x.globalCompositeOperation='source-atop';
    x.drawImage(snap(),0,0);
    x.globalCompositeOperation='source-over';
  };
  container.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',retint,{once:true});});
  /* a chapter change re-frosts the glass from the new photo over ~half a second — quick enough that the
     old photo's haze doesn't linger, slow enough to read as a transition. Only a real change counts:
     class writes that leave the active pane alone (the wipe hint, for one) must not touch the glass */
  let fade=0,current=activePh();
  new MutationObserver(()=>{
    const ph=activePh();if(ph===current)return;
    current=ph;if(REDUCE)repaint();else fade=30;
  }).observe(container,{subtree:true,attributes:true,attributeFilter:['class']});

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
  let wasWiping=false;
  container.addEventListener('mouseleave',()=>wiping=false);
  let wipeLast=0,refrostDelay=180;

  function step(){
    if(!w||!h)return;
    if(wiping){wasWiping=true;}else{if(wasWiping){wipeLast=0;wasWiping=false;}wipeLast++;}
    /* slow re-frosting with the blurred snapshot (not flat white) */
    x.globalCompositeOperation='source-over';
    const doRefrost=warmup||wipeLast>refrostDelay;
    x.globalAlpha=fade>0?(fade--,.1):doRefrost?(warmup?.004:.006):0;
    if(x.globalAlpha>0)x.drawImage(snap(),0,0);
    x.globalAlpha=1;

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
  let warmup=true;
  if(!REDUCE){
    for(let i=0;i<440;i++)step();
    warmup=false;
    (function loop(){
      requestAnimationFrame(loop);
      if(onScreen)step();
    })();
  }
  /* reduced-motion : the frosted snapshot from size() is already drawn, and the
     wipe handler stays live — so it's a calm static glass you can still clear. */
}
document.querySelectorAll('.rain').forEach(rainify);

/* ============ music card : always fits the window ============ */
/* The card is as tall as the window allows, but what's inside is sized by width, so on a short, wide
   window (small laptop, zoomed browser) it used to spill out and get cut off top and bottom. Scale the
   contents down until they fit; below 70% they'd be too small to read, so let the card flow instead.
   Done with a transform and explicit pixel sizes rather than `zoom`, which browsers measure differently. */
(function(){
  const box=document.querySelector('.music-scroll'),card=document.querySelector('.music'),shell=card&&card.querySelector('.shell');
  if(!box||!shell)return;
  const S=shell.style;
  function set(z,inner){
    if(z>=1){S.transform=S.transformOrigin=S.width=S.maxWidth=S.marginLeft=S.marginRight=S.flex='';return;}
    const vis=Math.min(inner,1200);   /* the width it should appear to have */
    S.flex='none';S.maxWidth='none';S.width=(vis/z).toFixed(1)+'px';
    S.marginLeft=((inner-vis)/2).toFixed(1)+'px';S.marginRight='0';
    S.transformOrigin='0 50%';S.transform='scale('+z.toFixed(4)+')';
  }
  function fit(){
    box.classList.remove('flow');set(1);
    const cs=getComputedStyle(card),inner=card.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
    const room=card.clientHeight-72;   /* at least 36px of air above and below */
    let h=shell.offsetHeight;
    if(h<=room)return;
    if(innerWidth>680){
      let z=1;
      for(let i=0;i<6&&h*z>room;i++){z=Math.min(z,room/h)*.997;if(z<.7)break;set(z,inner);h=shell.offsetHeight;}
      if(z>=.7&&h*z<=room+1)return;
    }
    set(1);box.classList.add('flow');
  }
  let t=0;
  addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(fit,120);});
  addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  fit();
})();

/* ============ pinned sections : never quite still ============ */
/* Music and About hold in place while the page scrolls past. So that small scrolls still get an answer
   there, the two halves drift a little with the scroll, the picture more than the words. */
(function(){
  if(REDUCE)return;
  /* the music card is a closed frame with little air to spare, so its drift is kept small */
  const pins=[['.music-scroll','.music-stack','.music-copy',20],['.me-scroll','.me-photo','.me-copy',56]]
    .map(([x,y,z,amt])=>({box:document.querySelector(x),a:document.querySelector(y),b:document.querySelector(z),amt,was:-1})).filter(p=>p.box&&p.a&&p.b);
  let ticking=false;
  function update(){
    ticking=false;
    const wide=innerWidth>880;
    for(const p of pins){
      const r=p.box.getBoundingClientRect();
      if(r.bottom<-200||r.top>innerHeight+200)continue;
      const t=wide?Math.max(0,Math.min(1,(innerHeight-r.top)/(r.height+innerHeight))):.5;
      if(Math.abs(t-p.was)<.002)continue;
      p.was=t;
      p.a.style.translate='0 '+((.5-t)*p.amt).toFixed(1)+'px';
      p.b.style.translate='0 '+((.5-t)*p.amt*.4).toFixed(1)+'px';
    }
  }
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update);
  update();
})();

/* ============ nav : frosted glass on scroll, progress bar ============ */
(function(){
  const nav=document.querySelector('nav');
  addEventListener('scroll',()=>{
    const y=scrollY;
    nav.classList.toggle('scrolled',y>40);
    nav.style.setProperty('--sp',y/(document.documentElement.scrollHeight-innerHeight));
  },{passive:true});
})();

/* ============ active nav section ============ */
(function(){
  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections=links.map(l=>({link:l,el:document.querySelector(l.getAttribute('href'))})).filter(s=>s.el);
  let ticking=false;
  function update(){
    let active=null;
    for(const s of sections){
      if(s.el.getBoundingClientRect().top<=innerHeight*.35)active=s;
    }
    links.forEach(l=>l.classList.remove('active'));
    if(active)active.link.classList.add('active');
    ticking=false;
  }
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  update();
})();

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
