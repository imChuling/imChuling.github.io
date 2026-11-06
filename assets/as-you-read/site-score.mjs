/* The page as a score. Each section has its own bed (a looping pad) and its own
   treatment; the pointer, scroll, dwell and revisits colour it; a detail sheet
   draws the sound in close; a playing video asks it to step aside. */
import {RNBOSound} from './rnbo-engine.mjs';

const LIB='assets/as-you-read/vendor/rnbo-1.3.5.min.js';
const BEDS='assets/as-you-read/beds/';
const FALLBACK='assets/as-you-read/source.mp3';
const LABEL={top:'Arrival',projects:'Projects',music:'Stage',story:'Story',contact:'Hello',detail:'Close'};

/* bed = which pad plays underneath; the rest is the treatment on top */
const SCENES={
  top:     {bed:'top',     mix:30,grainSize:200,grainPos:90, interval:110,pitch:0, width:70,drive:10,bass:0,  mid:0,  treble:0,  wet:35,decay:55,size:70,damp:65,jitter:15},
  projects:{bed:'projects',mix:48,grainSize:130,grainPos:120,interval:70, pitch:0, width:55,drive:24,bass:-10,mid:6,  treble:14, wet:38,decay:48,size:60,damp:55,jitter:10},
  music:   {bed:'music',   mix:82,grainSize:360,grainPos:260,interval:42, pitch:-5,width:95,drive:52,bass:12, mid:4,  treble:-6, wet:74,decay:82,size:88,damp:70,jitter:25},
  story:   {bed:'story',   mix:70,grainSize:480,grainPos:320,interval:95, pitch:-7,width:100,drive:14,bass:-6, mid:-8, treble:-14,wet:92,decay:94,size:100,damp:80,jitter:45},
  contact: {bed:'contact', mix:38,grainSize:240,grainPos:150,interval:125,pitch:0, width:60,drive:8, bass:6,  mid:0,  treble:4,  wet:42,decay:58,size:55,damp:60,jitter:10},
  detail:  {bed:null,      mix:22,grainSize:220,grainPos:110,interval:140,pitch:0, width:45,drive:6, bass:0,  mid:2,  treble:8,  wet:28,decay:42,size:45,damp:70,jitter:8},
};
const FOCUS='.proj-card,.music-cover,.music-track,.me-photo,.story-visual,.hero-action,.me-link';

