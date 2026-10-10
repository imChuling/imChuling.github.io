export const MOTIF = Object.freeze([60, 64, 67, 62]);
export class ReadingMemory {
  constructor(){ this.reset(); }
  reset(){ this.heardStage=false; this.journey=[]; }
  phrase(chapter, original=false){
    if(!['reading','stage'].includes(chapter)) throw new Error('Unknown chapter');
    const returning=chapter==='reading' && this.heardStage;
    if(chapter==='stage') this.heardStage=true;
    if(!original && this.journey.at(-1)!==chapter) this.journey.push(chapter);
    this.journey=this.journey.slice(-9);
    return { chapter, pitches:[...MOTIF], timbre:original?0:chapter==='stage'?.9:returning?.62:0, returning, original };
  }
}
