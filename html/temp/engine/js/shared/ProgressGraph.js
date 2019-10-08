/*
Description: 
   A couple visual progress graphs, some standalone, some requiring an image pass through

Requirements:
    scss/ProgressGraph.scss

Construction: 
    new ProgressGraph_SpinningWheel({
        cont: DOM element,
        imgSrc: "path/to/image"
    });
    new ProgressGraph_LoadLetters({
        cont: DOM element,
        imgSrc: "path/to/image"
    })
    
Usage:
    let pg = new ProgressGraph({cont: document.body, type: "spinningWheel"});

    // -- PROGRESS --
    // OPTION 1: Jumps
    // Set to 50% done (immediately)
    pg.set(50);
    // Reset to 0, clear timers
    pg.clear();
    // PG will automatically animate to 50, based on how long the load has taken so far.
    pg.calculate(50);
    // Set to 100, clear timers, and hide
    pg.finish();
    // Reshow on page
    pg.show();
    // We know we're loading 50 items
    pg.prepare(50);
    // Jump to whatever 34/preparedAssetNumber percent is
    pg.preppedSet(10);
    // Same as above, just animated
    pg.preppedCalc(20);
    // Set text element (if there is one)
    pg.say("..."); 
    // Show an error effect (if any) and kill all future set/calc calls
    pg.error(what);
    // Remove all DOM references
    pg.kill();

Compatibility:
    Desktop Chrome  - Yarp
    Desktop Firefox - Yarp
    Desktop Edge    - Yarp
    Desktop Opera   - Yarp

    Mobile Chrome   - Yarp
    Mobile Safari   - Yarp
*/


class ProgressGraph {
    get averageLoadTime() {
        let times = this.loadTimers;
        let diffs = [];
        this.loadTimers.map((v, i) => {
            if (times[i + 1]) {
                diffs.push(times[i + 1] - v);
            }
        });
        let avgMS = diffs.reduce((p, c) => p + c, 0) / diffs.length;
        let avgS = !isNaN(avgMS) ? avgMS / 1000 : 0;
        return avgS;
    }

    // Public methods
    set(percent) {
        if (!this.errored) {
            percent = Math.min(Math.max(percent, 0), 100);
            // JUMP to ${percent}%
            if (this.dom.loadedP) {
                // only whole numbers
                let prettyPercent = ("" + percent).split(".")[0];
                this.dom.loadedP.innerHTML = `${prettyPercent}%`;
            }
        }
    }
    calc(percent) {
        // ANIMATE to ${percent}%
        this.loadTimers.push(Date.now());
        let loadAvg = this.averageLoadTime;
        for (let e = 0; e < this.cssTransitionElementQueries.length; e++) {
            let queryStr = this.cssTransitionElementQueries[e];
            let elems = this.dom.mainDiv.querySelectorAll(queryStr);
            elems.forEach(function (elem) {
                elem.style.transition = `${loadAvg * 2}s`;
            });

        }
        this.set(percent);
    }
    prepare(assetTotal) {
        this.assetTotal = assetTotal;
    }
    preppedSet(assetNumber) {
        if (this.assetTotal) {
            let decimal = assetNumber / this.assetTotal;
            this.set(decimal * 100);
        } else {
            console.error(`${this.constructor.name}:
    How many total assets are we going to load??
    (Call prepare(INT) first)`);
        }
    }
    preppedCalc(assetNumber) {
        if (this.assetTotal) {
            let decimal = assetNumber / this.assetTotal;
            this.calc(decimal * 100);
        } else {
            console.error(`${this.constructor.name}:
    How many total assets are we going to load??
    (Call prepare(INT) first)`);
        }
    }
    show() {
        this.dom.mainDiv.style.display = "";
    }
    hide() {
        this.dom.mainDiv.style.display = "none";
    }
    clear() {
        this.set(0);
        this.loadTimers = [];
    }
    finish() {
        this.set(100);
        this.hide();
        this.set(0);
        this.loadTimers = [];
    }
    kill() {
        this.dom.mainDiv.remove();
    }
    error(what) {
        this.set(100);
        this.say("Error, check logs");
        this.errored = true;
        console.error(`${this.constructor.name}:
    ${what}`)
    }
    say(what) {
        if (!this.errored) {
            if (this.dom.speakerP) {
                this.dom.speakerP.innerHTML = `${what}`;
            } else if (this.dom.loadedP) {
                this.dom.loadedP.innerHTML = `${what}`;
            } else {
                console.info(`${this.constructor.name}:
        ${what}`)
            }
        }
    }

