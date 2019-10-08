/*
Description: 
   Class around a single audio player for better routing.

Requirements: 
    none

Construction: 
    new AudioPlayer(
        DOM element,
    ); 

Usage:
    let aud = new AudioPlayer(
        DOM element,
    ); 
    aud.volume = 1;
    aud.play(src, {
        start: () => { console.log("started") },
        stop: () => { console.log("stopped") },
        finish: () => { console.log("finished") },
        error: () => { console.log("errored") }
    });
    aud.stop();
    aud.pause();

Compatibility:
    Desktop Chrome  - Yarp
    Desktop Firefox - Yarp
    Desktop Edge    - Yarp
    Desktop Opera   - Yarp

    Mobile Chrome   - Yarp
    Mobile Safari   - Yarp
*/

class AudioPlayer {
    play(src, cbs) {
        this.cbs = Object.assign({
            start: () => { },
            stop: () => { },
            finish: () => { },
            error: () => { }
        }, cbs);
        this.dom.player.volume = this.resetVolume;
        this.dom.player.currentTime = 0;
        this.dom.player.src = src;
        this.dom.player.load();
    }
    pause() {
        this.dom.player.pause();
        this.on_pause();
    }
    stop() {
        this.dom.player.pause();
        // this.dom.player.currentTime = 0;
        // this.dom.player.src = "";
        this.dom.player.volume = 0;
        this.on_stop();
    }

    set volume(to) {
        this.resetVolume = to;
        this.dom.player.volume = to;
    }
    get volume() {
        return this.dom.player.volume;
    }

    build() {
        this.dom.player = document.createElement("audio");
        this.dom.player.setAttribute("crossorigin", "anonymous");
        this.dom.player.setAttribute("controls", "true");
        this.dom.cont.appendChild(this.dom.player);

        // let AudioContext = window.AudioContext || window.webkitAudioContext;
        // this.audioCtx = new AudioContext();
        // this.track = this.audioCtx.createMediaElementSource(this.dom.player);
    }
    attach() {
        this.dom.player.addEventListener("playing", this.on_start);
        this.dom.player.addEventListener("ended", this.on_finish);
        this.dom.player.addEventListener("pause", this.on_stop);
        this.dom.player.addEventListener("error", this.on_error);
        this.dom.player.addEventListener("canplaythrough", this.on_canPlay);
    }
    on_canPlay() {
        let prom = this.dom.player.play();
        prom.catch(this.on_error);
    }
    on_start() {
        this.cbs.start();
    }
    on_finish() {
        this.cbs.finish();
    }
    on_stop() {
        this.cbs.stop();
    }
    on_error(err, msg) {
        // let str = "";
        // for (let prop in err) {
        //     str += `${prop}: ${err[prop]} </br>`;
        // }
        this.cbs.error(err);
    }

    constructor(cont) {
        // binding
        this.on_canPlay = this.on_canPlay.bind(this);
        this.on_start = this.on_start.bind(this);
        this.on_finish = this.on_finish.bind(this);
        this.on_stop = this.on_stop.bind(this);
        this.on_error = this.on_error.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);;

        // set in the play call
        this.cbs = {};

        if (cont.tagName) {
            this.dom = {
                cont: cont,
                player: false,
            };


            this.build();
            this.attach();
        } else {
            console.error(`${this.constructor.name}:
        Improper construction properties
        See AudioPlayer.js, top comments, for how to properly construct`);
        }
    }
}