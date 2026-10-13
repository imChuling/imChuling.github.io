# As You Read — RNBO listening study

## Current working version (2026-10-13)

Open `/as-you-read.html` through the local web server. Select a local guitar, keyboard or field recording, enable sound, visit section 02, then return to 01. Files are decoded locally and are not uploaded. No microphone permission is required. No recording is bundled with this prototype.

The browser now hosts an actual **Max 9.0.9 / RNBO 1.3.5 Web Export** of JR-Granular, not the previous JavaScript oscillator sketch. `rnbo-export/scene.export.json` now contains the verified granular → overdrive → plate reverb chain; `granular.export.json` preserves the same verified granular engine. `max/shoegaze-granular-studio.maxpat` is its editable host. Max's exporter reported successful Web Export. Browser verification found nonzero output and mix transitions from 35 (first) to 85 (passing) to 65 (returning).

JavaScript handles local file playback, smooth parameter changes, volume and interface state. Creative DSP comes from JR-Granular. Revisit memory is currently a state-dependent preset, not a recording of the user's journey. A click is required to enable audio. Hidden pages pause playback. Restarting playback starts the selected file from the beginning. Reset clears navigation history, not the DSP's internal delay memory.

## Sources and licensing

- JR-Granular by szkkng: https://github.com/szkkng/jr-granular — GPL-3.0, pinned commit 409fb96f6ec9379a9168b99fc53ff71e03eb801a. Original source, license and provenance are in `vendor/jr-granular/`. Its granular DSP is reused unchanged.
- RNBO browser adapter 1.3.5: https://cdn.cycling74.com/rnbo/1.3.5/rnbo.min.js — MIT notice retained in `vendor/rnbo-1.3.5.min.js`.
- RNBO-generated code license: `rnbo-export/patch.export.license`; retain with distributions. The reused GPL source and notices must accompany redistribution as required by its license.
- RNBO Guitar Pedals 1.0.4 by Manuel Poletti / Cycling '74: https://cycling74.com/products/rnbo-guitar-pedals — MIT, source and notices in `vendor/rnbo-guitar-pedals/`. No package audio examples are distributed here.

## Combined export verified

The combined graph successfully exported through RNBO’s Web Export panel on 2026-10-13. Browser verification loaded the combined engine, produced nonzero output (observed peaks approximately 0.037–0.059), and confirmed mix transitions 35 → 85 → 65. Mapping tests pass against all actual combined parameter IDs and ranges. The original granular export is retained as a fallback.

Generic MCP `export` messages still returned errors even for the known-working granular control. That automation issue remains unresolved; it is distinct from DSP validity. MCP handles patch construction and inspection; the successful final export used the native panel. Source host: `max/mcp-export-host.maxpat`, with the same embedded graph as `max/shoegaze-modular-engine.rnbopat`.

A suitable default recording and subjective shoegaze sound design remain unfinished. The test WAV was loaded locally, not bundled or published. The updated local preview is http://127.0.0.1:8766/as-you-read.html (the old 8765 address returned 404).

## Checks

The browser was tested with a local official-package sample, used only from `/tmp`, not copied into the website. Downloads-folder recording access was denied by macOS in this session; readable local WAV input succeeded. Browser signal detection validates execution, not perceived audio quality. Final listening should be done with the intended source recording.

Legacy `prototype.js`, `audio-engine.mjs`, `max/as-you-read.maxpat` and `max/as-you-read.rnbopat` belong to the earlier tone sketch and are not loaded by the active page. `tests/reading-memory.test.mjs` tests that legacy model only.

## Chinese guide

See `../../docs/as-you-read/操作与实现思路.md` for the concept, local playback instructions, parameter mapping, workflow and maintenance notes. Run current mapping checks with `node --test tests/rnbo-mapping.test.mjs` from the website root.
