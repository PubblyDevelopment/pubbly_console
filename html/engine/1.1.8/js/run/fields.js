class fieldText {
    checkDrawTextPropsAndSetDefaults(props) {
        /*
         * What we're looking for
         * 
         * {
         *  top: INT,
         *  left: INT,
         *  maxWidth: INT,
         *  maxHeight: INT,
         *  pt: INT (optional),
         *  color: HEX (optional),
         *  boldColor: HEX (optional),
         *  insertionAt: INT (optional, but number of chars in)
         * }
         */
        let requiredTypeChecks = [
            ["top", "number"],
            ["left", "number"],
            ["maxWidth", "number"],
            ["maxHeight", "number"],
        ];
        let missingRequired = requiredTypeChecks.find(tc => {
            return (typeof props[tc][0] === props[tc][1]);
        });
        if (missingRequired) {
            return false;
        }
        return (missingRequired) ?
                false :
                Object.assign(
                        {
                            pt: false,
                            color: "#FFF",
                            boldCoor: "#00F",
                            insertionAt: false,
                        }, props);
    }

    // public
    drawText(props) {
        let props = this.checkDrawTextPropsAndSetDefaults(props);
        if (!props) {
            console.error("BAD draw text call, not enough props, or some of them wrong or something");
            console.error(props);
            return false;
        }

    }
    construct() {
        // Used to measure lines of text
        this.mtx = document.createElement("canvas").getContext("2d");
        this.drawText = this.drawText.bind(this);
    }
}