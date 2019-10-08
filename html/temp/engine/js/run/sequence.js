/* 
Fake superclass, because this was writen a little before ES6 was in, or maybe it was already in and I'm jsut bad at my job
And if you want to tell me this can all be accomplished with the new fangled ES6 supers, well YOU go refactor it
*/

function Sq_Player(type, scopes, callbacks, target) {
    // SUPERS
    const _This = this;
    this._Sequence = scopes[0];
    this._Pubbly = scopes[1];

    // PROPS
    this.logName;
    this.target = target;

    // EVENTS
    // Player loaded and buffered adequately
    this.readied = false;
    this.ready = function () {
        this.readied = true;
        if (this.ready_child) {
            this.ready_child();
        }
        _This.callAll.call(_This, "readied");
    };
    // Audio sounding, animation moving, wait waiting
    this.playing = false;
    // Start the thing
    this.play = function () {
        if (!this.playing) {
            if (this.play_child) {
                this.play_child();
            }
            this.callAll.call(this, "playing");
            this.playing = true;
        }
    };
    // Died on it's own: Audio finished
    this.finished = false;
    this.finish = function () {
        if (!this.finished) {
            this.finished = true;
            this.playing = false;
            if (this.finish_child) {
                this.finish_child();
            }
            this.callAll.call(this, "finished");
        }
    }
    // Shot by sequence: Sequence interrupted, and sequence killed all players
    this.killed = false;
    this.kill = function () {
        if (!this.killed) {
            this.killed = true;
            this.playing = false;
            this.finished = false;
            if (this.kill_child) {
                this.kill_child();
            }
            this.callAll.call(this, "killed");
        }
    };
    // Killed by stranger: Asset didn't load, browser blocked it for some reason
    this.errored = false;
    this.error = function () {
        this.playing = false;
        this.finished = false;
        this.errored = true;
        if (this.error_child) {
            this.error_child();
        }
        _This.callAll.call(_This, "errored");
    }

    // CALLBACKS
    // Fill up the subsequent arrays with 5,10 whatever number functions you want called when it happens
    this.cbs = {
        readied: [],
        playing: [],
        finished: [],
        killed: [],
        errored: []
    };
    // Adds whatever (if any) callbacks the player was initiated with
    for (let c in this.cbs) {
        // If there's a match between a requested callback, and a known good child specific callback...
        if (callbacks && callbacks[c])
            this.cbs[c].push(callbacks[c]);
    }
    // Calls every function in the associated cbs[place]
    this.callAll = function (what) {
        let callBacksToCallBack = this.cbs[what];
        if (callBacksToCallBack.length) {
            for (let c = 0; c < callBacksToCallBack.length; c++) {
                callBacksToCallBack[c].call(this);
            }
        }
    };

    this.postTarget = function () {
        _This._Sequence.postTarget.call(_This._Sequence, _This.target);
    };

    if (Sq_Players_Child[type]) {
        this.buildChild = Sq_Players_Child[type];
        this.buildChild();
    } else {
        error("fatal", "sequence player", "Unknown player subtype of " + type);
    }
}

