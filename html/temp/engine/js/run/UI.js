/*
Description: 
   Basic UI class.
   Has enable/disable show/hide logic, mouse/touch events.
   CSS styles UI to absolute positioning, z-index+10 (above canvases)
   Can be easily extended for additional functionality/styling.
   If you just need an extra applied style, pass it in as a prop.

Requirements: 
    UI.js
    UI.css

Construction: 
    new UI(
        DOM element,
        // OPTIONAL
        {
            enabled: BOOLEAN,
            vis: BOOLEAN,
            animLength: MS
        },
        // OPTIONAL
        {
            hover: () => {},
            down: () => {},
            up: () => {},
            // Down and up on the same element without leaving.
            click: () => {}
        }
    ); 

Usage:
    let toptray = new UI(
        document.querySelector(".pubbly"),
        {
            vis: true,
            enabled: true,
            animLength: 100,
            className: "toptray"
        },
        {
            hover: () => {
                console.log("woo special effect or something");
            }
        }
    );

    toptray.show();
    toptray.hide();
    toptray.enable();
    toptray.disable();

Compatibility:
    Desktop Chrome  - Yarp
    Desktop Firefox - Yarp
    Desktop Edge    - Yarp
    Desktop Opera   - Yarp

    Mobile Chrome   - Yarp
    Mobile Safari   - Yarp
*/

class UI {
    hide() {
        this.vis = false;
        this.dom.main.classList.remove("class", "show");
        this.dom.main.classList.add("class", "hide");
    }
    show() {
        this.vis = true;
        this.dom.main.classList.remove("class", "hide");
        this.dom.main.classList.add("class", "show");
    }
    enable() {
        this.enabled = true;
        this.dom.main.classList.remove("class", "disabled");
    }
    disable() {
        this.enabled = false;
        this.dom.main.classList.add("class", "disabled");
    }
    toggle() {
        this.toggled = !this.toggled;
    }

    on_hover(e) {
        if (this.vis && this.enabled) {
            e.stopPropagation();
            e.preventDefault();
            this.on.hover.call(this);
        }
    }
    on_down(e) {
        if (this.vis && this.enabled) {
            e.stopPropagation();
            e.preventDefault();
            this.on.down.call(this);
            this.m.down = true;
        }
    }
    on_up(e) {
        if (this.vis && this.enabled) {
            e.stopPropagation();
            e.preventDefault();
            this.on.up.call(this);
            if (this.m.down) {
                this.on.click.call(this);
            }
            this.m.down = false;
        }
    }
    on_out(e) {
        if (this.vis && this.enabled) {
            e.stopPropagation();
            e.preventDefault();
            this.on.out.call(this);
            this.m.down = false;
        }
    }

    build() {
        this.dom.main = document.createElement("div");
        this.dom.main.setAttribute("class", `UI ${this.props.className}`);
        // this.dom.main.style.transition = `${this.props.animLength / 1000}s`;
        this.dom.cont.appendChild(this.dom.main);
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
        ["mouseout"].forEach(function(evt) {
            this.dom.main.addEventListener(evt, this.on_out);
        }.bind(this));
    }
    inits() {
        if (this.vis) {
            this.show();
        } else {
            this.hide();
        }
        if (this.enabled) {
            this.enable();
        } else {
            this.disable();
        }
    }

    constructor(cont, props, on) {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);
        this.on_down = this.on_down.bind(this);
        this.on_hover = this.on_hover.bind(this);
        this.on_up = this.on_up.bind(this);
        this.on_out = this.on_out.bind(this);


        if (cont.tagName) {
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
                className: "",
            }, props);
            this.on = Object.assign({
                hover: () => { },
                down: () => { },
                up: () => { },
                out: () => { },
                click: () => { },
            }, on);
            this.vis = this.props.vis;
            this.enabled = this.props.enabled;
            this.toggled = false;

            this.build();
            this.attach();
            this.inits();
        } else {
            console.error(`${this.constructor.name}:
    Improper construction properties
    See ModularUI.js, top comments, for how to properly construct`);
        }
    }
}