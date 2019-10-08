/*
    An inbetween so that both server side regular browser and apk mobile stuffs can be talking about the same X Y coordinates.
*/
function CursorInput() {
    // Do we need scope here?
    const _Touch = this;
    this.getLoc = function (e, canvasOffsets, domOffsets, viewScale) {
        if (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].pageX) {
            return [
                ((e.changedTouches[0].pageX - domOffsets.x) / viewScale) + canvasOffsets.pageOffsetX,
                ((e.changedTouches[0].pageY - domOffsets.y) / viewScale) + canvasOffsets.pageOffsetY,
                now()
            ];
        } else if (e.pageX) {
            return [
                ((e.pageX - domOffsets.x) / viewScale) + canvasOffsets.pageOffsetX,
                ((e.pageY - domOffsets.y) / viewScale) + canvasOffsets.pageOffsetY,
                now()
            ];
        }   else {
            console.warn("Can't get touch or mouse loc");
            return [
                false,
                false,
                now()
            ]
        }
    }
}