let Sq_Players_Child = {
    animation: function () {
        const _This = this;

        this.obj = this._Pubbly.find(this.target.chosenDestination, "object");
        this.obj.animations.playing = this.target.value;
        this.obj.animations.at = 0;
        this.obj.animations.end = this.obj.animations[this.target.value].totTime;

        this.play_child = function () {
            this.obj.animations.startTime = now();
            this._Pubbly.redrawDependency.add(this);
            this.animInt = window.setInterval(function () {
                _This.obj.animations.at = now() - _This.obj.animations.startTime;
                if (_This.obj.animations.at > _This.obj.animations.end) {
                    _This.finish();
                }
            }, 10);
        };
        this.finish_child = function () {
            // Stop animated.at++ int func
            window.clearInterval(this.animInt);
            // But end at 100%, just to be sure (skipped frame)
            this.obj.animations.at = this.obj.animations.end;

            // Set end animation props to new object props
            let objProps = this._Pubbly.getRealObjDescription(_This.obj);
            this.obj.height = objProps.height;
            this.obj.width = objProps.width;
            this.obj.loc = [objProps.top, objProps.left];
            this.obj.opacity = objProps.opacity;
            this.obj.layer = objProps.layer;
            this.obj.angle = objProps.angle || 0;

            // Drop an obj a 0,0 -- trigger sequence that animates it to 100,100
            // Drag it again to a non-drop area. Where does it reset?
            // PROBABLY to the LAST GOOD SPOT, which was determined NOT by the drop zone, but by the animation
            if (this.obj.droppedLoc) {
                this.obj.droppedLoc = this.obj.loc;
            }

            // Stop object from animating on redraw
            // DO NOT MOVE above the objProps call
            // Not playing objects will revert to whatever their props are
            // We need one last animation prop calc to set those prop.
            // I mean... just don't touch k?
            this.obj.animations.playing = false;
            // Remove from redraw list (will kill redraw if last)
            this._Pubbly.redrawDependency.remove(this);
        };
        this.kill_child = function () {
            // And if no save states?
            window.clearInterval(this.animInt);
            this._Pubbly.redrawDependency.remove(this);
        };

        this.logName = "Animation: " + this.obj.name + " -> " + this.target.value;
    },
    audio: function () {
        const _This = this;

        // this._Pubbly.pageBuffer.assetListLoaders[this._Pubbly.curPage].byFileName[this.target.chosenDestination].elem;
        let audioName = this.target.chosenDestination;
        let pageIdent = this._Pubbly.curPage;
        let curPage = this._Pubbly.data.pages[pageIdent];
        let audEntry = curPage.auds.find(aud => aud.name == audioName);
        if (audEntry.fSrc) {
            this.elem = this._Pubbly.pageBuffer.assetListLoaders[pageIdent].byFileSource[audEntry.fSrc].elem;
        } else {
            this.elem = this._Pubbly.pageBuffer.assetListLoaders[pageIdent].byFileName[audEntry.fName].elem;
        }

        this.finish_child = function () {
            this._Pubbly.audioPlayer.stop();
        }
        this.kill_child = function () {
            this.finish_child();
        }

        this._Pubbly.audioPlayer.volume = this._Pubbly.runtimeProps.masterVolume;
        this._Pubbly.audioPlayer.play(this.elem.src, {
            start: this.play.bind(this),
            finish: this.finish.bind(this),
            error: this.error.bind(this)
        });

        this.logName = "Audio: " + this.target.chosenDestination;
    },
    flash: function () {
        // Redeclare of scope
        const _This = this;

        // Props
        this.objs = this._Pubbly.findAll(this.target.chosenDestination, "object");
        this.flashInt = 100; // Default
        this.states = [];
        // Props requiring loops to set
        if (this.target.action !== "flashon") {
            error("log", "sequence", "unknown flash action of " + this.target.action + ". Defaulting to flashon");
            this.target.action = "flashon";
        }

        // type flashon -- only type so far
        let last = false;
        if (this.objs[0].vis) {
            this.states.push(false);
        }
        for (let i = 0; i < (this.target.num * 2) - 1; i++) {
            this.states.push(!last);
            last = !last;
        }

        // Extension methods
        this.play_child = function () {
            this.flashInt = window.setInterval(function () {
                let newState = _This.states.shift();
                _This.objs.map(obj => {
                    obj.vis = newState;
                });
                _This._Pubbly.drawPage_dispatch(); // defaults to curPage
                if (!_This.states.length) {
                    _This.finish();
                }
            }, this.target.stateChangeInterval);
        };
        this.finish_child = function () {
            window.clearInterval(this.flashInt);
        };
        this.kill_child = function () {
            window.clearInterval(this.flashInt);
        };

        this.logName = "Flash: " + this.target.chosenDestination;
    },
    gif: function () {
        const _This = this;

        // Interval to redraw thing to can
        this.drawInt = false;
        this.loopsLeft = this.target.loops * 1;

        this.play_child = function () {
            this.elem.currentTime = 0;
            // I think for some browsers the asset needs to actually exist in the DOM
            $("#assetVisitorCenter").append(this.elem);
            // Instead of intervals here (causing multi-int problems), 
            // we make a redrawDep object in the pubbly whatever, 
            // which manages when to redraw, at what framerate, and stuff
            _This._Pubbly.redrawDependency.add(this);
            this.elem.play();
        };
        this.finish_child = function () {
            _This._Pubbly.redrawDependency.remove(this);
            this.elem.pause();
        };
        this.kill_child = function () {
            _This._Pubbly.redrawDependency.remove(this);
            this.elem.pause();
            this.elem.removeEventListener("canPlayThrough", this.on_canplay);
            this.elem.removeEventListener("playing", this.on_playing);
            this.elem.removeEventListener("ended", this.on_ended);
            this.elem.removeEventListener("error", this.on_error);
        }

        this.on_canplay = function () {
            _This.elem.removeEventListener("canPlayThrough", _This.on_canplay);
            _This.play();
        };
        this.on_ended = function () {
            _This.elem.removeEventListener("ended", _This.on_ended);
            _This.loopsLeft--;
            if (!_This.loopsLeft) {
                _This.finish();
            } else {
                this.currentTime = 0;
                this.play();
            }
        };
        this.on_error = function (err) {
            _This.elem.removeEventListener("error", _This.on_error);
            _This.error();
        };

        // link to asset video
        // let pageIdent = this._Pubbly.curPage;
        // let curPage = this._Pubbly.data.pages[pageIdent];
        let gif = this._Pubbly.find(this.target.chosenDestination, "gif");
        this.elem = this._Pubbly.pageBuffer.assetListLoaders[this._Pubbly.curPage].byFileName[gif.fileName].elem;

        this.elem.addEventListener("canplaythrough", this.on_canplay, false);
        this.elem.addEventListener("ended", this.on_ended, false);
        this.elem.addEventListener("error", this.on_error, false);

        this.logName = "Gif: " + this.target.chosenDestination;
    },
    sequence: function () {
        const _This = this;

        this.drawInt = false;
        this.loopsLeft = this.target.loops * 1;
        this.obj = _This._Pubbly.find(this.target.chosenDestination, "object");
        this.obj.at = 0;
        this.frames = this.obj.frames;
        this.framerate = this.target.framerate;

        this.play_child = function () {
            _This._Pubbly.redrawDependency.add(this);
            _This.drawInt = window.setInterval(function () {
                if (_This.obj.at + 2 > _This.frames.length) {
                    _This.loopsLeft--;
                    if (_This.loopsLeft > 0) {
                        _This.obj.at = 0;
                    } else {
                        let endSequenceOnFirstFrame = true;
                        if (endSequenceOnFirstFrame) {
                            _This.obj.at = 0;
                        }
                        _This.finish();
                    }
                } else {
                    _This.obj.at++;
                }
            }, 1000 / _This.framerate);
        };
        this.finish_child = function () {
            window.clearInterval(_This.drawInt);
            _This._Pubbly.redrawDependency.remove(_This);
        };
        this.kill_child = function () {
            window.clearInterval(_This.drawInt);
            _This._Pubbly.redrawDependency.remove(_This);
        }

        this.logName = "Img Sequence: " + this.target.chosenDestination;
    },
    wait: function () {
        const _This = this;

        this.timeout = window.setTimeout(function () {
            _This.finish();
        }, this.target.chosenDestination * 1000);

        this.finish_child = function () {
            window.clearTimeout(this.timeout);
        };
        this.kill_child = function () {
            window.clearTimeout(this.timeout);
        };

        this.logName = "Wait: " + this.target.chosenDestination * 1000;
    },
    video: function () {
        const _This = this;
        this.obj = this._Pubbly.find(this.target.chosenDestination, "video");
        this.elem = this._Pubbly.pageBuffer.assetListLoaders[this._Pubbly.curPage].byFileName[this.obj.fileName].elem;

        this.kill_child = function () {
            this.elem.pause();
            this.elem.currentTime = 0;
        }

        this._Pubbly.redrawDependency.add(this);
        this.on_canplay = function () {
            _This.elem.removeEventListener("canplaythrough", _This.on_canplay);
            _This.elem.play();
        };
        this.on_playing = function () {
            _This.elem.removeEventListener("playing", _This.on_playing);
            _This.elem.volume = _This._Pubbly.runtimeProps.masterVolume;
            _This.play();
        };
        this.on_ended = function () {
            _This.elem.removeEventListener("ended", _This.on_ended);
            _This.elem.currentTime = 0;
            _This.elem.volume = 0;
            _This.finish();
        };
        this.on_error = function () {
            _This.elem.removeEventListener("error", _This.on_error);
            _This.error();
        };
        this.elem.addEventListener("canplaythrough", this.on_canplay, false);
        this.elem.addEventListener("playing", this.on_playing, false);
        this.elem.addEventListener("ended", this.on_ended, false);
        this.elem.addEventListener("error", this.on_error, false);
        if (this.elem.readyState === 4) {
            // buffered
            this.on_canplay();
        } else {
            // Load src, events called from listeners
            this.elem.load();
        }
    },
    spokenfield: function () {
        const _This = this;

        // Interval function to sync the audio with the word in the sentence in the field on a log at the bottom of the sea
        this.syncInt = false;
        // Timeout function for the artificial breath breaks between sentences
        this.sentenceBreakTimeout = false;

        let pageIdent = this._Pubbly.curPage;
        let curPage = this._Pubbly.data.pages[pageIdent];
        let pub = this._Pubbly;

        // What is/are the audio file(s)
        this.audios = [];
        let auds;
        if (typeof this.target.chosenDestination == "object" && this.target.chosenDestination.length) {
            auds = this.target.chosenDestination;
        } else {
            auds = [this.target.chosenDestination];
        }
        this.audios = auds.map(function (audioName) {
            // find aud
            let audEntry = curPage.auds.find(aud => aud.name == audioName);
            let elem = false;
            if (audEntry.fSrc) {
                elem = pub.pageBuffer.assetListLoaders[pageIdent].byFileSource[audEntry.fSrc].elem;
            } else {
                elem = pub.pageBuffer.assetListLoaders[pageIdent].byFileName[audEntry.fName].elem;
            }
            return elem;
        });
        /*
        if (this.elem.readyState == 4) {
            // buffered
            this.on_canplay();
        } else {
            // Load src, events called from listeners
            this.elem.load();
        }
        */

        // What is/are the sentence(s)
        this.sentences = [];
        // I'm on sentence 3, what field am I highlighting?
        this.sentenceToField = {};
        let fieldToCleanSentences = function (field) {
            let paragraph = field.contents;
            for (i = 0; i < paragraph.split(".").length; i++) {
                let dirtySentence = paragraph.split(".")[i];
                // Line breaks usually skip a space...
                let clean = dirtySentence.replace(/(\r\n|\n|\r)/gm, " ");
                // But some don't, or whatever, just get rid of double spacing
                clean = clean.replace(/  /g, "");
                // leading trailing white spaces
                clean = clean.trim();
                if (clean !== "") {
                    this.sentenceToField[this.sentences.length] = field.name;
                    this.sentences.push(clean)
                }
            }
            // Line breaks usually skip spacing
        }.bind(this);
        if (typeof this.target.value == "object" && this.target.value.length) {
            this.target.value.map(function (fieldName) {
                let field = pub.find(fieldName, "field");
                fieldToCleanSentences(field);
            });
        } else {
            let field = pub.find(this.target.value, "field");
            fieldToCleanSentences(field);
        }


        if (this.audios.length !== this.sentences.length) {
            alert("Error: The number of audio files does not match the number of sentences to highlight. Spoken fields must have an equal number of sentences and audio files");
            this.callAll("errored");
        } else {
            // So now we have an array of audio files and sentences to match them up with.

            this.curSentenceI = -1;
            this.nextSentence = function () {
                this.curSentenceI++;
                if (this.audios[this.curSentenceI]) {
                    this.curAudio = this.audios[this.curSentenceI];
                    this.curSentence = this.sentences[this.curSentenceI];
                    this.curField = this._Pubbly.find(this.sentenceToField[this.curSentenceI], "field");

                    if (this.curAudio.readyState == 4) {
                        // start
                        this.prepSync();
                    } else {
                        let playingListener = function () {
                            this.curAudio.removeEventListener("playing", playingListener);
                            this.prepSync();
                        }.bind(this);
                        this.curAudio.addEventListener("playing", playingListener, false);
                    }

                    let endedListener = function () {
                        this.curAudio.removeEventListener("ended", endedListener);
                        window.clearInterval(this.syncInt);
                        this.curAudio.pause();
                        this.curAudio.currentTime = 0;
                        this.curAudio.volume = 0;
                        // Silence break, in between sentences and at the end of the Spoken series
                        let silence = this.curMarkers.shift() * 100;
                        this.sentenceBreakTimeout = window.setTimeout(function () {
                            this.curField.highlight.wordNum = false;
                            this.nextSentence();
                        }.bind(this), silence);
                    }.bind(this);
                    this.curAudio.addEventListener("ended", endedListener, false);

                    this.curAudio.play();
                } else {
                    // Remove last highlight bit
                    this._Pubbly.drawPage_dispatch();
                    this.finish_child();
                }
            }.bind(this);
            this.prepSync = function () {
                // Calculate times, now that aud has DEF loaded
                this.curMarkers = [];
                let words = this.curSentence.split(" ");
                let linearChunk = this.curAudio.duration / words.length;
                let acc = 0;

                this.curMarkers = getSpokenFieldTimes(this.curAudio, words);

                // Reset every sentence, incase frame drop cause missed marker.
                this.priorWordCount = 0;
                for (let i = 0; i < this.curSentenceI; i++) {
                    // ONLY count the sentences from the field you're currently highlighting
                    if (this.sentenceToField[i] === this.curField.name) {
                        this.priorWordCount += this.sentences[i].split(" ").length;
                    }
                }
                this.curField.highlight.wordNum = this.priorWordCount;

                this.startSync();
            }
            this.startSync = function () {
                this._Pubbly.drawPage_dispatch();
                this.curAudio.volume = this._Pubbly.runtimeProps.masterVolume;
                this.syncInt = window.setInterval(function () {
                    if (this.curAudio.currentTime >= this.curMarkers[0]) {
                        this.curMarkers.shift();
                        this.curField.highlight.wordNum++;
                        this._Pubbly.drawPage_dispatch();
                    }
                }.bind(this), 10);
            }


            this.finish_child = function () {
                // need _This?
                window.clearInterval(this.syncInt);
                window.clearTimeout(this.sentenceBreakTimeout);
                this.curField.highlight.wordNum = false;
                if (_This.curAudio && _This.curAudio.pause) {
                    _This.curAudio.pause();
                }
                _This.curAudio.currentTime = 0;
                _This.curAudio.volume = 0;
            };
            this.kill_child = function () {
                this.finish_child();
            };

            this.logName = "Spoken Field: " + this.sentences.join(". ");

            this.playing = true;
            this.nextSentence();
        }
    }
};

