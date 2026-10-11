import {RNBOSound} from './rnbo-engine.mjs';
const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let errorMessage='',engine,initializing,enabled=false,loaded=false,busy=false,chapter='reading',visited=false,original=false,motion=0,lastY=scrollY,lastScroll=0,frame=0;
const marks=[],journey=[];
const state=()=>original?'original':chapter==='stage'?'passing':visited?'returning':'first';
async function getEngine(){if(engine)return engine;if(!initializing){const C=window.AudioContext||window.webkitAudioContext;const candidate=new RNBOSound(new C());initializing=candidate.init().then(e=>(engine=e)).catch(e=>{candidate.dispose();initializing=null;throw e;});}return initializing;}
function update(){
 document.body.dataset.playing=String(enabled);document.body.dataset.memory=String(visited&&chapter==='reading');
 $('sound').setAttribute('aria-pressed',String(enabled));$('sound-label').textContent=enabled?'暂停声音':'开启声音';
 $('begin').textContent=busy?'正在加载…':!loaded?'先选择一段声音 ↗':enabled?'正在聆听 · 向下浏览 ↓':'开启声音，开始浏览 ↗';
 $('begin').setAttribute('aria-pressed',String(enabled));$('audio-file').disabled=busy;$('begin').disabled=busy;$('sound').disabled=busy;$('replay').disabled=!loaded||busy;$('compare').disabled=!enabled;
 $('compare').setAttribute('aria-pressed',String(original));$('compare').textContent=original?'回到当前声场':'对照初始声音';
 const label={first:'初见：声音还保留最初的轮廓。',passing:'经过：颗粒逐渐展开，声音变得稠密。',returning:'回返：你经过的地方，仍留在声音里。',original:'对照：暂时退去颗粒与空间处理。'};
 $('chapter-state').textContent=errorMessage||(enabled?label[state()]:loaded?'声音已就绪。点击开启，开始浏览。':'选择一段吉他、键盘或环境录音开始。');
 $('phrase-state').textContent=enabled?state().toUpperCase():'SOUND IS OFF';$('journey').textContent=journey.join(' → ')||'等待第一笔';
}
function apply(){engine?.setState(state(),motion);update();}
function stop(){enabled=false;engine?.volume(0);engine?.stop();engine?.context.suspend();update();}
async function play(){if(busy)return;if(!loaded){$('audio-file').click();return;}busy=true;errorMessage='';update();try{await engine.context.resume();engine.start();engine.volume(Number($('volume').value)/100);enabled=true;if(!journey.length)journey.push(chapter==='stage'?'02':'01');if(chapter==='stage')visited=true;apply();}catch(e){errorMessage='无法播放：'+e.message;enabled=false;}finally{busy=false;update();}}
$('audio-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;stop();errorMessage='';busy=true;loaded=false;update();try{const e=await getEngine();$('engine-status').textContent='MAX / RNBO · 引擎已连接';await e.load(file);loaded=true;$('file-name').textContent=file.name;$('engine-status').textContent=e.combined?'MAX / RNBO · GRANULAR → OVERDRIVE → PLATE REVERB':'MAX / RNBO · JR-GRANULAR';}catch(e){$('file-name').textContent='无法读取音频：'+e.message;}finally{busy=false;update();}});
$('begin').addEventListener('click',()=>enabled?stop():play());$('sound').addEventListener('click',()=>enabled?stop():play());$('replay').addEventListener('click',play);
$('volume').addEventListener('input',()=>{if(enabled)engine.volume(Number($('volume').value)/100);});$('compare').addEventListener('click',()=>{original=!original;apply();});
$('reset').addEventListener('click',()=>{visited=false;original=false;marks.length=journey.length=0;if(enabled)journey.push('01');chapter='reading';motion=0;window.scrollTo({top:0,behavior:'instant'});lastY=0;apply();});
addEventListener('scroll',()=>{const now=performance.now(),delta=Math.abs(scrollY-lastY);lastY=scrollY;motion=Math.min(1,delta/Math.max(16,now-lastScroll)*.25);lastScroll=now;
 const next=$('stage').getBoundingClientRect().top<innerHeight*.45?'stage':'reading';if(next!==chapter){chapter=next;original=false;if(enabled){if(next==='stage')visited=true;journey.push(next==='stage'?'02':'01');if(journey.length>12)journey.shift();}apply();}
 if(enabled){engine.setState(state(),motion);marks.push({y:scrollY,state:state(),motion});if(marks.length>60)marks.shift();}
},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});addEventListener('pagehide',()=>{stop();});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:reduced?'instant':'smooth'});}));
function draw(now){const c=$('score'),ctx=c.getContext('2d'),w=c.clientWidth,h=c.clientHeight,d=Math.min(devicePixelRatio||1,2);if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d);}ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);ctx.strokeStyle='#5a688055';ctx.beginPath();marks.forEach((m,i)=>{const x=5+i/60*(w-10),y=h/2+Math.sin(i*.55)*(.2+m.motion)*h*.35;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();
 if(enabled&&engine){const a=new Float32Array(512);engine.analyser.getFloatTimeDomainData(a);c.dataset.signal=String(Math.max(...a.map(Math.abs)));c.dataset.engine='RNBO';c.dataset.state=state();c.dataset.mix=String(engine.device.parametersById.get(engine.prefix+'mix')?.value);if(now-lastScroll>400&&motion>0){motion*=.9;engine.setState(state(),motion);}}
 if(!document.hidden)frame=requestAnimationFrame(draw);}
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden)frame=requestAnimationFrame(draw);});update();frame=requestAnimationFrame(draw);
