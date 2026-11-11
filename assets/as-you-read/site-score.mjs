/* The page as a score. Each section has its own bed (a looping pad) and its own
   treatment; the pointer, scroll, dwell and revisits colour it; a detail sheet
   draws the sound in close; a playing video asks it to step aside. */
import {RNBOSound} from './rnbo-engine.mjs?v=4';

const LIB='assets/as-you-read/vendor/rnbo-1.3.5.min.js';
const BEDS='assets/as-you-read/beds/';
const FALLBACK='assets/as-you-read/source.mp3';
const LABEL={top:'Arrival',projects:'Projects',music:'Stage',story:'Story',contact:'Hello',detail:'Close'};

/* bed = which pad plays underneath; the rest is the treatment on top
   one calm, steady piece in related keys (D · A · G), with Story as the large moment:
   top      — calm, warm, sparse (first impression)
   projects — the same calm with a soft pulse underneath
   music    — a little wider and warmer
   story    — grand: a low layer opens up, a big bright room, slow
   contact  — almost silent (quiet goodbye) */
const SCENES={
  top:     {bed:'top',     mix:4, grainSize:120,grainPos:60,  interval:280,pitch:0,  width:70,drive:0, bass:-12,mid:0,  treble:4,  wet:45,decay:60,size:75,damp:35,jitter:2,  melodyRate:2400,rainRate:1.5},
  projects:{bed:'projects',mix:10,grainSize:80, grainPos:40,  interval:60, pitch:0,  width:55,drive:0, bass:-8, mid:2,  treble:3,  wet:30,decay:40,size:45,damp:45,jitter:2,  melodyRate:2000,rainRate:1.2},
  music:   {bed:'music',   mix:22,grainSize:600,grainPos:350, interval:90, pitch:0,  width:90,drive:1, bass:-6, mid:2,  treble:3,  wet:50,decay:65,size:80,damp:35,jitter:3,melodyRate:2000,rainRate:1},
  story:   {bed:'story',   mix:8, grainSize:900,grainPos:500, interval:300,pitch:12, width:100,drive:0, bass:-2, mid:0,  treble:4,  wet:68,decay:88,size:100,damp:30,jitter:3,melodyRate:3200,rainRate:2.5},
  contact: {bed:'contact', mix:2, grainSize:200,grainPos:100, interval:350,pitch:0,  width:60,drive:0, bass:-14,mid:0,  treble:3,  wet:40,decay:50,size:60,damp:40,jitter:2,  melodyRate:2800,rainRate:1.2},
  detail:  {bed:null,      mix:2, grainSize:300,grainPos:120, interval:300,pitch:0,  width:50,drive:0, bass:-14,mid:0,  treble:6,  wet:35,decay:45,size:50,damp:40,jitter:3,  melodyRate:3000,rainRate:1.5},
};
/* melody: one high scale per section (Hz), played by the page itself above the bed */
const SCALES={
  top:     [587.33,659.26,739.99,880.00,987.77,1174.7,1318.5],   /* D5 E5 F#5 A5 B5 D6 E6  — D major, open */
  projects:[880.00,987.77,1108.7,1318.5,1480.0,1760.0,1975.5],   /* A5 B5 C#6 E6 F#6 A6 B6 — A major (the dominant) */
  music:   [783.99,880.00,987.77,1174.7,1318.5,1568.0,1760.0],   /* G5 A5 B5 D6 E6 G6 A6   — G major (the subdominant) */
  story:   [587.33,659.26,739.99,880.00,987.77,1174.7,1318.5],   /* D5 E5 F#5 A5 B5 D6 E6  — home key, made large by the bed */
  contact: [783.99,880.00,987.77,1174.7,1318.5,1480.0,1568.0],   /* G5 A5 B5 D6 E6 F#6 G6  — Gmaj7, a soft close */
};
const RATIOS=[2.01,3.0,1.5,3.52];   /* FM ratios: bell, glassy, hollow, metallic */
/* the visitor's local time of day: 0 night, 1 day, with dawn 5:30–8 and dusk 18–20:30 */
const TIME_OVERRIDE=new URLSearchParams(location.search).get('time');   /* ?time=day or ?time=night to audition either */
const daylight=()=>{if(TIME_OVERRIDE==='day')return 1;if(TIME_OVERRIDE==='night')return 0;const d=new Date(),h=d.getHours()+d.getMinutes()/60,ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};return ss(5.5,8,h)*(1-ss(18,20.5,h));};
const FOCUS='.proj-card,.music-cover,.music-track,.me-photo,.story-visual,.hero-action,.me-link';