function Sequence(pubblyScope) {
    const _Pubbly = pubblyScope;
    const _Sequence = this;

    // Debugging
    this.show = _Pubbly.runtimeProps.showSequence || false; // Log each target as it hits.
    this.running = false;
    this.players = {
        waits: [],
        audios: [],
        animations: [],
        flashes: [],
        gifs: [],
        sequences: [],
        countdowns: [],
        videos: [],
        spokenfields: [],
        // TODO:
        // new Video(),
        // new Highlighter(),
        // new Recorder(),
    };

    this.targets = [];
    this.nextTarget = function () {
        if (this.running) {
            let target = this.targets.shift(); // sets target, removes from targets
            if (target) {
                this.preTarget(target);
            } else {
                // Last target
                let lastTarget = {
                    hold: "all",
                    type: "finishSequence",
                }
                this.preTarget(lastTarget);
            }
        }
    }
    this.preTarget = function (target) {
        if (target.hold) {
            this.waitFor(target, target.hold, function () {
                this.runTarget(target);
            });
        } else {
            this.runTarget(target);
        }
    }
    this.runTarget = function (target) {
        target.chosenDestination = target.destination;
        if (target.random) {
            let options = target.random.options.slice();
            /* Can only send clicks to enabled links  
             * Meaning, slice the random list
             * filter for enabled
             * choose from that
             * if the filtered enabled list is empty, repopulate
             * BUT repopulate with the original option list
             * (Even though some options might still be disabled (currently))
             * 
             * To my knowledge, no other "random" requires a filter check.
             */
            if (target.type === "send") {
                options = options.filter(linkName => _Pubbly.find(linkName, "link").enabled);
            }
            if (options.length === 0) {
                console.warn("All links in random send list are disabled");
                target.type = "skip";
                // Don't know where to find this value in XML, so defaulting to true
            } else {
                let num = rand(options.length - 1);
                target.chosenDestination = options[num];
                if (target.random.removeChoice) {
                    let at = target.random.options.indexOf(target.chosenDestination);
                    target.random.options.splice(at, 1);
                    let resetOnRandomEmpty = true;
                    // If here, we've chosen a target. 
                    // If there was only one to choose from, the random array is effectively empty
                    // Effectively because some links might still be in there but they're disabled so they don't count.
                    if (options.length === 1 && resetOnRandomEmpty) {
                        target.random.options = target.random.init.options.slice();
                    }
                }
            }
        }

        let autoPost = true;
        let autoDraw = false;
        let obj = false;
        if (this.show) {
            console.log("" + JSON.stringify(target));
        }
        let targType = target.type;
        if (typeof target.run !== "undefined") {
            if (target.run >= target.runLimit) {
                targType = "skip";
            } else {
                target.run++;
            }
        }

        switch (targType) {
            case "drawing tool":
                let tool = {
                    type: target.chosenDestination,
                    color: target.value,
                    width: target.width,
                    height: target.height
                };
                _Pubbly.drawingTools.change(tool);
                break;
            case "animation":
                let animation = new Sq_Player(
                    "animation",
                    [_Sequence, _Pubbly],
                    {},
                    target
                );
                target.player = {
                    name: "animations",
                    loc: this.players.animations.length
                };
                this.players.animations.push(animation);
                animation.play();
                break;
            case "audio":
                // DO NOT go to next target as soon as CALLED
                autoPost = false;
                // Audios have to load (half second maybs), then play(), then post

                // Custom cbs... Only move on to next...
                // When audio STARTS/ERRS (0.5s depending on load time)
                let aud = new Sq_Player(
                    "audio",
                    [_Sequence, _Pubbly],
                    {
                        playing: function () {
                            this.postTarget();
                        },
                        error: function () {
                            this.postTarget();
                        },
                    },
                    target
                );
                target.player = {
                    name: "audios",
                    loc: this.players.audios.length
                };
                this.players.audios.push(aud);
                break;
            case "video":
                // DO NOT go to next target as soon as CALLED
                autoPost = false;
                // Audios have to load (half second maybs), then play(), then post

                // Custom cbs... Only move on to next...
                // When audio STARTS/ERRS (0.5s depending on load time)
                let vid = new Sq_Player(
                    "video",
                    [_Sequence, _Pubbly],
                    {
                        playing: function () {
                            this.postTarget();
                        },
                        error: function () {
                            this.postTarget();
                        },
                    },
                    target
                );
                target.player = {
                    name: "videos",
                    loc: this.players.videos.length
                };
                this.players.videos.push(vid);
                break;
            case "spokenfield":
                autopost = false
                let sfld = new Sq_Player(
                    "spokenfield",
                    [_Sequence, _Pubbly],
                    {
                        playing: function () {
                            this.postTarget();
                        },
                        error: function () {
                            this.postTarget();
                        },
                    },
                    target
                );
                target.player = {
                    name: "spokenfields",
                    loc: this.players.spokenfields.length,
                }
                this.players.spokenfields.push(sfld);
                break;
            case "flash":
                obj = _Pubbly.find(target.chosenDestination, "object");
                if (obj) {
                    let flash = new Sq_Player(
                        "flash",
                        [_Sequence, _Pubbly],
                        {},
                        target
                    );
                    target.player = {
                        name: "flashes",
                        loc: this.players.flashes.length
                    };
                    this.players.flashes.push(flash);
                    // MAYBE window.setTimeout(function() {flash.play()},1) to ensure finished handlers don't get skipped when bad flash times are set to 0????????
                    flash.play();
                }
                break;
            case "log":
                if (typeof console[target.action] == "function") {
                    console[target.action]("SEQUENCE LOG: " + target.value);
                } else if (target.action == "alert") {
                    window.alert("SEQUENCE ALERT: " + target.value);
                } else {
                    console.log("LOG: " + target.value);
                }
                break;
            case "send":
                // IDEA: Send passive - new Sequence, or Send blocking - adds targets to same sequence
                target.passive = false;
                let targets = false;
                let linkLoc = _Pubbly.data;
                let link = _Pubbly.find(target.chosenDestination, "link");
                if (link && link.triggers[plurals[target.action]] && link.enabled) {
                    if (target.action == "click") {
                        targets = link.triggers[plurals[target.action]][0].targets;
                    } else if (target.action == "dragStop") {
                        // TODO: Send drop to...
                    }
                }
                if (targets) {
                    this.addTargets(targets);
                } else {
                    error("log", "sequence", "No targets to add");
                }
                break;
            case "point":
                autoDraw = true;
                let localCheck = _Pubbly.data.pages[_Pubbly.curPage].points;
                let globalCheck = _Pubbly.data.points;
                let pointLoc;

                if (typeof localCheck[target.chosenDestination] == "undefined"
                    && typeof globalCheck[target.chosenDestination] == "undefined") {
                    // All points now created from the PointNames node in the XML.js script file.
                    console.log("warn", "sequence", "Uninitiated point value");
                    // _Pubbly.data.pages[_Pubbly.curPage].points[target.chosenDestination] = 0;
                } else {
                    // Small scope first.
                    pointLoc = (typeof localCheck[target.chosenDestination] == "undefined")
                        ? globalCheck : localCheck;
                    // Don't know what we used the chaged thing for...
                    if (pointLoc.changed.indexOf(target.chosenDestination) === -1) {
                        pointLoc.changed.push(target.chosenDestination);
                    }
                    switch (target.action) {
                        case "+":
                            pointLoc[target.chosenDestination] += target.value;
                            break;
                        case "-":
                            pointLoc[target.chosenDestination] -= target.value;
                            break;
                        case "*":
                            pointLoc[target.chosenDestination] *= target.value;
                            break;
                        case "/":
                            pointLoc[target.chosenDestination] /= target.value;
                            break;
                        case "=":
                            pointLoc[target.chosenDestination] = target.value;
                            break;
                        default:
                            autoDraw = false;
                            error("log", "Sequence", "Unknown point modification of " + target.action);
                            // Unused for now.
                            // pointLoc.changed.pop(); // Easier than doing a push inside all GOOD point mods
                            break;
                    }
                }

                break;
            case "finishSequence":
                this.finish();
                break;
            case "propertyChange":
                // Might be do 1 thing to 10 links/objects
                // Might be do 1 thing to a randomly chosen 1 lins/object
                // Might be do 1 thing to 1 link/object.
                let things = [];

                if (target.destination === "all links") {
                    // Every link
                    things = _Pubbly.data.pages[_Pubbly.curPage].links;
                } else if (target.destination === "all objects") {
                    things = _Pubbly.data.pages[_Pubbly.curPage].objs;
                } else {
                    // Check pop cause strings have length
                    if (typeof target.destination.pop === "undefined") {
                        if (target.chosenDestination !== target.destination) {
                            // Destination selected at random
                            things = [target.chosenDestination];
                        } else {
                            // Vanilla single thing destination
                            things = [target.destination];
                        }
                    } else {
                        // Array of destinations
                        things = target.destination.slice();
                    }
                }
                let foundList = [];
                // ["ball 1"] but ball 1 has a clone...
                things.map(thing => {
                    let things = false;
                    if (typeof thing === "object") {
                        things = _Pubbly.findAll(thing);
                    } else {
                        things = _Pubbly.findAll(thing, target.destinationType);
                    }
                    if (things) {
                        foundList = foundList.concat(things);
                    }
                });
                for (let t = 0; t < foundList.length; t++) {
                    let thing = foundList[t];
                    if (typeof thing[target.attribute] !== "undefined") {
                        // TODO: either a setter that checks types, or a manual type check here.
                        thing[target.attribute] = target.value;
                    } else {
                        // List of known more complicated types
                        if (target.attribute === "center" && target.destinationType === "object") {
                            // Need to get actual height and width (animations, offsets, drops, swaps)
                            // Function stored in pubbly, used mostly for redraw
                            let objDesc = _Pubbly.getRealObjDescription(thing);
                            // Object locs are in top,left
                            // Centers are in X, Y
                            thing.loc = [
                                // top
                                target.value.y - (objDesc.height / 2),
                                // left
                                target.value.x - (objDesc.width / 2)
                            ];
                            if (thing.droppedLoc) {
                                delete thing.droppedLoc;
                            }
                        } else {
                            console.error("Unknown " + target.destinationType +
                                "property of " + target.attribute);
                        }
                    }
                }

                // For the (Set prop but don't make it take effect until the next sequence target
                if (target.autoDraw !== false) {
                    autoDraw = true;
                }
                break;
            case "gif":
                obj = _Pubbly.find(target.chosenDestination, "object");
                if (obj) {
                    let gif = new Sq_Player(
                        obj.type, // Either GIF or SEQUENCE
                        [_Sequence, _Pubbly],
                        {},
                        target
                    );
                    target.player = {
                        name: "gifs",
                        loc: this.players.gifs.length
                    };
                    this.players[plurals[obj.type]].push(gif);
                    gif.play();
                }
                break;
            case "wait":
                if (target.blocking == "waits") {
                    let wait = new Sq_Player(
                        "wait",
                        [_Sequence, _Pubbly],
                        {},
                        target
                    );
                    target.player = {
                        name: "waits",
                        loc: this.players.waits.length
                    };
                    this.players.waits.push(wait);
                    wait.play();
                } else {
                    // Simply passes player arr to wait for in the target.blocking prop
                }
                break;
            case "countdown":
                if (typeof _Pubbly.countdown[target.action] === "function") {
                    _Pubbly.countdown[target.action](target.value);
                } else {
                    console.error("Unknown countdown target action " + target.action);
                }
                // Redraws value, checks for > 0, starts countdown related sequence if
                // _Pubbly.countdown.check();
                break;
            case "reset":
                autoDraw = true;
                let resetType = target.action.split(" ")[0];
                let searchStarts = [];
                if (resetType == "object") {
                    searchStarts = _Pubbly.findAll(target.destination, "object");
                } else if (resetType == "link") {
                    searchStarts = _Pubbly.findAll(target.destination, "link");
                } else if (resetType == "page") {
                    searchStarts = [_Pubbly.data.pages[_Pubbly.curPage]];
                }

                let reset = function (level) {
                    // If it's got an init, reset all props declared in init. If it's an object itself, recursively loop into it.
                    let init = level.init;
                    for (let prop in level) {
                        if (init && typeof init[prop] !== "undefined") {
                            level[prop] = dupeAnyType(init[prop]);
                        } else if (typeof level[prop] === "object" &&
                            // null is type object... Shouldn't have any... but failsafe
                            level[prop] !== null) {
                            if (level.constructor.name === "Object" || level.constructor.name === "Array") {
                                /* Means it was generated programatically
                                 * (let thing = {};
                                 * (thing.stuff = "string";)
                                 * NOT constructed
                                 * (new Audio(); new Workspace())
                                 */
                                reset(level[prop]);
                            }
                        }
                    }
                };
                searchStarts.map(s => reset(s));
                // Clones? {markedForDeletion: false, init: {markedForDeletion = true}};
                // Resetting clones marks them for deletion (at start search level), and then we...
                // Workspaces? {clear:false, init: {clear:true}}
                // In redraw, if workspace.clear, elem.width = elem.width
                // Since autoDraw, workspace is cleared
                _Pubbly.clearClones();

                break;
            case "navigation":
                if (target.action == "navigate") {
                    if (target.destination == "pubbly") {
                        if (target.attribute == "relative") {
                            if (target.value == "next") {
                                _Pubbly.turns.handlers.auto.right();
                            } else if (target.value == "previous") {
                                _Pubbly.turns.handlers.auto.left();
                            } else {
                                error("warn", "sequence", "Unknown navigation value: " + target.value);
                            }
                        } else if (target.attribute == "absolute") {
                            _Pubbly.updatePage.call(_Pubbly, target.value);
                        } else {
                            error("warn", "sequence", "Unknown navigation attribute: " + target.attribute);
                        }
                    } else if (target.destination == "browser") {
                        // target.attribute == "popup/tab/window"
                        _Pubbly.urlNav.go(target.value, target.attribute);
                    }
                }   // else... I dunno, history clear?
                break;
            case "info":
                let change = true;
                if (target.action == "set" && _Pubbly.data.info[target.destination]) {
                    _Pubbly.data.info[target.destination] = target.value;
                    if (target.destination == "navigation") {
                        if (target.value) {
                            _Pubbly.updateNavigation();
                        } else {
                            _Pubbly.navigationUI.hide();
                        }
                    }
                } else {
                    console.warn("Unknown set type: ");
                    console.warn("" + JSON.stringify(target));
                }
                break;
            case "skip":
                break;
            default:
                console.warn("Unknown target: ");
                console.warn("" + JSON.stringify(target));
                break;
        }

        if (autoDraw) {
            _Pubbly.drawPage_dispatch();
        }
        if (autoPost) {
            this.postTarget(target);
        }
    }
    this.postTarget = function (target) {
        if (window.testing && target.id == _Pubbly.runtimeProps.stopAtTarget) {
            console.warn("stopAtTarget set and met. HODLING!!");
        } else if (target.blocking) {
            this.waitFor(target, target.blocking, function () {
                this.nextTarget();
            });
        } else {
            this.nextTarget();
        }
    }
    this.waitFor = function (target, what, cb) {
        let waits = this.getPlayers(what);

        function waitSingle(what, cb) {
            let waits = 0;

            function finished() {
                waits--;
                if (waits <= 0) {
                    cb.call(_Sequence);
                }
            }

            let waitLog = "Waiting for ";
            if (this.players[what]) {
                for (let w = 0; w < this.players[what].length; w++) {
                    if (!this.players[what][w].finished) {
                        waits++;
                        this.players[what][w].cbs.finished.push(finished);
                        waitLog += this.players[what][w].logName + ", ";
                    }
                }
            } else if (what == "self") {
                if (target.player && !target.player.finished) {
                    waits++;
                    this.players[target.player.name][target.player.loc].cbs.finished.push(finished);
                    waitLog += "self, ";
                }
            } else {
                error("log", "sequence", "Unknown wait of " + what + ", skipping.");
            }
            if (waits == 0) {
                cb.call(_Sequence);
            } else if (this.show) {
                console.log(waitLog);
            }

        }

        let nextWait = function () {
            let cur = waits.shift();
            if (cur) {
                waitSingle.call(this, cur, nextWait);
            } else {
                cb.call(this);
            }
        }
        nextWait.call(this);
    }
    this.getPlayers = function (what) {
        let ret = [];

        if (typeof what == "object") {
            for (let w = 0; w < what.length; w++) {
                if (this.players[what[w]]) {
                    ret.push(what[w]);
                } else if (what[w] == "self") {
                    ret.push("self");
                } else {
                    console.error("Unknown player type " + what[w]);
                }
            }
        } else if (what == "all") {
            for (let player in this.players) {
                ret.push(player);
            }
        } else {
            if (this.players[what] !== "undefined") {
                ret = [what];
            }
        }

        if (ret.length == 0) {
            // Unknown wait, call back
            console.error("Unknown wait of " + what + ", calling back immediately");
        }
        return ret;
    }

    this.startNew = function (link, trigger, loc) {
        this.linkName = link.name;
        if (_Pubbly.analytics) {
            _Pubbly.analytics.add({ type: "st", linkname: this.linkName });
        }

        if (this.running) {
            this.kill();
        }
        trigger.run++;
        this.start(link, trigger, loc);
    };
    this.start = function (caught) {
        if (_Pubbly.ready) {
            if (_Pubbly.analytics) {
                _Pubbly.analytics.add({ type: "ss", linkname: this.linkName });
            }
            if (_Pubbly.data.info.interrupt === false) {
                _Pubbly.navigationUI.disable(["left", "right", "pulldown"]);
            }

            let link = caught.link;
            let action = caught.action;
            let loc = caught.loc;
            if (this.show) {
                console.log(link.name + " starting");
            }
            let targets = link.triggers[action][loc].targets;
            if (targets) {
                this.addTargets(targets);
                this.running = true;
                this.nextTarget();
            } else {
                console.error("Bad stuff check here");
            }
        } else {
            console.info("Triggered sequence but pubbly not loaded... ignored");
        }
    };
    this.addTargets = function (targets) {
        for (let t = 0; t < targets.length; t++) {
            this.targets.push(targets[t]);
        }
    };


    this.finish = function () {
        if (_Pubbly.runtimeProps.saveStates) {
            _Pubbly.states.save();
        }
        _Pubbly.updateNavigation();
        this.kill_players();
        // Empty targets
        this.targets = [];
        if (this.show) {
            console.log(" -- Sequence finished -- ");
        }
        if (_Pubbly.analytics) {
            _Pubbly.analytics.add({ type: "sf", linkname: this.linkName });
        }

        // Why are we hiding behind a milli timeout like a little bitch?
        // Because occasionally, one some books, callbacks from finished animations a sequence ago will leak through to the next sequence.
        // And it's been a long night, so this fixes it don't ask questions.
        window.setTimeout(function () {
            // Check for any page point matches in order to trigger logic links
            _Pubbly.checkPageFor("points");
        }, 1);
    };
    this.kill = function () {
        this.kill_players();
        this.targets = [];

        // Even interrupted sequences check for point match links
        _Pubbly.checkPageFor("points");
    };
    this.kill_players = function () {
        let stops = this.getPlayers("all");
        this.running = false;
        for (let pt in stops) {
            let player = stops[pt];
            for (let p = 0; p < this.players[player].length; p++) {
                if (this.players[player][p].playing) {
                    this.players[player][p].kill();
                }
                this.players[player][p] = null;
                delete this.players[player][p];
            }
            this.players[player] = [];
        }
    };

    this.init = function () {

    };
    this.init();
}


