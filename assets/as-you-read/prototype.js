import { ReadingMemory } from './memory-model.mjs';
import { ReadingAudio } from './audio-engine.mjs';

const $=id=>document.getElementById(id);
const memory=new ReadingMemory(), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let engine=null,enabled=false,chapter='reading',original=false,phrase=null,noteTimers=[],settleTimer,chapterTimer,lastPhrase=0,lastY=scrollY,transitioning=false;
const marks=[];let lastDraw=0;
const offsets=[0,.64,1.28,2.08];
const clearPhrase=()=>{noteTimers.forEach(clearTimeout);noteTimers=[];engine?.stop();};

function updateUI(){
  const returned=chapter==='reading' && memory.heardStage;
  document.body.dataset.playing=String(enabled);document.body.dataset.memory=String(returned);
  $('sound').setAttribute('aria-pressed',String(enabled));
  $('sound-label').textContent=enabled?'关闭声音':'开启声音';
  $('begin').textContent=enabled?'声音已开启 · 向下浏览 ↓':'开启声音，开始浏览 ↗';
  $('begin').setAttribute('aria-pressed',String(enabled));
  $('replay').disabled=!enabled;$('compare').disabled=!enabled||!returned;
  $('compare').setAttribute('aria-pressed',String(original));
  $('compare').textContent=original?'听回返的音色':'对照原始音色';
  $('chapter-state').textContent=!enabled?'开启声音，听见浏览留下的变化。':chapter==='stage'?'第二章：旋律相同，音色慢慢展开。':returned?original?'对照：这是第一次经过时的音色。':'回来了。旋律未变，带回一层新音色。':'第一章：四个音，留下最初的轮廓。';
  $('journey').textContent=memory.journey.length?memory.journey.map(c=>c==='reading'?'01':'02').join(' → '):'等待第一笔';
  $('phrase-state').textContent=enabled?(original?'ORIGINAL':returned?'WITH A MEMORY':chapter==='stage'?'ANOTHER COLOUR':'FIRST READING'):'SOUND IS OFF';
}

function playPhrase(){
  if(!enabled || document.hidden || !engine)return;
  clearPhrase();phrase=memory.phrase(chapter,original);lastPhrase=performance.now();
  const start=engine.context.currentTime+.06;
  phrase.pitches.forEach((pitch,i)=>{
    engine.note(pitch,phrase.timbre,start+offsets[i],1.55+phrase.timbre*.35);
    noteTimers.push(setTimeout(()=>{
      if(!enabled)return;
      marks.push({pitch,timbre:phrase.timbre,time:performance.now(),chapter});
      if(marks.length>24)marks.shift();
      draw();
    },offsets[i]*1000+60));
  });
  updateUI();draw();
}

async function soundOn(){
  if(transitioning)return;transitioning=true;
  try{
    if(!engine){const Context=window.AudioContext||window.webkitAudioContext;if(!Context)throw new Error('unsupported');engine=new ReadingAudio(new Context());}
    await engine.context.resume();
    if(engine.context.state!=='running')throw new Error('suspended');
    if(document.hidden){soundOff();return;}
    enabled=true;engine.volume(Number($('volume').value)/100);playPhrase();
  }catch{enabled=false;updateUI();$('chapter-state').textContent='声音暂时无法启动，请点击重试或使用 Chrome / Safari。';}
  finally{transitioning=false;}
}
function soundOff(){enabled=false;clearPhrase();engine?.volume(0);updateUI();draw();}
$('sound').addEventListener('click',()=>enabled?soundOff():soundOn());
$('begin').addEventListener('click',()=>{if(!enabled)soundOn();});
$('volume').addEventListener('input',()=>{if(enabled)engine?.volume(Number($('volume').value)/100);});
$('replay').addEventListener('click',playPhrase);
$('compare').addEventListener('click',()=>{original=!original;playPhrase();});
$('reset').addEventListener('click',()=>{
  clearTimeout(chapterTimer);clearTimeout(settleTimer);clearPhrase();memory.reset();marks.length=0;original=false;chapter='reading';
  window.scrollTo({top:0,behavior:'instant'});lastY=0;if(enabled)playPhrase();else{updateUI();draw();}
});
function targetChapter(){return $('stage').getBoundingClientRect().top<innerHeight*.46?'stage':'reading';}
function checkChapter(){
  const target=targetChapter();clearTimeout(chapterTimer);
  if(target===chapter)return;
  chapterTimer=setTimeout(()=>{
    if(targetChapter()!==target)return;
    chapter=target;original=false;if(enabled)playPhrase();else updateUI();
  },280);
}
addEventListener('scroll',()=>{
  const delta=Math.abs(scrollY-lastY);lastY=scrollY;
  if(enabled)engine?.motion(Math.min(1,delta/100));
  checkChapter();clearTimeout(settleTimer);
  settleTimer=setTimeout(()=>{
    engine?.motion(0);
    // A finite phrase at rest; silence is allowed after it ends.
    if(enabled&&performance.now()-lastPhrase>6500)playPhrase();
  },450);
},{passive:true});
addEventListener('resize',()=>{checkChapter();draw();});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){clearTimeout(settleTimer);clearTimeout(chapterTimer);soundOff();}
  else checkChapter();
});
addEventListener('pagehide',()=>{soundOff();engine?.context.suspend();});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
  event.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
}));

function draw(){
  const canvas=$('score'),ctx=canvas.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#5a688025';ctx.lineWidth=.6;
  [12,22,32].forEach(y=>{ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();});
  const visible=marks.slice(-12),step=Math.min(30,(w-20)/12);
  visible.forEach((m,i)=>{
    const x=12+i*step,y=33-(m.pitch-60)*2.1,age=(performance.now()-m.time)/1000;
    ctx.fillStyle=m.timbre>.2?'#5a6880':'#35353c';ctx.beginPath();ctx.ellipse(x,y,2.8,2,-.3,0,Math.PI*2);ctx.fill();
    if(m.timbre>.2){ctx.strokeStyle='#5a688065';ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.stroke();}
    if(enabled&&!reduced&&age<1.4){ctx.strokeStyle=`rgba(90,104,128,${Math.max(0,.4-age*.28)})`;ctx.beginPath();ctx.arc(x,y,5+age*8,0,Math.PI*2);ctx.stroke();}
  });
  if(engine&&enabled){const bytes=new Float32Array(engine.analyser.fftSize);engine.analyser.getFloatTimeDomainData(bytes);canvas.dataset.signal=String(Math.max(...bytes.map(Math.abs)));}
  canvas.dataset.timbre=String(phrase?.timbre??0);canvas.dataset.chapter=chapter;canvas.dataset.notes=String(marks.length);
}
function frame(t){if(t-lastDraw>45){draw();lastDraw=t;}if(enabled&&!document.hidden&&!reduced)requestAnimationFrame(frame);else animating=false;}
let animating=false;
new MutationObserver(()=>{if(enabled&&!animating&&!reduced){animating=true;requestAnimationFrame(frame);}}).observe(document.body,{attributes:true,attributeFilter:['data-playing']});
chapter=targetChapter();updateUI();draw();
