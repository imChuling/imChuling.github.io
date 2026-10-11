"""Reuse the existing RNBO graph and improve its Max host UI; no DSP rewrite."""
import copy,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=copy.deepcopy(json.loads((root/'max/shoegaze-granular-study.maxpat').read_text())['patcher'])
p.update(rect=[80,80,1080,780],openinpresentation=1,presentation_rect=[0,0,1080,780],bgcolor=[.953,.949,.937,1],locked=1)
boxes={x['box']['id']:x['box'] for x in p['boxes']}
# Keep source data/settings in the old file; the new host uses the same loaded local audio.
placements={'obj-9':[40,120,650,175],'obj-6':[740,570,170,24],'obj-5':[745,370,85,130],'obj-13':[740,285,52,52]}
for id,rect in placements.items():
 b=boxes[id];b.update(presentation=1,presentation_rect=rect,patching_rect=rect)
boxes['obj-9']['clipheight']=173
for i,id in enumerate(['obj-16','obj-19','obj-17','obj-18','obj-3','obj-4','obj-7']):
 b=boxes[id];rect=[40+(i%2)*330,530+(i//2)*37,295,26]
 b.update(presentation=1,presentation_rect=rect,patching_rect=rect)
# Correct the accidentally selected host 'active' attribute back to the DSP 'width' parameter.
boxes['obj-3']['attr']='width'
for i in range(3):
 boxes[f'web-label-{i}']['presentation']=0
 boxes[f'web-preset-{i}'].update(presentation=0,patching_rect=[40,820+i*40,960,24])
boxes['source-credit'].update(presentation=0,patching_rect=[40,1020,960,50])
def add(id,kind,text,rect,**kw):
 b=dict(id=id,maxclass=kind,text=text,patching_rect=rect,presentation=1,presentation_rect=rect)
 b.update(kw);
 if kind=="comment":b.setdefault("textcolor",[.20,.23,.28,1])
 p['boxes'].append({'box':b});return b
def line(a,b,outlet=0,inlet=0):p['lines'].append({'patchline':{'source':[a,outlet],'destination':[b,inlet]}})
add('title','comment','AS YOU READ / Sound study',[40,28,920,42],fontsize=30,textcolor=[.15,.16,.18,1])
add('subtitle','comment','A passage changes what you hear when you return.',[40,78,860,24],fontsize=16,textcolor=[.35,.40,.50,1])
add('audio-note','comment','01  DROP AUDIO HERE • press its play triangle',[40,100,650,20],fontsize=11)
add('transport-note','comment','02  AUDIO ON / OFF',[740,245,255,24],fontsize=14)
add('gain-note','comment','OUTPUT • starts at −20 dB',[740,343,285,24],fontsize=12)
add('states-label','comment','03  CHOOSE A LISTENING STATE',[40,320,660,24],fontsize=14)
labels=['01  First reading','02  Passing through','03  Returning']
notes=['An initial, clearer impression.','Longer grains, more density, lower pitch.','Some of the texture remains.']
for i in range(3):
 x=40+i*220
 add(f'state-button-{i}','textbutton',labels[i],[x,358,205,52],texton=labels[i],mode=0,numinlets=1,numoutlets=3,outlettype=['','','int'],fontsize=15,bgcolor=[.35,.40,.50,1],textcolor=[1,1,1,1])
 line(f'state-button-{i}',f'web-preset-{i}')
 add(f'state-note-{i}','comment',notes[i],[x,421,205,47],fontsize=12,linecount=2)
add('controls-note','comment','FINE ADJUSTMENTS • existing JR-Granular parameters',[40,494,660,24],fontsize=12)
add('credits','comment','Sound engine: JR-Granular / szkkng · GPL-3.0. Interface & reading states adapted for Chuling Li.\nGranular layer only; distortion/reverb and browser export are still in progress.',[40,699,970,47],fontsize=11,linecount=2)
add('open-engine-button','textbutton','Open RNBO engine',[740,540,250,28],texton='Open RNBO engine',mode=0,numinlets=1,numoutlets=3,outlettype=['','','int'])
add('open-engine-message','message','open',[740,820,80,22],presentation=0,numinlets=2,numoutlets=1,outlettype=[''])
line('open-engine-button','open-engine-message');line('open-engine-message','obj-6')
add('init-gain','newobj','loadmess -20',[740,860,120,22],presentation=0,numinlets=1,numoutlets=1,outlettype=[''])
line('init-gain','obj-5')
# Opening the engine on load avoids relying on background double-click handling of the canvas.
add('init-open','newobj','loadbang',[740,900,80,22],presentation=0,numinlets=1,numoutlets=1,outlettype=['bang'])
add('defer-open','newobj','deferlow',[740,940,80,22],presentation=0,numinlets=1,numoutlets=1,outlettype=[''])
line('init-open','defer-open');line('defer-open','open-engine-message')
# All source author DSP boxes/patchlines remain untouched.
for x in p['boxes']:
 b=x['box']
 if b['id']=='obj-6':b.pop('snapshot',None)
p.pop('dependency_cache',None)
(root/'max/shoegaze-granular-studio.maxpat').write_text(json.dumps({'patcher':p},ensure_ascii=False,indent=2)+'\n')
print('Wrote shoegaze-granular-studio.maxpat; original file preserved.')
