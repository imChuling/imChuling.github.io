{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 0,
      "revision": 9,
      "architecture": "x64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      80,
      80,
      1080,
      780
    ],
    "gridsize": [
      15.0,
      15.0
    ],
    "boxes": [
      {
        "box": {
          "autosave": 1,
          "id": "obj-6",
          "inletInfo": {
            "IOInfo": [
              {
                "type": "signal",
                "index": 1,
                "tag": "in1",
                "comment": ""
              },
              {
                "type": "signal",
                "index": 2,
                "tag": "in2",
                "comment": ""
              }
            ]
          },
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 3,
          "outletInfo": {
            "IOInfo": [
              {
                "type": "signal",
                "index": 1,
                "tag": "out1",
                "comment": ""
              },
              {
                "type": "signal",
                "index": 2,
                "tag": "out2",
                "comment": ""
              }
            ]
          },
          "outlettype": [
            "signal",
            "signal",
            "list"
          ],
          "patcher": {
            "fileversion": 1,
            "appversion": {
              "major": 9,
              "minor": 0,
              "revision": 9,
              "architecture": "x64",
              "modernui": 1
            },
            "classnamespace": "rnbo",
            "rect": [
              1775.0,
              276.0,
              614.0,
              600.0
            ],
            "default_fontname": "Lato",
            "gridsize": [
              15.0,
              15.0
            ],
            "title": "untitled",
            "boxes": [
              {
                "box": {
                  "id": "obj-22",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    428.0,
                    40.0,
                    23.0
                  ],
                  "rnbo_classname": "*",
                  "rnbo_extra_attributes": {
                    "hot": 0
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "*_obj-22",
                  "text": "* 0.01"
                }
              },
              {
                "box": {
                  "id": "obj-21",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    328.0,
                    40.0,
                    23.0
                  ],
                  "rnbo_classname": "*",
                  "rnbo_extra_attributes": {
                    "hot": 0
                  },
                  "rnbo_serial": 2,
                  "rnbo_uniqueid": "*_obj-21",
                  "text": "* 0.01"
                }
              },
              {
                "box": {
                  "id": "obj-16",
                  "maxclass": "newobj",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    91.0,
                    221.0,
                    35.0,
                    23.0
                  ],
                  "rnbo_classname": "in~",
                  "rnbo_extra_attributes": {
                    "meta": "",
                    "comment": ""
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "in~_obj-16",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "out1": {
                        "attrOrProp": 1,
                        "digest": "signal from inlet with index 2",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 0,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "signal"
                      },
                      "index": {
                        "attrOrProp": 2,
                        "digest": "inlet number",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "mandatory": 1
                      },
                      "comment": {
                        "attrOrProp": 2,
                        "digest": "mouse over comment",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol"
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 3
                      }
                    },
                    "inputs": [],
                    "outputs": [
                      {
                        "name": "out1",
                        "type": "signal",
                        "digest": "signal from inlet with index 2",
                        "displayName": "",
                        "docked": 0
                      }
                    ],
                    "helpname": "in~",
                    "aliasOf": "in~",
                    "classname": "in~",
                    "operator": 0,
                    "versionId": -176007711,
                    "changesPatcherIO": 1
                  },
                  "text": "in~ 2"
                }
              },
              {
                "box": {
                  "id": "obj-20",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    359.0,
                    90.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "setparam_obj-20",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam width"
                }
              },
              {
                "box": {
                  "id": "obj-19",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    298.0,
                    301.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "0",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "width",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param width @minimum 0. @maximum 100. @value 50.",
                  "varname": "width"
                }
              },
              {
                "box": {
                  "id": "obj-15",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    527.0,
                    39.0,
                    23.0
                  ],
                  "rnbo_classname": "dbtoa",
                  "rnbo_extra_attributes": {
                    "hot": 0
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "dbtoa_obj-15",
                  "text": "dbtoa"
                }
              },
              {
                "box": {
                  "id": "obj-13",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    494.0,
                    282.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 2,
                  "rnbo_uniqueid": "gain",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param gain @minimum -36 @maximum 12 @value 0",
                  "varname": "gain"
                }
              },
              {
                "box": {
                  "id": "obj-14",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    560.0,
                    82.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 2,
                  "rnbo_uniqueid": "setparam_obj-14",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam gain"
                }
              },
              {
                "box": {
                  "id": "obj-1",
                  "maxclass": "newobj",
                  "numinlets": 0,
                  "numoutlets": 1,
                  "outlettype": [
                    "signal"
                  ],
                  "patching_rect": [
                    36.0,
                    221.0,
                    35.0,
                    23.0
                  ],
                  "rnbo_classname": "in~",
                  "rnbo_extra_attributes": {
                    "meta": "",
                    "comment": ""
                  },
                  "rnbo_serial": 2,
                  "rnbo_uniqueid": "in~_obj-1",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "out1": {
                        "attrOrProp": 1,
                        "digest": "signal from inlet with index 1",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 0,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "signal"
                      },
                      "index": {
                        "attrOrProp": 2,
                        "digest": "inlet number",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "mandatory": 1
                      },
                      "comment": {
                        "attrOrProp": 2,
                        "digest": "mouse over comment",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol"
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 3
                      }
                    },
                    "inputs": [],
                    "outputs": [
                      {
                        "name": "out1",
                        "type": "signal",
                        "digest": "signal from inlet with index 1",
                        "displayName": "",
                        "docked": 0
                      }
                    ],
                    "helpname": "in~",
                    "aliasOf": "in~",
                    "classname": "in~",
                    "operator": 0,
                    "versionId": -176007711,
                    "changesPatcherIO": 1
                  },
                  "text": "in~ 1"
                }
              },
              {
                "box": {
                  "id": "obj-17",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    399.0,
                    290.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 3,
                  "rnbo_uniqueid": "mix",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param mix @minimum 0. @maximum 100. @value 50.",
                  "varname": "mix"
                }
              },
              {
                "box": {
                  "id": "obj-18",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    457.0,
                    79.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 3,
                  "rnbo_uniqueid": "setparam_obj-18",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam mix"
                }
              },
              {
                "box": {
                  "id": "obj-12",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    86.0,
                    286.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 4,
                  "rnbo_uniqueid": "pitch",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param pitch @minimum -12 @maximum 12 @value 0",
                  "varname": "pitch"
                }
              },
              {
                "box": {
                  "id": "obj-11",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    227.0,
                    330.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 5,
                  "rnbo_uniqueid": "grainPos",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param grainPos @minimum 10. @maximum 500. @value 100.",
                  "varname": "grainPos"
                }
              },
              {
                "box": {
                  "id": "obj-10",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    157.0,
                    332.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 6,
                  "rnbo_uniqueid": "grainSize",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param grainSize @minimum 10. @maximum 500. @value 100.",
                  "varname": "grainSize"
                }
              },
              {
                "box": {
                  "id": "obj-9",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "",
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    14.0,
                    324.0,
                    23.0
                  ],
                  "rnbo_classname": "param",
                  "rnbo_extra_attributes": {
                    "ctlin": 0.0,
                    "steps": 0.0,
                    "tonormalized": "",
                    "fromnormalized": "",
                    "enum": "",
                    "exponent": 1.0,
                    "unit": "",
                    "order": "",
                    "meta": "",
                    "sendinit": 1,
                    "preset": 1,
                    "displayorder": "-",
                    "displayname": ""
                  },
                  "rnbo_serial": 7,
                  "rnbo_uniqueid": "interval",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "value": {
                        "attrOrProp": 2,
                        "digest": "Set initial value",
                        "defaultarg": 2,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Initial Value",
                        "displayorder": 3
                      },
                      "normalizedvalue": {
                        "attrOrProp": 1,
                        "digest": "Set value normalized. ",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset param to initial value",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "normalized": {
                        "attrOrProp": 1,
                        "digest": "Normalized parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "outlet": 1,
                        "type": "number"
                      },
                      "name": {
                        "attrOrProp": 2,
                        "digest": "Name of the parameter",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "Parameter Name",
                        "mandatory": 1
                      },
                      "enum": {
                        "attrOrProp": 2,
                        "digest": "Use an enumerated output",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "list",
                        "label": "Enum Values",
                        "displayorder": 6
                      },
                      "minimum": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 0,
                        "aliases": [
                          "min"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "min": {
                        "attrOrProp": 2,
                        "digest": "Minimum value",
                        "isalias": 1,
                        "aliasOf": "minimum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Minimum",
                        "displayorder": 1
                      },
                      "maximum": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 0,
                        "aliases": [
                          "max"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "max": {
                        "attrOrProp": 2,
                        "digest": "Maximum value",
                        "isalias": 1,
                        "aliasOf": "maximum",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Maximum",
                        "displayorder": 2
                      },
                      "exponent": {
                        "attrOrProp": 2,
                        "digest": "Scale values exponentially",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "1",
                        "label": "Exponent",
                        "displayorder": 7
                      },
                      "steps": {
                        "attrOrProp": 2,
                        "digest": "Divide the output into a number of discrete steps",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "defaultValue": "0",
                        "label": "Steps",
                        "displayorder": 8
                      },
                      "displayName": {
                        "attrOrProp": 2,
                        "digest": "DEPRECATED: Use the lower case 'displayname' instead",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "symbol",
                        "label": "Display Name"
                      },
                      "displayname": {
                        "attrOrProp": 2,
                        "digest": "A more readable name for the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Display Name",
                        "displayorder": 14
                      },
                      "unit": {
                        "attrOrProp": 2,
                        "digest": "A symbol to describe the unit of the parameter in an external RNBO target",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Unit",
                        "displayorder": 15
                      },
                      "tonormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a real parameter value to its normalized form.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "To Normalized Expression",
                        "displayorder": 10
                      },
                      "fromnormalized": {
                        "attrOrProp": 2,
                        "digest": "Converts a normalized parameter into its actual parameter value.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "label": "From Normalized Expression",
                        "displayorder": 9
                      },
                      "order": {
                        "attrOrProp": 2,
                        "digest": "Order in which initial parameter values will be sent out on patcher load. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "0",
                        "label": "Restore Order",
                        "displayorder": 12
                      },
                      "displayorder": {
                        "attrOrProp": 2,
                        "digest": "Order in which parameters will show up in a list of all parameters. The order can be numeric or symbolic ('first' and 'last')",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "-",
                        "label": "Display Order",
                        "displayorder": 13
                      },
                      "sendinit": {
                        "attrOrProp": 2,
                        "digest": "Send initial value",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Send Init",
                        "displayorder": 4
                      },
                      "ctlin": {
                        "attrOrProp": 2,
                        "digest": "MIDI controller number to control this parameter.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "label": "MIDI Controller Number.",
                        "displayorder": 16
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 17
                      },
                      "nopreset": {
                        "attrOrProp": 2,
                        "digest": "Do not add this value to the preset [DEPRECATED - USE @preset 0 instead].",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 1,
                        "type": "bool",
                        "defaultValue": "false"
                      },
                      "preset": {
                        "attrOrProp": 2,
                        "digest": "Add this value to the preset.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "true",
                        "label": "Include In Preset",
                        "displayorder": 11
                      }
                    },
                    "inputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalizedvalue",
                        "type": "number",
                        "digest": "Set value normalized. ",
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "value",
                        "type": "number",
                        "digest": "Parameter value",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "normalized",
                        "type": "number",
                        "digest": "Normalized parameter value.",
                        "docked": 0
                      }
                    ],
                    "helpname": "param",
                    "aliasOf": "param",
                    "classname": "param",
                    "operator": 0,
                    "versionId": 301681565,
                    "changesPatcherIO": 0
                  },
                  "text": "param interval @minimum 10. @maximum 500. @value 100.",
                  "varname": "interval"
                }
              },
              {
                "box": {
                  "id": "obj-8",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    117.0,
                    86.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 4,
                  "rnbo_uniqueid": "setparam_obj-8",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam pitch"
                }
              },
              {
                "box": {
                  "id": "obj-7",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    259.0,
                    105.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 5,
                  "rnbo_uniqueid": "setparam_obj-7",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam grainPos"
                }
              },
              {
                "box": {
                  "id": "obj-6",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    187.0,
                    107.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 6,
                  "rnbo_uniqueid": "setparam_obj-6",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam grainSize"
                }
              },
              {
                "box": {
                  "id": "obj-5",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 1,
                  "outlettype": [
                    ""
                  ],
                  "patching_rect": [
                    247.0,
                    45.0,
                    99.0,
                    23.0
                  ],
                  "rnbo_classname": "setparam",
                  "rnbo_serial": 7,
                  "rnbo_uniqueid": "setparam_obj-5",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "name": {
                        "attrOrProp": 2,
                        "digest": "attribute/param to control",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "mandatory": 1
                      }
                    },
                    "inputs": [
                      {
                        "name": "input",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "attribute or parameter value (bang, number, list)",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [
                      {
                        "name": "output",
                        "type": [
                          "bang",
                          "number",
                          "list",
                          "signal"
                        ],
                        "digest": "connect to first inlet of gen or subpatcher",
                        "docked": 0
                      }
                    ],
                    "helpname": "set",
                    "aliasOf": "set",
                    "classname": "setparam",
                    "operator": 0,
                    "versionId": 2121358407,
                    "changesPatcherIO": 0
                  },
                  "text": "setparam interval"
                }
              },
              {
                "box": {
                  "id": "obj-4",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    36.0,
                    332.0,
                    43.0,
                    23.0
                  ],
                  "rnbo_classname": "out~",
                  "rnbo_extra_attributes": {
                    "meta": "",
                    "comment": ""
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "out~_obj-4",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "in1": {
                        "attrOrProp": 1,
                        "digest": "signal sent to outlet with index 1",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 0,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "signal"
                      },
                      "index": {
                        "attrOrProp": 2,
                        "digest": "outlet number",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "mandatory": 1
                      },
                      "comment": {
                        "attrOrProp": 2,
                        "digest": "mouse over comment",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol"
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 3
                      }
                    },
                    "inputs": [
                      {
                        "name": "in1",
                        "type": "signal",
                        "digest": "signal sent to outlet with index 1",
                        "displayName": "",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [],
                    "helpname": "out~",
                    "aliasOf": "out~",
                    "classname": "out~",
                    "operator": 0,
                    "versionId": 374499139,
                    "changesPatcherIO": 1
                  },
                  "text": "out~ 1"
                }
              },
              {
                "box": {
                  "id": "obj-3",
                  "maxclass": "newobj",
                  "numinlets": 1,
                  "numoutlets": 0,
                  "patching_rect": [
                    91.0,
                    332.0,
                    43.0,
                    23.0
                  ],
                  "rnbo_classname": "out~",
                  "rnbo_extra_attributes": {
                    "meta": "",
                    "comment": ""
                  },
                  "rnbo_serial": 2,
                  "rnbo_uniqueid": "out~_obj-3",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "in1": {
                        "attrOrProp": 1,
                        "digest": "signal sent to outlet with index 2",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 0,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "signal"
                      },
                      "index": {
                        "attrOrProp": 2,
                        "digest": "outlet number",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "number",
                        "mandatory": 1
                      },
                      "comment": {
                        "attrOrProp": 2,
                        "digest": "mouse over comment",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol"
                      },
                      "meta": {
                        "attrOrProp": 2,
                        "digest": "A JSON formatted string containing metadata for use by the exported code",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "defaultValue": "",
                        "label": "Metadata",
                        "displayorder": 3
                      }
                    },
                    "inputs": [
                      {
                        "name": "in1",
                        "type": "signal",
                        "digest": "signal sent to outlet with index 2",
                        "displayName": "",
                        "hot": 1,
                        "docked": 0
                      }
                    ],
                    "outputs": [],
                    "helpname": "out~",
                    "aliasOf": "out~",
                    "classname": "out~",
                    "operator": 0,
                    "versionId": 374499139,
                    "changesPatcherIO": 1
                  },
                  "text": "out~ 2"
                }
              },
              {
                "box": {
                  "genpatcher": {
                    "patcher": {
                      "fileversion": 1,
                      "appversion": {
                        "major": 9,
                        "minor": 0,
                        "revision": 9,
                        "architecture": "x64",
                        "modernui": 1
                      },
                      "classnamespace": "dsp.gen",
                      "rect": [
                        2017.0,
                        91.0,
                        960.0,
                        931.0
                      ],
                      "gridsize": [
                        15.0,
                        15.0
                      ],
                      "boxes": [
                        {
                          "box": {
                            "maxclass": "newobj",
                            "text": "in 2",
                            "patching_rect": [
                              860.0,
                              15.0,
                              28.0,
                              22.0
                            ],
                            "numinlets": 0,
                            "numoutlets": 1,
                            "outlettype": [
                              ""
                            ],
                            "id": "obj-2"
                          }
                        },
                        {
                          "box": {
                            "maxclass": "newobj",
                            "text": "in 1",
                            "patching_rect": [
                              50.0,
                              15.0,
                              28.0,
                              22.0
                            ],
                            "numinlets": 0,
                            "numoutlets": 1,
                            "outlettype": [
                              ""
                            ],
                            "id": "obj-1"
                          }
                        },
                        {
                          "box": {
                            "maxclass": "newobj",
                            "text": "out 2",
                            "patching_rect": [
                              860.0,
                              863.0,
                              35.0,
                              22.0
                            ],
                            "numinlets": 1,
                            "numoutlets": 0,
                            "id": "obj-6"
                          }
                        },
                        {
                          "box": {
                            "maxclass": "codebox",
                            "patching_rect": [
                              50.0,
                              47.0,
                              829.0,
                              788.0
                            ],
                            "fontsize": 12.0,
                            "fontname": "<Monospaced>",
                            "numinlets": 2,
                            "numoutlets": 2,
                            "fontface": 0,
                            "outlettype": [
                              "",
                              ""
                            ],
                            "id": "obj-5",
                            "code": "Param interval(100);\nParam grainSize(100);\nParam grainPos(100);\nParam width(0.5);\nParam pitch(0);\nParam mix(0.5);\nParam gain(0);\n\nDelay del_inL(samplerate * 2);\nDelay del_inR(samplerate * 2);\n\nData data_param(6, 100);\n\nHistory his_index(0);\nHistory his_mix(0), his_gain(0);\n\nhis_mix = (mix - his_mix) * 0.001 + his_mix;\nhis_gain = (gain - his_gain) * 0.001 + his_gain;\n\nmaxVoice = 100;\n\ndel_inL.write(in1);\ndel_inR.write(in2);\n\nmCout = counter(1, 0, mstosamps(interval));\nif (mCout == 1) {\n\tif (peek(data_param, 0, his_index) == 0) {\n\t\tpoke(data_param, 1, 0, his_index);\n\t\tpoke(data_param, mstosamps(grainSize), 1, his_index);\n\t\tsizeScaled = mstosamps(grainSize);\n\t\twidthRand = noise() * 0.5 * width;\n\t\tpoke(data_param, 0.5 + widthRand, 3, his_index);\n\t\tpoke(data_param, 0.5 - widthRand, 4, his_index);\n\t\tpitchScaled = pow(2, pitch / 12) - 1;\n\t\tpoke(data_param, pitchScaled, 5, his_index);\n\t\this_index = wrap(his_index + 1, 0, maxVoice);\n\t\tposScaled = mstosamps(grainPos) * abs(noise());\n\t\tpoke(data_param, posScaled + max(sizeScaled*pitchScaled, 0), 2, his_index);\n\t}\n}\n\noutL = 0;\noutR = 0;\ntotalWin = 0;\nfor (i = 0; i < maxVoice; i += 1) {\n\tpCout = peek(data_param, 0, i);\n\tif (pCout != 0) {\n\t\ts = peek(data_param, 1, i);\n\t\tif (pCout < s) {\n\t\t\tpCoutScaled = pCout / s;\n\t\t\twin = 0.5 * (sin (1.5 * PI + pCoutScaled * TWOPI) + 1);\n\t\t\toutputL = del_inL.read(peek(data_param, 2, i) - pCout * peek(data_param, 5, i)) * win;\n\t\t\toutputR = del_inR.read(peek(data_param, 2, i) - pCout * peek(data_param, 5, i)) * win;\n\t\t\toutL += outputL * peek(data_param, 3, i);\n\t\t\toutR += outputR * peek(data_param, 4, i);\n\t\t\tpoke(data_param, pCout + 1, 0, i);\n\t\t\ttotalWin += win;\n\t\t} else {\n\t\t\tpoke(data_param, 0, 0, i);\n\t\t}\n\t}\n}\n\nnormalise = pow(1 / max(totalWin, 1), 0.3) * his_gain;\nout1 = mix(in1, outL * normalise, his_mix);\nout2 = mix(in2, outR * normalise, his_mix);"
                          }
                        },
                        {
                          "box": {
                            "maxclass": "newobj",
                            "text": "out 1",
                            "patching_rect": [
                              50.0,
                              863.0,
                              35.0,
                              22.0
                            ],
                            "numinlets": 1,
                            "numoutlets": 0,
                            "id": "obj-4"
                          }
                        }
                      ],
                      "lines": [
                        {
                          "patchline": {
                            "source": [
                              "obj-2",
                              0
                            ],
                            "destination": [
                              "obj-5",
                              1
                            ]
                          }
                        },
                        {
                          "patchline": {
                            "source": [
                              "obj-5",
                              0
                            ],
                            "destination": [
                              "obj-4",
                              0
                            ]
                          }
                        },
                        {
                          "patchline": {
                            "source": [
                              "obj-5",
                              1
                            ],
                            "destination": [
                              "obj-6",
                              0
                            ]
                          }
                        },
                        {
                          "patchline": {
                            "source": [
                              "obj-1",
                              0
                            ],
                            "destination": [
                              "obj-5",
                              0
                            ]
                          }
                        }
                      ]
                    }
                  },
                  "id": "obj-2",
                  "maxclass": "newobj",
                  "numinlets": 2,
                  "numoutlets": 2,
                  "outlettype": [
                    "signal",
                    "signal"
                  ],
                  "patching_rect": [
                    36.0,
                    276.0,
                    74.0,
                    23.0
                  ],
                  "rnbo_classname": "gen~",
                  "rnbo_extra_attributes": {
                    "exposeparams": 0
                  },
                  "rnbo_serial": 1,
                  "rnbo_uniqueid": "gen~_obj-2",
                  "rnboinfo": {
                    "needsInstanceInfo": 1,
                    "argnames": {
                      "in1": {
                        "attrOrProp": 1,
                        "digest": "in1",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "inlet": 1,
                        "type": "number"
                      },
                      "reset": {
                        "attrOrProp": 1,
                        "digest": "Reset all param and history objects to initial values",
                        "isalias": 0,
                        "aliases": [],
                        "attachable": 1,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bang"
                      },
                      "expr": {
                        "attrOrProp": 2,
                        "digest": "a gen expression",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "doNotShowInMaxInspector": 1
                      },
                      "file": {
                        "attrOrProp": 2,
                        "digest": "gendsp file to load",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "doNotShowInMaxInspector": 1
                      },
                      "title": {
                        "attrOrProp": 2,
                        "digest": "a title",
                        "defaultarg": 1,
                        "isalias": 0,
                        "aliases": [
                          "t"
                        ],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol",
                        "doNotShowInMaxInspector": 1
                      },
                      "t": {
                        "attrOrProp": 2,
                        "digest": "a title",
                        "defaultarg": 1,
                        "isalias": 1,
                        "aliasOf": "title",
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "symbol"
                      },
                      "exposeparams": {
                        "attrOrProp": 2,
                        "digest": "Expose gen params as RNBO params.",
                        "isalias": 0,
                        "aliases": [],
                        "settable": 1,
                        "attachable": 0,
                        "isparam": 0,
                        "deprecated": 0,
                        "type": "bool",
                        "defaultValue": "false"
                      }
                    },
                    "inputs": [
                      {
                        "name": "in1",
                        "type": "auto",
                        "digest": "in1",
                        "hot": 1,
                        "docked": 0
                      },
                      {
                        "name": "in2",
                        "type": "auto"
                      }
                    ],
                    "outputs": [
                      {
                        "name": "out1",
                        "type": "signal"
                      },
                      {
                        "name": "out2",
                        "type": "signal"
                      }
                    ],
                    "helpname": "gen~",
                    "aliasOf": "gen~",
                    "classname": "gen~",
                    "operator": 0,
                    "versionId": 179904306,
                    "changesPatcherIO": 0
                  },
                  "text": "gen~"
                }
              }
            ],
            "lines": [
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-1",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-6",
                    0
                  ],
                  "source": [
                    "obj-10",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-7",
                    0
                  ],
                  "source": [
                    "obj-11",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-8",
                    0
                  ],
                  "source": [
                    "obj-12",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-15",
                    0
                  ],
                  "source": [
                    "obj-13",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-14",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-14",
                    0
                  ],
                  "source": [
                    "obj-15",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    1
                  ],
                  "source": [
                    "obj-16",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-22",
                    0
                  ],
                  "source": [
                    "obj-17",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-18",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-21",
                    0
                  ],
                  "source": [
                    "obj-19",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-3",
                    0
                  ],
                  "source": [
                    "obj-2",
                    1
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-4",
                    0
                  ],
                  "source": [
                    "obj-2",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-20",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-20",
                    0
                  ],
                  "source": [
                    "obj-21",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-18",
                    0
                  ],
                  "source": [
                    "obj-22",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-5",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-6",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-7",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-2",
                    0
                  ],
                  "source": [
                    "obj-8",
                    0
                  ]
                }
              },
              {
                "patchline": {
                  "destination": [
                    "obj-5",
                    0
                  ],
                  "source": [
                    "obj-9",
                    0
                  ]
                }
              }
            ]
          },
          "patching_rect": [
            740,
            570,
            170,
            24
          ],
          "rnboattrcache": {
            "mix": {
              "label": "mix",
              "isEnum": 0,
              "parsestring": ""
            },
            "grainSize": {
              "label": "grainSize",
              "isEnum": 0,
              "parsestring": ""
            },
            "interval": {
              "label": "interval",
              "isEnum": 0,
              "parsestring": ""
            },
            "width": {
              "label": "width",
              "isEnum": 0,
              "parsestring": ""
            },
            "pitch": {
              "label": "pitch",
              "isEnum": 0,
              "parsestring": ""
            },
            "gain": {
              "label": "gain",
              "isEnum": 0,
              "parsestring": ""
            },
            "grainPos": {
              "label": "grainPos",
              "isEnum": 0,
              "parsestring": ""
            }
          },
          "rnboversion": "1.3.5",
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_invisible": 1,
              "parameter_longname": "rnbo~[2]",
              "parameter_modmode": 0,
              "parameter_shortname": "rnbo~",
              "parameter_type": 3
            }
          },
          "saved_object_attributes": {
            "optimization": "O1",
            "parameter_enable": 1,
            "uuid": "e11c7c6b-5a8b-11ed-bc6b-320bb4f5a2e5"
          },
          "text": "rnbo~",
          "varname": "rnbo~[2]",
          "presentation": 1,
          "presentation_rect": [
            740,
            570,
            170,
            24
          ]
        }
      },
      {
        "box": {
          "attr": "width",
          "id": "obj-3",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            40,
            604,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            604,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "attr": "gain",
          "id": "obj-7",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            40,
            641,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            641,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "basictuning": 440,
          "clipheight": 173,
          "data": {
            "clips": [
              {
                "absolutepath": "/Users/lichuling/Downloads/Lower Parliament Street 81.m4a",
                "filename": "Lower Parliament Street 81.m4a",
                "filekind": "audiofile",
                "id": "u891001154",
                "loop": 0,
                "content_state": {}
              }
            ]
          },
          "followglobaltempo": 0,
          "formantcorrection": 0,
          "id": "obj-9",
          "maxclass": "playlist~",
          "mode": "basic",
          "numinlets": 1,
          "numoutlets": 5,
          "originallength": [
            0.0,
            "ticks"
          ],
          "originaltempo": 120.0,
          "outlettype": [
            "signal",
            "signal",
            "signal",
            "",
            "dictionary"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            40,
            120,
            650,
            175
          ],
          "pitchcorrection": 0,
          "quality": "basic",
          "saved_attribute_attributes": {
            "candicane2": {
              "expression": ""
            },
            "candicane3": {
              "expression": ""
            },
            "candicane4": {
              "expression": ""
            },
            "candicane5": {
              "expression": ""
            },
            "candicane6": {
              "expression": ""
            },
            "candicane7": {
              "expression": ""
            },
            "candicane8": {
              "expression": ""
            }
          },
          "timestretch": [
            0
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            120,
            650,
            175
          ]
        }
      },
      {
        "box": {
          "attr": "mix",
          "id": "obj-4",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            370,
            604,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            370,
            604,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "attr": "interval",
          "id": "obj-16",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            40,
            530,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            530,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "attr": "grainSize",
          "id": "obj-17",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            40,
            567,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            567,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "attr": "grainPos",
          "id": "obj-18",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            370,
            567,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            370,
            567,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "attr": "pitch",
          "id": "obj-19",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            370,
            530,
            295,
            26
          ],
          "presentation": 1,
          "presentation_rect": [
            370,
            530,
            295,
            26
          ]
        }
      },
      {
        "box": {
          "id": "obj-5",
          "lastchannelcount": 0,
          "maxclass": "live.gain~",
          "numinlets": 2,
          "numoutlets": 5,
          "outlettype": [
            "signal",
            "signal",
            "",
            "float",
            "list"
          ],
          "parameter_enable": 1,
          "patching_rect": [
            745,
            370,
            85,
            130
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_longname": "live.gain~[1]",
              "parameter_mmax": 6.0,
              "parameter_mmin": -70.0,
              "parameter_modmode": 0,
              "parameter_shortname": "live.gain~",
              "parameter_type": 0,
              "parameter_unitstyle": 4
            }
          },
          "varname": "live.gain~[1]",
          "presentation": 1,
          "presentation_rect": [
            745,
            370,
            85,
            130
          ]
        }
      },
      {
        "box": {
          "id": "obj-13",
          "maxclass": "ezdac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            740,
            285,
            52,
            52
          ],
          "presentation": 1,
          "presentation_rect": [
            740,
            285,
            52,
            52
          ]
        }
      },
      {
        "box": {
          "id": "web-label-0",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            30.0,
            550.0,
            900.0,
            20.0
          ],
          "text": "First reading",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "web-preset-0",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            40,
            820,
            960,
            24
          ],
          "text": "mix 35, width 65, grainSize 180, grainPos 90, interval 100, pitch 0, gain -12",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "web-label-1",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            30.0,
            625.0,
            900.0,
            20.0
          ],
          "text": "Passing through",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "web-preset-1",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            40,
            860,
            960,
            24
          ],
          "text": "mix 85, width 100, grainSize 360, grainPos 260, interval 45, pitch -5, gain -12",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "web-label-2",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            30.0,
            700.0,
            900.0,
            20.0
          ],
          "text": "Returning with a trace",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "web-preset-2",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            40,
            900,
            960,
            24
          ],
          "text": "mix 65, width 85, grainSize 300, grainPos 180, interval 65, pitch 0, gain -12",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "source-credit",
          "linecount": 3,
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            40,
            1020,
            960,
            50
          ],
          "text": "AS YOU READ — adaptation of JR-Granular by szkkng. GPL-3.0; see ../vendor/jr-granular/LICENSE. DSP unchanged. Presets are untested starting points. Drop your own audio into playlist; start quietly. Web export pending.",
          "presentation": 0
        }
      },
      {
        "box": {
          "id": "title",
          "maxclass": "comment",
          "text": "AS YOU READ / Sound study",
          "patching_rect": [
            40,
            28,
            920,
            42
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            28,
            920,
            42
          ],
          "fontsize": 30,
          "textcolor": [
            0.15,
            0.16,
            0.18,
            1
          ]
        }
      },
      {
        "box": {
          "id": "subtitle",
          "maxclass": "comment",
          "text": "A passage changes what you hear when you return.",
          "patching_rect": [
            40,
            78,
            860,
            24
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            78,
            860,
            24
          ],
          "fontsize": 16,
          "textcolor": [
            0.35,
            0.4,
            0.5,
            1
          ]
        }
      },
      {
        "box": {
          "id": "audio-note",
          "maxclass": "comment",
          "text": "01  DROP AUDIO HERE • press its play triangle",
          "patching_rect": [
            40,
            100,
            650,
            20
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            100,
            650,
            20
          ],
          "fontsize": 11
        }
      },
      {
        "box": {
          "id": "transport-note",
          "maxclass": "comment",
          "text": "02  AUDIO ON / OFF",
          "patching_rect": [
            740,
            245,
            255,
            24
          ],
          "presentation": 1,
          "presentation_rect": [
            740,
            245,
            255,
            24
          ],
          "fontsize": 14
        }
      },
      {
        "box": {
          "id": "gain-note",
          "maxclass": "comment",
          "text": "OUTPUT • starts at −20 dB",
          "patching_rect": [
            740,
            343,
            285,
            24
          ],
          "presentation": 1,
          "presentation_rect": [
            740,
            343,
            285,
            24
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "states-label",
          "maxclass": "comment",
          "text": "03  CHOOSE A LISTENING STATE",
          "patching_rect": [
            40,
            320,
            660,
            24
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            320,
            660,
            24
          ],
          "fontsize": 14
        }
      },
      {
        "box": {
          "id": "state-button-0",
          "maxclass": "textbutton",
          "text": "01  First reading",
          "patching_rect": [
            40,
            358,
            205,
            52
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            358,
            205,
            52
          ],
          "texton": "01  First reading",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            "int"
          ],
          "fontsize": 15,
          "bgcolor": [
            0.35,
            0.4,
            0.5,
            1
          ],
          "textcolor": [
            1,
            1,
            1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "state-note-0",
          "maxclass": "comment",
          "text": "An initial, clearer impression.",
          "patching_rect": [
            40,
            421,
            205,
            47
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            421,
            205,
            47
          ],
          "fontsize": 12,
          "linecount": 2
        }
      },
      {
        "box": {
          "id": "state-button-1",
          "maxclass": "textbutton",
          "text": "02  Passing through",
          "patching_rect": [
            260,
            358,
            205,
            52
          ],
          "presentation": 1,
          "presentation_rect": [
            260,
            358,
            205,
            52
          ],
          "texton": "02  Passing through",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            "int"
          ],
          "fontsize": 15,
          "bgcolor": [
            0.35,
            0.4,
            0.5,
            1
          ],
          "textcolor": [
            1,
            1,
            1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "state-note-1",
          "maxclass": "comment",
          "text": "Longer grains, more density, lower pitch.",
          "patching_rect": [
            260,
            421,
            205,
            47
          ],
          "presentation": 1,
          "presentation_rect": [
            260,
            421,
            205,
            47
          ],
          "fontsize": 12,
          "linecount": 2
        }
      },
      {
        "box": {
          "id": "state-button-2",
          "maxclass": "textbutton",
          "text": "03  Returning",
          "patching_rect": [
            480,
            358,
            205,
            52
          ],
          "presentation": 1,
          "presentation_rect": [
            480,
            358,
            205,
            52
          ],
          "texton": "03  Returning",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            "int"
          ],
          "fontsize": 15,
          "bgcolor": [
            0.35,
            0.4,
            0.5,
            1
          ],
          "textcolor": [
            1,
            1,
            1,
            1
          ]
        }
      },
      {
        "box": {
          "id": "state-note-2",
          "maxclass": "comment",
          "text": "Some of the texture remains.",
          "patching_rect": [
            480,
            421,
            205,
            47
          ],
          "presentation": 1,
          "presentation_rect": [
            480,
            421,
            205,
            47
          ],
          "fontsize": 12,
          "linecount": 2
        }
      },
      {
        "box": {
          "id": "controls-note",
          "maxclass": "comment",
          "text": "FINE ADJUSTMENTS • existing JR-Granular parameters",
          "patching_rect": [
            40,
            494,
            660,
            24
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            494,
            660,
            24
          ],
          "fontsize": 12
        }
      },
      {
        "box": {
          "id": "credits",
          "maxclass": "comment",
          "text": "Sound engine: JR-Granular / szkkng (GPL-3.0). Max/RNBO Web Export verified.\nReading-state adaptation for Chuling Li. This patch is the granular layer; the pedal chain is a separate unfinished study.",
          "patching_rect": [
            40,
            699,
            970,
            47
          ],
          "presentation": 1,
          "presentation_rect": [
            40,
            699,
            970,
            47
          ],
          "fontsize": 11,
          "linecount": 2
        }
      },
      {
        "box": {
          "id": "open-engine-button",
          "maxclass": "textbutton",
          "text": "Open RNBO engine",
          "patching_rect": [
            740,
            540,
            250,
            28
          ],
          "presentation": 1,
          "presentation_rect": [
            740,
            540,
            250,
            28
          ],
          "texton": "Open RNBO engine",
          "mode": 0,
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            "int"
          ]
        }
      },
      {
        "box": {
          "id": "open-engine-message",
          "maxclass": "message",
          "text": "open",
          "patching_rect": [
            740,
            820,
            80,
            22
          ],
          "presentation": 0,
          "presentation_rect": [
            740,
            820,
            80,
            22
          ],
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ]
        }
      },
      {
        "box": {
          "id": "init-gain",
          "maxclass": "newobj",
          "text": "loadmess -20",
          "patching_rect": [
            740,
            860,
            120,
            22
          ],
          "presentation": 0,
          "presentation_rect": [
            740,
            860,
            120,
            22
          ],
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ]
        }
      },
      {
        "box": {
          "id": "init-open",
          "maxclass": "newobj",
          "text": "loadbang",
          "patching_rect": [
            740,
            900,
            80,
            22
          ],
          "presentation": 0,
          "presentation_rect": [
            740,
            900,
            80,
            22
          ],
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ]
        }
      },
      {
        "box": {
          "id": "defer-open",
          "maxclass": "newobj",
          "text": "deferlow",
          "patching_rect": [
            740,
            940,
            80,
            22
          ],
          "presentation": 0,
          "presentation_rect": [
            740,
            940,
            80,
            22
          ],
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-16",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-17",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-18",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-19",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-3",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-4",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-13",
            1
          ],
          "source": [
            "obj-5",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-13",
            0
          ],
          "source": [
            "obj-5",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-5",
            1
          ],
          "source": [
            "obj-6",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-5",
            0
          ],
          "source": [
            "obj-6",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-7",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            1
          ],
          "source": [
            "obj-9",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-9",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "web-preset-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "web-preset-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "web-preset-2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "state-button-0",
            0
          ],
          "destination": [
            "web-preset-0",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "state-button-1",
            0
          ],
          "destination": [
            "web-preset-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "state-button-2",
            0
          ],
          "destination": [
            "web-preset-2",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "open-engine-button",
            0
          ],
          "destination": [
            "open-engine-message",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "open-engine-message",
            0
          ],
          "destination": [
            "obj-6",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "init-gain",
            0
          ],
          "destination": [
            "obj-5",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "init-open",
            0
          ],
          "destination": [
            "defer-open",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "defer-open",
            0
          ],
          "destination": [
            "open-engine-message",
            0
          ]
        }
      }
    ],
    "parameters": {
      "obj-5": [
        "live.gain~[1]",
        "live.gain~",
        0
      ],
      "obj-6": [
        "rnbo~[2]",
        "rnbo~",
        0
      ],
      "inherited_shortname": 1
    },
    "autosave": 0,
    "openinpresentation": 1,
    "presentation_rect": [
      0,
      0,
      1080,
      780
    ],
    "bgcolor": [
      0.953,
      0.949,
      0.937,
      1
    ],
    "locked": 1
  }
}
