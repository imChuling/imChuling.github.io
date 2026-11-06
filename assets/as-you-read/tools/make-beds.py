"""Render the five looping ambient beds, one per section. Pure python + ffmpeg.

    python3 assets/as-you-read/tools/make-beds.py

Each bed is a stack of detuned sine partials with slow per-voice swells and a
little filtered air, cross-faded into a seamless 24 s loop.
"""
import math, os, random, struct, subprocess, sys, tempfile, wave

SR = 44100
DUR = 24
TW = 2 * math.pi
TRANSPOSE = 2.0      # an octave up: lighter, more coloured
SHIMMER = .07        # 5th partial, slowly glinting
OUT = os.path.join(os.path.dirname(__file__), '..', 'beds')

# name: (notes Hz, amps, lfo range, harmonic colour (h2,h3), air level, breathe period)
BEDS = {
    # warm, recognisable, open Dm9 — the page as you arrive
    'top':      ([36.71, 73.42, 110.0, 146.83, 220.0, 261.63, 329.63],
                 [.28, .42, .34, .36, .26, .22, .16], (.03, .09), (.30, .10), .9, 11.0),
    # brighter, lighter, suspended — a working frame of mind (Asus2 / E over A)
    'projects': ([55.0, 110.0, 164.81, 246.94, 329.63, 493.88, 659.26],
                 [.22, .34, .30, .30, .26, .18, .10], (.05, .14), (.38, .18), .6, 7.0),
    # low, dense, minor with open fifths — the stage (Em, wide)
    'music':    ([41.2, 82.41, 123.47, 164.81, 246.94, 293.66, 369.99],
                 [.36, .46, .40, .34, .22, .18, .12], (.02, .06), (.22, .06), 1.2, 15.0),
    # sparse, high, far — memory (Bb lydian colour: Bb F A E)
    'story':    ([116.54, 174.61, 220.0, 329.63, 440.0, 659.26, 880.0],
                 [.26, .24, .20, .18, .16, .10, .06], (.015, .04), (.18, .04), 1.6, 19.0),
    # close, major, settled — meeting someone (Cmaj9 low voicing)
    'contact':  ([65.41, 98.0, 130.81, 196.0, 246.94, 293.66, 392.0],
                 [.30, .36, .34, .30, .22, .18, .14], (.03, .08), (.28, .08), .7, 9.0),
}

def render(name, notes, amps, lfo, colour, air, breathe):
    random.seed(hash(name) & 0xffff)
    n = SR * DUR
    out = [0.0] * n
    for f, a in zip(notes, amps):
        f *= TRANSPOSE
        for d in (-.55, -.18, .18, .55):
            fr = f * (1 + d / 100 * .6)
            w = TW * fr / SR; ph = random.random() * TW
            lw = TW * random.uniform(*lfo) / SR; lph = random.random() * TW
            h2 = colour[0] + random.random() * .1; h3 = colour[1] + random.random() * .05
            h5 = SHIMMER * (.4 + random.random() * .6); sw = TW * random.uniform(.05, .11) / SR; sph = random.random() * TW
            amp = a / 4
            for i in range(n):
                env = .6 + .4 * math.sin(i * lw + lph)
                glint = .5 + .5 * math.sin(i * sw + sph)          # slow sparkle on the high partial
                out[i] += (math.sin(ph) + h2 * math.sin(2 * ph + .3) + h3 * math.sin(3 * ph + .9) + h5 * glint * math.sin(5 * ph + 1.7)) * amp * env
                ph += w
    lp = 0.0; k = .004
    for i in range(n):
        lp += (random.uniform(-1, 1) - lp) * k
        out[i] += lp * air
    for i in range(n):
        out[i] *= .85 + .15 * math.sin(TW * i / SR / breathe)
    x = int(4 * SR); head = out[:x]; tail = out[n - x:]
    for i in range(x):
        t = i / x; out[n - x + i] = tail[i] * (1 - t) + head[i] * t
    peak = max(abs(v) for v in out) or 1
    out = [math.tanh(v / peak * 1.2) / math.tanh(1.2) * .8 for v in out]
    tmp = os.path.join(tempfile.gettempdir(), f'bed-{name}.wav')
    w = wave.open(tmp, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(b''.join(struct.pack('<h', int(v * 32767)) for v in out)); w.close()
    os.makedirs(OUT, exist_ok=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp, '-codec:a', 'libmp3lame', '-q:a', '4',
                    os.path.join(OUT, f'{name}.mp3')], check=True)
    print('rendered', name)

if __name__ == '__main__':
    names = sys.argv[1:] or list(BEDS)
    for name in names:
        render(name, *BEDS[name])
