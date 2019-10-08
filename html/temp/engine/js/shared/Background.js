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

class Background {
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

    build() {
        this.dom.main = document.createElement("div");
        this.dom.main.setAttribute("class", `background ${this.props.className}`);
        this.dom.main.style.backgroundImage = `url('${this.props.src}')`;
        this.dom.cont.appendChild(this.dom.main);
    }

    inits() {
        if (this.vis) {
            this.show();
        } else {
            this.hide();
        }
    }

    constructor(cont, props) {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        if (cont.tagName) {
            this.dom = {
                cont: cont
            };
            this.props = Object.assign({
                src: false,
                vis: true,
                className: "",
            }, props);
            this.vis = this.props.vis;
            if (this.props.src) {
                this.build();
                this.inits();
            }   else    {
                console.error(`${this.constructor.name}:
    Improper construction properties
    Needs at least a source in properties arg.`);
                        }
        } else {
            console.error(`${this.constructor.name}:
    Improper construction properties
    See top of script file for usage.`);
        }
    }
}