class DomInteractionCover {
    promptClick(cb) {
        let height = this.container.height();
        let width = this.container.width();
        this.container.append(`
         <div class='domInteractionCoverCont' 
         style='position:absolute;height:${height}px;width:${width}px;background-color:white'> 
         <img src="${this.picked.relPath}"
         class='transformCenter cursor-pointer'
         style='height: 100%' 
         loop=infinite />
         </div>`);
        this.container[0].onclick = function () {
            this.container.find(".domInteractionCoverCont").remove();
            cb();
        }.bind(this);
    }

    constructor(container) {
        this.container = container;
        this.available = [
            "Bee_exit2.gif",
            "Bee_loop_fast.gif",
            "Mathazzar-Loading.gif",
            "bird_jump_loop2.gif",
            "word_pup_screen_gif_03.gif",
            "wordtopia5.gif",
        ].map(e => {
            return {
                type: "gif",
                relPath: "engine/shared/domInteractionCover/" + e
            }
        });
        this.picked = randInArray(this.available);
    }
}

/*
 * let domInteractionCovers = [
 "Bee_exit2.gif",
 "Bee_loop_fast.gif",
 "Mathazzar-Loading.gif",
 "bird_jump_loop2.gif",
 "word_pup_screen_gif_03.gif",
 "wordtopia5.gif",
 ];
 let cover = domInteractionCovers[rand(domInteractionCovers.length - 1)];
 */