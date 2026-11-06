/* The page as a score: each section sets a scene, the pointer and scroll colour it,
   and coming back to a place you have already been leaves residue in the sound. */
import {RNBOSound} from './rnbo-engine.mjs';

const SOURCE='assets/as-you-read/source.mp3';
const LIB='assets/as-you-read/vendor/rnbo-1.3.5.min.js';
const SCENES={
  top:     {mix:30,grainSize:200,grainPos:90, interval:110,pitch:0, drive:10,wet:35,decay:55},
  projects:{mix:45,grainSize:140,grainPos:120,interval:80, pitch:0, drive:22,wet:40,decay:50},
  music:   {mix:80,grainSize:360,grainPos:260,interval:45, pitch:-5,drive:48,wet:75,decay:80},
  story:   {mix:70,grainSize:480,grainPos:300,interval:90, pitch:-7,drive:15,wet:90,decay:92},
  contact: {mix:40,grainSize:240,grainPos:150,interval:120,pitch:0, drive:8, wet:45,decay:60},
};
const FOCUS='.proj-card,.music-cover,.music-track,.me-photo,.story-visual,.hero-action,.me-link';

const button=document.querySelector('.nav-sound');
if(button){
  const sections=Object.keys(SCENES).map(id=>[id,document.getElementById(id)]).filter(([,el])=>el);
  let engine=null,enabled=false,busy=false,ticker=0;
  let scene='top',visits={top:1},motion=0,focus=0,focusTarget=0,swell=0;
  let lastY=scrollY,lastScroll=performance.now(),px=0,py=0,lastMove=0;

  const setState=s=>{button.dataset.state=s;button.setAttribute('aria-pressed',String(s==='on'));};

  /* ---- what the page is doing ---- */
  function currentScene(){
    const y=innerHeight*.5;
    for(const [id,el] of sections){const r=el.getBoundingClientRect();if(r.top<=y&&r.bottom>y)return id;}
    return scene;
  }
  addEventListener('scroll',()=>{
    const now=performance.now(),delta=Math.abs(scrollY-lastY);
    motion=Math.max(motion,Math.min(1,delta/Math.max(16,now-lastScroll)*.25));
    lastY=scrollY;lastScroll=now;
  },{passive:true});
  addEventListener('pointermove',e=>{
    const now=performance.now(),dt=Math.max(8,now-lastMove);
    if(lastMove)motion=Math.max(motion,Math.min(1,Math.hypot(e.clientX-px,e.clientY-py)/dt*.05));
    px=e.clientX;py=e.clientY;lastMove=now;
  },{passive:true});
  document.addEventListener('pointerover',e=>{focusTarget=e.target.closest(FOCUS)?1:0;});
  document.addEventListener('pointerdown',e=>{if(e.target.closest('[data-hover],a,button'))swell=1;});

  /* ---- turn the state into sound ---- */
  function compose(){
    const next=currentScene();
    if(next!==scene){scene=next;visits[scene]=(visits[scene]||0)+1;}
    motion*=.9;swell*=.9;focus+=(focusTarget-focus)*.12;
    const b=SCENES[scene],residue=Math.min(1,((visits[scene]||1)-1)*.5);
    engine.setParams({
      mix:Math.min(95,b.mix+14*residue+8*motion),width:80,gain:-8,
      grainSize:b.grainSize*(1-.3*focus),grainPos:b.grainPos,
      interval:Math.max(20,b.interval*(1-.2*focus)-15*motion),
      pitch:b.pitch+2*focus,
      'drive/drive':b.drive+10*focus,'drive/highcut':40,'drive/mix':90,'drive/volume':0,
      'reverb/mix':Math.min(100,b.wet+12*residue+25*swell),'reverb/decay':Math.min(100,b.decay+8*residue),
      'reverb/size':75,'reverb/damp':65,'reverb/diff':80,'reverb/jitter':20,
    });
    const a=new Float32Array(engine.analyser.fftSize);engine.analyser.getFloatTimeDomainData(a);
    let peak=0;for(let i=0;i<a.length;i+=4)peak=Math.max(peak,Math.abs(a[i]));
    button.style.setProperty('--lvl',Math.min(1,peak*6).toFixed(2));
    button.score={scene,visits:{...visits},residue,motion:+motion.toFixed(2),focus:+focus.toFixed(2),swell:+swell.toFixed(2),peak:+peak.toFixed(3),targets:{...engine.targets}};
  }

  /* ---- lifecycle ---- */
  const loadLib=()=>window.RNBO?Promise.resolve():new Promise((ok,fail)=>{const s=document.createElement('script');s.src=LIB;s.onload=ok;s.onerror=()=>fail(new Error('RNBO runtime failed to load'));document.head.appendChild(s);});
  const pickFile=()=>new Promise((ok,fail)=>{
    const input=Object.assign(document.createElement('input'),{type:'file',accept:'audio/*'});
    input.onchange=()=>input.files[0]?ok(input.files[0]):fail(new Error('no file'));
    input.oncancel=()=>fail(new Error('no file'));
    input.click();
  });
  async function source(){
    const r=await fetch(SOURCE,{method:'HEAD'}).catch(()=>null);
    if(r&&r.ok){const res=await fetch(SOURCE);engine.buffer=await engine.context.decodeAudioData(await res.arrayBuffer());return;}
    await engine.load(await pickFile());
  }
  /* the context must be created and resumed synchronously inside a user gesture; the engine can load afterwards */
  let ctx=null;
  function ensureContext(){
    if(!ctx||ctx.state==='closed'){const C=window.AudioContext||window.webkitAudioContext;ctx=new C();}
    ctx.resume();return ctx;
  }
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
      if(!engine.buffer)await source();
      scene=currentScene();visits[scene]=visits[scene]||1;
      compose();engine.start();engine.volume(.38,.9);
      enabled=true;setState('on');
      clearInterval(ticker);ticker=setInterval(compose,50);
    }catch(e){
      setState(e.message==='no file'?'off':'error');console.warn('[score]',e);
    }finally{busy=false;}
  }
  function stop(){
    enabled=false;clearInterval(ticker);setState('off');button.style.setProperty('--lvl',0);
    if(!engine)return;
    engine.volume(0,.25);setTimeout(()=>{if(!enabled){engine.stop();engine.context.suspend();}},700);
  }
  button.addEventListener('click',()=>{if(enabled)stop();else{ensureContext();start();}});
  document.addEventListener('score:enter',e=>{if(e.detail.sound){ensureContext();start();}});
  document.addEventListener('visibilitychange',()=>{
    if(!engine)return;
    if(document.hidden){if(enabled){engine.volume(0,.1);engine.context.suspend();}}
    else if(enabled){engine.context.resume();engine.volume(.38,.6);}
  });
  addEventListener('pagehide',()=>{if(enabled)stop();});
}
