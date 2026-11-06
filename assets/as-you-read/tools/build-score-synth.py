"""Build the Max/RNBO template that the website drives.

    python3 assets/as-you-read/tools/build-score-synth.py

Produces:
  max/score-synth.rnbopat         the RNBO patcher: website params + MIDI in + placeholder
                                  synthesis + the verified granular → overdrive → reverb chain
  max/score-synth-studio.maxpat   a host to open in Max 9: rnbo~ with the patcher embedded,
                                  a keyboard to test notes, and the Web Export config set

The placeholder synthesis is deliberately plain. Replace what is inside [p score] with your
own sound; keep the param objects and the notein, and the website will not need to change.
"""
import copy, json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = {'major': 9, 'minor': 0, 'revision': 9, 'architecture': 'x64', 'modernui': 1}

# ---- the interface the website drives -------------------------------------------------
# (name, min, max, default, what it is)
PARAMS = [
    ('scene',      0, 5,   0,   '0 arrival · 1 projects · 2 stage · 3 story · 4 hello · 5 detail sheet'),
    ('residue',    0, 1,   0,   'how often this section has been visited before (0 first time)'),
    ('dwell',      0, 1,   0,   'time spent in this section, saturates after ~45 s'),
    ('idle',       0, 1,   0,   'no input for a while (0 active, 1 left alone)'),
    ('motion',     0, 1,   0,   'pointer / scroll speed, decays in ~1 s'),
    ('focus',      0, 1,   0,   'hovering a card, cover, track or photo'),
    ('swell',      0, 1,   0,   'a click just happened, decays in ~1 s'),
    ('turn',       0, 1,   0,   'a section change just happened, decays in ~1 s'),
    ('stutter',    0, 1,   0,   'click stutter, decays in ~0.5 s'),
    ('wipe',       0, 1,   0,   'how clear the Story window has been wiped, fogs back over ~6 s'),
    ('wipeVel',    0, 1,   0,   'wiping speed right now'),
    ('pan',        0, 1,   0.5, 'pointer x across the page'),
    ('tilt',       0, 1,   0.5, 'pointer y down the page'),
    ('hx',        -1, 1,   0,   'pointer moving right (+) / left (−)'),
    ('vy',        -1, 1,   0,   'pointer moving down (+) / up (−)'),
    ('drift',     -1, 1,   0,   'scrolling down (+) / back up (−)'),
    ('hoverPitch',-12, 12, 0,   'interval of the hovered music track, semitones'),
    ('select',     0, 1,   0,   'length of selected text, normalised'),
    ('duck',       0, 1,   0,   '1 while a video is playing'),
    ('bedRoot',   20, 2000, 146.83, 'root of the current bed in Hz (placeholder synth uses it)'),
    ('bedLevel',   0, 1,   0.5, 'bed level'),
]
MIDI_CHANNELS = [
    (1, 'melody drip, figures, motifs'),
    (2, 'scroll strum'),
    (3, 'chords: click bloom, selection, page end, sound off'),
    (4, 'glass: Story wipe'),
    (5, 'story chapters'),
]

# ---- helpers ----------------------------------------------------------------------------
class P:
    """A patcher under construction."""
    def __init__(self, namespace='rnbo', rect=(100, 100, 1100, 760), title='untitled'):
        self.d = {'fileversion': 1, 'appversion': APP, 'classnamespace': namespace, 'rect': list(rect),
                  'default_fontname': 'Lato', 'gridsize': [15.0, 15.0], 'title': title, 'boxes': [], 'lines': []}
        self.n = 0
    def box(self, text, x, y, w=None, ni=None, no=None, ot=None, maxclass='newobj', **extra):
        self.n += 1; bid = f'b{self.n}'
        b = {'id': bid, 'maxclass': maxclass, 'text': text, 'patching_rect': [x, y, w or max(60, 7 * len(text) + 14), 22]}
        if ni is not None: b['numinlets'] = ni
        if no is not None: b['numoutlets'] = no
        if ot is not None: b['outlettype'] = ot
        b.update(extra); self.d['boxes'].append({'box': b}); return bid
    def comment(self, text, x, y, w=420):
        return self.box(text, x, y, w, 1, 0, maxclass='comment')
    def wire(self, a, b, o=0, i=0):
        self.d['lines'].append({'patchline': {'source': [a, o], 'destination': [b, i]}})
    def validate(self):
        ids = [x['box']['id'] for x in self.d['boxes']]; assert len(ids) == len(set(ids)), 'duplicate ids'
        for l in self.d['lines']:
            s, d = l['patchline']['source'][0], l['patchline']['destination'][0]
            assert s in ids and d in ids, ('dangling line', s, d)
        return self.d