const button=document.querySelector('.nav-sound');
if(button){
  const sections=Object.keys(SCENES).filter(id=>id!=='detail').map(id=>[id,document.getElementById(id)]).filter(([,el])=>el);
  let engine=null,ctx=null,enabled=false,busy=false,ticker=0,ducked=false,detail=false;
  let scene='top',visits={top:1},since=performance.now(),lastInput=performance.now();
  let motion=0,focus=0,focusTarget=0,swell=0,turn=0,drift=0,hoverPitch=0;
  let hx=0,vy=0,pan=.5,tilt=.5,wipe=0,wipeVel=0;   /* pointer: signed velocities, position, glass wiping */
  let panner=null,whoosh=null,rain=null,synth=false;
  let melody=null,melodyClock=1800,degree=2,octave=0,scale='top',prevFocus=0,bloom=false,wipeCool=0;
  let stutter=0,strumAcc=0,strumDir=1,strumCool=0,strums=0,arpClock=9000;   /* click stutter, scroll strum, dwell arpeggio */
  let prevIdle=0,travelled=0,settleTimer=0,cadenced=false,away=false,tickCool=0,idleClock=0,idlePhrase=0;
  let moveDir=0,prevMoveDir=0,moveFigCool=0,moveSpeed=0;
  let hoverEl=null,hoverPending=null,birdClock=4000,greeted=false;   /* hover knock, the visitor's own bird */
  /* the visitor's own bird: a four-note call picked once and kept in this browser, so the same
     bird greets the same person every time they come back (sung in whatever key the section is in) */
  const birdCall=(()=>{let c=null;try{c=JSON.parse(localStorage.getItem('ayr-bird')||'null');}catch(e){}
    if(!Array.isArray(c)||c.length!==4){c=[0,1,2,3].map(()=>Math.floor(Math.random()*7));try{localStorage.setItem('ayr-bird',JSON.stringify(c));}catch(e){}}
    return c;})();
  let returning=false;try{returning=Number(localStorage.getItem('ayr-visits')||0)>0;localStorage.setItem('ayr-visits',String(Number(localStorage.getItem('ayr-visits')||0)+1));}catch(e){}
  /* each card, cover or link knocks with its own note: the same element always gets the same pitch */
  const knockOf=el=>{const k=(el.getAttribute('href')||'')+(el.textContent||'').slice(0,40);let h=0;for(let i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))|0;return Math.abs(h)%7;};
  let lastY=scrollY,lastScroll=performance.now(),px=0,py=0,lastMove=0;
  const beds={};                       /* id → {source,gain} once loaded */
  let bedId=null,bedsReady=false,scope=null,lastLvl='';

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
    strumAcc+=delta;strumDir=dy<0?-1:1;                         /* scrolling strums the scale, one note per ~140px */
    travelled+=delta;clearTimeout(settleTimer);                 /* a long scroll that comes to rest lands on the root */
    settleTimer=setTimeout(()=>{if(travelled>500&&enabled)note(pitchOf(0),{vel:.2,dur:3.2,ratio:1.5});travelled=0;},260);
    lastY=scrollY;lastScroll=now;touch();
  },{passive:true});
  addEventListener('pointermove',e=>{
    const now=performance.now(),dt=Math.max(8,now-lastMove),dx=e.clientX-px,dy=e.clientY-py;
    if(lastMove){
      const spd=Math.hypot(dx,dy)/dt;
      motion=Math.max(motion,Math.min(1,spd*.05));
      moveSpeed+=(Math.min(1,spd*.04)-moveSpeed)*.15;
      hx=Math.max(-1,Math.min(1,hx+dx/dt*.12));
      vy=Math.max(-1,Math.min(1,vy+dy/dt*.12));
      moveDir=Math.atan2(dy,dx);
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
    if(el&&el!==hoverEl)hoverPending=el;hoverEl=el;
  });
  document.addEventListener('pointerdown',e=>{if(e.target.closest('[data-hover],a,button')){swell=1;bloom=true;}touch();});
  addEventListener('keydown',touch,{passive:true});

  /* ---------- melody : a high FM bell the page plays ----------
     In synth mode (score-synth patch loaded) all sound comes from Max/RNBO and each MIDI
     channel has its own timbre in [p voice]: 1 melody · 2 scroll strum · 3 chords · 4 glass wipe
     · 5 story steps · 6 rain. Continuous state goes via the score/* params. */
  /* voices are tracked by their end time on the audio clock, not by 'ended' events, so the count
     can't drift; when the pool is full the oldest voice is faded out to make room — a new note
     is never dropped, so a gesture always gets its pitch */
  const MAX_VOICES=40,voices=[];
  function claim(env,oscs,end){
    const now=engine.context.currentTime;
    for(let i=voices.length-1;i>=0;i--)if(voices[i].end<=now)voices.splice(i,1);
    while(voices.length>=MAX_VOICES){
      const v=voices.shift();
      v.env.gain.cancelScheduledValues(now);v.env.gain.setTargetAtTime(0,now,.02);
      v.oscs.forEach(o=>{try{o.stop(now+.12);}catch(e){}});
    }
    voices.push({env,oscs,end});
  }
  function note(freq,{vel=.4,dur=2.6,bright=1,when=0,ratio=2.01,ch=1}={}){
    if(ducked||!engine||!enabled)return;                        /* sound off = context suspended: notes made now would pile up and all fire on resume */
    if(synth){
      const midi=Math.round(69+12*Math.log2(freq/440))-(ch===4||ch===6||ch===8?0:12),   /* an octave lower: calmer, warmer (glass, rain and the bird stay up) */
            v=Math.max(1,Math.min(127,Math.round(vel*200*(.85+.15*bright))));   /* brighter gestures play harder: the voice opens up with velocity */
      const t=engine.context.currentTime*1000+when*1000,status=0x90|((ch-1)&15);
      engine.device.scheduleEvent(new RNBO.MIDIEvent(t,0,[status,midi,v]));
      engine.device.scheduleEvent(new RNBO.MIDIEvent(t+dur*1000,0,[status,midi,0]));
      return;
    }
    if(!melody)return;
    const c=engine.context,t=c.currentTime+when;
    const car=c.createOscillator(),car2=c.createOscillator(),mod=c.createOscillator(),mg=c.createGain(),env=c.createGain();
    car.frequency.value=freq;car2.frequency.value=freq*1.004;mod.frequency.value=freq*ratio;
    mg.gain.setValueAtTime(freq*.8*bright,t);mg.gain.exponentialRampToValueAtTime(freq*.015,t+dur*.7);
    mod.connect(mg);mg.connect(car.frequency);mg.connect(car2.frequency);
    env.gain.setValueAtTime(0,t);env.gain.linearRampToValueAtTime(vel*.22,t+.04);env.gain.exponentialRampToValueAtTime(.0003,t+dur*1.1);
    car.connect(env);car2.connect(env);env.connect(melody.in);
    [car,car2,mod].forEach(o=>{o.start(t);o.stop(t+dur*1.1+.1);});
    claim(env,[car,car2,mod],t+dur*1.1+.1);
    car.onended=()=>{env.disconnect();mg.disconnect();};
  }
  const pitchOf=(deg,oct=octave)=>{const s=SCALES[scale];return s[((deg%s.length)+s.length)%s.length]*Math.pow(2,oct+Math.floor(deg/s.length));};
  /* the melody walks the scale: mostly a step at a time toward where the pointer sits (left = low, right = high),
     sometimes two, sometimes up an octave; about half the notes bring an answering voice or a little run */
  function drip(){
    const target=Math.round(pan*6),step=Math.random()<.2?2:1;
    degree+=Math.random()<.6?(Math.sign(target-degree)||(Math.random()<.5?-1:1))*step:(Math.random()<.5?-step:step);
    degree=Math.max(0,Math.min(6,degree));octave=Math.random()<.15+.25*motion?1:0;
    const ratio=RATIOS[Math.random()<.5?0:Math.random()<.45?2:Math.random()<.7?1:3];
    const dur=scene==='story'?5.5:3.2+Math.random()*2.2,vel=.28+.2*Math.random();
    note(pitchOf(degree),{vel,dur,bright:.7+.5*motion,ratio});
    const r=Math.random();
    if(r<.35)note(pitchOf(degree+(Math.random()<.5?2:-2)),{vel:vel*.75,dur:dur*.9,when:.22,ratio});
    else if(r<.52)[1,2].forEach(i=>note(pitchOf(degree+i),{vel:vel*.65,dur:dur*.7,when:.16*i,ratio}));
  }
  function motif(up){const rh=[0,.16,.36,.54];for(let i=0;i<4;i++)note(pitchOf(up?i*2:6-i*2),{vel:.4,dur:4,when:rh[i],ratio:RATIOS[i%2]});}
  function figure(){for(let i=0;i<3;i++)note(pitchOf(degree+i),{vel:.38,dur:2.4,when:i*.11,bright:1.1});}
  function chord(){[0,2,4,6].forEach((d,i)=>note(pitchOf(d,i===3?1:0),{vel:.35,dur:5.5+i*.5,when:i*.03,ratio:i===3?3.0:2.01,ch:3}));}
  function arpeggio(){const up=Math.random()<.5;for(let i=0;i<5;i++)note(pitchOf(up?i:6-i,i===4?1:0),{vel:.28,dur:3,when:i*.48,ratio:1.5});}
  /* a run from where the melody is to a new root: used when the page travels (nav links, sheets) */
  function glide(toHz,{steps=6,span=.42,vel=.18,ratio=3.0}={}){
    const from=pitchOf(degree);
    for(let i=0;i<steps;i++){const u=i/(steps-1);note(from*Math.pow(toHz/from,u),{vel:vel*(1-.4*u),dur:.6+u*1.6,when:u*span,ratio,bright:1.2});}
  }

  /* ---------- raindrop : a tuned plink on a scale tone ---------- */
  function droplet(){
    if(!engine||ducked||!enabled)return;
    const s=SCALES[scale];
    const freq=s[Math.floor(Math.random()*s.length)]*(Math.random()<.25?2:1);
    const dur=.3+Math.random()*.5;
    if(synth){
      note(freq,{vel:rain.vol*.6,dur,ch:6});return;
    }
    if(!rain)return;
    const c=engine.context,t=c.currentTime;
    const vol=rain.vol;
    const osc=c.createOscillator(),osc2=c.createOscillator(),env=c.createGain();
    const pan=c.createStereoPanner();
    osc.type='sine';osc2.type='sine';
    osc.frequency.value=freq;osc2.frequency.value=freq*1.003;
    env.gain.setValueAtTime(0,t);
    env.gain.linearRampToValueAtTime(vol*(.08+Math.random()*.08),t+.003);
    env.gain.exponentialRampToValueAtTime(.0001,t+dur);
    pan.pan.value=(Math.random()*2-1)*.7;
    osc.connect(env);osc2.connect(env);env.connect(pan);pan.connect(rain.bus);
    osc.start(t);osc2.start(t);osc.stop(t+dur+.05);osc2.stop(t+dur+.05);
    claim(env,[osc,osc2],t+dur+.05);
    osc.onended=()=>{env.disconnect();pan.disconnect();};
  }

  /* ---------- selecting text : the highlight hums, and each dozen characters is read as a note ---------- */
  let selLen=0,drone=null;
  function hum(len){
    if(synth){
      /* in Max mode, score/select (0–1) drives the drone; Max reads it every tick */
      return;
    }
    if(!melody)return;const c=engine.context,t=c.currentTime;
    if(!drone){const osc=c.createOscillator(),osc2=c.createOscillator(),lp=c.createBiquadFilter(),g=c.createGain();
      osc.type='triangle';osc2.type='sine';lp.type='lowpass';lp.frequency.value=400;g.gain.value=0;
      osc.connect(lp);osc2.connect(lp);lp.connect(g);g.connect(melody.in);osc.start();osc2.start();drone={osc,osc2,lp,g};}
    const root=SCALES[scale][0]/2;
    drone.osc.frequency.setTargetAtTime(root,t,.15);drone.osc2.frequency.setTargetAtTime(root*1.5,t,.15);
    drone.g.gain.setTargetAtTime(Math.min(.07,len/500*.07),t,len?.25:.6);
    drone.lp.frequency.setTargetAtTime(380+Math.min(3000,len*7),t,.3);
  }
  document.addEventListener('selectionchange',()=>{
    const s=document.getSelection(),len=s&&!s.isCollapsed?String(s).length:0;
    if(len>selLen){const steps=Math.min(2,Math.floor(len/12)-Math.floor(selLen/12));
      for(let i=0;i<steps;i++){degree=Math.min(6,degree+1);note(pitchOf(degree),{vel:.15,dur:.9,bright:1.3,ratio:3.0,when:i*.06});}}
    selLen=len;hum(len);touch();
  });
  document.addEventListener('mouseup',()=>{if(selLen>24)[0,2,4].forEach((d,i)=>note(pitchOf(d),{vel:.14,dur:3.5,when:i*.04,ratio:1.5,ch:3}));});

  /* ---------- the rest of the page's gestures ---------- */
  /* nav links: a run toward the destination's root while the page travels there */
  document.querySelectorAll('nav a[href^="#"],.hero-action[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const to=SCALES[a.getAttribute('href').slice(1)];if(to)glide(to[0]);
  }));
  /* nav hover: the faintest tick */
  document.querySelectorAll('nav a,.nav-sound').forEach(a=>a.addEventListener('pointerenter',()=>{
    if(tickCool>0)return;tickCool=140;note(pitchOf(4,1),{vel:.1,dur:.2,ch:7});   /* a twig underfoot */
  }));
  /* pointer leaving the window: the room gets bigger and quieter until you come back */
  document.documentElement.addEventListener('mouseleave',()=>{away=true;if(enabled&&engine)engine.volume(level(),.5);});
  document.documentElement.addEventListener('mouseenter',()=>{away=false;if(enabled&&engine)engine.volume(level(),.4);});
  /* story chapters: each one that lights up gets its own note */
  const steps=[...document.querySelectorAll('.story-step')];
  if(steps.length)new MutationObserver(ms=>{for(const m of ms)if(m.target.classList.contains('active')){const i=steps.indexOf(m.target);note(pitchOf(i*2),{vel:.22,dur:2.6,ratio:1.5,ch:5});note(pitchOf(i*2+4),{vel:.12,dur:2.6,when:.12,ratio:1.5,ch:5});}})
    .observe(document.querySelector('.story-steps')||document.body,{attributes:true,attributeFilter:['class'],subtree:true});

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
    hx*=.88;vy*=.88;wipeVel*=.75;wipe*=.985;stutter*=.86;      /* wipe lingers ~6 s, like a clearing that fogs back */
    const lfo=Math.sin(now/9000),lfo2=Math.sin(now/23000+1.3),lfo3=Math.sin(now/37000+2.7),lfo4=Math.sin(now/15000+.8);
    const b=SCENES[scene];
    const residue=scene==='detail'?0:Math.min(1,((visits[scene]||1)-1)*.5);
    const dwell=Math.min(1,(now-since)/45000);                  /* staying somewhere slowly thickens it */
    const open=scene==='story'?Math.min(1,(now-since)/2500):0;  /* Story's room opens within ~2.5 s */
    const idle=Math.max(0,Math.min(1,(now-lastInput-8000)/20000)); /* left alone, it settles toward the raw bed */
    const height=.5-tilt;                                       /* pointer high on the page: brighter; low: darker */
    /* melodic events: a slow drip of notes, plus figures for hover, click, wipe */
    melodyClock-=50;
    if(melodyClock<=0){drip();melodyClock=b.melodyRate*(1-.4*motion)*(1+.6*idle)*(.7+.6*Math.random());}
    if(hoverPending){const el=hoverPending;hoverPending=null;
      if(synth)note(pitchOf(knockOf(el)),{vel:.22,dur:.25,ch:7});   /* each thing on the page knocks with its own note */
      else if(!prevFocus)figure();}
    prevFocus=focusTarget;
    if(bloom){bloom=false;chord();stutter=1;}
    /* scroll strum: each ~140px plucks the next scale step, down = rising, up = falling */
    strumCool-=50;
    if(strumAcc>=140&&strumCool<=0){strumAcc=0;strumCool=150;strums++;degree=Math.max(0,Math.min(6,degree+strumDir));note(pitchOf(degree),{vel:.26+.12*motion,dur:1.2,bright:1+.5*motion,ratio:RATIOS[1],ch:2});}
    else if(strumAcc<140)strumAcc*=.9;
    /* staying somewhere, the page occasionally plays an arpeggio by itself */
    arpClock-=50;if(arpClock<=0){arpClock=14000+Math.random()*10000;if(dwell>.15&&scene!=='detail')arpeggio();}
    tickCool-=50;moveFigCool-=50;
    /* idle generative layer: when nobody interacts, the score breathes on its own */
    idleClock-=50;
    if(idle>.3&&idleClock<=0&&synth){note(pitchOf(Math.floor(Math.random()*3),-1),{vel:.18,dur:6,bright:.5,ch:3});idleClock=14000+Math.random()*10000;}
    if(idle>.3&&idleClock<=0&&!synth){
      idlePhrase=(idlePhrase+1)%5;
      if(idlePhrase===0){const d=Math.floor(Math.random()*7);note(pitchOf(d),{vel:.22+.1*idle,dur:4.5+Math.random()*3,ratio:1.5,bright:.7});}
      else if(idlePhrase===1){const d=Math.floor(Math.random()*5);[0,2].forEach((s,i)=>note(pitchOf(d+s),{vel:.18,dur:5,when:i*.3,ratio:2.01,bright:.6}));}
      else if(idlePhrase===2){for(let i=0;i<3;i++)note(pitchOf(i*2),{vel:.16+.06*i,dur:3.5,when:i*.55,ratio:1.5,bright:.8});}
      else if(idlePhrase===3){note(pitchOf(degree,-1),{vel:.24,dur:6,ratio:2.01,bright:.5});}
      else{const up=Math.random()<.5;for(let i=0;i<4;i++)note(pitchOf(up?i:6-i),{vel:.16,dur:2.8,when:i*.6,ratio:RATIOS[i%2],bright:.7});}
      idleClock=(2200+Math.random()*3000)*(1.3-idle*.4);
    }
    /* mouse movement: direction changes trigger a micro-ornament, speed shapes timbre */
    if(moveFigCool<=0&&motion>.3){
      const dirDelta=Math.abs(moveDir-prevMoveDir);
      if(dirDelta>1.2&&dirDelta<5){moveFigCool=1600;note(pitchOf(degree+Math.round(hx*2)),{vel:.16+.1*moveSpeed,dur:1.2+moveSpeed*1.5,ratio:moveSpeed>.5?3.0:2.01,bright:.9+.6*moveSpeed});}
    }
    prevMoveDir=moveDir;moveSpeed*=.92;
    /* coming back after being still: a small waking figure */
    if(prevIdle>.5&&idle===0){figure();idleClock=0;}prevIdle=idle;
    /* reaching the end of the page resolves once; scrolling back up re-arms it */
    const bottom=scrollY+innerHeight>=document.documentElement.scrollHeight-40;
    if(bottom&&!cadenced){cadenced=true;[0,2,4,6].forEach((d,i)=>note(pitchOf(d,i===3?1:0),{vel:.24,dur:6,when:i*.12,ratio:1.5,ch:3}));}
    else if(!bottom&&cadenced&&scrollY<document.documentElement.scrollHeight*.5)cadenced=false;
    birdClock-=50;
    if(synth&&birdClock<=0){
      const sing=!greeted||(idle>.4&&Math.random()<.5);
      if(sing){const n=greeted?4:(returning?4:2);for(let i=0;i<n;i++)note(pitchOf(birdCall[i],1),{vel:.3,dur:.12,when:i*.17+(i===3?.12:0),ch:8});greeted=true;}
      birdClock=greeted?(20000+Math.random()*15000):4000;
    }
    wipeCool-=50;if(wipeVel>.45&&wipeCool<=0){wipeCool=220;note(pitchOf(2+Math.floor(Math.random()*3),1),{vel:.22,dur:.7,bright:1.6,ch:4});}
    engine.setParams({
      mix:Math.max(2,Math.min(30,b.mix+5*residue+3*dwell-8*idle+4*motion+4*turn-10*wipe+2*lfo)),
      width:Math.min(100,b.width+20*motion),gain:-14,
      grainSize:b.grainSize*(1-.3*focus)*(1+.15*idle)*(1+.25*vy)*(1-.5*stutter)*(1+.15*lfo2+.08*lfo3),grainPos:b.grainPos*(1+.3*lfo2+.15*lfo4),
      interval:Math.max(20,b.interval*(1-.2*focus)*(1+.2*idle)*(1-.65*stutter)*(1+.1*lfo3)-15*motion-25*turn),
      pitch:b.pitch+hoverPitch*focus+(stutter>.35?12:0),          /* only consonant steps: sliding pitch is what made it sound haunted */
      'drive/drive':Math.max(0,b.drive+2*focus+2*turn-2*wipe),'drive/lowcut':34,'drive/highcut':40,'drive/mix':35,'drive/volume':0,
      'drive/bass':b.bass-4*height+2*lfo3,'drive/mid':b.mid+2*lfo4,'drive/treble':b.treble+4*focus+8*height+6*moveSpeed+6*wipe,'drive/midfreq':0,
      'reverb/mix':Math.min(85,b.wet+8*residue+4*dwell+18*swell+6*wipe+3*lfo+16*open),'reverb/decay':Math.min(100,b.decay+8*residue+6*dwell+3*lfo3+12*open),
      'reverb/size':Math.min(100,b.size+6*lfo+4*lfo3),'reverb/damp':Math.max(0,b.damp-25*wipe-8*moveSpeed),'reverb/diff':80,'reverb/jitter':b.jitter+4*moveSpeed,
    });
    if(synth){
      /* ── continuous parameters sent to Max every tick (50 ms) ──
         All values are normalized 0–1 unless noted.
         Group: scene
           score/scene     int 0–5  (top=0 projects=1 music=2 story=3 contact=4 detail=5) — jumps
           score/residue   0–1      how many times this section has been visited before
           score/dwell     0–1      how long the visitor has stayed in this section (0→1 over 45 s)
           score/away      0/1      pointer has left the browser window
         Group: interaction
           score/motion    0–1      recent scroll + pointer speed (decays ×.9 per tick)
           score/focus     0–1      pointer is over an interactive element (card, image, link)
           score/swell     0–1      a click just happened (decays ×.9)
           score/turn      0–1      the section just changed (decays ×.93)
           score/stutter   0–1      a button/link was clicked (decays ×.86)
         Group: pointer
           score/pan       0–1      pointer x position (0=left, 1=right)
           score/tilt      0–1      pointer y position (0=top, 1=bottom)
           score/hx        -1–1     pointer horizontal velocity
           score/vy        -1–1     pointer vertical velocity
           score/drift     -1–1     scroll direction accumulator (negative=up, positive=down)
           score/moveSpeed 0–1      pointer movement speed
           score/hoverPitch float   pitch offset from hovered element's data-pitch attribute
         Group: story glass wipe
           score/wipe      0–1      how much the glass has been wiped (lingers ~6 s)
           score/wipeVel   0–1      current wipe velocity
         Group: text selection
           score/select    0–1      length of selected text (0–400 chars mapped to 0–1)
         Group: state
           score/idle      0–1      time since last input (ramps 0→1 over 20 s after 8 s)
           score/duck      0/1      a video is playing, step aside
           score/bedRoot   Hz       root note of the current section's scale (÷4 for bass register)
           score/height    -0.5–0.5 pointer height (positive = high on page = brighter)
         Group: rain (Max handles rain synthesis in synth mode)
           score/rainRate  float    target drops per second for this section
           score/rainVol   0–1      target volume per drop
         Group: LFOs (slow modulation sources, use in Max for drift/shimmer)
           score/lfo1      -1–1     period  9 s
           score/lfo2      -1–1     period 23 s
           score/lfo3      -1–1     period 37 s
           score/lfo4      -1–1     period 15 s  */
      const SCENE_INDEX={top:0,projects:1,music:2,story:3,contact:4,detail:5};
      Object.assign(engine.targets,{
        'score/residue':residue,'score/dwell':dwell,'score/idle':idle,'score/away':away?1:0,
        'score/motion':motion,'score/focus':focus,'score/swell':swell,'score/turn':turn,'score/stutter':stutter,
        'score/pan':pan,'score/tilt':tilt,'score/hx':hx,'score/vy':vy,
        'score/drift':drift,'score/moveSpeed':moveSpeed,'score/hoverPitch':hoverPitch*focus,
        'score/wipe':wipe,'score/wipeVel':wipeVel,
        'score/select':Math.min(1,selLen/400),'score/duck':ducked?1:0,
        'score/bedRoot':SCALES[scale][0]/4,'score/height':height,
        'score/rainRate':b.rainRate||0,'score/rainVol':.2,
        'score/lfo1':lfo,'score/lfo2':lfo2,'score/lfo3':lfo3,'score/lfo4':lfo4,'score/daylight':daylight(),
      });
      const p=engine.device.parametersById.get('score/scene');if(p)p.value=SCENE_INDEX[scene];
    }
    {
      if(synth&&!rain)rain={vol:0,clock:0};
      if(rain){
        const dps=b.rainRate||0;
        rain.vol=.2*(1-.6*ducked);
        if(dps>0){rain.clock-=50;if(rain.clock<=0){rain.clock=(1000/dps)*(.4+Math.random()*1.2);droplet();}}
      }
    }
    if(panner){const t=engine.context.currentTime;panner.pan.setTargetAtTime(.4*(pan-.5)*2,t,.08);}
    if(whoosh){const t=engine.context.currentTime;whoosh.gain.gain.setTargetAtTime(Math.min(.1,wipeVel*.15),t,wipeVel>whoosh.last?.02:.12);whoosh.filter.frequency.setTargetAtTime(1200+1200*(1-tilt),t,.05);whoosh.last=wipeVel;}
    if(b.bed&&b.bed!==bedId)crossfadeBed(b.bed);
    const a=scope||(scope=new Float32Array(engine.analyser.fftSize));engine.analyser.getFloatTimeDomainData(a);
    let peak=0;for(let i=0;i<a.length;i+=4)peak=Math.max(peak,Math.abs(a[i]));
    const lvl=Math.min(1,peak*6).toFixed(1);if(lvl!==lastLvl){lastLvl=lvl;button.style.setProperty('--lvl',lvl);}
    button.score={scene,bed:bedId,visits:{...visits},residue,dwell:+dwell.toFixed(2),idle:+idle.toFixed(2),motion:+motion.toFixed(2),focus:+focus.toFixed(2),swell:+swell.toFixed(2),turn:+turn.toFixed(2),drift:+drift.toFixed(2),hx:+hx.toFixed(2),vy:+vy.toFixed(2),pan:+pan.toFixed(2),tilt:+tilt.toFixed(2),wipe:+wipe.toFixed(2),peak:+peak.toFixed(3),ducked,melody:!!melody,scale,degree,strumAcc:Math.round(strumAcc),strums,targets:{...engine.targets}};
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
      const source=engine.context.createBufferSource(),gain=engine.context.createGain(),hp=engine.context.createBiquadFilter();
      source.buffer=buffer;source.loop=true;gain.gain.value=0;
      hp.type='highpass';hp.frequency.value=280;hp.Q.value=.7;
      source.connect(gain);gain.connect(hp);hp.connect(engine.device.node);source.start();
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
  function ensureContext(existing){
    if(existing&&existing.state!=='closed'){ctx=existing;ctx.resume();return ctx;}
    if(window.__scoreCtx&&window.__scoreCtx.state!=='closed'){ctx=window.__scoreCtx;delete window.__scoreCtx;ctx.resume();return ctx;}
    if(!ctx||ctx.state==='closed'){const C=window.AudioContext||window.webkitAudioContext;ctx=new C({latencyHint:'playback'});}
    ctx.resume();return ctx;
  }
  const level=()=>ducked?0:(away?0.1:0.2);
  async function start(){
    if(busy)return;busy=true;setState('loading');
    try{
      if(!engine){
        const context=ensureContext();
        await loadLib();
        const candidate=new RNBOSound(context);
        try{engine=await candidate.init(['score-synth','scene']);}catch(e){candidate.dispose();ctx=null;throw e;}
        synth=engine.device.parametersById.has('score/scene');
        /* pointer x pans the whole score a little */
        panner=context.createStereoPanner();engine.master.disconnect();engine.master.connect(panner);panner.connect(engine.analyser);
      }
      if(!whoosh&&!synth){const context=engine.context;
        /* a soft noise bed for the glass wipe, fed into the same chain so it gets granulated and reverberated */
        const len=context.sampleRate*2,buf=context.createBuffer(1,len,context.sampleRate),d=buf.getChannelData(0);
        let lp=0;for(let i=0;i<len;i++){lp+=((Math.random()*2-1)-lp)*.25;d[i]=lp;}
        const src=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();
        src.buffer=buf;src.loop=true;filter.type='bandpass';filter.frequency.value=1800;filter.Q.value=1.1;gain.gain.value=0;
        src.connect(filter);filter.connect(gain);gain.connect(engine.device.node);src.start();
        whoosh={src,filter,gain,last:0};
        /* melody bus: clean signal straight to master, bypassing the granular chain */
        const mIn=context.createGain(),mVerb=context.createConvolver(),mDry=context.createGain(),mWet=context.createGain();
        const mIrLen=context.sampleRate*2.5,mIrBuf=context.createBuffer(2,mIrLen,context.sampleRate);
        for(let ch=0;ch<2;ch++){const d=mIrBuf.getChannelData(ch);for(let i=0;i<mIrLen;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/mIrLen*3)*.3;}
        mVerb.buffer=mIrBuf;mDry.gain.value=.45;mWet.gain.value=.35;
        mIn.connect(mDry);mIn.connect(mVerb);mVerb.connect(mWet);
        mDry.connect(engine.master);mWet.connect(engine.master);
        melody={in:mIn};
        /* rain: noise-burst drops + subtle pink-noise bed (ref: slee1005/rain, noised) */
        const sr=context.sampleRate;
        const rainBus=context.createGain();rainBus.gain.value=1;
        const rainVerb=context.createConvolver();
        const rvLen=sr*2,rvBuf=context.createBuffer(2,rvLen,sr);
        const refs=[{t:.018,g:.6},{t:.032,g:.45},{t:.048,g:.35},{t:.065,g:.28},{t:.084,g:.2},{t:.106,g:.14}];
        for(let ch=0;ch<2;ch++){const d=rvBuf.getChannelData(ch);
          refs.forEach(r=>{const p=Math.floor(r.t*sr),w=Math.floor(.003*sr);for(let k=0;k<w&&p+k<rvLen;k++)d[p+k]+=(Math.random()*2-1)*r.g*Math.exp(-k/(sr*.001));});
          for(let i=Math.floor(.06*sr);i<rvLen;i++)d[i]+=(Math.random()*2-1)*Math.exp(-(i/sr)*3.2)*.4;
        }
        rainVerb.buffer=rvBuf;
        const rainDry=context.createGain(),rainWet=context.createGain();
        rainDry.gain.value=.6;rainWet.gain.value=.4;
        rainBus.connect(rainDry);rainBus.connect(rainVerb);rainVerb.connect(rainWet);
        rainDry.connect(engine.master);rainWet.connect(engine.master);
        rain={bus:rainBus,vol:0,clock:0};
      }
      await engine.context.resume();
      scene=detail?'detail':currentScene();visits[scene]=visits[scene]||1;since=performance.now();
      if(!synth&&!bedsReady)await loadBeds();
      compose();engine.volume(level(),.9);
      enabled=true;setState('on');setLabel(LABEL[scene]);
      clearInterval(ticker);ticker=setInterval(compose,50);
    }catch(e){setState('error');console.warn('[score]',e);}
    finally{busy=false;}
  }
  function stop(){
    if(enabled&&(melody||synth))[0,2,4].forEach((d,i)=>note(pitchOf(d),{vel:.2,dur:2.5,when:i*.05,ratio:1.5,ch:3}));   /* a soft release before the fade */
    enabled=false;clearInterval(ticker);setState('off');button.style.setProperty('--lvl',0);lastLvl='';
    if(!engine)return;
    engine.volume(0,.45);setTimeout(()=>{if(!enabled){stopBeds();engine.context.suspend();}},1600);
  }
  button.addEventListener('click',()=>{if(enabled)stop();else{ensureContext();start();}});
  document.addEventListener('score:enter',e=>{if(e.detail.sound){ensureContext(e.detail.audioCtx);start();}});
  /* a playing video asks the score to step aside; it returns when the video pauses or ends */
  document.addEventListener('score:duck',e=>{ducked=!!e.detail.on;if(enabled&&engine)engine.volume(level(),ducked?.3:.9);});
  /* a detail sheet draws the sound in close, then hands back to the section */
  document.addEventListener('score:detail',e=>{
    detail=!!e.detail.open;if(!detail)ducked=false;
    if(enabled&&engine){
      /* opening a sheet runs down into the close scene; closing runs back up to the section's root */
      glide(detail?SCALES[scale][0]/2:SCALES[scale][4],{steps:5,span:.5,vel:.16,ratio:1.5});
      compose();engine.volume(level(),.6);
    }
  });
  /* the score keeps playing while this tab is open, even in the background: following a link out
     to GitHub or a demo should not cut it. Only a playing video (ducking) or leaving the page stops it. */
  document.addEventListener('visibilitychange',()=>{
    if(!engine||!enabled||document.hidden)return;
    engine.context.resume().then(()=>engine.volume(level(),.6));
  });
  /* Android can suspend the context while the page is visible; any later touch wakes it */
  ['touchstart','mousedown'].forEach(ev=>addEventListener(ev,()=>{
    if(engine&&enabled&&engine.context.state==='suspended')engine.context.resume();
  },{passive:true}));
  addEventListener('pagehide',()=>{if(enabled)stop();});
}

/* shared with the Wood Wide Web project page, which plays the same patch with the same presets */
export {SCENES,SCALES,LABEL,LIB,daylight};
