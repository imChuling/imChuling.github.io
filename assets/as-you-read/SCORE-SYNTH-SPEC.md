# score-synth RNBO Patch Specification

Export as `score-synth.export.json` → `assets/as-you-read/rnbo-export/`

When this patch is present, the JS engine (`site-score.mjs`) enters **synth mode**:
all melody, rain, and ambient sound comes from Max/RNBO. The fallback `scene.export.json`
(granular chain only) is used when `score-synth` is not found.

## Detection

The JS checks `device.parametersById.has('score/scene')` — if true, synth mode activates.
So the patch **must** expose at least `score/scene` as a parameter.

---

## Parameters (continuous, smoothed at ~25 Hz by JS)

All sent every 50 ms via `engine.targets` → `smooth()` (lerp factor 0.07).

### Scene

| Parameter        | Range   | Description |
|-----------------|---------|-------------|
| `score/scene`   | int 0–5 | **Jumps** (not smoothed). 0=top 1=projects 2=music 3=story 4=contact 5=detail |
| `score/residue` | 0–1     | How many previous visits to this section (0 first time, 0.5 second, 1.0 third+) |
| `score/dwell`   | 0–1     | Time spent in current section (ramps 0→1 over 45 seconds) |
| `score/away`    | 0 or 1  | Pointer has left the browser window |

### Interaction

| Parameter         | Range   | Description |
|------------------|---------|-------------|
| `score/motion`   | 0–1     | Scroll + pointer speed (decays ×0.9 per tick) |
| `score/focus`    | 0–1     | Pointer is over an interactive element (card, image, link) |
| `score/swell`    | 0–1     | A click just happened (decays ×0.9) |
| `score/turn`     | 0–1     | Section just changed (decays ×0.93) |
| `score/stutter`  | 0–1     | A button/link was clicked (decays ×0.86) |

### Pointer

| Parameter           | Range      | Description |
|--------------------|------------|-------------|
| `score/pan`        | 0–1        | Pointer X position (0=left, 1=right) |
| `score/tilt`       | 0–1        | Pointer Y position (0=top, 1=bottom) |
| `score/hx`         | −1 to +1   | Pointer horizontal velocity |
| `score/vy`         | −1 to +1   | Pointer vertical velocity |
| `score/drift`      | −1 to +1   | Scroll direction accumulator (−=up, +=down) |
| `score/moveSpeed`  | 0–1        | Pointer movement speed |
| `score/hoverPitch` | float      | Pitch offset from hovered element's `data-pitch` |

### Story Glass Wipe

| Parameter         | Range | Description |
|------------------|-------|-------------|
| `score/wipe`     | 0–1   | How much the glass has been wiped (lingers ~6 s) |
| `score/wipeVel`  | 0–1   | Current wipe velocity |

### Text Selection

| Parameter       | Range | Description |
|----------------|-------|-------------|
| `score/select` | 0–1   | Selected text length (0–400 chars → 0–1). Use for drone. |

### State

| Parameter       | Range      | Description |
|----------------|------------|-------------|
| `score/idle`   | 0–1        | Time since last input (ramps 0→1 over 20 s, starts after 8 s) |
| `score/duck`   | 0 or 1     | A video is playing — step aside |
| `score/bedRoot`| Hz         | Root note of current section's scale (÷4 for bass register) |
| `score/height` | −0.5–+0.5  | Pointer vertical position (+ = high on page = brighter) |

### Rain

| Parameter         | Range | Description |
|------------------|-------|-------------|
| `score/rainRate` | float | Target drops per second (0 = no rain, up to ~2.5) |
| `score/rainVol`  | 0–1   | Target volume per drop |

### LFOs (slow modulation, use for drift/shimmer)

| Parameter     | Range    | Period |
|--------------|----------|--------|
| `score/lfo1` | −1 to +1 | 9 s    |
| `score/lfo2` | −1 to +1 | 23 s   |
| `score/lfo3` | −1 to +1 | 37 s   |
| `score/lfo4` | −1 to +1 | 15 s   |

---

## MIDI

Notes are sent with scheduled timing via `RNBO.MIDIEvent`.

### Channel assignments

| Channel | Purpose | Typical behaviour |
|---------|---------|-------------------|
| 1 | Melody — drip phrases, idle phrases, glide runs | Sustained bell/pad tones, 1.6–6 s between notes |
| 2 | Scroll strum | One note per ~140 px of scrolling, scale step up or down |
| 3 | Chords — click chord, cadence, text-selection release | 4-note spread voicing |
| 4 | Wipe ornaments | Short bright notes when wiping the Story glass |
| 5 | Story step highlights | Triggered when a timeline step becomes active |
| 6 | Rain droplets | Scale tones, short duration, velocity = drop volume |

### CC (sent alongside notes)

| CC | Channel | Meaning |
|----|---------|---------|
| 1  | per-note channel | Brightness (0–127, from `bright` parameter 0–2) |
| 2  | per-note channel | FM ratio index (0=bell/2.01, 32=glassy/3.0, 64=hollow/1.5, 96=metallic/3.52) |

### Velocity

Velocity range 1–127 (mapped from internal `vel` × 200).
Each section has a different base velocity (`noteVel` in SCENES):
- top: 0.15, projects: 0.18, music: 0.20, story: 0.14, contact: 0.10

---

## Scales per Section

The JS selects notes from these scales. Max receives them as MIDI note numbers.

| Section  | Scale      | Notes |
|----------|-----------|-------|
| top      | D dorian  | D5 E5 F5 A5 B5 C6 E6 |
| projects | A major   | A5 B5 C#6 E6 F#6 A6 B6 |
| music    | E dorian  | E5 F#5 G5 B5 D6 E6 F#6 |
| story    | Bb lydian | Bb5 C6 D6 E6 F6 A6 Bb6 |
| contact  | Cmaj9     | C5 D5 E5 G5 B5 D6 E6 |

---

## Section Sound Design Guide

| Section   | Character | Suggestions for Max |
|-----------|-----------|---------------------|
| top       | Crystalline, sparse, bright | High-pass filtered, sparse granular, bright FM bells |
| projects  | Rhythmic, tight, mechanical | Short grains, dry, drive/distortion, pulse-like rhythm |
| music     | Lush, wide, saturated | Big granular clouds, heavy reverb, rich harmonics — the showcase |
| story     | Deep, slow, cavernous | Sub-bass, long reverb tails, pitch-shifted low, intimate |
| contact   | Clean, minimal, near-silent | Almost nothing — occasional pure tone, clean goodbye |
| detail    | Close, focused, quiet | Reduced everything, intimate close-up feel |

---

## Architecture in Max

Suggested top-level structure:

```
[inlet~ beds]  →  [granular engine]  →  [drive/saturation]  →  [reverb]  →  [outlet~]
                                                                    ↑
[MIDI in]  →  [poly~ synth voice]  →  [melody bus + reverb]  ──────┘
                                                                    ↑
[score/* params]  →  [modulation routing]  ─────────────────────────┘
```

The patch receives:
1. **Audio input** — bed MP3 loops fed from JS (already connected to `device.node`)
2. **MIDI** — melody, chords, rain triggers on separate channels
3. **Parameters** — 25+ continuous values describing the visitor's state

The patch outputs stereo audio → `device.node` → JS master gain → analyser → destination.
