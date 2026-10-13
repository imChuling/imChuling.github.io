import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {RNBOSound} from '../assets/as-you-read/rnbo-engine.mjs';
const patch=JSON.parse(await readFile(new URL('../assets/as-you-read/rnbo-export/scene.export.json',import.meta.url)));
const params=new Map(patch.desc.parameters.map(p=>[p.paramId,p]));
test('navigation presets respect actual exported parameter IDs and ranges',()=>{
 const e=new RNBOSound({});e.prefix=params.has('grain/mix')?'grain/':'';e.combined=params.has('reverb/mix');
 for(const state of ['first','passing','returning','original'])for(const motion of [-2,0,1,4]){
  e.setState(state,motion);
  for(const [id,v] of Object.entries(e.targets)){
   const p=params.get(id);assert.ok(p,`Missing export parameter ${id}`);
   assert.ok(v>=p.minimum&&v<=p.maximum,`${state} ${id}: ${v}`);
  }
  if(state==='original')assert.equal(e.targets[e.prefix+'mix'],0,'scroll must not introduce grains during dry comparison');
 }
});
test('return retains an intermediate granular mix after passing',()=>{
 const e=new RNBOSound({});e.prefix=params.has('grain/mix')?'grain/':'';e.combined=params.has('reverb/mix');
 e.setState('first');const first=e.targets[e.prefix+'mix'];
 e.setState('passing');const passing=e.targets[e.prefix+'mix'];
 e.setState('returning');assert.ok(e.targets[e.prefix+'mix']>first&&e.targets[e.prefix+'mix']<passing);
});
