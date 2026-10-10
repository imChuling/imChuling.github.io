# As You Read — study 001

Open `/as-you-read.html` through the portfolio's local web server. Turn sound on, scroll from chapter 01 to chapter 02, and return to 01. The four-note sequence stays the same; the returning voice carries some of chapter 02's partials and attack. Use the original-colour comparison on return.

This is a **Web Audio feasibility prototype**, not an exported RNBO device. No remote services or extra libraries are used. All tones are synthesized; there are no vocal recordings. Visits exist only in page memory. The main portfolio HTML is unchanged.

`max/as-you-read.maxpat` is a native Max sketch of the four notes and five-partial voice. `max/as-you-read.rnbopat` is an RNBO voice draft with frequency, memory and level parameters. Both are generated source files with JSON/connection validation only: the local Max application's UI repeatedly timed out, so neither has been compiled, auditioned or exported in Max. The native sketch is monophonic with a linear envelope; the browser uses overlapping voices with exponential decays. They are not claimed to sound identical.

The RNBO draft is intentionally silent until a host schedules the level envelope. Actual RNBO export, polyphony, effects and browser integration remain separate work. Do not rename the browser engine as Max/RNBO in a portfolio credit.

Run the state-model checks with `node --test tests/reading-memory.test.mjs` from the site root. Manual browser checks should include actual nonzero audio output, chapter 01 → 02 → 01, comparison, reset, mute, hidden-page pause, keyboard navigation and narrow layouts. Real user understanding has not been evaluated.

## 2026-10-10: Shoegaze direction and reuse

The user rejected the Web Audio tone sketch as the desired sound engine. The live preview still runs that earlier engine; it has NOT been replaced or relabelled as Max/RNBO.

- Installed Max confirmed as 9.0.9; bundled RNBO 1.3.5.
- Two Max window-control attempts timed out after the update. Finder was readable, although delayed. This is a control/verification blocker, not evidence of a missing Max/RNBO license or proof that Max itself is frozen.
- Downloaded pinned upstream JR-Granular patch and GPL-3.0 license into `vendor/jr-granular/`. Adapted study: `max/shoegaze-granular-study.maxpat`. Its connected RNBO DSP is unchanged. Three provisional parameter messages explore first reading, passing through and returning; only JSON and connection structure have been checked.
- This patch processes incoming audio. Its demo playlist is cleared; it does not contain a guitar recording or produce a complete shoegaze composition by itself.
- Additional candidate: Manuel Poletti / Cycling '74 RNBO Guitar Pedals, https://cycling74.com/products/rnbo-guitar-pedals . Official source explicitly supports copying and Web Export; package-specific notices and sample licenses still need inspection before redistributing assets. It is NOT installed/integrated here yet.
- JR-Granular source: https://github.com/szkkng/jr-granular . Its project is GPL-3.0 and archived. RNBO_CombGrain was not chosen because no explicit repository license was visible in the inspected tree/page.

Next practical gate: open the adapted patch in Max, load a licensed/owned guitar phrase, audition the presets, add existing distortion/reverb modules, and produce a real RNBO Web Export. Only then replace the browser audio engine. Website motion will control granular mix/density, and section return will keep a slower-decaying trace; these mappings remain proposed until auditioned.
