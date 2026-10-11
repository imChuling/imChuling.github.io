// Browser hosting only. All creative DSP comes from the exported Max/RNBO patch.
export class RNBOSound {
  constructor(context) { this.context=context; this.device=null; this.source=null; this.buffer=null; this.timer=null; this.targets={}; this.values={}; }
  async init() {
    const response=await fetch('assets/as-you-read/rnbo-export/scene.export.json');
    if(!response.ok)throw new Error('RNBO export unavailable');
    const patcher=await response.json();
    this.device=await RNBO.createDevice({context:this.context,patcher});
    this.master=this.context.createGain(); this.master.gain.value=0;
    this.analyser=this.context.createAnalyser(); this.analyser.fftSize=512;
    this.device.node.connect(this.master);this.master.connect(this.analyser);this.analyser.connect(this.context.destination);
    this.prefix=this.device.parametersById.has('grain/mix')?'grain/':'';
    this.combined=this.device.parametersById.has('reverb/mix');
    this.setState('first',0);
    this.timer=setInterval(()=>this.smooth(),40);
    return this;
  }
  async load(file) {
    if(file.size>100*1024*1024)throw new Error('请选择小于 100 MB 的音频。');
    const buffer=await this.context.decodeAudioData(await file.arrayBuffer());
    this.stop();this.buffer=buffer;
  }
  start() {
    if(!this.buffer)throw new Error('先选择一段音频。');
    this.stop();this.source=this.context.createBufferSource();this.source.buffer=this.buffer;this.source.loop=true;this.source.connect(this.device.node);this.source.start();
  }
  stop() {if(this.source){this.source.stop();this.source.disconnect();this.source=null;}}
  volume(value){if(this.master)this.master.gain.setTargetAtTime(Math.max(0,Math.min(.5,value)),this.context.currentTime,.12);}
  setState(state,motion=0) {
    const presets={first:[35,65,180,90,100,0,18,42,58],passing:[85,100,360,260,45,-5,48,80,82],returning:[65,85,300,180,65,0,28,65,74],original:[0,65,180,90,100,0,0,0,58]};
    const [mix,width,grainSize,grainPos,interval,pitch,drive,wet,decay]=presets[state];
    motion=state==='original'?0:Math.max(0,Math.min(1,motion));
    const grain={mix:Math.min(95,mix+motion*8),width,grainSize,grainPos,interval:Math.max(20,interval-motion*15),pitch,gain:-12};
    this.targets=Object.fromEntries(Object.entries(grain).map(([k,v])=>[this.prefix+k,v]));
    if(this.combined)Object.assign(this.targets,{'drive/drive':drive,'drive/highcut':40,'drive/mix':state==='original'?0:90,'drive/volume':0,'reverb/mix':wet,'reverb/decay':decay,'reverb/size':75,'reverb/damp':65,'reverb/diff':80,'reverb/jitter':20});
  }
  smooth(){for(const [id,target] of Object.entries(this.targets)){const p=this.device.parametersById.get(id);if(!p)continue;const current=this.values[id]??p.value;const next=current+(target-current)*.07;p.value=next;this.values[id]=next;}}
  dispose(){clearInterval(this.timer);this.stop();this.device?.node.disconnect();this.context.close();}
}
