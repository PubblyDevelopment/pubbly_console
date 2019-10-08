class ForceOrientation {
    forceAngle() {
        let rot = (this.angle - window.orientation) / 360;
        this.dom.style.transform = `rotate(${rot}turn)`;
        
        // Safari zooms and turns and stuff, and won't "reset" for another 0.5s. So wait it out. 1.01 ain't that far off.
        $("#viewport").attr("content", "initial-scale=1.01, width=device-width, user-scalable=no");
        window.setTimeout(function () {
            $("#viewport").attr("content", "initial-scale=1, width=device-width, user-scalable=no");
        }, 500);
    }
    attach() {
        window.addEventListener("orientationchange", this.forceAngle);
    }

    constructor(dom, angle) {
        this.forceAngle = this.forceAngle.bind(this);

        this.dom = dom;
        this.angle = ([0, 90, 180, 270].indexOf(angle) == -1) ?
            0 : angle;

        // Some tablets are at 0 angle in landscape, because reasons. Check for this, and -- accordingly.
        if (screen &&
            screen.orientation) {
            if (screen.orientation.type &&
                (screen.orientation.type.split("-")[0] == "landscape" && (orientation == 0 || orientation == 180)) ||
                (screen.orientation.type.split("-")[0] == "portrait" && (orientation == 90 || orientation == 270))) {
                this.angle = (this.angle >= 90) ? this.angle - 90 : 270;
            }
        }

        this.attach();
        this.forceAngle();
    }
}