function getSpokenFieldTimes(aud, words) {
    let ret = [];

    let sylls = [];
    words.forEach(function (word) {
        let syllC = syll_count(word);
        sylls.push(syllC);
    });

    sylls = sylls.map(function (syll, i) {
        // A bunch of fucking guess work

        // 4 and 5 syll count words are usually a lot smaller than their true count
        if (syll >= 4) {
            syll *= 0.9;
        }

        // Commas seem to be about 2 syllables each
        if (words[i].split(",").length > 1) {
            syll += 2;
        }

        // 2 letter words are spoken faster than a single syllable
        if (words[i].length <= 3) {
            syll = 0.7;
        }

        // console.log(words[i] + ": " + syll);
        return syll;
    });

    let totalChunks = 0;
    sylls.forEach(function (syllC) {
        totalChunks += syllC;
    });
    totalChunks++;
    let audLen = aud.duration;
    let chunkLength = audLen / totalChunks;
    // refactor with reduce?
    let accumulator = 0;

    sylls.forEach(function (syllC) {
        let len = chunkLength * syllC;
        accumulator += len;
        ret.push(accumulator);
    });

    // LAST value in ret is the SILENCE between sentences, or before the end of the highlighter... Hardcoded to a 3 syll pause
    ret[ret.length - 1] = (accumulator + (chunkLength * 3));
    // let last = ret[ret.length-1];
    /*
    let bent = ret.map(function(syll) {
        syll = easeInOutSine(syll, 0, last, last);
        return syll;
    });
    */
    // STRONG distortion... Think it's better left alone.
    return ret
}
// https://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript

// Needs improvement... syll_count("everywhere"); -> returns 4, but is 3... english
// everywhere -> 3
// flying -> 2
function syll_count(word) {
    word = word.toLowerCase();                                     //word.downcase!

    let forceOverrides = [
        ["every", 2],
        ["where", 1],
        ["ing", 1],
        ["alive", 2],
    ];
    let exceptionLength = 0;
    let baseWord = word;
    forceOverrides.map(function (item) {
        let split = baseWord.split(item[0]);
        if (split.length > 1) {
            exceptionLength += (split.length - 1) * item[1];
            baseWord = split.filter(i => (i !== "")).join("");
        }
    });
    // if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
    baseWord = baseWord.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    baseWord = baseWord.replace(/^y/, '');                                 //word.sub!(/^y/, '')
    let match = baseWord.match(/[aeiouy]{1,2}/g);                    //word.scan(/[aeiouy]{1,2}/).size
    let baseSyllMatch = (match) ? match.length : 0;
    return (baseSyllMatch + exceptionLength) || 1;
}