# ---- [p voice @polyphony 6] : one placeholder FM bell per MIDI note -----------------------
def voice():
    p = P(title='voice')
    p.comment('PLACEHOLDER VOICE — replace with your own. Keep notein; the website sends notes here.', 30, 20, 560)
    ni = p.box('notein', 30, 60)
    mtof = p.box('mtof', 30, 100)
    sig = p.box('sig~', 30, 140)
    ratio = p.box('* 2.', 160, 140, ni=2, no=1, ot=[''])
    mod = p.box('cycle~', 160, 180, ni=2, no=2, ot=['signal', 'signal'])
    idx = p.box('*~ 260.', 160, 220, ni=2, no=1, ot=['signal'])
    add = p.box('+~', 30, 260, ni=2, no=1, ot=['signal'])
    car = p.box('cycle~', 30, 300, ni=2, no=2, ot=['signal', 'signal'])
    vel = p.box('/ 127.', 300, 100, ni=2, no=1, ot=[''])
    env = p.box('adsr~ 6 420 0.22 1400', 300, 180)
    amp = p.box('*~', 30, 340, ni=2, no=1, ot=['signal'])
    lvl = p.box('*~ 0.22', 30, 380, ni=2, no=1, ot=['signal'])
    out = p.box('out~ 1', 30, 430, ni=1, no=0)
    p.wire(ni, mtof); p.wire(mtof, sig); p.wire(mtof, ratio); p.wire(ratio, mod); p.wire(mod, idx)
    p.wire(sig, add); p.wire(idx, add, 0, 1); p.wire(add, car); p.wire(car, amp)
    p.wire(ni, vel, 1); p.wire(vel, env); p.wire(env, amp, 0, 1); p.wire(amp, lvl); p.wire(lvl, out)
    return p.validate()

