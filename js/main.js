/* respect the OS "reduce motion" setting, used to calm autoplay motion (rain, parallax)
   for visitors who asked for it. Has no effect on the default experience. */
const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* ============ story timeline : quiet, interruptible transitions ============ */
(function(){
  const story=document.querySelector('#story');
  if(!story)return;
  const tabs=[...story.querySelectorAll('.story-node')];
  const panels=[...story.querySelectorAll('.story-step')];
  const visuals=[...story.querySelectorAll('.story-visual .ph')];
  const stage=story.querySelector('.story-steps');
  const tablist=story.querySelector('[role="tablist"]');
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const narrow=matchMedia('(max-width:880px)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const marker=document.createElement('span');
  marker.className='story-marker';marker.setAttribute('aria-hidden','true');tablist.appendChild(marker);
  let active=0,pending,animations=[],revision=0;
  /* the other chapters' photographs are fetched and decoded as the section comes near, so a chapter
     never opens on an empty frame that fills in a moment later */
  new IntersectionObserver((entries,io)=>{
    if(!entries.some(e=>e.isIntersecting))return;
    io.disconnect();
    visuals.forEach(v=>{const img=v.querySelector('img');if(!img)return;img.loading='eager';if(img.decode)img.decode().catch(()=>{});});
  },{rootMargin:'900px 0px'}).observe(story);
  /* a chapter longer than the room it has scrolls inside it; its last lines fade while more is below */
  const more=()=>stage.classList.toggle('more',stage.scrollHeight-stage.scrollTop-stage.clientHeight>6);
  stage.addEventListener('scroll',more,{passive:true});
  /* one curve for anything that moves, one for plain fades */
  const MOVE='cubic-bezier(.22,1,.36,1)',FADE='cubic-bezier(.4,0,.2,1)';
  const shown=el=>el.hidden?0:parseFloat(getComputedStyle(el).opacity)||0;
  function positionMarker(){
    const root=tablist.getBoundingClientRect();
    const dot=tabs[active].querySelector('.story-node-dot').getBoundingClientRect();
    marker.style.transform=`translate(${dot.left-root.left}px,${dot.top-root.top}px)`;
  }
  function settle(){
    revision++;
    animations.forEach(animation=>animation.cancel());animations=[];
    stage.style.height='';stage.style.overflow='';
    panels.forEach((panel,i)=>{panel.hidden=i!==active;});
    visuals.forEach((visual,i)=>{visual.hidden=i!==active;visual.style.zIndex='';visual.style.opacity='';});
    more();
  }
  /* photographs that are still on the glass, bottom to top */
  let layers=[0];
  function select(index){
    if(index===active)return;
    const previous=active,dir=index>previous?1:-1;
    /* where everything is right now, so a change made mid-transition carries on from there */
    const startHeight=stage.getBoundingClientRect().height;
    const textNow=panels.map(shown),photoNow=visuals.map(shown);
    revision++;
    animations.forEach(animation=>animation.cancel());animations=[];
    stage.style.height='';stage.style.overflow='';
    stage.scrollTop=0;stage.classList.remove('more');
    active=index;page();
    const turn=revision;
    tabs.forEach((tab,i)=>{
      const selected=i===index;
      tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
      panels[i].hidden=!selected;
      panels[i].inert=!selected;
      panels[i].setAttribute('aria-hidden',String(!selected));
      panels[i].classList.toggle('active',selected);
      visuals[i].hidden=!selected;
      visuals[i].setAttribute('aria-hidden',String(!selected));
      visuals[i].classList.toggle('active',selected);
    });
    positionMarker();
    if(reduced.matches||!panels[index].animate){layers=[index];visuals.forEach(v=>{v.style.zIndex='';v.style.opacity='';});return;}
    const endHeight=stage.getBoundingClientRect().height;
    const animate=(el,frames,options)=>{
      const animation=el.animate(frames,{fill:'both',...options});animations.push(animation);return animation;
    };
    /* the chapter leaves towards where it came from, the next one arrives from the other side;
       along the timeline's own axis, so the text moves the way the marker does */
    const shift=d=>narrow.matches?`translateX(${d}px)`:`translateY(${d}px)`;
    let leaving=false;
    panels.forEach((panel,i)=>{
      if(i===index||textNow[i]<.02)return;
      leaving=true;panel.hidden=false;
      animate(panel,[{opacity:textNow[i]},{opacity:0}],{duration:240,easing:FADE});
      animate(panel,[{transform:shift(0)},{transform:shift(-dir*6)}],{duration:240,easing:FADE});
    });
    /* the new chapter starts while the old one is still going, so the column is never blank;
       it fades on the fade curve and travels on the movement curve, which is what stops it popping */
    const from=textNow[index],wait=leaving?60:0;
    animate(panels[index],[{opacity:from},{opacity:1}],{duration:380,delay:wait,easing:FADE});
    animate(panels[index],[{transform:shift(dir*12*(1-from))},{transform:shift(0)}],{duration:520,delay:wait,easing:MOVE});
    /* the new photograph fades in over the ones already there, which stay solid underneath :
       the glass never goes half empty in the middle of a change */
    layers=layers.filter(i=>i!==index&&photoNow[i]>.02).slice(-2);
    layers.forEach((i,z)=>{visuals[i].hidden=false;visuals[i].style.zIndex=z;visuals[i].style.opacity=photoNow[i];});
    layers.push(index);
    visuals[index].style.zIndex=2;visuals[index].style.opacity='';
    animate(visuals[index],[{opacity:photoNow[index]},{opacity:1}],{duration:560,easing:FADE});
    if(Math.abs(endHeight-startHeight)>1){
      stage.style.height=startHeight+'px';stage.style.overflow='clip';
      animate(stage,[{height:startHeight+'px'},{height:endHeight+'px'}],{duration:420,easing:MOVE});
    }
    Promise.all(animations.map(animation=>animation.finished)).then(()=>{
      if(turn===revision){layers=[active];settle();}
    }).catch(()=>{}); // A newer choice cancels this transition and owns cleanup.
  }
  /* the notes under a chapter open and close instead of snapping */
  story.querySelectorAll('.story-details').forEach(details=>{
    const summary=details.querySelector('summary'),notes=details.querySelector('.s-notes');
    if(!summary||!notes)return;
    let run=null;
    summary.addEventListener('click',e=>{
      if(reduced.matches||!notes.animate)return;
      e.preventDefault();
      const closing=details.classList.contains('is-closing'),opening=!details.open||closing;
      const now=details.open?notes.getBoundingClientRect().height:0,seen=details.open?parseFloat(getComputedStyle(notes).opacity):0;
      if(run){run.cancel();run=null;}
      details.classList.toggle('is-closing',!opening);
      if(opening)details.open=true;
      const gap=getComputedStyle(notes).marginTop,full=notes.getBoundingClientRect().height;
      const shut={height:'0px',marginTop:'0px',opacity:0},wide={height:full+'px',marginTop:gap,opacity:1};
      const here={height:now+'px',marginTop:now?gap:'0px',opacity:seen};
      notes.style.overflow='clip';
      run=notes.animate([here,opening?wide:shut],{duration:300,easing:MOVE});
      const mine=run;
      mine.finished.then(()=>{
        if(run!==mine)return;
        run=null;notes.style.overflow='';
        if(!opening){details.open=false;details.classList.remove('is-closing');}
      }).catch(()=>{});
    });
  });
  tabs.forEach((tab,index)=>{
    /* hovering a chapter opens it; the short wait only filters a pointer sweeping straight across */
    tab.addEventListener('pointerenter',e=>{
      if(!fine.matches||e.pointerType==='touch'||panels[active].contains(document.activeElement))return;
      clearTimeout(pending);pending=setTimeout(()=>select(index),70);
    });
    tab.addEventListener('pointerleave',()=>clearTimeout(pending));
    tab.addEventListener('click',()=>{clearTimeout(pending);select(index);});
    tab.addEventListener('focus',()=>{clearTimeout(pending);select(index);});
    tab.addEventListener('keydown',e=>{
      const delta={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
      let next;
      if(delta)next=(index+delta+tabs.length)%tabs.length;
      else if(e.key==='Home')next=0;
      else if(e.key==='End')next=tabs.length-1;
      else return;
      e.preventDefault();tabs[next].focus();
    });
  });
  /* a click or a tap on the photograph turns to the next chapter (and round to the first again).
     Dragging across it is wiping the glass, so a press that travelled or lingered doesn't count */
  const frame=story.querySelector('.story-visual');
  if(frame){
    let downX=0,downY=0,downAt=0;
    frame.addEventListener('pointerdown',e=>{downX=e.clientX;downY=e.clientY;downAt=performance.now();});
    frame.addEventListener('click',e=>{
      if(Math.hypot(e.clientX-downX,e.clientY-downY)>8||performance.now()-downAt>450)return;
      clearTimeout(pending);select((active+1)%tabs.length);
    });
  }
  /* previous / next under the chapter : on a phone the timeline is a long scroll back up */
  const pager=document.createElement('div');pager.className='story-pager';pager.setAttribute('role','group');pager.setAttribute('aria-label','Previous and next chapter');
  const label=i=>tabs[i].querySelector('.story-node-label').textContent.trim();
  const step=(delta,word)=>{
    const b=document.createElement('button');b.type='button';
    b.addEventListener('click',()=>{const next=active+delta;if(next<0||next>=tabs.length)return;select(next);tablist.scrollIntoView({block:'start',behavior:reduced.matches?'auto':'smooth'});});
    pager.appendChild(b);return {b,delta,word};
  };
  const steps=[step(-1,'Previous'),step(1,'Next')];
  stage.parentNode.appendChild(pager);
  function page(){
    steps.forEach(({b,delta,word})=>{
      const i=active+delta,there=i>=0&&i<tabs.length;
      b.hidden=!there;if(there)b.innerHTML='<span>'+word+'</span>'+label(i);
    });
  }
  /* when the section is held in place its chapter area gets one fixed height, so the block stays the
     same size from chapter to chapter and can sit centred : the tallest chapter, or the room there is */
  const held=matchMedia('(min-width:881px) and (min-height:700px)');
  const pin=story.querySelector('.story-pin'),head=story.querySelector('.story-head');
  function fit(){
    story.style.removeProperty('--h');
    if(!held.matches||!pin)return;
    const cs=getComputedStyle(pin);
    const room=innerHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-head.offsetHeight;
    let tallest=0;
    panels.forEach(panel=>{const was=panel.hidden;panel.hidden=false;tallest=Math.max(tallest,panel.offsetHeight);panel.hidden=was;});
    story.style.setProperty('--h',Math.max(240,Math.min(tallest,room))+'px');
  }
  const layout=()=>{
    clearTimeout(pending);layers=[active];settle();fit();more();page();
    tablist.setAttribute('aria-orientation',narrow.matches?'horizontal':'vertical');positionMarker();
  };
  narrow.addEventListener('change',layout);
  reduced.addEventListener('change',layout);
  fine.addEventListener('change',()=>clearTimeout(pending));
  new ResizeObserver(()=>{positionMarker();}).observe(tablist);
  addEventListener('resize',layout,{passive:true});
  document.fonts.ready.then(()=>{fit();more();positionMarker();});
  layout();requestAnimationFrame(()=>tablist.classList.add('timeline-ready'));
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
  /* layered waveform strands: a frozen piece of sound */
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
  /* sparse vertical ticks, like a score */
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
    /* cover, centred: match object-fit:cover exactly so fog aligns with the image beneath */
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
  let started=false;
  const retint=ph=>{
    snaps.delete(ph);
    if(!w||!h||ph!==activePh())return;      /* a photo behind a chapter that isn't showing changes nothing yet */
    if(started&&onScreen&&!REDUCE){fade=30;return;}   /* in view, a late photo fades in over the glass instead of snapping */
    x.globalAlpha=1;x.globalCompositeOperation='source-atop';
    x.drawImage(snap(),0,0);
    x.globalCompositeOperation='source-over';
  };
  container.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',()=>retint(img.closest('.ph')),{once:true});});
  /* a chapter change re-frosts the glass from the new photo over ~half a second, quick enough that the
     old photo's haze doesn't linger, slow enough to read as a transition. Only a real change counts:
     class writes that leave the active pane alone (the wipe hint, for one) must not touch the glass */
  let fade=0,current=activePh();
  new MutationObserver(()=>{
    const ph=activePh();if(ph===current)return;
    current=ph;if(REDUCE)retint(ph);else fade=30;
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
  const wipe=e=>{
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
  };
  container.addEventListener('pointermove',wipe,{passive:true});
  container.addEventListener('pointerdown',wipe,{passive:true});
  let wasWiping=false;
  container.addEventListener('pointerleave',()=>wiping=false);
  container.addEventListener('pointerup',e=>{if(e.pointerType==='touch')wiping=false;});
  container.addEventListener('pointercancel',()=>wiping=false);
  /* the glass mists over again only slowly : nothing for 20 s after the hand leaves it, then one thin
     layer every 120 ms (about half back after a quarter of a minute). Timed on the clock, not in frames,
     so a 120 Hz screen doesn't fog twice as fast. A layer thinner than this can't be used instead :
     on an 8-bit canvas it would round away to nothing */
  let leftAt=-1e9,layerAt=0;const REST=20000,EVERY=120;

  function step(){
    if(!w||!h)return;
    const now=performance.now();
    if(wiping){wasWiping=true;}else if(wasWiping){leftAt=now;wasWiping=false;}
    /* slow re-frosting with the blurred snapshot (not flat white) */
    const doRefrost=warmup||(!wiping&&now-leftAt>REST&&now-layerAt>EVERY);
    if(doRefrost&&!warmup)layerAt=now;
    if(fade>0){
      /* a new chapter : the frost that is on the glass takes the new photo's colours, and only that.
         What has been wiped clear, and the trails drops have left, stay as they are : it is one pane of
         glass for all the chapters, not a fresh one each time */
      fade--;x.globalCompositeOperation='source-atop';x.globalAlpha=.1;
      x.drawImage(snap(),0,0);
    }
    x.globalCompositeOperation='source-over';
    x.globalAlpha=doRefrost?(warmup?.004:.006):0;
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
        /* occasional lateral jog, decays; not a sine sway */
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
  /* 预下雨 : age the glass before anyone sees it: drops mid-run, trails half-faded */
  let warmup=true;
  if(!REDUCE){
    for(let i=0;i<440;i++)step();
    warmup=false;started=true;
    (function loop(){
      requestAnimationFrame(loop);
      if(onScreen)step();
    })();
  }
  /* reduced-motion : the frosted snapshot from size() is already drawn, and the
     wipe handler stays live, so it's a calm static glass you can still clear. */
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
