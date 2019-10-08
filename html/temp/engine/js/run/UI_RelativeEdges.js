/*
Description: 
   You pass in SVG image data, dimensions, and a relative position, 
   and the UI element will build itself. IMGs scale the positioner
   and offsetter by themselves, so you only have to change the dims
   on construction (style reacts to that). 

    --------------------------------------------------------
   |top left              top middle               top right|
   |
   |middle left            (NOPE)               middle right|
   |
   |bottom left         bottom middle           bottom right|
    --------------------------------------------------------
    
   We've overriding the attach method, as we don't want anything 
   attaching to the main class (it takes up abs 100% for positioning)

   And we're supplementing the build class.

Requirements: 
    UI.js
    UI.css

    UI_RelativeEdges.css

Construction: 
    new UI_RelativeEdges(
        DOM element,
        {
            location: ["top/middle/bottom", "left/middle/right"],
            dimensions: [INT, INT],
            asset: image data,
            // OPTIONAL
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
    let brandingAssets = new BrandingAssets();
    window.buttons = {
        pulldown = new UI_RelativeEdges(
            document.querySelector(".pubbly"),
            {
                location: ["top", "middle"],
                dimensions: [28.0625, 50],
                asset: brandingAssets.getSrc("pulldown"),
            },
            {
                click: () => {
                    console.log("show top bar");
                }
            }
        );
    }

    window.buttons.pulldown.show(); // same as UI methods.

Compatibility:
    Desktop Chrome  - Yarp
    Desktop Firefox - Yarp
    Desktop Edge    - Yarp
    Desktop Opera   - Yarp

    Mobile Chrome   - Yarp
    Mobile Safari   - Yarp
*/

class UI_RelativeEdges extends UI {
    enable() {
        super.enable();
        if (this.props.assets.disabled) {
            this.dom.img.setAttribute("src", this.props.assets.default);
        }
    }
    disable() {
        super.disable();
        if (this.props.assets.disabled) {
        }
    }

    toggle() {
        super.toggle();
        if (this.props.assets.toggle_on) {
            this.dom.img.setAttribute("src",
                (this.toggled) ?
                    this.props.assets.toggle_on :
                    this.props.assets.toggle_off || this.props.assets.default
            );
        }
    }

    attach() {
        // OVERRIDE: UI main class attaches to dom.main... We just want the img
        ["mousemove", "touchmove"].forEach(function (evt) {
            this.dom.img.addEventListener(evt, this.on_hover);
        }.bind(this));
        ["mousedown", "touchstart"].forEach(function (evt) {
            this.dom.img.addEventListener(evt, this.on_down);
        }.bind(this));
        ["mouseup", "touchend"].forEach(function (evt) {
            this.dom.img.addEventListener(evt, this.on_up);
        }.bind(this));
        ["mouseout"].forEach(function(evt) {
            this.dom.img.addEventListener(evt, this.on_out);
        }.bind(this));
    }
    build() {
        // TACK ON: UI main class creates and appends MAIN element. Fine with that.
        super.build();
        this.dom.main.classList.add("RelativeEdges");
        this.dom.main.setAttribute("vert", this.props.location[0]);
        this.dom.main.setAttribute("hori", this.props.location[1]);
        this.dom.positioner = document.createElement("div");
        this.dom.positioner.setAttribute("class", "positioner");
        this.dom.offscreener = document.createElement("div");
        this.dom.offscreener.setAttribute("class", "offscreener");
        this.dom.offscreener.style.transition = `${this.props.animLength / 1000}s`;

        this.dom.img = document.createElement("img");
        this.dom.img.setAttribute("src", this.props.assets.default);
        this.dom.img.setAttribute("height", this.props.dimensions[0]);
        this.dom.img.setAttribute("width", this.props.dimensions[1]);

        this.dom.main.appendChild(this.dom.positioner);
        this.dom.positioner.appendChild(this.dom.offscreener);
        this.dom.offscreener.appendChild(this.dom.img);
    }
    init() {
        // DUMMY: Nothing special for the inits of this extended class
        super.init();
    }

    constructor(cont, props, on) {
        if (["top", "middle", "bottom"].indexOf(props.location[0]) !== -1 &&
            ["left", "middle", "right"].indexOf(props.location[1]) !== -1 &&
            typeof props.dimensions[0] == "number" && props.dimensions[0] > 0 &&
            typeof props.dimensions[1] == "number" && props.dimensions[1] > 0 &&
            props.assets && props.assets.default) {
            super(cont, props, on);
        } else {
            console.error(`UI_RelativeEdges: 
    Improper construction properties
    See UI_RelativeEdges.js, top comments, for how to properly construct`);
        }
    }
}