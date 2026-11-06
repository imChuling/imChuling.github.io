{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 0,
      "revision": 7,
      "architecture": "arm64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      60,
      80,
      1000,
      780
    ],
    "default_fontsize": 12,
    "default_fontname": "Arial",
    "boxes": [
      {
        "box": {
          "id": "title",
          "maxclass": "comment",
          "patching_rect": [
            30,
            20,
            650,
            36
          ],
          "text": "AS YOU READ / Native Max sound sketch — not runtime tested"
        }
      },
      {
        "box": {
          "id": "help",
          "maxclass": "comment",
          "patching_rect": [
            30,
            63,
            870,
            36
          ],
          "text": "Turn audio on, choose a colour, then click the round button. Same four pitches in every colour. Web prototype uses polyphonic exponential envelopes; this sketch uses a monophonic linear envelope."
        }
      },
      {
        "box": {
          "id": "play",
          "maxclass": "button",
          "patching_rect": [
            30,
            140,
            24,
            22
          ]
        }
      },
      {
        "box": {
          "id": "trigger",
          "maxclass": "newobj",
          "patching_rect": [
            75,
            140,
            85,
            22
          ],
          "text": "t b b b b"
        }
      },
      {
        "box": {
          "id": "delay0",
          "maxclass": "newobj",
          "patching_rect": [
            30,
            182,
            90,
            22
          ],
          "text": "delay 0"
        }
      },
      {
        "box": {
          "id": "note0",
          "maxclass": "message",
          "patching_rect": [
            30,
            218,
            50,
            22
          ],
          "text": "60"
        }
      },
      {
        "box": {
          "id": "delay1",
          "maxclass": "newobj",
          "patching_rect": [
            185,
            182,
            90,
            22
          ],
          "text": "delay 640"
        }
      },
      {
        "box": {
          "id": "note1",
          "maxclass": "message",
          "patching_rect": [
            185,
            218,
            50,
            22
          ],
          "text": "64"
        }
      },
      {
        "box": {
          "id": "delay2",
          "maxclass": "newobj",
          "patching_rect": [
            340,
            182,
            90,
            22
          ],
          "text": "delay 1280"
        }
      },
      {
        "box": {
          "id": "note2",
          "maxclass": "message",
          "patching_rect": [
            340,
            218,
            50,
            22
          ],
          "text": "67"
        }
      },
      {
        "box": {
          "id": "delay3",
          "maxclass": "newobj",
          "patching_rect": [
            495,
            182,
            90,
            22
          ],
          "text": "delay 2080"
        }
      },
      {
        "box": {
          "id": "note3",
          "maxclass": "message",
          "patching_rect": [
            495,
            218,
            50,
            22
          ],
          "text": "62"
        }
      },
      {
        "box": {
          "id": "note-trigger",
          "maxclass": "newobj",
          "patching_rect": [
            620,
            218,
            65,
            22
          ],
          "text": "t i b"
        }
      },
      {
        "box": {
          "id": "frequency",
          "maxclass": "newobj",
          "patching_rect": [
            35,
            250,
            65,
            22
          ],
          "text": "mtof"
        }
      },
      {
        "box": {
          "id": "envelope",
          "maxclass": "message",
          "patching_rect": [
            725,
            545,
            190,
            22
          ],
          "text": "0, 0.12 20 0. 1450"
        }
      },
      {
        "box": {
          "id": "colour-caption",
          "maxclass": "comment",
          "patching_rect": [
            630,
            100,
            330,
            36
          ],
          "text": "Original / Stage / Returned colour"
        }
      },
      {
        "box": {
          "id": "first",
          "maxclass": "message",
          "patching_rect": [
            650,
            142,
            55,
            22
          ],
          "text": "0."
        }
      },
      {
        "box": {
          "id": "stage",
          "maxclass": "message",
          "patching_rect": [
            720,
            142,
            55,
            22
          ],
          "text": "0.9"
        }
      },
      {
        "box": {
          "id": "return",
          "maxclass": "message",
          "patching_rect": [
            790,
            142,
            55,
            22
          ],
          "text": "0.62"
        }
      },
      {
        "box": {
          "id": "init",
          "maxclass": "newobj",
          "patching_rect": [
            860,
            185,
            100,
            22
          ],
          "text": "loadmess 0."
        }
      },
      {
        "box": {
          "id": "memory",
          "maxclass": "newobj",
          "patching_rect": [
            645,
            250,
            100,
            22
          ],
          "text": "clip 0. 1."
        }
      },
      {
        "box": {
          "id": "freq1",
          "maxclass": "newobj",
          "patching_rect": [
            35,
            280,
            60,
            22
          ],
          "text": "* 1."
        }
      },
      {
        "box": {
          "id": "osc1",
          "maxclass": "newobj",
          "patching_rect": [
            35,
            320,
            70,
            22
          ],
          "text": "cycle~"
        }
      },
      {
        "box": {
          "id": "scale1",
          "maxclass": "newobj",
          "patching_rect": [
            100,
            375,
            70,
            22
          ],
          "text": "* -0.25"
        }
      },
      {
        "box": {
          "id": "offset1",
          "maxclass": "newobj",
          "patching_rect": [
            100,
            412,
            70,
            22
          ],
          "text": "+ 1"
        }
      },
      {
        "box": {
          "id": "smooth1",
          "maxclass": "newobj",
          "patching_rect": [
            100,
            450,
            90,
            22
          ],
          "text": "pack 0. 40"
        }
      },
      {
        "box": {
          "id": "line1",
          "maxclass": "newobj",
          "patching_rect": [
            100,
            490,
            60,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "amp1",
          "maxclass": "newobj",
          "patching_rect": [
            35,
            532,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "freq2",
          "maxclass": "newobj",
          "patching_rect": [
            210,
            280,
            60,
            22
          ],
          "text": "* 2."
        }
      },
      {
        "box": {
          "id": "osc2",
          "maxclass": "newobj",
          "patching_rect": [
            210,
            320,
            70,
            22
          ],
          "text": "cycle~"
        }
      },
      {
        "box": {
          "id": "scale2",
          "maxclass": "newobj",
          "patching_rect": [
            275,
            375,
            70,
            22
          ],
          "text": "* -0.08"
        }
      },
      {
        "box": {
          "id": "offset2",
          "maxclass": "newobj",
          "patching_rect": [
            275,
            412,
            70,
            22
          ],
          "text": "+ 0.18"
        }
      },
      {
        "box": {
          "id": "smooth2",
          "maxclass": "newobj",
          "patching_rect": [
            275,
            450,
            90,
            22
          ],
          "text": "pack 0. 40"
        }
      },
      {
        "box": {
          "id": "line2",
          "maxclass": "newobj",
          "patching_rect": [
            275,
            490,
            60,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "amp2",
          "maxclass": "newobj",
          "patching_rect": [
            210,
            532,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "freq3",
          "maxclass": "newobj",
          "patching_rect": [
            385,
            280,
            60,
            22
          ],
          "text": "* 3."
        }
      },
      {
        "box": {
          "id": "osc3",
          "maxclass": "newobj",
          "patching_rect": [
            385,
            320,
            70,
            22
          ],
          "text": "cycle~"
        }
      },
      {
        "box": {
          "id": "scale3",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            375,
            70,
            22
          ],
          "text": "* 0.32"
        }
      },
      {
        "box": {
          "id": "offset3",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            412,
            70,
            22
          ],
          "text": "+ 0.025"
        }
      },
      {
        "box": {
          "id": "smooth3",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            450,
            90,
            22
          ],
          "text": "pack 0. 40"
        }
      },
      {
        "box": {
          "id": "line3",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            490,
            60,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "amp3",
          "maxclass": "newobj",
          "patching_rect": [
            385,
            532,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "freq4",
          "maxclass": "newobj",
          "patching_rect": [
            560,
            280,
            60,
            22
          ],
          "text": "* 4."
        }
      },
      {
        "box": {
          "id": "osc4",
          "maxclass": "newobj",
          "patching_rect": [
            560,
            320,
            70,
            22
          ],
          "text": "cycle~"
        }
      },
      {
        "box": {
          "id": "scale4",
          "maxclass": "newobj",
          "patching_rect": [
            625,
            375,
            70,
            22
          ],
          "text": "* 0.09"
        }
      },
      {
        "box": {
          "id": "offset4",
          "maxclass": "newobj",
          "patching_rect": [
            625,
            412,
            70,
            22
          ],
          "text": "+ 0"
        }
      },
      {
        "box": {
          "id": "smooth4",
          "maxclass": "newobj",
          "patching_rect": [
            625,
            450,
            90,
            22
          ],
          "text": "pack 0. 40"
        }
      },
      {
        "box": {
          "id": "line4",
          "maxclass": "newobj",
          "patching_rect": [
            625,
            490,
            60,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "amp4",
          "maxclass": "newobj",
          "patching_rect": [
            560,
            532,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "freq5",
          "maxclass": "newobj",
          "patching_rect": [
            735,
            280,
            60,
            22
          ],
          "text": "* 5."
        }
      },
      {
        "box": {
          "id": "osc5",
          "maxclass": "newobj",
          "patching_rect": [
            735,
            320,
            70,
            22
          ],
          "text": "cycle~"
        }
      },
      {
        "box": {
          "id": "scale5",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            375,
            70,
            22
          ],
          "text": "* 0.12"
        }
      },
      {
        "box": {
          "id": "offset5",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            412,
            70,
            22
          ],
          "text": "+ 0"
        }
      },
      {
        "box": {
          "id": "smooth5",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            450,
            90,
            22
          ],
          "text": "pack 0. 40"
        }
      },
      {
        "box": {
          "id": "line5",
          "maxclass": "newobj",
          "patching_rect": [
            800,
            490,
            60,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "amp5",
          "maxclass": "newobj",
          "patching_rect": [
            735,
            532,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "sum2",
          "maxclass": "newobj",
          "patching_rect": [
            90,
            580,
            45,
            22
          ],
          "text": "+~"
        }
      },
      {
        "box": {
          "id": "sum3",
          "maxclass": "newobj",
          "patching_rect": [
            210,
            580,
            45,
            22
          ],
          "text": "+~"
        }
      },
      {
        "box": {
          "id": "sum4",
          "maxclass": "newobj",
          "patching_rect": [
            330,
            580,
            45,
            22
          ],
          "text": "+~"
        }
      },
      {
        "box": {
          "id": "sum5",
          "maxclass": "newobj",
          "patching_rect": [
            450,
            580,
            45,
            22
          ],
          "text": "+~"
        }
      },
      {
        "box": {
          "id": "env",
          "maxclass": "newobj",
          "patching_rect": [
            755,
            580,
            65,
            22
          ],
          "text": "line~"
        }
      },
      {
        "box": {
          "id": "output",
          "maxclass": "newobj",
          "patching_rect": [
            460,
            630,
            45,
            22
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "id": "audio",
          "maxclass": "newobj",
          "patching_rect": [
            460,
            695,
            55,
            22
          ],
          "text": "ezdac~"
        }
      },
      {
        "box": {
          "id": "stop",
          "maxclass": "message",
          "patching_rect": [
            880,
            218,
            55,
            22
          ],
          "text": "stop"
        }
      },
      {
        "box": {
          "id": "silence",
          "maxclass": "message",
          "patching_rect": [
            865,
            635,
            70,
            22
          ],
          "text": "0. 80"
        }
      },
      {
        "box": {
          "id": "mute-note",
          "maxclass": "comment",
          "patching_rect": [
            645,
            680,
            300,
            36
          ],
          "text": "Click to fade current note; ezdac~ stops audio."
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "play",
            0
          ],
          "destination": [
            "trigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "trigger",
            3
          ],
          "destination": [
            "delay0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "delay0",
            0
          ],
          "destination": [
            "note0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note0",
            0
          ],
          "destination": [
            "note-trigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "trigger",
            2
          ],
          "destination": [
            "delay1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "delay1",
            0
          ],
          "destination": [
            "note1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note1",
            0
          ],
          "destination": [
            "note-trigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "trigger",
            1
          ],
          "destination": [
            "delay2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "delay2",
            0
          ],
          "destination": [
            "note2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note2",
            0
          ],
          "destination": [
            "note-trigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "trigger",
            0
          ],
          "destination": [
            "delay3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "delay3",
            0
          ],
          "destination": [
            "note3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note3",
            0
          ],
          "destination": [
            "note-trigger",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note-trigger",
            0
          ],
          "destination": [
            "frequency",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "note-trigger",
            1
          ],
          "destination": [
            "envelope",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "envelope",
            0
          ],
          "destination": [
            "env",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "first",
            0
          ],
          "destination": [
            "memory",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stage",
            0
          ],
          "destination": [
            "memory",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "return",
            0
          ],
          "destination": [
            "memory",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "init",
            0
          ],
          "destination": [
            "memory",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "frequency",
            0
          ],
          "destination": [
            "freq1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "freq1",
            0
          ],
          "destination": [
            "osc1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "memory",
            0
          ],
          "destination": [
            "scale1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scale1",
            0
          ],
          "destination": [
            "offset1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "offset1",
            0
          ],
          "destination": [
            "smooth1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "smooth1",
            0
          ],
          "destination": [
            "line1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "osc1",
            0
          ],
          "destination": [
            "amp1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "line1",
            0
          ],
          "destination": [
            "amp1",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "frequency",
            0
          ],
          "destination": [
            "freq2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "freq2",
            0
          ],
          "destination": [
            "osc2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "memory",
            0
          ],
          "destination": [
            "scale2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scale2",
            0
          ],
          "destination": [
            "offset2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "offset2",
            0
          ],
          "destination": [
            "smooth2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "smooth2",
            0
          ],
          "destination": [
            "line2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "osc2",
            0
          ],
          "destination": [
            "amp2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "line2",
            0
          ],
          "destination": [
            "amp2",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "frequency",
            0
          ],
          "destination": [
            "freq3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "freq3",
            0
          ],
          "destination": [
            "osc3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "memory",
            0
          ],
          "destination": [
            "scale3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scale3",
            0
          ],
          "destination": [
            "offset3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "offset3",
            0
          ],
          "destination": [
            "smooth3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "smooth3",
            0
          ],
          "destination": [
            "line3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "osc3",
            0
          ],
          "destination": [
            "amp3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "line3",
            0
          ],
          "destination": [
            "amp3",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "frequency",
            0
          ],
          "destination": [
            "freq4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "freq4",
            0
          ],
          "destination": [
            "osc4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "memory",
            0
          ],
          "destination": [
            "scale4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scale4",
            0
          ],
          "destination": [
            "offset4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "offset4",
            0
          ],
          "destination": [
            "smooth4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "smooth4",
            0
          ],
          "destination": [
            "line4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "osc4",
            0
          ],
          "destination": [
            "amp4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "line4",
            0
          ],
          "destination": [
            "amp4",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "frequency",
            0
          ],
          "destination": [
            "freq5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "freq5",
            0
          ],
          "destination": [
            "osc5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "memory",
            0
          ],
          "destination": [
            "scale5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "scale5",
            0
          ],
          "destination": [
            "offset5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "offset5",
            0
          ],
          "destination": [
            "smooth5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "smooth5",
            0
          ],
          "destination": [
            "line5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "osc5",
            0
          ],
          "destination": [
            "amp5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "line5",
            0
          ],
          "destination": [
            "amp5",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "amp1",
            0
          ],
          "destination": [
            "sum2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "amp2",
            0
          ],
          "destination": [
            "sum2",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "sum2",
            0
          ],
          "destination": [
            "sum3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "amp3",
            0
          ],
          "destination": [
            "sum3",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "sum3",
            0
          ],
          "destination": [
            "sum4",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "amp4",
            0
          ],
          "destination": [
            "sum4",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "sum4",
            0
          ],
          "destination": [
            "sum5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "amp5",
            0
          ],
          "destination": [
            "sum5",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "sum5",
            0
          ],
          "destination": [
            "output",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "env",
            0
          ],
          "destination": [
            "output",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "output",
            0
          ],
          "destination": [
            "audio",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "output",
            0
          ],
          "destination": [
            "audio",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stop",
            0
          ],
          "destination": [
            "delay0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stop",
            0
          ],
          "destination": [
            "delay1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stop",
            0
          ],
          "destination": [
            "delay2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "stop",
            0
          ],
          "destination": [
            "delay3",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "silence",
            0
          ],
          "destination": [
            "env",
            0
          ]
        }
      }
    ]
  }
}
