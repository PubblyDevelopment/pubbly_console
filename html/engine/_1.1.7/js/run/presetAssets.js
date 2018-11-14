class PubblyPresetAssets {
    add(asset) {
        let already = this.list.find(a => a.src === asset.src);
        if (!already) {
            this.list.push(asset);
        }
    }

    constructor() {
        this.list = [];
        this.loader = new AssetListLoader();
        this.load = this.loader.load.bind(this.loader, this.list);
        
        this.add({type: "image", relPath: "engine/shared/textures/blackBoardBG.png"});
        this.add({type: "image", relPath: "engine/shared/cursors/pencil.png"});
        this.add({type: "image", relPath: "engine/shared/cursors/chalk.png"});
        this.add({type: "image", relPath: "engine/shared/cursors/eraser.png"});
        this.add({type: "image", relPath: "engine/shared/cursors/pen.png"});
        this.add({type: "image", relPath: "engine/shared/logos/logoEmptyColors.png"});
        this.add({type: "audio", relPath: "engine/shared/audio/blank.mp3"});
    }
}