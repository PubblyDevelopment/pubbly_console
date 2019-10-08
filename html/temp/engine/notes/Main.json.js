/*
Read MainXML.xml first, then this

It should be Main.json, but json doesn't have any comments, so the .js is just to get around that.

This is also the same book as the XML you just read, except it's gone through the xml->json conversion process
*/

// This is a pubbly book, as described in JSON format.
let book1 = {
    // Information about the book that applies to each page. Globals
    "info": {
        // Displayed at the top left
        "name": "Backyard Bugs",
        // Height of a single page
        "height": 600,
        // Width of a single page
        "width": 600,
        /* [Single, Double (not supported), Composite]
         * Single: 
         * 		Viewing area is 1X a single page's width (600px). 
         * 		Turns slide the current page off screen (left/right -> next/previous), and the turn targeted page on screen.
         * Composite: 
         *		Viewing area is twice a single page's width (1200px). 
         * 		Turns: 
         *			Front cover to spread: Cover slides to right hand side (left:600), then the spread doubles over on itself in front of the cover page
         * 			Spread to spread: TODO: FINISH THIS
         */


        "display": "composite",
        // Color of square bullet (associated with book category)
        "bullet": "#8867AC",
        // Whether or not the pubbly's sequences can be interupted by user interaction (clicking, dragging)
        "interrupt": false,
        // Whether or not the page's state is to be reset to last safe state on user interruption
        "saveStates": false,
        // Whether or not the user is allowed to manually turn the page
        "navigation": true,
        // Whether dropped objects move towards the center of the dropped link, or stay in their dropped location on drop accept
        "snapDrops": true,
        // Whether or not the last page of a composite book is a cover or spread
        "lastPageSpread": true
    },
    // Array of pages in book
    "pages": [
        {
            // Points are page/book specific numeric values.
            // They can be increased/decreased/set through sequencing
            // They can be compared at a sequence's end and trigger new sequences if the comparisons match
            "points": {
                // List of point values that have been changed throughout a sequence
                // Used after sequence completion to check point related triggers
                "changed": [],
                // Default point container. Other custom containers can be added through design
                "Page Points": 0
            },
            // Whether or not to reload a page after a turn as completed
            "reloadOnLeave": false,
            // Name of page, used in navigation dropdown UI.
            "name": "cover",
			/* Value of a page's countdown. 
			 * Once started/resumed, it will countdown 1 unit per second until it reaches 0
			 * Then, any associated countdownFinish triggers will be called
			 * Can also be incremented, decremented, set, finished (check triggers), and killed (no trigger check) through sequencing
			 * Fields can also display the value of a page's countdown timer.
			 */
            // Future addition: Custom coutdowns, turn this into array similar to points
            "countdown": 0,
            // Array of objects on page
            "objs": [
                {
                    "type": "image",
                    "name": "bugs01",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs01",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 6,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs01.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs01.jpeg"
                }
            ],
			/* Key used to reference specific object in array
             * 	- Why use a numeric array for page prop "objs" 
             */
            "objKey": {
                "bugs01": 0
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs1.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs1"
                }
            ],
            "audKey": {
                "bugs1": 1
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid0",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs1",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            41,
                            3
                        ],
                        [
                            564,
                            3
                        ],
                        [
                            564,
                            538
                        ],
                        [
                            41,
                            538
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                41,
                                3
                            ],
                            [
                                564,
                                3
                            ],
                            [
                                564,
                                538
                            ],
                            [
                                41,
                                538
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid1",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Page": 1
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "2-3",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs03",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs03",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 3,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs03.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs03.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs02",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs02",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 4,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs02.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs02.jpeg"
                }
            ],
            "objKey": {
                "bugs03": 0,
                "bugs02": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs3.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs3"
                }
            ],
            "audKey": {
                "bugs3": 1
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid2",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs3",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            665,
                            78
                        ],
                        [
                            1144,
                            78
                        ],
                        [
                            1144,
                            387
                        ],
                        [
                            665,
                            387
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                665,
                                78
                            ],
                            [
                                1144,
                                78
                            ],
                            [
                                1144,
                                387
                            ],
                            [
                                665,
                                387
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid3",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Page": 1
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "4-5",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs05",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs05",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs05.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs05.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs04",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs04",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs04.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs04.jpeg"
                }
            ],
            "objKey": {
                "bugs05": 0,
                "bugs04": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs4.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs4"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs5.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs5"
                }
            ],
            "audKey": {
                "bugs4": 1,
                "bugs5": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid4",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs4",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid5",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid6",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            20,
                            446
                        ],
                        [
                            598,
                            446
                        ],
                        [
                            598,
                            589
                        ],
                        [
                            20,
                            589
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                20,
                                446
                            ],
                            [
                                598,
                                446
                            ],
                            [
                                598,
                                589
                            ],
                            [
                                20,
                                589
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid7",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs5",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            951,
                            24
                        ],
                        [
                            1167,
                            24
                        ],
                        [
                            1167,
                            264
                        ],
                        [
                            951,
                            264
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                951,
                                24
                            ],
                            [
                                1167,
                                24
                            ],
                            [
                                1167,
                                264
                            ],
                            [
                                951,
                                264
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid8",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "6-7",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs07",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs07",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs07.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs07.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs06",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs06",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs06.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs06.jpeg"
                }
            ],
            "objKey": {
                "bugs07": 0,
                "bugs06": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs6.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs6"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs7.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs7"
                }
            ],
            "audKey": {
                "bugs6": 1,
                "bugs7": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid9",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs6",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid10",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid11",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            63,
                            21
                        ],
                        [
                            548,
                            21
                        ],
                        [
                            548,
                            170
                        ],
                        [
                            63,
                            170
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                63,
                                21
                            ],
                            [
                                548,
                                21
                            ],
                            [
                                548,
                                170
                            ],
                            [
                                63,
                                170
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid12",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs7",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            639,
                            310
                        ],
                        [
                            1165,
                            310
                        ],
                        [
                            1165,
                            488
                        ],
                        [
                            639,
                            488
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                639,
                                310
                            ],
                            [
                                1165,
                                310
                            ],
                            [
                                1165,
                                488
                            ],
                            [
                                639,
                                488
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid13",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "8-9",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs09",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs09",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs09.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs09.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs08",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs08",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs08.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs08.jpeg"
                }
            ],
            "objKey": {
                "bugs09": 0,
                "bugs08": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs8.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs8"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs9.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs9"
                }
            ],
            "audKey": {
                "bugs8": 1,
                "bugs9": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid14",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs8",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid15",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid16",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            84,
                            30
                        ],
                        [
                            542,
                            30
                        ],
                        [
                            542,
                            218
                        ],
                        [
                            84,
                            218
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                84,
                                30
                            ],
                            [
                                542,
                                30
                            ],
                            [
                                542,
                                218
                            ],
                            [
                                84,
                                218
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid17",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs9",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            687,
                            397
                        ],
                        [
                            1115,
                            397
                        ],
                        [
                            1115,
                            577
                        ],
                        [
                            687,
                            577
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                687,
                                397
                            ],
                            [
                                1115,
                                397
                            ],
                            [
                                1115,
                                577
                            ],
                            [
                                687,
                                577
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid18",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "10-11",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs11",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs11",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs11.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs11.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs10",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs10",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs10.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs10.jpeg"
                }
            ],
            "objKey": {
                "bugs11": 0,
                "bugs10": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs10.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs10"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs11.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs11"
                }
            ],
            "audKey": {
                "bugs10": 1,
                "bugs11": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid19",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs10",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid20",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid21",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            36,
                            86
                        ],
                        [
                            244,
                            86
                        ],
                        [
                            244,
                            472
                        ],
                        [
                            36,
                            472
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                36,
                                86
                            ],
                            [
                                244,
                                86
                            ],
                            [
                                244,
                                472
                            ],
                            [
                                36,
                                472
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid22",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs11",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            735,
                            34
                        ],
                        [
                            1086,
                            34
                        ],
                        [
                            1086,
                            177
                        ],
                        [
                            735,
                            177
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                735,
                                34
                            ],
                            [
                                1086,
                                34
                            ],
                            [
                                1086,
                                177
                            ],
                            [
                                735,
                                177
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid23",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "12-13",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs13",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs13",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs13.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs13.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs12",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs12",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs12.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs12.jpeg"
                }
            ],
            "objKey": {
                "bugs13": 0,
                "bugs12": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs12.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs12"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs13.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs13"
                }
            ],
            "audKey": {
                "bugs12": 1,
                "bugs13": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid24",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs12",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid25",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid26",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            92,
                            31
                        ],
                        [
                            520,
                            31
                        ],
                        [
                            520,
                            173
                        ],
                        [
                            92,
                            173
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                92,
                                31
                            ],
                            [
                                520,
                                31
                            ],
                            [
                                520,
                                173
                            ],
                            [
                                92,
                                173
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid27",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs13",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            687,
                            299
                        ],
                        [
                            1118,
                            299
                        ],
                        [
                            1118,
                            464
                        ],
                        [
                            687,
                            464
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                687,
                                299
                            ],
                            [
                                1118,
                                299
                            ],
                            [
                                1118,
                                464
                            ],
                            [
                                687,
                                464
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid28",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "14-15",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs15",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        600
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs15",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            600
                        ],
                        "vis": true,
                        "layer": 3,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs15.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs15.jpeg"
                },
                {
                    "type": "image",
                    "name": "bugs14",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs14",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 4,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs14.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs14.jpeg"
                }
            ],
            "objKey": {
                "bugs15": 0,
                "bugs14": 1
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs14.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs14"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs15.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs15"
                }
            ],
            "audKey": {
                "bugs14": 1,
                "bugs15": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid29",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs14",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid30",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid31",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            282,
                            255
                        ],
                        [
                            576,
                            255
                        ],
                        [
                            576,
                            446
                        ],
                        [
                            282,
                            446
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                282,
                                255
                            ],
                            [
                                576,
                                255
                            ],
                            [
                                576,
                                446
                            ],
                            [
                                282,
                                446
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid32",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs15",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            687,
                            25
                        ],
                        [
                            1132,
                            25
                        ],
                        [
                            1132,
                            185
                        ],
                        [
                            687,
                            185
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                687,
                                25
                            ],
                            [
                                1132,
                                25
                            ],
                            [
                                1132,
                                185
                            ],
                            [
                                687,
                                185
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid33",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Link 2": 1,
                "Page": 2
            },
            "init": {
                "points": null
            }
        },
        {
            "points": {
                "changed": [],
                "Page Points": 0
            },
            "reloadOnLeave": false,
            "name": "16",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "bugs16",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 600,
                    "height": 600,
                    "opacity": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {},
                    "fileRoot": "bugs16",
                    "ext": "jpeg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 600,
                        "width": 600,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 3,
                        "mobility": "fixed",
                        "opacity": 1
                    },
                    "fileName": "bugs16.jpeg",
                    "src": "\/Market_2018\/html\/publication\/3\/images\/bugs16.jpeg"
                }
            ],
            "objKey": {
                "bugs16": 0
            },
            "auds": [
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/bugs16.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "bugs16"
                },
                {
                    "ext": "wav",
                    "src": "\/Market_2018\/html\/publication\/3\/audio\/sfx_flash_2.wav",
                    "loaded": false,
                    "errored": false,
                    "filename": "sfx_flash_2"
                }
            ],
            "audKey": {
                "bugs16": 1,
                "sfx_flash_2": 2
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid34",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "bugs16",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid35",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": "audios",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid36",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 2,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid37",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "sfx_flash_2",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": []
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            27,
                            60
                        ],
                        [
                            296,
                            60
                        ],
                        [
                            296,
                            375
                        ],
                        [
                            27,
                            375
                        ]
                    ],
                    "enabled": "enabled",
                    "init": {
                        "poly": [
                            [
                                27,
                                60
                            ],
                            [
                                296,
                                60
                            ],
                            [
                                296,
                                375
                            ],
                            [
                                27,
                                375
                            ]
                        ],
                        "enabled": "enabled",
                        "drawing": "none",
                        "pinned": "undefined"
                    }
                },
                {
                    "triggers": {
                        "clicks": [],
                        "points": [],
                        "dragStops": [],
                        "lineStarts": [],
                        "lineStops": [],
                        "countdowns": [],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid38",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "page",
                    "poly": [],
                    "init": {
                        "poly": [],
                        "enabled": "undefined",
                        "drawing": "undefined",
                        "pinned": "undefined"
                    }
                }
            ],
            "linkKeys": {
                "Link 1": 0,
                "Page": 1
            },
            "init": {
                "points": null
            }
        }
    ],
    "points": {
        "changed": [],
    },
};

