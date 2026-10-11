"""Compose upstream JR-Granular and Cycling '74 RNBO pedals; no replacement DSP."""
import copy,json,shutil
from pathlib import Path
r=Path(__file__).resolve().parents[1]
pkg=Path('/Users/lichuling/Documents/Max 9/Packages/RNBO Guitar Pedals')
v=r/'vendor/rnbo-guitar-pedals';v.mkdir(exist_ok=True)
shutil.copy2(pkg/'LICENSE.md',v/'LICENSE.md');shutil.copy2(pkg/'README.md',v/'README.md')
host=json.loads((r/'max/shoegaze-granular-studio.maxpat').read_text())['patcher']
rnbo=next(x['box'] for x in host['boxes'] if x['box']['id']=='obj-6')
base=copy.deepcopy(rnbo['patcher']);base['boxes']=[];base['lines']=[]
sources=[('grain',rnbo['patcher'],{}),]
for name,file in [('drive','Rnbo-Overdrive.maxpat'),('reverb','Rnbo-PlateReverb.maxpat')]:
 shutil.copy2(pkg/'examples'/file,v/file)
 b=next(x['box'] for x in json.loads((pkg/'examples'/file).read_text())['patcher']['boxes'] if x['box'].get('text')=='rnbo~')
 defaults={k:d['value'] for k,d in b['snapshot']['snapshot'].items() if not k.startswith('_')}
 sources.append((name,b['patcher'],defaults))
ports={}
for prefix,p,defaults in sources:
 ports[prefix]={'in':{},'out':{}}
 for x in p['boxes']:
  b=copy.deepcopy(x['box']);b['id']=prefix+'-'+b['id'];t=b.get('text','')
  if t.startswith(('in~ ','out~ ')):
   side,num=t.split();ports[prefix]['in' if side=='in~' else 'out'][int(num)]=b['id']
   b.update(text='*~ 1',numinlets=2,numoutlets=1,outlettype=['signal'])
   for key in ['rnboinfo','rnbo_classname','rnbo_uniqueid','rnbo_extra_attributes']:b.pop(key,None)
  elif prefix!='grain' and t.startswith('param '):
   name=t.split()[1];b['text']=f'param {prefix}_{name} @value {defaults.get(name,0)}';b['varname']=prefix+'_'+name;b['rnbo_uniqueid']=prefix+'_'+name
  if 'patching_rect' in b:b['patching_rect'][0]+= {'grain':0,'drive':1400,'reverb':2800}[prefix]
  base['boxes'].append({'box':b})
 for x in p['lines']:
  l=copy.deepcopy(x['patchline']);l['source'][0]=prefix+'-'+l['source'][0];l['destination'][0]=prefix+'-'+l['destination'][0];base['lines'].append({'patchline':l})
def box(id,text,x,y,ni,no):base['boxes'].append({'box':dict(id=id,maxclass='newobj',text=text,patching_rect=[x,y,100,22],numinlets=ni,numoutlets=no,outlettype=['signal']*no)})
def wire(a,b,outlet=0,inlet=0):base['lines'].append({'patchline':dict(source=[a,outlet],destination=[b,inlet])})
for i in [1,2]:
 box(f'input-{i}',f'in~ {i}',30,i*50,0,1);wire(f'input-{i}',ports['grain']['in'][i]);wire(ports['grain']['out'][i],ports['drive']['in'][i]);wire(ports['drive']['out'][i],ports['reverb']['in'][i])
 box(f'output-{i}',f'out~ {i}',4100,i*50,1,0);wire(ports['reverb']['out'][i],f'output-{i}')
base['export_config']={'web-export':{'json-web-export':{'output_path':str(r/'rnbo-export'),'file_name':'shoegaze-pedals','openexportdirectory':0}}}
rnbo['patcher']=base
for k in ['rnboattrcache','snapshot','saved_attribute_attributes']:rnbo.pop(k,None)
rnbo['text']='rnbo~ @dumpoutlet 1';rnbo['numoutlets']=4;rnbo['outlettype']=['signal','signal','','']
# Retain familiar controls; three high-level states also drive the reused pedals.
extra=[', drive_drive 18, drive_highcut 35, drive_mix 80, reverb_mix 42, reverb_decay 58, reverb_size 68, reverb_damp 62, reverb_diff 76, reverb_jitter 18',', drive_drive 48, drive_highcut 48, drive_mix 95, reverb_mix 80, reverb_decay 82, reverb_size 85, reverb_damp 68, reverb_diff 90, reverb_jitter 32',', drive_drive 28, drive_highcut 42, drive_mix 88, reverb_mix 65, reverb_decay 74, reverb_size 80, reverb_damp 65, reverb_diff 85, reverb_jitter 24']
for x in host['boxes']:
 b=x['box']
 if b['id'].startswith('web-preset-'):b['text']+=extra[int(b['id'][-1])]
 if b['id']=='title':b['text']='AS YOU READ / Shoegaze study'
 if b['id']=='credits':b['text']='JR-Granular / szkkng (GPL-3.0) + RNBO Overdrive & PlateReverb / Manuel Poletti, Cycling ’74 (MIT).\nAdaptation: Chuling Li • browsing states control density, distortion and lingering reverb.'
 if b['id']=='init-open':b['text']='loadbang'
# Initialize state quietly; no autoplay or DSP-on command.
host['boxes'].append({'box':dict(id='init-state',maxclass='newobj',text='delay 600',patching_rect=[900,850,100,22],numinlets=2,numoutlets=1,outlettype=['bang'])})
for a,b in [('init-open','init-state'),('init-state','web-preset-0')]:host['lines'].append({'patchline':{'source':[a,0],'destination':[b,0]}})
(r/'max/shoegaze-pedal-studio.maxpat').write_text(json.dumps({'patcher':host},ensure_ascii=False,indent=2)+'\n')
# Separate reproducible export helper; uses the official rnbo~ message documented by Cycling '74.
exp=copy.deepcopy(host)
exp['boxes'] += [{'box':dict(id='export-delay',maxclass='newobj',text='delay 3500',patching_rect=[900,900,100,22],numinlets=2,numoutlets=1,outlettype=['bang'])},{'box':dict(id='export-message',maxclass='message',text='export web-export json-web-export',patching_rect=[900,940,250,22],numinlets=2,numoutlets=1,outlettype=[''])},{'box':dict(id='export-log',maxclass='newobj',text='print AS-YOU-READ-EXPORT',patching_rect=[900,980,200,22],numinlets=1,numoutlets=0)}]
for a,ao,b in [('init-open',0,'export-delay'),('export-delay',0,'export-message'),('export-message',0,'obj-6'),('obj-6',3,'export-log')]:exp['lines'].append({'patchline':{'source':[a,ao],'destination':[b,0]}})
(r/'max/export-pedal-web.maxpat').write_text(json.dumps({'patcher':exp},ensure_ascii=False,indent=2)+'\n')
def validate(p):
 ids={x['box']['id'] for x in p['boxes']};assert len(ids)==len(p['boxes'])
 for x in p.get('lines',[]):
  for k in ['source','destination']:assert x['patchline'][k][0] in ids
 for x in p['boxes']:
  if 'patcher' in x['box']:validate(x['box']['patcher'])
validate(host);validate(exp)
print('Composed existing granular → overdrive → plate reverb; all nested connections resolve.')
