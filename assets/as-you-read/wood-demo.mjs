/* Wood Wide Web — field guide. Plays the same Max/RNBO patch as the front page, with the same
   section presets and scales, so every button here sounds exactly like the gesture it explains. */
import {RNBOSound} from './rnbo-engine.mjs?v=4';
import {SCENES,SCALES,LABEL,LIB,daylight} from './site-score.mjs?v=37';

/* mount(root) wires one field guide and returns a function that shuts it down again. The standalone
   page mounts its own; on the homepage the detail sheet mounts the copy it lifts in (scripts don't
   travel with lifted markup) and shuts it down when the sheet closes. */
export function mount(root){
  const gone=new AbortController(),sig={signal:gone.signal};
  /* while the guide plays, the homepage's own score steps aside */
  const duck=v=>document.dispatchEvent(new CustomEvent('score:duck',{detail:{on:v}}));
  const SCENE_INDEX={top:0,projects:1,music:2,story:3,contact:4};
  const LEVEL=.2;
  let engine=null,ctx=null,loading=null,on=false;
  let scene='top',time=daylight()>.5?'day':'night',mode='still',sceneSince=performance.now();
  let motion=0,swell=0,wipeVel=0,select=0,idle=1,ticker=0;
  const status=root.querySelector('[data-status]');
  const soundBtn=root.querySelector('[data-sound]');

  const loadLib=()=>window.RNBO?Promise.resolve():new Promise((ok,fail)=>{const s=document.createElement('script');s.src=LIB;s.onload=ok;s.onerror=()=>fail(new Error('RNBO runtime failed to load'));document.head.appendChild(s);});

  /* the context is made inside the click; the patch loads afterwards */
  /* Safari and iOS suspend (or 'interrupt') audio after the tab is hidden, the phone locks, or a
     while of silence; every press wakes it again, synchronously inside the click */
  const wake=()=>{if(ctx&&ctx.state!=='running'&&ctx.state!=='closed')ctx.resume().catch(()=>{});};
  root.addEventListener('pointerdown',wake,true);
  root.addEventListener('click',wake,true);
  root.addEventListener('keydown',wake,true);

  function start(){
    if(engine&&ctx&&ctx.state!=='closed'){wake();return Promise.resolve(engine);}
    if(engine){engine=null;loading=null;}
    if(loading)return loading;
    const C=window.AudioContext||window.webkitAudioContext;ctx=new C({latencyHint:'playback'});ctx.resume();const made=ctx;
    /* if the browser stops the audio on its own, show it: the switch says off, the next press restarts */
    ctx.addEventListener('statechange',()=>{if(ctx!==made)return;   /* an older context winding down */
      if(ctx.state!=='running'&&on&&!document.hidden){on=false;soundBtn.setAttribute('aria-pressed','false');soundBtn.textContent='Sound off';setStatus('Sound paused — press any button to carry on.');}});
    setStatus('Loading the patch…');
    loading=(async()=>{
      await loadLib();
      const e=new RNBOSound(ctx);
      await e.init(['score-synth']);
      engine=e;ticker=setInterval(tick,50);tick();
      return e;
    })().catch(err=>{loading=null;setStatus('The patch could not load in this browser.');throw err;});
    return loading;
  }
  function setStatus(t){if(status)status.textContent=t;}
  function describe(){return `${LABEL[scene]} · ${time} · ${mode==='still'?'still':'moving'}`;}

  async function soundOn(){
    await start();wake();on=true;engine.volume(LEVEL,.6);
    soundBtn.setAttribute('aria-pressed','true');soundBtn.textContent='Sound on';setStatus('Playing — '+describe());
    duck(true);
  }
  function soundOff(){
    on=false;if(engine)engine.volume(0,.3);
    soundBtn.setAttribute('aria-pressed','false');soundBtn.textContent='Sound off';setStatus('Sound is off.');
    duck(false);
  }
  soundBtn.addEventListener('click',()=>{on?soundOff():soundOn().catch(()=>{});});

  /* the state every 50 ms, smoothed in the engine — the same mapping the front page uses */
  function tick(){
    if(!engine)return;
    const now=performance.now(),b=SCENES[scene];
    motion*=.9;swell*=.9;wipeVel*=.75;
    if(mode==='moving'){motion=Math.max(motion,.5+.2*Math.sin(now/300));idle=Math.max(0,idle-.1);}
    else idle=Math.min(1,idle+.02);                    /* stillness settles in over a few seconds here */
    const open=scene==='story'?Math.min(1,(now-sceneSince)/2500):0;
    Object.assign(engine.targets,{
      'grain/mix':b.mix,'grain/width':b.width,'grain/gain':-14,'grain/grainSize':b.grainSize,'grain/grainPos':b.grainPos,
      'grain/interval':b.interval,'grain/pitch':b.pitch,
      'drive/drive':b.drive,'drive/lowcut':34,'drive/highcut':40,'drive/mix':35,'drive/volume':0,
      'drive/bass':b.bass,'drive/mid':b.mid,'drive/treble':b.treble,'drive/midfreq':0,
      'reverb/mix':Math.min(85,b.wet+18*swell+6*wipeVel+16*open),'reverb/decay':Math.min(100,b.decay+12*open),
      'reverb/size':b.size,'reverb/damp':b.damp,'reverb/diff':80,'reverb/jitter':b.jitter,
      'score/bedRoot':SCALES[scene][0]/4,'score/bedLevel':.5,'score/daylight':time==='day'?1:0,
      'score/idle':idle,'score/motion':motion,'score/swell':swell,'score/wipeVel':wipeVel,'score/select':select,
      'score/tilt':.5,'score/pan':.5,'score/dwell':Math.min(1,(now-sceneSince)/45000),
    });
    const p=engine.device.parametersById.get('score/scene');if(p&&p.value!==SCENE_INDEX[scene])p.value=SCENE_INDEX[scene];
  }

  /* notes: the same scale, register and channels as the front page */
  const pitchOf=(deg,oct=0)=>{const s=SCALES[scene];return s[((deg%s.length)+s.length)%s.length]*Math.pow(2,oct+Math.floor(deg/s.length));};
  function note(freq,{vel=.3,dur=1,when=0,ch=1}={}){
    if(!engine||!on)return;
    const midi=Math.round(69+12*Math.log2(freq/440))-(ch===4||ch===6||ch===8?0:12);
    const v=Math.max(1,Math.min(127,Math.round(vel*200)));
    const t=ctx.currentTime*1000+when*1000,st=0x90|((ch-1)&15);
    engine.device.scheduleEvent(new RNBO.MIDIEvent(t,0,[st,midi,v]));
    engine.device.scheduleEvent(new RNBO.MIDIEvent(t+dur*1000,0,[st,midi,0]));
  }
  const birdCall=()=>{let c=null;try{c=JSON.parse(localStorage.getItem('ayr-bird')||'null');}catch(e){}
    if(!Array.isArray(c)||c.length!==4){c=[0,1,2,3].map(()=>Math.floor(Math.random()*7));try{localStorage.setItem('ayr-bird',JSON.stringify(c));}catch(e){}}
    return c;};

  /* each gesture as the front page plays it */
  const GESTURES={
    scroll(){motion=.8;for(let i=0;i<6;i++)note(pitchOf(i),{vel:.3,dur:1.2,when:i*.16,ch:2});return 1.8;},
    click(){swell=1;[0,2,4,6].forEach((d,i)=>note(pitchOf(d,i===3?1:0),{vel:.35,dur:5.5+i*.5,when:i*.03,ch:3}));return 3;},
    hover(){[3,0,5,2].forEach((d,i)=>note(pitchOf(d),{vel:.22,dur:.25,when:i*.38,ch:7}));return 1.8;},
    stay(){let d=2;for(let i=0;i<4;i++){d=Math.max(0,Math.min(6,d+(Math.random()<.6?1:-1)));note(pitchOf(d),{vel:.32,dur:3.2,when:i*.9,ch:1});}return 4;},
    wipe(){let k=0;const iv=setInterval(()=>{wipeVel=.8;if(++k>8)clearInterval(iv);},140);[0,1,2].forEach(i=>note(pitchOf(2+i,1),{vel:.22,dur:.7,when:.1+i*.32,ch:4}));return 1.6;},
    chapter(){const i=Math.floor(Math.random()*3);note(pitchOf(i*2),{vel:.22,dur:2.6,ch:5});note(pitchOf(i*2+4),{vel:.12,dur:2.6,when:.12,ch:5});return 2.6;},
    rain(){let t=0;for(let i=0;i<7;i++){const s=SCALES[scene];note(s[Math.floor(Math.random()*s.length)]*(Math.random()<.25?2:1),{vel:.12,dur:.3+Math.random()*.4,when:t,ch:6});t+=.25+Math.random()*.35;}return t+.4;},
    bird(){const c=birdCall();c.forEach((d,i)=>note(pitchOf(d,1),{vel:.3,dur:.12,when:i*.17+(i===3?.12:0),ch:8}));return 1;},
    select(){let k=0;const iv=setInterval(()=>{select=Math.min(.7,select+.1);if(++k>12){clearInterval(iv);setTimeout(()=>{select=0;},1800);}},90);
      [3,4].forEach((d,i)=>note(pitchOf(d),{vel:.15,dur:.9,when:.2+i*.5,ch:1}));[0,2,4].forEach((d,i)=>note(pitchOf(d),{vel:.14,dur:3.5,when:1.5+i*.04,ch:3}));return 3;},
    end(){[0,2,4,6].forEach((d,i)=>note(pitchOf(d,i===3?1:0),{vel:.24,dur:6,when:i*.12,ch:3}));return 3.5;},
  };
  root.querySelectorAll('[data-gesture]').forEach(btn=>btn.addEventListener('click',async()=>{
    try{if(!on)await soundOn();else wake();}catch(e){return;}
    const secs=GESTURES[btn.dataset.gesture]()||1.5;
    btn.classList.add('is-playing');clearTimeout(btn._t);btn._t=setTimeout(()=>btn.classList.remove('is-playing'),secs*1000);
  }));

  /* the place, the time, and what you are doing */
  function choose(group,value){
    root.querySelectorAll(`[data-${group}]`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[group]===value)));
  }
  root.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',async()=>{
    if(b.dataset.scene!==scene){scene=b.dataset.scene;sceneSince=performance.now();}
    choose('scene',scene);try{if(!on)await soundOn();}catch(e){return;}setStatus('Playing — '+describe());
  }));
  root.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',async()=>{
    time=b.dataset.time;choose('time',time);try{if(!on)await soundOn();}catch(e){return;}setStatus('Playing — '+describe());
  }));
  root.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',async()=>{
    mode=b.dataset.mode;if(mode==='moving')idle=0;choose('mode',mode);try{if(!on)await soundOn();}catch(e){return;}setStatus('Playing — '+describe());
  }));
  choose('scene',scene);choose('time',time);choose('mode',mode);

  /* leaving the page pauses the sound; coming back (Back button, or a page restored from cache)
     keeps the patch, so the next press simply carries on */
  addEventListener('pagehide',()=>{if(on)soundOff();if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});},sig);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&on&&ctx)ctx.suspend().catch(()=>{});else if(!document.hidden&&on)wake();},sig);

  return function unmount(){
    gone.abort();clearInterval(ticker);
    if(on){on=false;duck(false);}
    const c=ctx,e=engine;engine=null;ctx=null;loading=null;
    if(e)e.volume(0,.2);
    if(c&&c.state!=='closed')setTimeout(()=>{c.close().catch(()=>{});},400);
  };
}

const own=document.querySelector('[data-field-guide]');
if(own&&!own.closest('.sheet-body'))mount(own);