    // Constructor called (private lol) functions
    build() {
        this.dom.mainDiv = document.createElement("div");
        this.dom.mainDiv.setAttribute("class",
            `ProgressGraph ProgressGraph_${this.props.type}`);
        this.dom.contDiv.appendChild(this.dom.mainDiv);
        if (this.props.bg) {
            this.dom.mainDiv.style.backgroundColor = this.props.bg;
        }
        if (this.props.maxWidth) {
            this.dom.mainDiv.style.maxWidth = this.props.maxWidth;
        }
    }
    attach() {

    }

    constructor(props) {
        // Required
        if (props.cont && props.type) {
            this.props = Object.assign({
                vis: true,
                bg: false,
                pVis: true,
                maxWidth: false,
            }, props);
            this.dom = {};
            this.dom.contDiv = props.cont;
            this.assetTotal = 0;
            this.loadTimers = [];
            this.cssTransitionElementQueries = [];
            this.errored = false;

            this.set = this.set.bind(this);
            this.calc = this.calc.bind(this);
            this.prepare = this.prepare.bind(this);
            this.preppedSet = this.preppedSet.bind(this);
            this.preppedCalc = this.preppedCalc.bind(this);
            this.clear = this.clear.bind(this);

            this.build();
            this.attach();
            this.set(0);

            if (this.props.vis) {
                this.show();
            } else {
                this.hide();
            }
        } else {
            console.error(`${this.constructor.name}:
    Bad construction. Requires props.cont and props.type`);
            throw "Missing required args in construction";
        }
    }
}
class ProgressGraph_ScrollBar extends ProgressGraph {
    set(percent) {
        if (!this.errored) {
            percent = Math.min(Math.max(percent, 0), 100);
            let jumpAt = Math.round(percent / 100 * this.props.jumps.length);
            let fixedPercent = (jumpAt / (this.props.jumps.length) * 100);
            super.set(fixedPercent);
            this.dom.leftSide.style.width = `${fixedPercent}%`;
            this.dom.rightSide.style.width = `${100 - fixedPercent}%`;
            this.dom.dot.style.marginLeft = `${fixedPercent}%`;
            // this.dom.pageIdent.innerHTML = this.props.jumps[jumpAt];
        }
    }
    build() {
        super.build();
        this.dom = Object.assign({
            barCont: document.createElement("div"),
            bar: document.createElement("div"),
            leftSide: document.createElement("div"),
            rightSide: document.createElement("div"),
            pageIdent: document.createElement("h4"),
            posFix: document.createElement("div"),
            dot: document.createElement("div"),
        }, this.dom);

        this.dom.barCont.setAttribute("class", "barCont");
        this.dom.bar.setAttribute("class", "bar");
        this.dom.leftSide.setAttribute("class", "leftSide");
        this.dom.rightSide.setAttribute("class", "rightSide");
        this.dom.pageIdent.setAttribute("class", "pageIdent");

        this.dom.posFix.setAttribute("class", "posFix");
        this.dom.dot.setAttribute("class", "dot");

        this.dom.mainDiv.appendChild(this.dom.barCont);
        this.dom.barCont.appendChild(this.dom.bar);
        this.dom.bar.appendChild(this.dom.leftSide);
        this.dom.bar.appendChild(this.dom.rightSide);
        this.dom.bar.appendChild(this.dom.pageIdent);

        this.dom.mainDiv.appendChild(this.dom.posFix);
        this.dom.posFix.appendChild(this.dom.dot);
    }
    on_down(e) {
        // let abs = (e.changedTouches) ?
        //     [e.changedTouches[0].pageX, e.changedTouches[0].pageY] : 
        //     [e.pageX, e.pageY];
        // let offset = 
        // let loc = abs.map((e) => {});
        // console.log(`Down: ${loc}`);
    }
    on_up(e) {
        console.log(e);
    }
    on_move(e) {
        console.log(e);
    }

