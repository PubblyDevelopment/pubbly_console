/*
Description: 

Requirements: 
    UI.js
    UI.css

Construction: 


Usage:


Compatibility:
    Desktop Chrome  - Yarp
    Desktop Firefox - Yarp
    Desktop Edge    - Yarp
    Desktop Opera   - Yarp

    Mobile Chrome   - Yarp
    Mobile Safari   - Yarp
*/

class Pubbly_PulldownBar {
    hide() {
        this.vis = false;
        this.dom.main.classList.remove("class", "show");
        this.dom.main.classList.add("class", "hide");
        if (this.onHideCB) {
            /*
            Why not this.onHideCB(); this.onHideCB = false?
            Because onHideCB may hide the pulldown... recursion
            */
            let cb = this.onHideCB;
            this.onHideCB = false;
            cb();
        }
    }
    show(onHideCB) {
        this.vis = true;
        this.dom.main.classList.remove("class", "hide");
        this.dom.main.classList.add("class", "show");
        if (onHideCB) {
            this.onHideCB = onHideCB;
        }
    }

    bumpHideTimer(time) {
        time = time || 1500;
        window.clearTimeout(this.hideTimer);
        this.hideTimer = window.setTimeout(function () {
            this.hide();
        }.bind(this), time);
    }

    on_hover(e) {
        if (this.vis && this.enabled) {
        }
    }
    on_down(e) {
        if (this.vis && this.enabled) {
            this.m.down = true;
        }
    }
    on_up(e) {
        if (this.vis && this.enabled) {
            if (this.m.down) {
            }
            this.m.down = false;
        }
    }
    on_out(e) {
        if (this.vis && this.enabled) {
            this.m.down = false;
        }
    }
    attach() {
        ["mousemove", "touchmove"].forEach(function (evt) {
            this.dom.main.addEventListener(evt, this.on_hover);
        }.bind(this));
        ["mousedown", "touchstart"].forEach(function (evt) {
            this.dom.main.addEventListener(evt, this.on_down);
        }.bind(this));
        ["mouseup", "touchend"].forEach(function (evt) {
            this.dom.main.addEventListener(evt, this.on_up);
        }.bind(this));
        ["mouseout"].forEach(function (evt) {
            this.dom.main.addEventListener(evt, this.on_out);
        }.bind(this));
    }
    build() {
        this.dom.main = document.createElement("div");
        this.dom.main.setAttribute("stylePreset", this.props.stylePreset)
        this.dom.main.classList.add("PulldownBar");
        this.dom.cont.appendChild(this.dom.main);
        // Title and logo
        this.dom.logo = document.createElement("img");
        this.dom.logo.setAttribute("src", this.brandingAssets.getSrc("logoDots"));
        this.dom.text = document.createElement("h2");
        this.dom.text.innerHTML = `${this.props.title}`;
        ["left", "middle", "right"].forEach(function (e) {
            this.dom[e] = document.createElement("div");
            this.dom[e].setAttribute("class", e);
            this.dom.main.appendChild(this.dom[e]);
        }.bind(this));
        ["title", "progress", "playbackControls"].forEach(function (e) {
            this.dom[e] = document.createElement("div");
            this.dom[e].setAttribute("class", e);
            this.dom.middle.appendChild(this.dom[e]);
        }.bind(this));
        this.dom.title.appendChild(this.dom.logo);
        this.dom.title.appendChild(this.dom.text);

        this.dom.main.style.transition = `${this.props.animLength / 1000}s`;

        let dims = (this.props.stylePreset == "full" ) ? [60, 60] : [25, 25];

        this.back = new UI_RelativeEdges(
            this.dom.left,
            {
                location: ["middle", "left"],
                dimensions: dims.map(function (e) { return e * 1 }),
                assets: { default: this.brandingAssets.getSrc("back") },
                animLength: this.props.animLength,
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Back";
                    this.events.back();
                }
            }
        );

        this.progress = new ProgressGraph_ScrollBar({
            cont: this.dom.progress,
            jumps: [
                "1",
                "2-3",
                "4-5",
                "6-7",
                "8-9",
                "10-11",
                "12-13",
                "14-15",
                "16-17",
                "18"
            ]
        },
            {
                seek: this.events.seek
            }
        );

        this.sound = new UI_RelativeEdges(
            this.dom.playbackControls,
            {
                location: ["middle", "left"],
                dimensions: [150, 168].map(function (e) { return e * 0.18 }),
                assets: {
                    default: this.brandingAssets.getSrc("sound"),
                    toggle_on: this.brandingAssets.getSrc("sound_mute")
                },
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Mute";
                    this.sound.toggle();
                    if (this.sound.toggled) {
                        this.events.mute();
                    } else {
                        this.events.unmute();
                    }
                }
            }
        );
        this.magnify = new UI_RelativeEdges(
            this.dom.playbackControls,
            {
                location: ["middle", "middle"],
                dimensions: [150, 119].map(function (e) { return e * 0.18 }),
                assets: { default: this.brandingAssets.getSrc("magnify") },
                className: "hidden"
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Zoom";
                    this.events.magnify();
                }
            }
        );
        this.fullscreen = new UI_RelativeEdges(
            this.dom.playbackControls,
            {
                location: ["middle", "right"],
                dimensions: [150, 216].map(function (e) { return e * 0.18 }),
                assets: {
                    default: this.brandingAssets.getSrc("fullscreen"),
                    toggle_on: this.brandingAssets.getSrc("exit_fullscreen")
                },
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Mute";
                    this.fullscreen.toggle();
                    if (this.fullscreen.toggled) {
                        this.events.enterFullscreen();
                    } else {
                        this.events.exitFullscreen();
                    }
                }
            }
        );



        this.home = new UI_RelativeEdges(
            this.dom.right,
            {
                location: ["middle", "right"],
                dimensions: dims.map(function (e) { return e * 1 }),
                assets: { default: this.brandingAssets.getSrc("home") },
                animLength: this.props.animLength,
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Home";
                    this.events.home();
                }
            }
        );
    }
    init() {
        if (this.vis) {
            this.show();
        } else {
            this.hide();
        }
    }

    constructor(cont, props, events) {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.bumpHideTimer = this.bumpHideTimer.bind(this);
        this.on_down = this.on_down.bind(this);
        this.on_hover = this.on_hover.bind(this);
        this.on_up = this.on_up.bind(this);
        this.on_out = this.on_out.bind(this);


        if (cont.tagName) {
            this.hideTimer = false;
            this.m = {
                down: false,
            }
            this.dom = {
                cont: cont
            };
            this.props = Object.assign({
                vis: true,
                enabled: true,
                animLength: 500,
                title: "",
                stylePreset: "full",
            }, props);
            this.events = Object.assign(
                {
                    back: () => { },
                    seek: () => { },
                    mute: () => { },
                    unmute: () => { },
                    magnify: () => { },
                    fullscreen: () => { },
                    home: () => { }
                }, events);
            this.brandingAssets = (this.props.brandingAssets) ? this.props.brandingAssets : new brandingAssets();

            // this.vis = this.props.vis;
            this.vis = true;
            this.enabled = this.props.enabled;

            this.build();
            this.attach();
            this.init();
        } else {
            console.error(`${this.constructor.name}:
    Improper construction properties
    See UI_PulldownBar.js, top comments, for how to properly construct`);
        }
    }
}