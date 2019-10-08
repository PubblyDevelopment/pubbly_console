class Pubbly_UI {
    hide(elements) {
        elements = (elements) || ["left", "right", "pulltab"];
        this.vis = false;
        this.dom.main.classList.remove("class", "show");
        this.dom.main.classList.add("class", "hide");
        elements.map(function (e) {
            this[e].hide();
        }.bind(this));
    }
    show(elements) {
        elements = (elements) || ["left", "right", "pulltab"];
        this.vis = true;
        this.dom.main.classList.remove("class", "hide");
        this.dom.main.classList.add("class", "show");
        elements.map(function (e) {
            this[e].show();
        }.bind(this));
    }
    enable(elements) {
        elements = (elements) || ["left", "right", "pulltab"];
        this.enabled = true;
        this.dom.main.classList.remove("class", "disabled");
        this.show(elements);
    }
    disable(elements) {
        elements = (elements) || ["left", "right", "pulltab", "pulldown"];
        this.enabled = false;
        this.dom.main.classList.add("class", "disabled");
        this.hide(elements);
    }

    coverWidth() {
        ["left", "right", "pulltab", "pulldown"].map(function (e) {
            this[e].dom.main.classList.add("half");
        }.bind(this));
    }
    spreadWidth() {
        ["left", "right", "pulltab", "pulldown"].map(function (e) {
            this[e].dom.main.classList.remove("half");
        }.bind(this));
    }

    update(pageNumber, outOf) {
        this.pulldown.progress.set(pageNumber / outOf * 100);
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

    attach() {

    }

    build() {
        let brandingAssets = (this.props.brandingAssets) ? this.props.brandingAssets : new brandingAssets();
        let arrowDim = [139, 130].map(function (e) { return e * 0.8 })
        this.left = new UI_RelativeEdges(this.dom.main,
            {
                location: ["bottom", "left"],
                dimensions: arrowDim,
                assets: {
                    "default": brandingAssets.getSrc("left")
                },
                animLength: this.props.animLength,
                vis: this.props.vis,
            },
            {
                click: () => {
                    // document.querySelector(".log").innerHTML = "Previous";
                    this.events.left();
                },
            }
        );
        this.right = new UI_RelativeEdges(this.dom.main,
            {
                location: ["bottom", "right"],
                dimensions: arrowDim,
                assets: {
                    "default": brandingAssets.getSrc("right")
                },
                animLength: this.props.animLength,
                vis: this.props.vis,
            }, {
                click: (e) => {
                    // document.querySelector(".log").innerHTML = "Next";
                    this.events.right();
                },
            }
        );


        this.pulltab = new UI_RelativeEdges(this.dom.main,
            {
                location: this.props.pulltabPosition,
                dimensions: [75, 147].map(function (e) { return e * 0.50 }),
                assets: {
                    "default": brandingAssets.getSrc("pulltab")
                },
                animLength: this.props.animLength,
                vis: this.props.vis,
            }, {
                click: function () {
                    this.pulltab.hide();
                    this.pulldown.show(function () {
                        this.pulldown.hide();
                        this.pulltab.show();
                    }.bind(this));
                    this.pulldown.bumpHideTimer(5000);
                    this.events.tab();
                }.bind(this)
            }
        );
        // Last minute request, pulltab should be in top right but animation vertically only
        // Easiest way is to override the ml style toggle set from the right attr.
        let tabPositionMarginHack = {
            "left": "0%",
            "middle": "-50%",
            "right": "0%",
        };
        this.pulltab.dom.offscreener
            .style.setProperty("margin-left", tabPositionMarginHack[this.props.pulltabPosition[1]], "important");

            this.pulldown = new Pubbly_PulldownBar(this.dom.main,
            {
                vis: true,
                animLength: this.props.animLength,
                brandingAssets: brandingAssets,
                title: this.props.title,
                stylePreset: this.props.pulldownStyle,
            },
            {
                back: this.events.back,
                seek: this.events.seek,
                mute: this.events.mute,
                unmute: this.events.unmute,
                magnify: this.events.magnify,
                enterFullscreen: this.events.enterFullscreen,
                exitFullscreen: this.events.exitFullscreen,
                home: this.events.home,
            }
        );
    }

    constructor(cont, props, events) {
        this.update = this.update.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);


        this.props = Object.assign({
            vis: true,
            enabled: true,
            animLength: 500,
            className: "",
            title: "",
            pulltabPosition: ["top", "left"],
            pulldownStyle: "full",
        }, props);
        this.dom = {
            main: cont,
        }
        this.events = Object.assign(
            {
                left: () => { },
                right: () => { },
                tab: () => { },
                back: () => { },
                seek: () => { },
                mute: () => { },
                unmute: () => { },
                magnify: () => { },
                enterFullscreen: () => { },
                exitFullscreen: () => { },
                home: () => { }
            }, events);

        this.vis = this.props.vis;
        this.enabled = this.props.enabled;

        this.build();
        this.inits();
    }
}