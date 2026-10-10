import test from 'node:test';
import assert from 'node:assert/strict';
import { ReadingMemory, MOTIF } from '../assets/as-you-read/memory-model.mjs';

test('a return keeps the original pitches but carries stage colour',()=>{
  const m=new ReadingMemory(), first=m.phrase('reading'), stage=m.phrase('stage'), returned=m.phrase('reading');
  assert.deepEqual(returned.pitches,first.pitches);
  assert.equal(first.timbre,0);assert.ok(returned.timbre>0&&returned.timbre<stage.timbre);
  assert.deepEqual(m.journey,['reading','stage','reading']);
});
test('A/B comparison preserves the visit memory and does not add visits',()=>{
  const m=new ReadingMemory();m.phrase('stage');m.phrase('reading');
  assert.equal(m.phrase('reading',true).timbre,0);
  assert.equal(m.phrase('reading').timbre,.62);
  assert.deepEqual(m.journey,['stage','reading']);
});
test('repeated listening is not another visit and reset removes carried colour',()=>{
  const m=new ReadingMemory();m.phrase('reading');m.phrase('reading');assert.equal(m.journey.length,1);
  m.phrase('stage');m.reset();assert.equal(m.phrase('reading').timbre,0);assert.deepEqual(m.journey,['reading']);
});
test('invalid input does not mutate memory; output notes cannot mutate the motif',()=>{
  const m=new ReadingMemory();assert.throws(()=>m.phrase('unknown'));assert.deepEqual(m.journey,[]);
  m.phrase('reading').pitches[0]=99;assert.equal(MOTIF[0],60);
});