const button=document.querySelector('.nav-sound');
if(button){
  const sections=Object.keys(SCENES).filter(id=>id!=='detail').map(id=>[id,document.getElementById(id)]).filter(([,el])=>el);
  let engine=null,ctx=null,enabled=false,busy=false,ticker=0,ducked=false,detail=false;
  let scene='top',visits={top:1},since=performance.now(),lastInput=performance.now();
  let motion=0,focus=0,focusTarget=0,swell=0,turn=0,drift=0,hoverPitch=0;
  let lastY=scrollY,lastScroll=performance.now(),px=0,py=0,lastMove=0;
  const beds={};                       /* id → {source,gain} once loaded */
  let bedId=null,bedsReady=false;

  const label=document.createElement('span');label.className='nav-sound-scene';
  button.appendChild(label);
  const setState=s=>{button.dataset.state=s;button.setAttribute('aria-pressed',String(s==='on'));if(s!=='on')label.textContent='';};
  const setLabel=text=>{if(label.textContent===text)return;label.classList.add('is-swapping');setTimeout(()=>{label.textContent=text;label.classList.remove('is-swapping');},220);};

  /* ---------- what the visitor is doing ---------- */
  const touch=()=>{lastInput=performance.now();};
  function currentScene(){
    const y=innerHeight*.5;
    for(const [id,el] of sections){const r=el.getBoundingClientRect();if(r.top<=y&&r.bottom>y)return id;}
    return scene;
  }
  addEventListener('scroll',()=>{
    const now=performance.now(),dy=scrollY-lastY,delta=Math.abs(dy);
    motion=Math.max(motion,Math.min(1,delta/Math.max(16,now-lastScroll)*.25));
    drift+=(dy<0?-1:1)*Math.min(.4,delta/400);drift=Math.max(-1,Math.min(1,drift));
    lastY=scrollY;lastScroll=now;touch();
  },{passive:true});
  addEventListener('pointermove',e=>{
    const now=performance.now(),dt=Math.max(8,now-lastMove);
    if(lastMove)motion=Math.max(motion,Math.min(1,Math.hypot(e.clientX-px,e.clientY-py)/dt*.05));
    px=e.clientX;py=e.clientY;lastMove=now;touch();
  },{passive:true});
  document.addEventListener('pointerover',e=>{
    const el=e.target.closest(FOCUS);focusTarget=el?1:0;
    hoverPitch=el&&el.dataset.pitch?Number(el.dataset.pitch):0;
  });
  document.addEventListener('pointerdown',e=>{if(e.target.closest('[data-hover],a,button'))swell=1;touch();});
  addEventListener('keydown',touch,{passive:true});

  /* ---------- turning the state into sound ---------- */
  function compose(){
    const now=performance.now();
    const next=detail?'detail':currentScene();
    if(next!==scene){
      scene=next;since=now;turn=1;
      if(scene!=='detail')visits[scene]=(visits[scene]||0)+1;
      setLabel(LABEL[scene]);
    }
    motion*=.9;swell*=.9;turn*=.93;drift*=.97;focus+=(focusTarget-focus)*.12;
    const b=SCENES[scene];
    const residue=scene==='detail'?0:Math.min(1,((visits[scene]||1)-1)*.5);
    const dwell=Math.min(1,(now-since)/45000);                  /* staying somewhere slowly thickens it */
    const idle=Math.max(0,Math.min(1,(now-lastInput-8000)/20000)); /* left alone, it settles toward the raw bed */
    engine.setParams({
      mix:Math.max(8,Math.min(95,b.mix+14*residue+8*dwell-14*idle+8*motion+12*turn)),
      width:b.width,gain:-8,
      grainSize:b.grainSize*(1-.3*focus)*(1+.15*idle),grainPos:b.grainPos,
      interval:Math.max(20,b.interval*(1-.2*focus)*(1+.2*idle)-15*motion-25*turn),
      pitch:b.pitch+2*focus+hoverPitch*focus-1.5*drift,
      'drive/drive':b.drive+10*focus+6*turn,'drive/lowcut':10,'drive/highcut':40,'drive/mix':90,'drive/volume':0,
      'drive/bass':b.bass,'drive/mid':b.mid,'drive/treble':b.treble+6*focus,'drive/midfreq':0,
      'reverb/mix':Math.min(100,b.wet+12*residue+6*dwell+25*swell),'reverb/decay':Math.min(100,b.decay+8*residue+6*dwell),
      'reverb/size':b.size,'reverb/damp':b.damp,'reverb/diff':80,'reverb/jitter':b.jitter,
    });
    if(b.bed&&b.bed!==bedId)crossfadeBed(b.bed);
    const a=new Float32Array(engine.analyser.fftSize);engine.analyser.getFloatTimeDomainData(a);
    let peak=0;for(let i=0;i<a.length;i+=4)peak=Math.max(peak,Math.abs(a[i]));
    button.style.setProperty('--lvl',Math.min(1,peak*6).toFixed(2));
    button.score={scene,bed:bedId,visits:{...visits},residue,dwell:+dwell.toFixed(2),idle:+idle.toFixed(2),motion:+motion.toFixed(2),focus:+focus.toFixed(2),swell:+swell.toFixed(2),turn:+turn.toFixed(2),drift:+drift.toFixed(2),peak:+peak.toFixed(3),ducked,targets:{...engine.targets}};
  }

  /* ---------- beds : one looping source per section, cross-faded ---------- */
  async function loadBeds(){
    const ids=[...new Set(Object.values(SCENES).map(s=>s.bed).filter(Boolean))];
    const first=SCENES[currentScene()].bed||'top';
    const order=[first,...ids.filter(i=>i!==first)];
    const decode=async id=>{
      const r=await fetch(BEDS+id+'.mp3');if(!r.ok)throw new Error('bed '+id);
      return engine.context.decodeAudioData(await r.arrayBuffer());
    };
    const add=(id,buffer)=>{
      const source=engine.context.createBufferSource(),gain=engine.context.createGain();
      source.buffer=buffer;source.loop=true;gain.gain.value=0;
      source.connect(gain);gain.connect(engine.device.node);source.start();
      beds[id]={source,gain};
    };
    try{add(first,await decode(first));}
    catch(e){                                                    /* no beds yet: fall back to the single source */
      const r=await fetch(FALLBACK);if(!r.ok)throw e;
      add(first,await engine.context.decodeAudioData(await r.arrayBuffer()));
      for(const id of ids)beds[id]=beds[first];
    }
    bedsReady=true;crossfadeBed(first,0.01);
    Promise.all(order.slice(1).map(async id=>{if(!beds[id])try{add(id,await decode(id));}catch(e){beds[id]=beds[first];}})).catch(()=>{});
  }
  function crossfadeBed(id,seconds=2.8){
    if(!bedsReady)return;
    const target=beds[id]||beds[bedId];if(!target)return;
    const t=engine.context.currentTime;
    for(const [key,bed] of Object.entries(beds)){
      if(bed===target)continue;
      bed.gain.gain.cancelScheduledValues(t);bed.gain.gain.setTargetAtTime(0,t,seconds/3);
    }
    target.gain.gain.cancelScheduledValues(t);target.gain.gain.setTargetAtTime(1,t,seconds/3);
    bedId=id;
  }
  function stopBeds(){for(const bed of new Set(Object.values(beds))){try{bed.source.stop();}catch(e){}bed.source.disconnect();bed.gain.disconnect();}for(const k in beds)delete beds[k];bedsReady=false;bedId=null;}

  /* ---------- lifecycle ---------- */
  const loadLib=()=>window.RNBO?Promise.resolve():new Promise((ok,fail)=>{const s=document.createElement('script');s.src=LIB;s.onload=ok;s.onerror=()=>fail(new Error('RNBO runtime failed to load'));document.head.appendChild(s);});
  /* the context must be created and resumed synchronously inside a user gesture; the engine can load afterwards */
  function ensureContext(){
    if(!ctx||ctx.state==='closed'){const C=window.AudioContext||window.webkitAudioContext;ctx=new C();}
    ctx.resume();return ctx;
  }
  const level=()=>ducked?0:.38;
  async function start(){
    if(busy)return;busy=true;setState('loading');
    try{
      if(!engine){
        const context=ensureContext();
        await loadLib();
        const candidate=new RNBOSound(context);
        try{engine=await candidate.init();}catch(e){candidate.dispose();ctx=null;throw e;}
      }
      await engine.context.resume();
      scene=detail?'detail':currentScene();visits[scene]=visits[scene]||1;since=performance.now();
      if(!bedsReady)await loadBeds();
      compose();engine.volume(level(),.9);
      enabled=true;setState('on');setLabel(LABEL[scene]);
      clearInterval(ticker);ticker=setInterval(compose,50);
    }catch(e){setState('error');console.warn('[score]',e);}
    finally{busy=false;}
  }
  function stop(){
    enabled=false;clearInterval(ticker);setState('off');button.style.setProperty('--lvl',0);
    if(!engine)return;
    engine.volume(0,.25);setTimeout(()=>{if(!enabled){stopBeds();engine.context.suspend();}},800);
  }
  button.addEventListener('click',()=>{if(enabled)stop();else{ensureContext();start();}});
  document.addEventListener('score:enter',e=>{if(e.detail.sound){ensureContext();start();}});
  /* a playing video asks the score to step aside; it returns when the video pauses or ends */
  document.addEventListener('score:duck',e=>{ducked=!!e.detail.on;if(enabled&&engine)engine.volume(level(),ducked?.3:.9);});
  /* a detail sheet draws the sound in close, then hands back to the section */
  document.addEventListener('score:detail',e=>{detail=!!e.detail.open;if(!detail)ducked=false;if(enabled&&engine){compose();engine.volume(level(),.6);}});
  document.addEventListener('visibilitychange',()=>{
    if(!engine)return;
    if(document.hidden){if(enabled){engine.volume(0,.1);engine.context.suspend();}}
    else if(enabled){engine.context.resume();engine.volume(level(),.6);}
  });
  addEventListener('pagehide',()=>{if(enabled)stop();});
}
