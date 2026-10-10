export class ReadingAudio {
  constructor(context){
    this.context=context; this.voices=new Set();
    this.output=context.createGain(); this.output.gain.value=.35;
    this.analyser=context.createAnalyser(); this.analyser.fftSize=256;
    this.output.connect(this.analyser); this.analyser.connect(context.destination);
    this.filter=context.createBiquadFilter(); this.filter.type='lowpass'; this.filter.frequency.value=2700;
    this.filter.connect(this.output);
    this.delay=context.createDelay(1); this.delay.delayTime.value=.28;
    this.wet=context.createGain(); this.wet.gain.value=.13;
    this.filter.connect(this.delay); this.delay.connect(this.wet); this.wet.connect(this.output);
  }
  volume(value){this.output.gain.setTargetAtTime(value,this.context.currentTime,.04);}
  motion(value){this.filter.frequency.setTargetAtTime(2700+Math.min(1,value)*1000,this.context.currentTime,.15);}
  note(midi,timbre,start,duration=1.5){
    const ctx=this.context, amp=ctx.createGain(), frequency=440*Math.pow(2,(midi-69)/12);
    const attack=.018+timbre*.17, gain=.16;
    amp.gain.setValueAtTime(0,start);
    amp.gain.linearRampToValueAtTime(gain,start+attack);
    amp.gain.exponentialRampToValueAtTime(.0001,start+duration);
    amp.connect(this.filter);
    const partials=[1-timbre*.25,.18-timbre*.08,.025+timbre*.32,timbre*.09,timbre*.12];
    const oscillators=partials.map((level,index)=>{
      const osc=ctx.createOscillator(), partial=ctx.createGain();
      osc.type='sine';osc.frequency.value=frequency*(index+1);partial.gain.value=level;
      osc.connect(partial);partial.connect(amp);osc.start(start);osc.stop(start+duration+.02);
      osc.onended=()=>{osc.disconnect();partial.disconnect();};return osc;
    });
    const voice={amp,oscillators};this.voices.add(voice);
    oscillators[0].addEventListener('ended',()=>{amp.disconnect();this.voices.delete(voice);});
  }
  stop(){
    const t=this.context.currentTime;
    for(const voice of this.voices){
      voice.amp.gain.cancelScheduledValues(t);voice.amp.gain.setTargetAtTime(0,t,.025);
      for(const osc of voice.oscillators){try{osc.stop(t+.12);}catch{}}
    }
  }
}