    attach() {
        ["mousemove", "touchmove"].forEach(function (evt) {
            this.dom.bar.addEventListener(evt, this.on_move);
        }.bind(this));
        ["mousedown", "touchstart"].forEach(function (evt) {
            this.dom.dot.addEventListener(evt, this.on_down);
        }.bind(this));
        ["mouseup", "touchend"].forEach(function (evt) {
            this.dom.dot.addEventListener(evt, this.on_up);
        }.bind(this));

        super.attach();
    }
    constructor(props) {
        super(Object.assign({
            type: "ScrollBar",
            jumps: props.jumps,
        }, props));
        this.cssTransitionElementQueries.push(".leftSide");
        this.cssTransitionElementQueries.push(".rightSide");
        this.cssTransitionElementQueries.push(".dot");
    }
}


class ProgressGraph_SpinningWheel extends ProgressGraph {
    build() {
        super.build();
        this.dom = Object.assign({
            loadedP: document.createElement("p"),
            spinnerImg: document.createElement("img")
        }, this.dom);

        this.dom.spinnerImg.setAttribute("src", this.props.imgSrc);
        this.dom.loadedP.innerHTML = "0%";
        if (!this.props.pVis) {
            this.dom.loadedP.style.display = "none";
        }

        this.dom.mainDiv.appendChild(this.dom.spinnerImg);
        this.dom.mainDiv.appendChild(this.dom.loadedP);
    }

    constructor(props) {
        super(Object.assign({
            type: "SpinningWheel"
        }, props));
    }
}

class ProgressGraph_LoadLetters extends ProgressGraph {
    get pubblyDefaultColors() {
        return ["8768AE", "3B4D83", "E06515", "B02927", "5EABC6", "92BC3A"];
    }

    set(percent) {
        if (!this.errored) {
            percent = Math.min(Math.max(percent, 0), 100);
            super.set(percent);
            if (this.props.fromDirection === "top") {
                this.dom.colorDivs.map((color, i) => {
                    color.style.height = `${percent}%`;
                });
            } else {
                this.dom.colorsDiv.style.height = `${percent}%`;
            }
        }
    }
    error(what) {
        this.dom.colorDivs.map((color, i) => {
            color.style.backgroundColor = `darkred`;
        });
        super.error(what);
    }

    build() {
        super.build();
        // Wrapper
        // img.sizeSet
        // colors
        // color 1
        // color 2...
        // percentage
        // image.sizeFit
        let pElem = (this.props.style = "informative") ? "speakerP" : "loaderP";

        this.dom = Object.assign({
            wrapperDiv: document.createElement("div"),
            sizerImg: document.createElement("img"),
            colorsDiv: document.createElement("div"),
            colorDivs: this.pubblyDefaultColors,
            absResetDiv: document.createElement("div"),
            fitterImg: document.createElement("img")
        }, this.dom);
        this.dom[pElem] = document.createElement("p");

        this.dom.wrapperDiv.setAttribute("class", "wrapper");
        this.dom.sizerImg.setAttribute("class", "sizer");
        this.dom.colorsDiv.setAttribute("class", "colors");
        this.dom[pElem].setAttribute("class", pElem);
        this.dom.absResetDiv.setAttribute("class", "absReset");
        this.dom.fitterImg.setAttribute("class", "fitter");

        this.dom.sizerImg.setAttribute("src", this.props.imgSrc);
        this.dom.fitterImg.setAttribute("src", this.props.imgSrc);

        if (!this.props.pVis) {
            this.dom[pElem].style.display = "none";
        }

        this.dom.mainDiv.appendChild(this.dom.wrapperDiv);
        this.dom.wrapperDiv.appendChild(this.dom.sizerImg);
        this.dom.wrapperDiv.appendChild(this.dom.colorsDiv);
        this.dom.wrapperDiv.appendChild(this.dom[pElem]);
        this.dom.wrapperDiv.appendChild(this.dom.absResetDiv);
        this.dom.absResetDiv.appendChild(this.dom.fitterImg);

        this.dom.colorDivs = this.dom.colorDivs.map((color, i) => {
            let tmp = document.createElement("div");
            tmp.setAttribute("class", "color");
            this.dom.colorsDiv.appendChild(tmp);
            tmp.style.backgroundColor = `#${color}`;
            let margin = `calc(${100}% * ${i}/${this.dom.colorDivs.length})`
            tmp.style.marginLeft = margin;
            return tmp
        });
        this.set(0);
    }
    constructor(props) {
        super(Object.assign({
            type: "LoadLetters",
            fromDirection: "bottom"
        }, props));
        if (this.props.fromDirection === "top") {
            this.cssTransitionElementQueries.push("div.color");
        } else {
            this.cssTransitionElementQueries.push("div.colors");
        }
    }
}