# ---- [p score] : the website's parameters, the bed, the glass, the voices -----------------
def score():
    p = P(title='score')
    p.comment('AS YOU READ — SCORE SYNTH. Everything below the line is placeholder sound; the params and MIDI are the contract with the website.', 30, 16, 900)
    # the parameter wall: unconnected on purpose — patch them to whatever you build
    p.comment('WEBSITE → MAX   (param objects; the site writes these continuously)', 30, 50, 600)
    for i, (name, lo, hi, val, what) in enumerate(PARAMS):
        x, y = 30 + (i % 3) * 360, 80 + (i // 3) * 54
        p.box(f'param {name} @min {lo} @max {hi} @value {val}', x, y, 220, 2, 2, ['', ''], varname=name)
        p.comment(what, x, y + 22, 340)
    y0 = 80 + ((len(PARAMS) + 2) // 3) * 54 + 20
    p.comment('WEBSITE → MAX   (MIDI notes, by channel):  ' + '   '.join(f'ch{c} {w}' for c, w in MIDI_CHANNELS), 30, y0, 1000)
    # placeholder bed: three detuned sines on bedRoot
    y = y0 + 50
    p.comment('placeholder BED — three detuned sines on bedRoot, scaled by bedLevel', 30, y, 500)
    root = next(x['box']['id'] for x in p.d['boxes'] if x['box'].get('varname') == 'bedRoot')
    level = next(x['box']['id'] for x in p.d['boxes'] if x['box'].get('varname') == 'bedLevel')
    oscs = []
    for k, det in enumerate(('* 0.9965', '* 1.', '* 1.0035')):
        m = p.box(det, 30 + k * 110, y + 30, ni=2, no=1, ot=['']); o = p.box('cycle~', 30 + k * 110, y + 60, ni=2, no=2, ot=['signal', 'signal'])
        p.wire(root, m); p.wire(m, o); oscs.append(o)
    s1 = p.box('+~', 30, y + 100, ni=2, no=1, ot=['signal']); s2 = p.box('+~', 30, y + 130, ni=2, no=1, ot=['signal'])
    p.wire(oscs[0], s1); p.wire(oscs[1], s1, 0, 1); p.wire(s1, s2); p.wire(oscs[2], s2, 0, 1)
    bedg = p.box('*~ 0.12', 30, y + 160, ni=2, no=1, ot=['signal']); bedl = p.box('*~', 30, y + 190, ni=2, no=1, ot=['signal'])
    p.wire(s2, bedg); p.wire(bedg, bedl); p.wire(level, bedl, 0, 1)
    # placeholder glass: band-limited noise, level follows wipeVel
    p.comment('placeholder GLASS — filtered noise, level follows wipeVel', 420, y, 400)
    wv = next(x['box']['id'] for x in p.d['boxes'] if x['box'].get('varname') == 'wipeVel')
    nz = p.box('noise~', 420, y + 30, ni=1, no=1, ot=['signal'])
    lo = p.box('lores~ 1800 0.45', 420, y + 60, ni=3, no=1, ot=['signal'])
    gl = p.box('*~', 420, y + 100, ni=2, no=1, ot=['signal']); gg = p.box('*~ 0.3', 420, y + 130, ni=2, no=1, ot=['signal'])
    p.wire(nz, lo); p.wire(lo, gl); p.wire(wv, gl, 0, 1); p.wire(gl, gg)
    # voices
    p.comment('VOICES — polyphonic subpatcher, one per MIDI note', 760, y, 300)
    vb = p.box('p voice @polyphony 6', 760, y + 30, 170, 1, 1, ['signal'], patcher=voice())
    # mix → two outlets (mono bed/voices/glass to both channels; stereo is the chain's job)
    m1 = p.box('+~', 30, y + 240, ni=2, no=1, ot=['signal']); m2 = p.box('+~', 30, y + 270, ni=2, no=1, ot=['signal'])
    mg = p.box('*~ 0.8', 30, y + 300, ni=2, no=1, ot=['signal'])
    o1 = p.box('out~ 1', 30, y + 350, ni=1, no=0); o2 = p.box('out~ 2', 140, y + 350, ni=1, no=0)
    p.wire(bedl, m1); p.wire(vb, m1, 0, 1); p.wire(m1, m2); p.wire(gg, m2, 0, 1); p.wire(m2, mg); p.wire(mg, o1); p.wire(mg, o2)
    return p.validate()

# ---- the full RNBO patcher : [p score] → verified chain ----------------------------------
def rnbo_patcher():
    chain = json.loads((ROOT / 'max/shoegaze-modular-engine.rnbopat').read_text())['patcher']
    chain = copy.deepcopy(chain)
    chain['boxes'] = [x for x in chain['boxes'] if x['box']['id'] not in ('in1', 'in2')]
    chain['lines'] = [l for l in chain['lines'] if l['patchline']['source'][0] not in ('in1', 'in2')]
    chain['title'] = 'as-you-read score synth'
    chain['boxes'].insert(0, {'box': {'id': 'score', 'maxclass': 'newobj', 'text': 'p score', 'patching_rect': [40, 40, 120, 24],
                                       'numinlets': 0, 'numoutlets': 2, 'outlettype': ['signal', 'signal'], 'patcher': score()}})
    chain['boxes'].insert(1, {'box': {'id': 'note', 'maxclass': 'comment', 'patching_rect': [180, 30, 700, 50],
                                       'text': 'Sound is generated in [p score] (your synthesis) and shaped by the verified chain below: JR-Granular → Overdrive → Plate Reverb. The website drives the params inside [p score] and the grain/drive/reverb params.'}})
    chain['lines'] += [{'patchline': {'source': ['score', 0], 'destination': ['grain', 0]}},
                       {'patchline': {'source': ['score', 1], 'destination': ['grain', 1]}}]
    chain['export_config'] = {'web-export': {'json-web-export': {'output_path': str(ROOT / 'rnbo-export'), 'file_name': 'score-synth', 'openexportdirectory': 0}}}
    ids = {x['box']['id'] for x in chain['boxes']}
    for l in chain['lines']:
        assert l['patchline']['source'][0] in ids and l['patchline']['destination'][0] in ids, l
    return chain

# ---- the host to open in Max --------------------------------------------------------------
def host(rnbo):
    h = P(namespace='box', rect=(80, 80, 980, 640), title='score-synth-studio')
    h.comment('AS YOU READ — score synth studio.  Double-click rnbo~ to edit the sound. Export: select rnbo~ → Export sidebar → Web Export (output folder and name are preset).', 30, 20, 900)
    h.comment('Test notes:', 30, 70, 100)
    kb = h.box('kslider', 30, 95, 336, 2, 2, ['int', 'int'], maxclass='kslider', presentation=1)
    mk = h.box('makenote 100 400', 30, 170, ni=3, no=2, ot=['int', 'int'])
    mf = h.box('midiformat', 30, 205, ni=7, no=1, ot=['int'])
    h.comment('Test params (the website sends these):', 420, 70, 300)
    msgs = []
    for i, (name, lo, hi, val, _) in enumerate(PARAMS[:9]):
        n = h.box('', 420 + (i % 3) * 170, 95 + (i // 3) * 40, 60, 1, 2, ['', 'bang'], maxclass='flonum')
        m = h.box(f'{name} $1', 420 + (i % 3) * 170, 115 + (i // 3) * 40, 120, 2, 1, [''], maxclass='message')
        h.wire(n, m); msgs.append(m)
    r = h.box('rnbo~ @dumpoutlet 1', 30, 300, 220, 1, 3, ['signal', 'signal', ''],
              patcher=rnbo, rnboversion='1.3.5', autosave=1, varname='score',
              saved_object_attributes={'optimization': 'O1', 'parameter_enable': 1},
              inletInfo={'IOInfo': []},
              outletInfo={'IOInfo': [{'type': 'signal', 'index': 1, 'tag': 'out1', 'comment': ''}, {'type': 'signal', 'index': 2, 'tag': 'out2', 'comment': ''}]})
    g = h.box('live.gain~', 30, 360, 60, 2, 5, ['signal', 'signal', '', '', 'list'], maxclass='live.gain~',
              saved_attribute_attributes={'valueof': {'parameter_longname': 'live.gain~', 'parameter_shortname': 'live.gain~', 'parameter_type': 0, 'parameter_mmin': -70.0, 'parameter_mmax': 6.0, 'parameter_initial': [-12.0], 'parameter_unitstyle': 4}},
              varname='live.gain~')
    dac = h.box('ezdac~', 30, 520, 45, 2, 0, maxclass='ezdac~')
    h.wire(kb, mk); h.wire(kb, mk, 1, 1); h.wire(mk, mf); h.wire(mk, mf, 1, 1); h.wire(mf, r)
    for m in msgs: h.wire(m, r)
    h.wire(r, g); h.wire(r, g, 1, 1); h.wire(g, dac); h.wire(g, dac, 1, 1)
    d = h.validate(); d['parameters'] = {'live.gain~': ['live.gain~', 'live.gain~', 0], 'inherited_shortname': 1}
    return d

if __name__ == '__main__':
    rnbo = rnbo_patcher()
    (ROOT / 'max/score-synth.rnbopat').write_text(json.dumps({'patcher': rnbo}, ensure_ascii=False, indent=1) + '\n')
    (ROOT / 'max/score-synth-studio.maxpat').write_text(json.dumps({'patcher': host(rnbo)}, ensure_ascii=False, indent=1) + '\n')
    print('wrote max/score-synth.rnbopat and max/score-synth-studio.maxpat')
    print('params:', ', '.join('score/' + n for n, *_ in PARAMS))
