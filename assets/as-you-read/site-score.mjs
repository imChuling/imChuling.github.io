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
/* melody: one high scale per section (Hz), played by the page itself above the bed */
const SCALES={
  top:     [587.33,698.46,880.00,1046.5,1318.5],   /* D5 F5 A5 C6 E6  — Dm9 */
  projects:[880.00,987.77,1318.5,1480.0,1760.0],   /* A5 B5 E6 F#6 A6 — sus, open */
  music:   [659.26,783.99,987.77,1174.7,1480.0],   /* E5 G5 B5 D6 F#6 — E dorian */
  story:   [932.33,1174.7,1318.5,1396.9,1760.0],   /* Bb5 D6 E6 F6 A6 — lydian */
  contact: [523.25,659.26,783.99,987.77,1174.7],   /* C5 E5 G5 B5 D6  — Cmaj9 */
};
const FOCUS='.proj-card,.music-cover,.music-track,.me-photo,.story-visual,.hero-action,.me-link';

const button=document.querySelector('.nav-sound');
if(button){
  const sections=Object.keys(SCENES).filter(id=>id!=='detail').map(id=>[id,document.getElementById(id)]).filter(([,el])=>el);
  let engine=null,ctx=null,enabled=false,busy=false,ticker=0,ducked=false,detail=false;
  let scene='top',visits={top:1},since=performance.now(),lastInput=performance.now();
  let motion=0,focus=0,focusTarget=0,swell=0,turn=0,drift=0,hoverPitch=0;
  let hx=0,vy=0,pan=.5,tilt=.5,wipe=0,wipeVel=0;   /* pointer: signed velocities, position, glass wiping */
  let panner=null,whoosh=null;
  let melody=null,melodyClock=1800,degree=2,octave=0,scale='top',prevFocus=0,bloom=false,wipeCool=0;
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
    const now=performance.now(),dt=Math.max(8,now-lastMove),dx=e.clientX-px,dy=e.clientY-py;
    if(lastMove){
      motion=Math.max(motion,Math.min(1,Math.hypot(dx,dy)/dt*.05));
      hx=Math.max(-1,Math.min(1,hx+dx/dt*.12));          /* right lifts, left lowers */
      vy=Math.max(-1,Math.min(1,vy+dy/dt*.12));          /* up tightens, down lengthens */
    }
    pan+=((e.clientX/innerWidth)-pan)*.08;tilt+=((e.clientY/innerHeight)-tilt)*.08;
    px=e.clientX;py=e.clientY;lastMove=now;touch();
  },{passive:true});
  /* wiping the Story window: the harder you wipe, the more the glass clears in the sound too */
  document.querySelectorAll('.story-visual').forEach(el=>el.addEventListener('pointermove',e=>{
    if(e.buttons===0&&e.pointerType==='mouse'&&!el.matches(':hover'))return;
    const v=Math.min(1,Math.hypot(e.movementX||0,e.movementY||0)/40);
    wipeVel=Math.max(wipeVel,v);wipe=Math.min(1,wipe+v*.12);
  },{passive:true}));
  document.addEventListener('pointerover',e=>{
    const el=e.target.closest(FOCUS);focusTarget=el?1:0;
    hoverPitch=el&&el.dataset.pitch?Number(el.dataset.pitch):0;
  });
  document.addEventListener('pointerdown',e=>{if(e.target.closest('[data-hover],a,button')){swell=1;bloom=true;}touch();});
  addEventListener('keydown',touch,{passive:true});

  /* ---------- melody : a high FM bell the page plays, sent into the same chain ---------- */
  function note(freq,{vel=.4,dur=2.6,bright=1,when=0}={}){
    if(!melody||ducked)return;
    const c=engine.context,t=c.currentTime+when;
    const car=c.createOscillator(),car2=c.createOscillator(),mod=c.createOscillator(),mg=c.createGain(),env=c.createGain();
    car.frequency.value=freq;car2.frequency.value=freq*1.004;mod.frequency.value=freq*2.01;
    mg.gain.setValueAtTime(freq*1.4*bright,t);mg.gain.exponentialRampToValueAtTime(freq*.04,t+dur*.55);
    mod.connect(mg);mg.connect(car.frequency);mg.connect(car2.frequency);
    env.gain.setValueAtTime(0,t);env.gain.linearRampToValueAtTime(vel*.11,t+.014);env.gain.exponentialRampToValueAtTime(.0004,t+dur);
    car.connect(env);car2.connect(env);env.connect(melody.in);
    [car,car2,mod].forEach(o=>{o.start(t);o.stop(t+dur+.05);});
    car.onended=()=>{env.disconnect();mg.disconnect();};
  }
  const pitchOf=(deg,oct=octave)=>{const s=SCALES[scale];return s[((deg%s.length)+s.length)%s.length]*Math.pow(2,oct+Math.floor(deg/s.length));};
  /* the random walk: drifts toward where the pointer is (left low, right high) */
  function drip(){
    const target=Math.round(pan*4);
    degree+=Math.random()<.6?Math.sign(target-degree)||(Math.random()<.5?-1:1):(Math.random()<.5?-1:1);
    degree=Math.max(0,Math.min(4,degree));octave=Math.random()<.18?1:0;
    note(pitchOf(degree),{vel:.3+.2*Math.random(),dur:scene==='story'?4.5:2.6+Math.random()*1.2,bright:.8+.6*motion});
  }
  function motif(up){for(let i=0;i<3;i++)note(pitchOf(up?i*2:4-i*2),{vel:.34,dur:3,when:i*.15});}
  function figure(){for(let i=0;i<3;i++)note(pitchOf(degree+i),{vel:.3,dur:1.8,when:i*.09,bright:1.2});}
  function chord(){[0,2,4].forEach((d,i)=>note(pitchOf(d,i===2?1:0),{vel:.3,dur:4.5,when:i*.02}));}

  /* ---------- turning the state into sound ---------- */
  function compose(){
    const now=performance.now();
    const next=detail?'detail':currentScene();
    if(next!==scene){
      scene=next;since=now;turn=1;
      if(scene!=='detail'){visits[scene]=(visits[scene]||0)+1;scale=scene;motif(visits[scene]%2===1);}
      setLabel(LABEL[scene]);
    }
    motion*=.9;swell*=.9;turn*=.93;drift*=.97;focus+=(focusTarget-focus)*.12;
    hx*=.88;vy*=.88;wipeVel*=.75;wipe*=.985;                   /* wipe lingers ~6 s, like a clearing that fogs back */
    const b=SCENES[scene];
    const residue=scene==='detail'?0:Math.min(1,((visits[scene]||1)-1)*.5);
    const dwell=Math.min(1,(now-since)/45000);                  /* staying somewhere slowly thickens it */
    const idle=Math.max(0,Math.min(1,(now-lastInput-8000)/20000)); /* left alone, it settles toward the raw bed */
    const height=.5-tilt;                                       /* pointer high on the page: brighter; low: darker */
    /* melodic events: a slow drip of notes, plus figures for hover, click, wipe */
    melodyClock-=50;
    if(melodyClock<=0){drip();melodyClock=(scene==='detail'?5200:scene==='story'?4800:2600)*(1-.45*motion)*(1+1.2*idle)*(.7+.6*Math.random());}
    if(focusTarget&&!prevFocus)figure();prevFocus=focusTarget;
    if(bloom){bloom=false;chord();}
    wipeCool-=50;if(wipeVel>.45&&wipeCool<=0){wipeCool=220;note(pitchOf(2+Math.floor(Math.random()*3),1),{vel:.22,dur:.7,bright:1.6});}
    engine.setParams({
      mix:Math.max(8,Math.min(95,b.mix+14*residue+8*dwell-14*idle+8*motion+12*turn-18*wipe)),
      width:Math.min(100,b.width+20*motion),gain:-8,
      grainSize:b.grainSize*(1-.3*focus)*(1+.15*idle)*(1+.25*vy),grainPos:b.grainPos,
      interval:Math.max(20,b.interval*(1-.2*focus)*(1+.2*idle)-15*motion-25*turn),
      pitch:b.pitch+2*focus+hoverPitch*focus-1.5*drift+1.2*hx,
      'drive/drive':Math.max(0,b.drive+10*focus+6*turn-4*wipe),'drive/lowcut':10,'drive/highcut':40,'drive/mix':90,'drive/volume':0,
      'drive/bass':b.bass-6*height,'drive/mid':b.mid,'drive/treble':b.treble+6*focus+10*height+8*motion+8*wipe,'drive/midfreq':0,
      'reverb/mix':Math.min(100,b.wet+12*residue+6*dwell+25*swell+8*wipe),'reverb/decay':Math.min(100,b.decay+8*residue+6*dwell),
      'reverb/size':b.size,'reverb/damp':Math.max(0,b.damp-25*wipe),'reverb/diff':80,'reverb/jitter':b.jitter,
    });
    if(panner){const t=engine.context.currentTime;panner.pan.setTargetAtTime(.4*(pan-.5)*2,t,.08);}
    if(whoosh){const t=engine.context.currentTime;whoosh.gain.gain.setTargetAtTime(Math.min(.22,wipeVel*.3),t,wipeVel>whoosh.last?.02:.12);whoosh.filter.frequency.setTargetAtTime(900+1800*(1-tilt),t,.05);whoosh.last=wipeVel;}
    if(b.bed&&b.bed!==bedId)crossfadeBed(b.bed);
    const a=new Float32Array(engine.analyser.fftSize);engine.analyser.getFloatTimeDomainData(a);
    let peak=0;for(let i=0;i<a.length;i+=4)peak=Math.max(peak,Math.abs(a[i]));
    button.style.setProperty('--lvl',Math.min(1,peak*6).toFixed(2));
    button.score={scene,bed:bedId,visits:{...visits},residue,dwell:+dwell.toFixed(2),idle:+idle.toFixed(2),motion:+motion.toFixed(2),focus:+focus.toFixed(2),swell:+swell.toFixed(2),turn:+turn.toFixed(2),drift:+drift.toFixed(2),hx:+hx.toFixed(2),vy:+vy.toFixed(2),pan:+pan.toFixed(2),tilt:+tilt.toFixed(2),wipe:+wipe.toFixed(2),peak:+peak.toFixed(3),ducked,melody:!!melody,scale,degree,targets:{...engine.targets}};
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
        /* pointer x pans the whole score a little */
        panner=context.createStereoPanner();engine.master.disconnect();engine.master.connect(panner);panner.connect(engine.analyser);
        /* a soft noise bed for the glass wipe, fed into the same chain so it gets granulated and reverberated */
        const len=context.sampleRate*2,buf=context.createBuffer(1,len,context.sampleRate),d=buf.getChannelData(0);
        let lp=0;for(let i=0;i<len;i++){lp+=((Math.random()*2-1)-lp)*.25;d[i]=lp;}
        const src=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();
        src.buffer=buf;src.loop=true;filter.type='bandpass';filter.frequency.value=1800;filter.Q.value=1.1;gain.gain.value=0;
        src.connect(filter);filter.connect(gain);gain.connect(engine.device.node);src.start();
        whoosh={src,filter,gain,last:0};
        /* melody bus: mostly into the chain (granulated, reverberated), a little dry for definition */
        const mIn=context.createGain(),mDry=context.createGain(),mLp=context.createBiquadFilter();
        mLp.type='lowpass';mLp.frequency.value=5200;mDry.gain.value=.22;
        mIn.connect(mLp);mLp.connect(engine.device.node);mLp.connect(mDry);mDry.connect(engine.master);
        melody={in:mIn,dry:mDry};
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