let obj = {
    "info": {
        "interrupt": false,
        // Displayed at the top left
        "name": "RSWL01Ba",
        // Height of a single page
        "height": 641,
        // Width of a single page
        "width": 1000,
        /* [Single, Double (not supported), Composite]
         * Single: 
         * 		Viewing area is 1X a single page's width (600px). 
         * 		Turns slide the current page off screen (left/right -> next/previous), and the turn targeted page on screen.
         * Composite: 
         *		Viewing area is twice a single page's width (1200px). 
         * 		Turns: 
         *			Front cover to spread: Cover slides to right hand side (left:600), then the spread doubles over on itself in front of the cover page
         * 			Spread to spread: TODO: FINISH THIS
         */
        "display": "single",
        // Color of square bullet (associated with book category)
        "bullet": "#8867AC",
        // Whether or not the pubbly's sequences can be interupted by user interaction (clicking, dragging)
        "interrupt": false,
        // Whether or not the page's state is to be reset to last safe state on user interruption
        "saveStates": false,
        // Whether or not the user is allowed to manually turn the page
        "navigation": false,
        // Whether dropped objects move towards the center of the dropped link, or stay in their dropped location on drop accept
        "snapDrops": true,
        // Whether or not the last page of a composite book is a cover or spread
        "lastPageSpread": false,
        // unused, and definitely wrong...
        "assetLocationPrefix": "undefined_",
        // All the highlight info here, same as xml
        "HighlightLinkColorRGBA": "RGBA(128,255,255,0.5)"
        "HighlightLinkColor": "128,255,255",
        "HighlightLinkTransparency": 50,
        "HighlightLinkTime": 500,
        // NEW. Generated from the HotFixUI. Sets the relative location of the pulltab and the type of UI that gets pulled down.
        "pulltabPosition": [
            // Can be "top", "middle", "bottom"
            "top",
            // "right", "middle", "left"
            "right"
        ],
        // "full" or "slim"
        "pulldownStyle": "full",
    },
    // Pages... holds each page in the project
    "pages": [
        {
            // Points! Hold each point key pair, and the point value
            "points": {
                "page points": 0,
                // Array of the point keys once they've been changed (used to check for point triggers after a sequence ends... If dog_points have been changed, and there's a dog_points triggered sequence, then you might want to check the values. If they HAVEN'T been changed, no need to check.)
                "changed": [

                ],
                // Initial values for all the points on page, used to "reset" a page (must reset all point values to original as well)
                "init": {
                    "page points": 0,
                    "changed": [

                    ]
                }
            },
            "reloadOnLeave": true,
            // Display name for page. Unused after UI update
            "name": "1",
            // Page scoped countdown int, seconds.
            "countdown": 0,
            // List of objects on page.
            "objs": [
                {
                    // Image object
                    "type": "image",
                    // Internal name
                    "name": "Background3_Marsh2",
                    // Z-index (zero indexed this time)
                    "layer": 0,
                    // Visibility as boolean
                    "vis": true,
                    // top-left location
                    "loc": [
                        0,
                        0
                    ],
                    "width": 1000,
                    "height": 641,
                    // 1 is 100%, 0.5 is 50%, 0 is 0%
                    "opacity": 1,
                    // In rotations, not degrees
                    "angle": 1,
                    // Same as before
                    "mobility": "fixed",
                    // Whether or not THIS OBJECT should z-index to the VERY FRONT when it's dragged.
                    "frontDrag": false,
                    // Keyed object for any animations
                    "animations": {

                    },
                    // file name
                    "fName": "P_Background3_Marsh2",
                    // file extension
                    "ext": "jpg",
                    // Size or Loc, or false
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    // INIT property values for the object (for object resetting)
                    "init": {
                        "height": 641,
                        "width": 1000,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 0,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    // Computed, the file source is the dog.png
                    "fSrc": "P_Background3_Marsh2.jpg",
                    // The path is from WHERE=EVER the book was first loaded to WHERE_EVER the asset was at that time.
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_Background3_Marsh2.jpg"
                },
                // Skip to animation
                {
                    "type": "image",
                    "name": "SW_PB_01_BA",
                    "layer": 1,
                    "vis": false,
                    "loc": [
                        91,
                        122
                    ],
                    "width": 416,
                    "height": 275,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {
                        // HEYO an object with an animation
                        "Center_grow": {
                            // Internal name of animation
                            "name": "Center_grow",
                            // Keyframes for animation
                            "data": [
                                // START. 
                                {
                                    "loc": [
                                        300,
                                        500
                                    ],
                                    "width": 0,
                                    "height": 0,
                                    "opacity": 1,
                                    // Time to get to next frame
                                    "time": 250,
                                    // False... yeah i don't know, blame JS
                                    "angle": false
                                },
                                // Keyframe
                                {
                                    "loc": [
                                        300,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            // Length of entire animation (length between all frames)
                            "totTime": 250
                        }
                        // Skip to auds
                    },
                    "fName": "C1_SW_PB_01_BA",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 275,
                    "swapWidth": 416,
                    "init": {
                        "height": 275,
                        "width": 416,
                        "loc": [
                            91,
                            122
                        ],
                        "vis": false,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_SW_PB_01_BA.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_BA.png"
                },
                {
                    "type": "image",
                    "name": "SW_PB_01_BA_blue",
                    "layer": 2,
                    "vis": false,
                    "loc": [
                        163,
                        292
                    ],
                    "width": 416,
                    "height": 275,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "C1_SW_PB_01_BA_blue",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 275,
                    "swapWidth": 416,
                    "init": {
                        "height": 275,
                        "width": 416,
                        "loc": [
                            163,
                            292
                        ],
                        "vis": false,
                        "layer": 2,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_SW_PB_01_BA_blue.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_BA_blue.png"
                },
                {
                    "type": "image",
                    "name": "replay_button_stroke2",
                    "layer": 3,
                    "vis": true,
                    "loc": [
                        552,
                        16
                    ],
                    "width": 75,
                    "height": 75,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_replay_button_stroke2",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 75,
                        "width": 75,
                        "loc": [
                            552,
                            16
                        ],
                        "vis": true,
                        "layer": 3,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_replay_button_stroke2.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_replay_button_stroke2.png"
                },
                {
                    "type": "image",
                    "name": "right_arrow_button_stroke2",
                    "layer": 4,
                    "vis": false,
                    "loc": [
                        552,
                        911
                    ],
                    "width": 75,
                    "height": 75,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_right_arrow_button_stroke2",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 75,
                        "width": 75,
                        "loc": [
                            552,
                            911
                        ],
                        "vis": false,
                        "layer": 4,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_right_arrow_button_stroke2.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_right_arrow_button_stroke2.png"
                }
            ],
            // Becaue the JS has to preload audio files, I need to know exactly what files are referenced in each book. (not just where they play in a sequence). So this is an array of audios on page.
            "auds": [
                {
                    // unused, should delete
                    "ext": false,
                    // unused, should delete
                    "fSrc": false,
                    // set to true when asset loads and calls back
                    "loaded": false,
                    // Set to true when asset fails
                    "errored": false,
                    // file name
                    "fName": "C1_Aud_inst_sw_BA_rev",
                    // Why no extension???
                    // Because for some reason we never used audio extensions, and so they could be a wav, an ogg or an mp3. And it was the client side job to just look for all three...
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_inst_sw_BA_rev",
                    // Internal reference name, which also happens to always be the exact same as the file name.
                    "name": "C1_Aud_inst_sw_BA_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_Aud_inst_sw_1",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_Aud_inst_sw_1",
                    "name": "P_Aud_inst_sw_1"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_inst_sw_BA_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_inst_sw_BA_rev",
                    "name": "C1_Aud_inst_sw_BA_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_Aud_inst_sw_1",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_Aud_inst_sw_1",
                    "name": "P_Aud_inst_sw_1"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_inst_sw_BA_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_inst_sw_BA_rev",
                    "name": "C1_Aud_inst_sw_BA_rev"
                }
            ],
            // Location in above array for a given audio file...
            // although now that I look at it, it looks like the audio files are redeclared every time...
            // I only every LOOK UP the location here first, then use aud[locInKey] for the element reference... so maybe they should just be keypaired from the outset? Well it's working for now.
            "audKey": {
                "C1_Aud_inst_sw_BA_rev": 5,
                "P_Aud_inst_sw_1": 4
            },
            // LINKS, list of links in project
            "links": [
                {
                    // Links can have multiple types of triggers
                    "triggers": {
                        // they can also have multiple triggers per type
                        // (clicks isn't a great example, but we were going to add a "on middle click, on right click"). so that would have been 3 click sequences, each with a different condition. But points, drops, countdowns, they all have multiple types of conditions, and therefore you can have multiple different drop sequences in one link.
                        "clicks": [
                            {
                                // It's a clickable link
                                "type": "click",
                                // You click it to trigger it.
                                "condition": "click",
                                // When you do, run these targets.
                                "targets": [
                                    {
                                        // debugging mostly... just a UID for every target in the project.
                                        "id": "tid0",
                                        // Audio target
                                        "type": "audio",
                                        // Play an audio file.
                                        "action": "play",
                                        // Play the C1_aud whatever file
                                        "destination": "C1_Aud_inst_sw_BA_rev",
                                        // It automatically goes to the next target (it doesn't block the sequence)
                                        "blocking": false,
                                        // But it will wait for all PREVIOUSLY TRIGGERED audio targets to FINISH before starting.
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid1",
                                        // A lot of object targets were just "set the object's property to something else". So I extracted that to a "prop change" target.
                                        "type": "propertyChange",
                                        // SET the property
                                        "action": "set",
                                        // Of this thing
                                        "destination": "SW_PB_01_BA_blue",
                                        // Don't block the next target
                                        "blocking": false,
                                        // Don't hold for the previous target
                                        "hold": false,
                                        // ... the thing is an object, not a link
                                        "destinationType": "object",
                                        // Set it's visiblity (this key value will always match with the object's property you're setting)
                                        "attribute": "vis",
                                        // to this.
                                        "value": true
                                        // It's a TYPE link. ACTION the DESTINATIONTYPE "DESTINATION"'s "ATTRIBUTE" to VALUE
                                        // It's a propertyChange link. Set the Object SW_PB_01_BA_blue's vis to true
                                        // (show SW_PB...)
                                    },
                                    {
                                        "id": "tid2",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.75,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid3",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "SW_PB_01_BA_blue",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        // This is where point related sequences go
                        "points": [

                        ],
                        // This is where drag stop related sequences go
                        "dragStops": [

                        ],
                        // start drawing a line
                        "lineStarts": [

                        ],
                        // stop drawing a line
                        "lineStops": [

                        ],
                        // start a countdown
                        "countdowns": [

                        ],
                        // trigger when page is opened
                        "openPages": [

                        ]
                    },
                    // WE'RE still talking about the SAME link right here... The json isn't ordered or anything, so it would be nice if the properties wer above the targets, but it doesn't actually make any difference

                    // Internal name of link
                    "name": "Link 1",
                    // It's a polygon
                    "type": "graphic",
                    // No lines are drawn from it (this is redundant actually, the line drawing triggers are all in the lineStart sequence array above)
                    "drawing": "none",
                    // Point polygon. It's in this format for better send off to the "is point in poly" function, which checks to see if a mouse click happened inside an oddly shaped poly.
                    // (it works by counting intersections left to right, but it's a common enough snipped to be a stack overflow copy)
                    "poly": [
                        [
                            285,
                            157
                        ],
                        [
                            717,
                            157
                        ],
                        [
                            717,
                            442
                        ],
                        [
                            285,
                            442
                        ]
                    ],
                    // Name of object the link is pinned to
                    "pinned": false,
                    // clickable or no
                    "enabled": false,
                    // Does it awkwardly highlight when clicked?
                    "clickHighlight": false,
                    // ... when clicked, this bool set to true, then false after 500ms. pubbly.drawPage functions look for THIS to see if they should draw the polygon on the page.
                    "clickHighlightOn": false,
                    // z-index of link (NOTE: Links are above objects. So an object with a z-index of 5 isn't above a link with a z-index of 1, meaning an object never BLOCKS a link. The link's z-index is just to tell, if there's a click inside TWO polygons at the same time, which one takes priority)
                    "layer": 1,
                    // Init values for everything above. Used for resets
                    "init": {
                        "poly": [
                            [
                                285,
                                157
                            ],
                            [
                                717,
                                157
                            ],
                            [
                                717,
                                442
                            ],
                            [
                                285,
                                442
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 1
                    }
                },
                // Another link, this has a very particular target... go look
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid4",
                                        "type": "reset",
                                        "action": "page reset",
                                        "destination": "page",
                                        "blocking": false,
                                        "hold": false
                                    },
                                    // SEND a CLICK to another link.
                                    /*
                                    GO FIND a link with the destination of THAT and pretend like someone clicked it.

                                    BUT MORE SPECIFICALLY,

                                    GO find that link, get all it's CLICK targets, and replace THIS target with THOSE.
                                    */
                                    {
                                        "id": "tid5",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "V Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                    // So if, for example, there were other targets down here after the send click target, they would play. After the entirety of V Link 1's click targets.

                                    /*
                                    Example.

                                    Link 1's targets [
                                        target1, 
                                        target2, 
                                        target3
                                    ];
                                    link 2's targets: [
                                        target4,
                                        send click to link 1,
                                        target5
                                    ]

                                    IN THE RUN TIME, link 2's sequence will play as

                                    target4,
                                    target1, 
                                    target2, 
                                    target3,
                                    target5,

                                    And yes, you could cause a sequence to infinitely loop
                                    */
                                ],
                                // How many times this sequence has been triggered
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            11,
                            548
                        ],
                        [
                            106,
                            548
                        ],
                        [
                            106,
                            630
                        ],
                        [
                            11,
                            630
                        ]
                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 2,
                    "init": {
                        "poly": [
                            [
                                11,
                                548
                            ],
                            [
                                106,
                                548
                            ],
                            [
                                106,
                                630
                            ],
                            [
                                11,
                                630
                            ]
                        ],
                        "enabled": true,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 2
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid6",
                                        "type": "navigation",
                                        "action": "navigate",
                                        "destination": "pubbly",
                                        "blocking": "all",
                                        "hold": "all",
                                        "attribute": "relative",
                                        "value": "next"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "Link 3",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            905,
                            547
                        ],
                        [
                            988,
                            547
                        ],
                        [
                            988,
                            630
                        ],
                        [
                            905,
                            630
                        ]
                    ],
                    "pinned": false,
                    "enabled": false,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 3,
                    "init": {
                        "poly": [
                            [
                                905,
                                547
                            ],
                            [
                                988,
                                547
                            ],
                            [
                                988,
                                630
                            ],
                            [
                                905,
                                630
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 3
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid7",
                                        "type": "reset",
                                        "action": "page reset",
                                        "destination": "page",
                                        "blocking": false,
                                        "hold": false
                                    },
                                    {
                                        "id": "tid8",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_Aud_inst_sw_1",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid9",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid10",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid11",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_inst_sw_BA_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid12",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid13",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Center_grow"
                                    },
                                    {
                                        "id": "tid14",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid15",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 3",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid16",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 1,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid17",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "right_arrow_button_stroke2",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "V Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    // Yes this polygon is off screen. Why we didn't just set the points to null or false or something, idk. But a "virtual" link, a link without points, is basically just a link above the clickable canvas area.
                    "poly": [
                        [
                            -80,
                            0
                        ],
                        [
                            -10,
                            0
                        ],
                        [
                            -10,
                            70
                        ],
                        [
                            -80,
                            70
                        ]
                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 4,
                    "init": {
                        "poly": [
                            [
                                -80,
                                0
                            ],
                            [
                                -10,
                                0
                            ],
                            [
                                -10,
                                70
                            ],
                            [
                                -80,
                                70
                            ]
                        ],
                        "enabled": true,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 4
                    }
                },
                // Yeah ok the rest is the same.
                {
                    "triggers": {
                        "clicks": [

                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid18",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_Aud_inst_sw_1",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid19",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid20",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid21",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_inst_sw_BA_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid22",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid23",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "SW_PB_01_BA",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Center_grow"
                                    },
                                    {
                                        "id": "tid24",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid25",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 3",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid26",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 1,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid27",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "right_arrow_button_stroke2",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "graphic",
                    "drawing": false,
                    "poly": [

                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 5,
                    "init": {
                        "poly": [

                        ],
                        "enabled": true,
                        "drawing": "false",
                        "pinned": false,
                        "layer": 5
                    }
                }
            ]
        },
        {
            "points": {
                "page points": 0,
                "changed": [

                ],
                "init": {
                    "page points": 0,
                    "changed": [

                    ]
                }
            },
            "reloadOnLeave": true,
            "name": "2",
            "countdown": 0,
            "objs": [
                {
                    "type": "image",
                    "name": "Background3_Marsh2",
                    "layer": 0,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 1000,
                    "height": 641,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_Background3_Marsh2",
                    "ext": "jpg",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 641,
                        "width": 1000,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 0,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_Background3_Marsh2.jpg",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_Background3_Marsh2.jpg"
                },
                {
                    "type": "image",
                    "name": "Full Word",
                    "layer": 1,
                    "vis": true,
                    "loc": [
                        0,
                        0
                    ],
                    "width": 1000,
                    "height": 600,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {
                        "Fade_in": {
                            "name": "Fade_in",
                            "data": [
                                {
                                    "loc": [
                                        300,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 0,
                                    "time": 250,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        300,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 250
                        }
                    },
                    "fName": "C1_SW_PB_01_Baba",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 600,
                    "swapWidth": 1000,
                    "init": {
                        "height": 600,
                        "width": 1000,
                        "loc": [
                            0,
                            0
                        ],
                        "vis": true,
                        "layer": 1,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_SW_PB_01_Baba.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_Baba.png"
                },
                {
                    "type": "image",
                    "name": "Syl Drag Left",
                    "layer": 2,
                    "vis": false,
                    "loc": [
                        41,
                        311
                    ],
                    "width": 178,
                    "height": 118,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "drag",
                    "frontDrag": false,
                    "animations": {
                        "Fade_in_syl_left": {
                            "name": "Fade_in_syl_left",
                            "data": [
                                {
                                    "loc": [
                                        100,
                                        400
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 0,
                                    "time": 250,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        100,
                                        400
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 250
                        },
                        "Spin_To_Drag_Start_Syl_Left": {
                            "name": "Spin_To_Drag_Start_Syl_Left",
                            "data": [
                                {
                                    "loc": [
                                        100,
                                        400
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 500,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        250,
                                        600
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 1
                                }
                            ],
                            "totTime": 500
                        }
                    },
                    "fName": "C1_SW_PB_01_BA",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 275,
                    "swapWidth": 416,
                    "droppedLoc": false,
                    "init": {
                        "height": 118,
                        "width": 178,
                        "loc": [
                            41,
                            311
                        ],
                        "vis": false,
                        "layer": 2,
                        "mobility": "drag",
                        "opacity": 1,
                        "angle": 1,
                        "droppedLoc": false
                    },
                    "fSrc": "C1_SW_PB_01_BA.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_BA.png"
                },
                {
                    "type": "image",
                    "name": "Syl Drag Right",
                    "layer": 3,
                    "vis": false,
                    "loc": [
                        41,
                        511
                    ],
                    "width": 178,
                    "height": 118,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "drag",
                    "frontDrag": false,
                    "animations": {
                        "Fade_in_syl_right": {
                            "name": "Fade_in_syl_right",
                            "data": [
                                {
                                    "loc": [
                                        100,
                                        600
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 250,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        100,
                                        600
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 250
                        },
                        "Spin_to_Drag_Start_Syl_Right": {
                            "name": "Spin_to_Drag_Start_Syl_Right",
                            "data": [
                                {
                                    "loc": [
                                        100,
                                        600
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 500,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        250,
                                        800
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 1
                                }
                            ],
                            "totTime": 500
                        }
                    },
                    "fName": "C1_SW_PB_01_BA",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 275,
                    "swapWidth": 416,
                    "droppedLoc": false,
                    "init": {
                        "height": 118,
                        "width": 178,
                        "loc": [
                            41,
                            511
                        ],
                        "vis": false,
                        "layer": 3,
                        "mobility": "drag",
                        "opacity": 1,
                        "angle": 1,
                        "droppedLoc": false
                    },
                    "fSrc": "C1_SW_PB_01_BA.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_BA.png"
                },
                {
                    "type": "image",
                    "name": "red line left",
                    "layer": 4,
                    "vis": false,
                    "loc": [
                        454,
                        544
                    ],
                    "width": 182,
                    "height": 12,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_red line",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 12,
                        "width": 182,
                        "loc": [
                            454,
                            544
                        ],
                        "vis": false,
                        "layer": 4,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_red line.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_red line.png"
                },
                {
                    "type": "image",
                    "name": "green line left",
                    "layer": 5,
                    "vis": false,
                    "loc": [
                        454,
                        544
                    ],
                    "width": 182,
                    "height": 12,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_green line",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 12,
                        "width": 182,
                        "loc": [
                            454,
                            544
                        ],
                        "vis": false,
                        "layer": 5,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_green line.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_green line.png"
                },
                {
                    "type": "image",
                    "name": "suffix left",
                    "layer": 6,
                    "vis": false,
                    "loc": [
                        338,
                        728
                    ],
                    "width": 24,
                    "height": 111,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "C1_blank",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 10,
                    "swapWidth": 10,
                    "init": {
                        "height": 111,
                        "width": 24,
                        "loc": [
                            338,
                            728
                        ],
                        "vis": false,
                        "layer": 6,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_blank.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_blank.png"
                },
                {
                    "type": "image",
                    "name": "red line right",
                    "layer": 7,
                    "vis": false,
                    "loc": [
                        454,
                        769
                    ],
                    "width": 182,
                    "height": 12,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_red line",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 12,
                        "width": 182,
                        "loc": [
                            454,
                            769
                        ],
                        "vis": false,
                        "layer": 7,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_red line.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_red line.png"
                },
                {
                    "type": "image",
                    "name": "green line right",
                    "layer": 8,
                    "vis": false,
                    "loc": [
                        454,
                        769
                    ],
                    "width": 182,
                    "height": 12,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_green line",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 12,
                        "width": 182,
                        "loc": [
                            454,
                            769
                        ],
                        "vis": false,
                        "layer": 8,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_green line.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_green line.png"
                },
                {
                    "type": "image",
                    "name": "suffix right",
                    "layer": 9,
                    "vis": false,
                    "loc": [
                        338,
                        953
                    ],
                    "width": 24,
                    "height": 111,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "C1_blank",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 10,
                    "swapWidth": 10,
                    "init": {
                        "height": 111,
                        "width": 24,
                        "loc": [
                            338,
                            953
                        ],
                        "vis": false,
                        "layer": 9,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_blank.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_blank.png"
                },
                {
                    "type": "image",
                    "name": "Assoc pic",
                    "layer": 10,
                    "vis": false,
                    "loc": [
                        150,
                        250
                    ],
                    "width": 500,
                    "height": 450,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {
                        "button_press": {
                            "name": "button_press",
                            "data": [
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 200,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 1.05,
                                    "height": 1.05,
                                    "opacity": 1,
                                    "time": 200,
                                    "angle": 0
                                },
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 400
                        },
                        "center_grow": {
                            "name": "center_grow",
                            "data": [
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 0,
                                    "height": 0,
                                    "opacity": 1,
                                    "time": 400,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 400
                        },
                        "slide_left": {
                            "name": "slide_left",
                            "data": [
                                {
                                    "loc": [
                                        375,
                                        500
                                    ],
                                    "width": 1,
                                    "height": 1,
                                    "opacity": 1,
                                    "time": 500,
                                    "angle": false
                                },
                                {
                                    "loc": [
                                        375,
                                        250
                                    ],
                                    "width": 0.9,
                                    "height": 0.9,
                                    "opacity": 1,
                                    "time": 0,
                                    "angle": 0
                                }
                            ],
                            "totTime": 500
                        }
                    },
                    "fName": "C1_SW_PB_01_BA_pic_01",
                    "ext": "png",
                    "swapMethod": "size",
                    "swapHeight": 397,
                    "swapWidth": 333,
                    "init": {
                        "height": 450,
                        "width": 500,
                        "loc": [
                            150,
                            250
                        ],
                        "vis": false,
                        "layer": 10,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "C1_SW_PB_01_BA_pic_01.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/C1_SW_PB_01_BA_pic_01.png"
                },
                {
                    "type": "image",
                    "name": "replay_button_stroke2",
                    "layer": 11,
                    "vis": false,
                    "loc": [
                        552,
                        16
                    ],
                    "width": 75,
                    "height": 75,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_replay_button_stroke2",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 75,
                        "width": 75,
                        "loc": [
                            552,
                            16
                        ],
                        "vis": false,
                        "layer": 11,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_replay_button_stroke2.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_replay_button_stroke2.png"
                },
                {
                    "type": "image",
                    "name": "right_arrow_button_stroke2",
                    "layer": 12,
                    "vis": false,
                    "loc": [
                        552,
                        911
                    ],
                    "width": 75,
                    "height": 75,
                    "opacity": 1,
                    "angle": 1,
                    "mobility": "fixed",
                    "frontDrag": false,
                    "animations": {

                    },
                    "fName": "P_right_arrow_button_stroke2",
                    "ext": "png",
                    "swapMethod": false,
                    "swapHeight": false,
                    "swapWidth": false,
                    "init": {
                        "height": 75,
                        "width": 75,
                        "loc": [
                            552,
                            911
                        ],
                        "vis": false,
                        "layer": 12,
                        "mobility": "fixed",
                        "opacity": 1,
                        "angle": 1
                    },
                    "fSrc": "P_right_arrow_button_stroke2.png",
                    "relPath": "series/Sw_Reading_lvl1_DoubleDrop//images/P_right_arrow_button_stroke2.png"
                }
            ],
            "auds": [
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_drop effect",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_drop effect",
                    "name": "P_drop effect"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_drop effect",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_drop effect",
                    "name": "P_drop effect"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_Aud_inst_sw_2",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_Aud_inst_sw_2",
                    "name": "P_Aud_inst_sw_2"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_sw_baba_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_sw_baba_rev",
                    "name": "C1_Aud_sw_baba_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_inst_sw_find_ba_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_inst_sw_find_ba_rev",
                    "name": "C1_Aud_inst_sw_find_ba_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_slide flute half second",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_slide flute half second",
                    "name": "P_slide flute half second"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_slide flute half second",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_slide flute half second",
                    "name": "P_slide flute half second"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_sw_baba_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_sw_baba_rev",
                    "name": "C1_Aud_sw_baba_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_glint half second",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_glint half second",
                    "name": "P_glint half second"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_Aud_inst_sw_2",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_Aud_inst_sw_2",
                    "name": "P_Aud_inst_sw_2"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_sw_baba_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_sw_baba_rev",
                    "name": "C1_Aud_sw_baba_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "C1_Aud_inst_sw_find_ba_rev",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/C1_Aud_inst_sw_find_ba_rev",
                    "name": "C1_Aud_inst_sw_find_ba_rev"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_slide flute half second",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_slide flute half second",
                    "name": "P_slide flute half second"
                },
                {
                    "ext": false,
                    "fSrc": false,
                    "loaded": false,
                    "errored": false,
                    "fName": "P_slide flute half second",
                    "relPathNoExt": "series/Sw_Reading_lvl1_DoubleDrop//audio/P_slide flute half second",
                    "name": "P_slide flute half second"
                }
            ],
            "audKey": {
                "P_drop effect": 2,
                "P_Aud_inst_sw_2": 10,
                "C1_Aud_sw_baba_rev": 11,
                "C1_Aud_inst_sw_find_ba_rev": 12,
                "P_slide flute half second": 14,
                "P_glint half second": 9
            },
            "links": [
                {
                    "triggers": {
                        "clicks": [

                        ],
                        "points": [

                        ],
                        "dragStops": [
                            {
                                "type": "dragStop",
                                "condition": "Syl Drag Left",
                                "targets": [
                                    {
                                        "id": "tid28",
                                        "type": "point",
                                        "action": "+",
                                        "destination": "page points",
                                        "blocking": false,
                                        "hold": false,
                                        "attribute": "value",
                                        "value": 1
                                    },
                                    {
                                        "id": "tid29",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid30",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "green line left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid31",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_drop effect",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "DropLeft",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            534,
                            331
                        ],
                        [
                            742,
                            331
                        ],
                        [
                            742,
                            459
                        ],
                        [
                            534,
                            459
                        ]
                    ],
                    "pinned": false,
                    "enabled": false,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 1,
                    "init": {
                        "poly": [
                            [
                                534,
                                331
                            ],
                            [
                                742,
                                331
                            ],
                            [
                                742,
                                459
                            ],
                            [
                                534,
                                459
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 1
                    }
                },
                {
                    "triggers": {
                        "clicks": [

                        ],
                        "points": [

                        ],
                        "dragStops": [
                            {
                                "type": "dragStop",
                                "condition": "Syl Drag Right",
                                "targets": [
                                    {
                                        "id": "tid32",
                                        "type": "point",
                                        "action": "+",
                                        "destination": "page points",
                                        "blocking": false,
                                        "hold": false,
                                        "attribute": "value",
                                        "value": 1
                                    },
                                    {
                                        "id": "tid33",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid34",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "green line right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid35",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_drop effect",
                                        "blocking": false,
                                        "hold": "audios"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "DropRight",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            760,
                            329
                        ],
                        [
                            959,
                            329
                        ],
                        [
                            959,
                            458
                        ],
                        [
                            760,
                            458
                        ]
                    ],
                    "pinned": false,
                    "enabled": false,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 2,
                    "init": {
                        "poly": [
                            [
                                760,
                                329
                            ],
                            [
                                959,
                                329
                            ],
                            [
                                959,
                                458
                            ],
                            [
                                760,
                                458
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 2
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid36",
                                        "type": "reset",
                                        "action": "page reset",
                                        "destination": "page",
                                        "blocking": false,
                                        "hold": false
                                    },
                                    {
                                        "id": "tid37",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "V Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            98,
                            22
                        ],
                        [
                            991,
                            22
                        ],
                        [
                            991,
                            597
                        ],
                        [
                            98,
                            597
                        ]
                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 3,
                    "init": {
                        "poly": [
                            [
                                98,
                                22
                            ],
                            [
                                991,
                                22
                            ],
                            [
                                991,
                                597
                            ],
                            [
                                98,
                                597
                            ]
                        ],
                        "enabled": true,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 3
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid38",
                                        "type": "navigation",
                                        "action": "navigate",
                                        "destination": "pubbly",
                                        "blocking": "all",
                                        "hold": "all",
                                        "attribute": "relative",
                                        "value": "next"
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "Link 2",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            905,
                            548
                        ],
                        [
                            993,
                            548
                        ],
                        [
                            993,
                            634
                        ],
                        [
                            905,
                            634
                        ]
                    ],
                    "pinned": false,
                    "enabled": false,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 4,
                    "init": {
                        "poly": [
                            [
                                905,
                                548
                            ],
                            [
                                993,
                                548
                            ],
                            [
                                993,
                                634
                            ],
                            [
                                905,
                                634
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 4
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid39",
                                        "type": "reset",
                                        "action": "page reset",
                                        "destination": "page",
                                        "blocking": false,
                                        "hold": false
                                    },
                                    {
                                        "id": "tid40",
                                        "type": "point",
                                        "action": "=",
                                        "destination": "page points",
                                        "blocking": false,
                                        "hold": false,
                                        "attribute": "value",
                                        "value": 0
                                    },
                                    {
                                        "id": "tid41",
                                        "type": "send",
                                        "action": "click",
                                        "destination": "V Link 1",
                                        "blocking": false,
                                        "hold": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "Link 3",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            14,
                            547
                        ],
                        [
                            92,
                            547
                        ],
                        [
                            92,
                            631
                        ],
                        [
                            14,
                            631
                        ]
                    ],
                    "pinned": false,
                    "enabled": false,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 5,
                    "init": {
                        "poly": [
                            [
                                14,
                                547
                            ],
                            [
                                92,
                                547
                            ],
                            [
                                92,
                                631
                            ],
                            [
                                14,
                                631
                            ]
                        ],
                        "enabled": false,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 5
                    }
                },
                {
                    "triggers": {
                        "clicks": [
                            {
                                "type": "click",
                                "condition": "click",
                                "targets": [
                                    {
                                        "id": "tid42",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid43",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Full Word",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in"
                                    },
                                    {
                                        "id": "tid44",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_Aud_inst_sw_2",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid45",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid46",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid47",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "center_grow"
                                    },
                                    {
                                        "id": "tid48",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.4,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid49",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_sw_baba_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid50",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid51",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "button_press"
                                    },
                                    {
                                        "id": "tid52",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "static",
                                        "blocking": [
                                            "gifs",
                                            "flashes",
                                            "animations",
                                            "videos",
                                            "sequences"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid53",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid54",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "slide_left"
                                    },
                                    {
                                        "id": "tid55",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_inst_sw_find_ba_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid56",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid57",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid58",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid59",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Left",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in_syl_left"
                                    },
                                    {
                                        "id": "tid60",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid61",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Right",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in_syl_right"
                                    },
                                    {
                                        "id": "tid62",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.4,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid63",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_slide flute half second",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid64",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid65",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Left",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Spin_To_Drag_Start_Syl_Left"
                                    },
                                    {
                                        "id": "tid66",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_slide flute half second",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid67",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid68",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Right",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Spin_to_Drag_Start_Syl_Right"
                                    },
                                    {
                                        "id": "tid69",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid70",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid71",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid72",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid73",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "DropLeft",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid74",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "DropRight",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid75",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": false
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "points": [

                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [

                        ]
                    },
                    "name": "V Link 1",
                    "type": "graphic",
                    "drawing": "none",
                    "poly": [
                        [
                            -80,
                            0
                        ],
                        [
                            -10,
                            0
                        ],
                        [
                            -10,
                            70
                        ],
                        [
                            -80,
                            70
                        ]
                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 6,
                    "init": {
                        "poly": [
                            [
                                -80,
                                0
                            ],
                            [
                                -10,
                                0
                            ],
                            [
                                -10,
                                70
                            ],
                            [
                                -80,
                                70
                            ]
                        ],
                        "enabled": true,
                        "drawing": "none",
                        "pinned": false,
                        "layer": 6
                    }
                },
                {
                    "triggers": {
                        "clicks": [

                        ],
                        "points": [
                            {
                                "type": "point",
                                "condition": [
                                    "page points",
                                    "=",
                                    "2"
                                ],
                                "targets": [
                                    {
                                        "id": "tid76",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_sw_baba_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid77",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Syl Drag Left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid78",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Syl Drag Right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid79",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "green line left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid80",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "green line right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid81",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid82",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid83",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid84",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "center",
                                        "value": {
                                            "x": 750,
                                            "y": 607
                                        }
                                    },
                                    {
                                        "id": "tid85",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.5,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid86",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_glint half second",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid87",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid88",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.5,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid89",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 2",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid90",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 3",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid91",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "replay_button_stroke2",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid92",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "right_arrow_button_stroke2",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    }
                                ],
                                "run": 0
                            }
                        ],
                        "dragStops": [

                        ],
                        "lineStarts": [

                        ],
                        "lineStops": [

                        ],
                        "countdowns": [

                        ],
                        "openPages": [
                            {
                                "type": "openPage",
                                "condition": "every",
                                "targets": [
                                    {
                                        "id": "tid93",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid94",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Full Word",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in"
                                    },
                                    {
                                        "id": "tid95",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_Aud_inst_sw_2",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid96",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid97",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid98",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "center_grow"
                                    },
                                    {
                                        "id": "tid99",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.4,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid100",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_sw_baba_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid101",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid102",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "button_press"
                                    },
                                    {
                                        "id": "tid103",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "static",
                                        "blocking": [
                                            "gifs",
                                            "flashes",
                                            "animations",
                                            "videos",
                                            "sequences"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid104",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Assoc pic",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid105",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Assoc pic",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "slide_left"
                                    },
                                    {
                                        "id": "tid106",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "C1_Aud_inst_sw_find_ba_rev",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid107",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": "silence",
                                        "blocking": [
                                            "audios",
                                            "videos"
                                        ],
                                        "hold": false
                                    },
                                    {
                                        "id": "tid108",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Full Word",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": false
                                    },
                                    {
                                        "id": "tid109",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid110",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Left",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in_syl_left"
                                    },
                                    {
                                        "id": "tid111",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid112",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Right",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Fade_in_syl_right"
                                    },
                                    {
                                        "id": "tid113",
                                        "type": "wait",
                                        "action": "wait for",
                                        "destination": 0.4,
                                        "blocking": "waits",
                                        "hold": false
                                    },
                                    {
                                        "id": "tid114",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_slide flute half second",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid115",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid116",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Left",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Spin_To_Drag_Start_Syl_Left"
                                    },
                                    {
                                        "id": "tid117",
                                        "type": "audio",
                                        "action": "play",
                                        "destination": "P_slide flute half second",
                                        "blocking": false,
                                        "hold": "audios"
                                    },
                                    {
                                        "id": "tid118",
                                        "type": "propertyChange",
                                        "action": "object",
                                        "destination": "Syl Drag Right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true,
                                        "autoDraw": false
                                    },
                                    {
                                        "id": "tid119",
                                        "type": "animation",
                                        "action": "animate",
                                        "destination": "Syl Drag Right",
                                        "blocking": [
                                            "self"
                                        ],
                                        "holds": false,
                                        "value": "Spin_to_Drag_Start_Syl_Right"
                                    },
                                    {
                                        "id": "tid120",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid121",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix left",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid122",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "red line right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid123",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "suffix right",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "object",
                                        "attribute": "vis",
                                        "value": true
                                    },
                                    {
                                        "id": "tid124",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "DropLeft",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid125",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "DropRight",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": true
                                    },
                                    {
                                        "id": "tid126",
                                        "type": "propertyChange",
                                        "action": "set",
                                        "destination": "Link 1",
                                        "blocking": false,
                                        "hold": false,
                                        "destinationType": "link",
                                        "attribute": "enabled",
                                        "value": false
                                    }
                                ],
                                "run": 0
                            }
                        ]
                    },
                    "name": "Page",
                    "type": "graphic",
                    "drawing": false,
                    "poly": [

                    ],
                    "pinned": false,
                    "enabled": true,
                    "clickHighlight": false,
                    "clickHighlightOn": false,
                    "layer": 7,
                    "init": {
                        "poly": [

                        ],
                        "enabled": true,
                        "drawing": "false",
                        "pinned": false,
                        "layer": 7
                    }
                }
            ]
        }
    ],
    "drawingTool": {

    },
    "points": {

    }
}