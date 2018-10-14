class NavigationNodes {

    // Start of Jason messed around
    // Plus added a line to top of method eventMouseMoveCanvas

    play_getBookInfoByFancyName(fancyName) {
        for (let bookName in this.json) {
            if (this.json[bookName].name == fancyName) {
                return this.json[bookName];
            }
        }
    }
    // 
    play_getLines(mx, my) {
        let lines = [];
        for (let bookName in this.json) {
            let book = this.json[bookName];

            book.links.map(lnk => {
                if (lnk.url) {
                    let endBook = this.play_getBookInfoByFancyName(lnk.url);
                    lines.push({
                        start: [
                            book.x + book.width / 2,
                            book.y + book.height / 2
                        ],
                        // End of whatever we use to calculate where the arrow ends, not where the center book ends.
                        end: this.determineArrowEndingPoint(book, endBook),
                        fromBook: book.name,
                        linkName: lnk.name,
                        toBook: endBook.name
                    });
                }
            });
        }
        let firstHoveredLine = lines.find(ln => {
            // distanceToLineSegment? 
            // Shamelessly copied to helper.js from the first result of 
            // "github javascript distance of point and line MIT" (MIT best license)
            return distanceToLineSegment(
                    ln.start[0], ln.start[1],
                    ln.end[0], ln.end[1],
                    mx, my) < 10 // line thickness
        });

        return firstHoveredLine;
    }

    // End of Jason messed around


    loadAssets(cb) {
        let needed = 0;
        let recieved = 0;
        for (let bookName in this.json) {
            // Counts how many unique images we need to load in to display the project
            needed++;
            // Easier loop
            let book = this.json[bookName];
            // Assigning to book (carries backwards to this.json) for later access
            book.img = new Image();
            book.img.onload = function () {
                // Still references the variable declared at top of this.loadAssets
                recieved++;
                if (recieved == needed) {
                    // All images loaded in good... We can call a first draw function
                    cb();
                }
            };
            let backup = "NavigationNodesUI/assets/booknotfound.png";
            book.img.onerror = function () {
                book.img.src = backup;
            }
            book.img.src = book.cover || backup;
        }
    }

    // Puts books in a grid 
    placeVirginProjectBooks() {
        // Assign an XY coordinate to each book (described in json) if brand new program
        let x = 10;
        let y = 10;
        let counter = 1;
        for (let bookName in this.json) {
            let img = this.json[bookName].img;
            this.json[bookName].x = x;
            this.json[bookName].y = y;
            this.json[bookName].width = 150;
            this.json[bookName].height = 150 * img.height / img.width;
            // Changed to just height, width, since there's nothing else with those props.
            // Deletes here to overwrite old format projectJSON
            delete this.json[bookName].imgHeight;
            delete this.json[bookName].imgWidth;

            // Logic to build grid
            x += 210;
            if (counter % 5 == 0) {
                y += 200;
                x = 10;
            }
            counter++;
        }
    }
    checkIfProjectVirgin() {
        for (let bookName in this.json) {
            if (typeof this.json[bookName].x == "undefined") {
                // Returning auto "breaks";
                return true;
            }
        }
        // Only here if not yet returned (no need to break)
        return false;
    }

    clearCanvas() {
        this.inputs.bookCanvas.clear();
    }

    drawAllBooks() {
        for (let bookName in this.json) {
            this.inputs.bookCanvas.drawImage(
                    this.json[bookName].img,
                    this.json[bookName].x,
                    this.json[bookName].y,
                    this.json[bookName].width,
                    this.json[bookName].height);
        }
    }

    drawBookRect(color, book) {
        if (book != undefined) {
            this.inputs.bookCanvas.drawRect(
                    color,
                    book.x,
                    book.y,
                    book.width,
                    book.height);
        }
    }

    drawBooksRectanglesAndLines() {
        this.clearCanvas();
        this.determineLinks();
        this.drawAllBooks();
        this.drawBookRect("red", this.curBook);
        this.drawBookRect("green", this.secondBook);
    }

    determineLinks() {
        // Go through each book
        this.listOfLinks = [];
        for (let bookName in this.json) {
            for (let l in this.json[bookName].links) {
                ;
                //this.inputs.bookCanvas.drawLine("black",0,0,book.x,book.y);
                // Go through each link in that book
                for (let bookNameAgain in this.json) {
                    // Go through each book again 
                    // If a link equals that book, add to array and break. moving on
                    // to next link
                    if (this.json[bookName].links[l].url == this.json[bookNameAgain].name) {
                        this.listOfLinks.push([this.json[bookName], this.json[bookNameAgain]]);

                        let color = "gray";
                        if (this.json[bookName] == this.curBook)
                            // Populate dropdown to show existing link
                            if (this.json[bookNameAgain] == this.secondBook || this.secondBook == undefined) {
                                this.inputs.dropDown.setDropdownSelection(this.json[bookName].links[l].name);
                                color = "black";
                            }

                        let arrowEndingLoc = this.determineArrowEndingPoint(this.json[bookName], this.json[bookNameAgain]);

                        this.inputs.bookCanvas.drawArrow(color,
                                this.json[bookName].x + this.json[bookName].width / 2,
                                this.json[bookName].y + this.json[bookName].height / 2,
                                arrowEndingLoc[0],
                                arrowEndingLoc[1]);

                        break;
                    }
                }
            }
        }
    }

    determineArrowEndingPoint(book1, book2) {
        let slope = getSlope(book1.x, book1.y, book2.x, book2.y);
        let minRadius = Math.max(book2.height, book2.width) / 2;
        let xMod = 0;
        let yMod = 0;
        let closeX, farX, closeY, farY;

        if (book1.x < book2.x) {
            closeX = (book2.x + book2.width / 2) - minRadius;
            farX = (book2.x + book2.width / 2) + minRadius;
        } else {
            closeX = (book2.x + book2.width / 2) + minRadius;
            farX = (book2.x + book2.width / 2) - minRadius;
        }

        if (book1.y < book2.y) {
            closeY = (book2.y + book2.height / 2) - minRadius;
            farY = (book2.y + book2.height / 2) + minRadius;
        } else {
            closeY = (book2.y + book2.height / 2) + minRadius;
            farY = (book2.y + book2.height / 2) - minRadius;
        }

        let avgX = (closeX + farX) / 2;
        let avgY = (closeY + farY) / 2;

        let ang = angle(book1.x, book1.y, book2.x, book2.y);
        if (Math.abs(ang) > 45 && Math.abs(ang) < 125) {
            // Draw to middle top/bottom
            return [avgX, closeY];
        } else {
            // Draw to left/right middle
            return [closeX, avgY];
        }
    }

    generateBookConnectionArrowPoints(book1, book2) {
        // TODO 10/4
        for (let l in book1.links) {
            if (book1.links[l].url == book2.name) {
                // Position logic
                this.inputs.bookCanvas.drawArrow("black", book1.x, book1.y, book2.x, book2.y);
            }
        }
    }

    drawAllLines() {
        for (let bookName in this.json) {
            if (this.json[bookName] == this.curBook)
                this.drawLines(this.json[bookName], "black");
            else
                this.drawLines(this.json[bookName], "gray");
        }
    }

    changeBookPhoto() {
        let empty = "NavigationNodesUI/assets/emptybook.png";
        let firstCoverSrc = (this.curBook && this.curBook.cover) ?
                this.curBook.cover : empty;
        document.getElementById("firstBookPhoto").src = firstCoverSrc;

        let secondCoverSrc = (this.secondBook && this.secondBook.cover) ?
                this.secondBook.cover : empty;
        document.getElementById("secondBookPhoto").src = secondCoverSrc;


        if (this.secondBook)
            document.getElementById("secondBookPhoto").src = secondCoverSrc;
    }

    // Updates the JSON in /project
    saveJSON() {
        let jsonString = JSON.stringify(this.json);
        $.ajax({
            type: "POST",
            url: "NavigationNodesUI/ajax/saveJSON.php",
            data: {
                programName: btoa(this.programName),
                json: jsonString,
            },
            success: function (ret) {
                if (ret == "done") {
                    // console.log("woo");
                } else {
                    // Probably PHP errors echoed in... better read em
                    document.innerHTML = ret;
                }
            },
            error: function () {
                console.error("saveJSON function didn't go through. Check ajax call.");
            },
        });
    }

    // Events to be called back with class NavigationNodes scope.
    // ALL events using 
    //     arg1: relative mouse loc {x, y}
    //     arg12: element where event was generated
    getFirstBookUnderneathMouseLoc(loc) {
        let hoveredBooks = [];
        for (let bn in this.json) {
            let book = this.json[bn];
            let poly = [
                [book.x, book.y],
                [book.x + book.width, book.y],
                [book.x + book.width, book.y + book.height],
                [book.x, book.y + book.height],
            ]
            if (inside([loc.x, loc.y], poly)) {
                hoveredBooks.push(book);
            }
        }
        // TODO: Order hoveredBooks by layer, skim first from top (books could overlap)
        return hoveredBooks[0]; // either a book, or undefined (which is falsy)
    }

    eventMouseUpCanvas(loc, e, elem)
    {
        this.curMovingBook = false;
        this.isPanning = false;
    }

    eventMouseDownCanvas(loc, e, elem) {
        let clickedBook = this.getFirstBookUnderneathMouseLoc(loc);
        let clickedLine = this.play_getLines(loc.x, loc.y);

        if (this.curBook && this.secondBook) {
            this.generateBookConnectionArrowPoints(this.curBook, this.secondBook);
        }

        if (clickedBook && !e.shiftKey) {
            if (clickedBook == this.secondBook) {
                this.secondBook = undefined;
            }
            this.curBook = clickedBook;
            this.curMovingBook = clickedBook;
            this.inputs.dropDown.populateDropdown(this.curBook);
            console.log(this.inputs.dropDown.populateDropdown(this.curBook));
            if (this.inputs.dropDown.populateDropdown(this.curBook) == 0)
                this.inputs.linkButton.disableEvent("click");
            else {
                this.inputs.linkButton.enableEvent("click");
            }

            this.changeBookPhoto();
            this.drawBooksRectanglesAndLines()
        } else if (clickedBook && e.shiftKey) {
            this.secondBook = clickedBook;
            this.curMovingBook = clickedBook;

            if (this.curBook) {
                if (this.curBook.name == this.secondBook.name) {
                    this.curBook = undefined;
                }
            }

            this.drawBooksRectanglesAndLines();

            this.inputs.dropDown.setSecondBookTitle(this.secondBook);
            this.changeBookPhoto();
        } else if (clickedLine) {
            this.curBook = this.play_getBookInfoByFancyName(clickedLine.fromBook)
            this.secondBook = this.play_getBookInfoByFancyName(clickedLine.toBook)

            this.inputs.dropDown.populateDropdown(this.curBook);
            this.inputs.dropDown.setDropdownSelection(clickedLine.linkName);

            this.clearCanvas();
            this.determineLinks();
            this.drawAllBooks();
            this.drawBookRect("red", this.curBook);
            this.drawBookRect("green", this.secondBook);

            this.changeBookPhoto();
        } else {
            this.curBook = undefined;
            this.secondBook = undefined;
            this.clearCanvas();
            this.determineLinks();
            this.drawAllBooks();
            this.changeBookPhoto();
            this.inputs.linkButton.disableEvent("click");

            this.curMovingBook = false;
            this.isPanning = true;

            this.initialX = e.offsetX;
            this.initialY = e.offsetY;
        }
    }
    eventMouseMoveCanvas(loc, e, elem) {
        // playing around with ideas.
        let hoveringOnALine = this.play_getLines(loc.x, loc.y);


        if (this.curMovingBook && !e.shiftKey) {
            this.curBook = this.curMovingBook;
            this.curMovingBook.x = loc.x - this.curMovingBook.width / 2;
            this.curMovingBook.y = loc.y - this.curMovingBook.height / 2;

            this.drawBooksRectanglesAndLines();
        } else if (this.curMovingBook && e.shiftKey) {
            // some stuff
            this.secondBook = this.curMovingBook;
            this.curMovingBook.x = loc.x - this.curMovingBook.width / 2;
            this.curMovingBook.y = loc.y - this.curMovingBook.height / 2;

            this.drawBooksRectanglesAndLines();

        } else {
            let hoverBook = this.getFirstBookUnderneathMouseLoc(loc);

            this.drawBooksRectanglesAndLines();

            if (hoverBook) {
                this.inputs.bookCanvas.changeCursor("pointer");
                if (hoverBook != this.curBook && hoverBook != this.secondBook) {
                    this.drawBookRect('white', hoverBook);
                }
            } else {
                this.inputs.bookCanvas.changeCursor();
            }

            if (hoveringOnALine) {
                this.inputs.bookCanvas.changeCursor("pointer");
            }

        }
        if (this.isPanning) {
            this.inputs.bookCanvas.offset[0] += (this.initialX - e.offsetX) / -this.inputs.bookCanvas.zoom;
            this.inputs.bookCanvas.offset[1] += (this.initialY - e.offsetY) / -this.inputs.bookCanvas.zoom;

            this.initialX = e.offsetX;
            this.initialY = e.offsetY;

            this.clearCanvas();
            this.determineLinks();
            this.drawAllBooks();

            this.drawBookRect("red", this.curBook);
            this.drawBookRect("green", this.secondBook);
        }
    }

    eventMouseWheelCanvas(loc, e, elem) {
        if (e.deltaY < 0) {
            this.eventClickZoomIn(loc, e, elem)
        } else
            this.eventClickZoomOut(loc, e, elem);
    }

    eventClickZoomIn(loc, e, elem) {
        let factor = 0.1;

        this.inputs.bookCanvas.zoom += factor;

        this.clearCanvas();
        this.determineLinks();
        this.drawAllBooks();
    }
    eventClickZoomOut(loc, e, elem) {
        let factor = 0.1;
        this.inputs.bookCanvas.zoom -= factor;

        this.clearCanvas();
        this.determineLinks();
        this.drawAllBooks();
    }
    eventClickSave(loc, e, elem) {
        // TODO: Please wait, disable everything, callback, enable buttons
        this.inputs.save.disableEvent("click");
        this.saveJSON();
        console.log("saved");
        this.inputs.save.enableEvent("click");
    }

    eventClickLink(loc, e, elem)
    {
        let selLink = this.inputs.dropDown.getDropdownSelection();

        if (this.curBook && this.secondBook) {
            for (let l in this.curBook.links) {
                if (selLink == this.curBook.links[l].name) {
                    this.curBook.links[l].url = this.secondBook.name;
                }
            }
        }

        this.drawBooksRectanglesAndLines();
    }

    attachEvents() {
        // Bind attaches the first arg to the function call... essentially cutting out the _This solution or the scope apply callbacks (ES6)
        // https://stackoverflow.com/questions/2236747/use-of-the-javascript-bind-method
        this.inputs.bookCanvas.attachEvent("mouseup", this.eventMouseUpCanvas.bind(this));
        this.inputs.bookCanvas.attachEvent("mousedown", this.eventMouseDownCanvas.bind(this));
        this.inputs.bookCanvas.attachEvent("mousemove", this.eventMouseMoveCanvas.bind(this));
        this.inputs.bookCanvas.attachEvent("mouseout", this.eventMouseUpCanvas.bind(this));
        this.inputs.bookCanvas.attachEvent("mousewheel", this.eventMouseWheelCanvas.bind(this));

        this.inputs.zoomIn.attachEvent("click", this.eventClickZoomIn.bind(this));
        this.inputs.zoomOut.attachEvent("click", this.eventClickZoomOut.bind(this));

        this.inputs.save.attachEvent("click", this.eventClickSave.bind(this));

        this.inputs.linkButton.attachEvent("click", this.eventClickLink.bind(this));
    }

    constructor(programName, json, inputElements, debugInfo) {
        // We've added more classes, and need more "selves". 
        // As such, use _ClassName to signify the scope lock trick.
        const _NavigationNodes = this;
        this.programName = programName;
        this.json = json;
        this.inputElements = inputElements;

        // Debuggin!
        this.debugInfo = mergeObjWithDefaults(debugInfo,
                {fakeProjectVirgin: false}
        );

        // Default properties for class itself
        this.isDraggable = false;
        this.isPanning = false;
        this.ifPlaced = false;
        this.curBook;
        this.secondBook;
        this.hoverBook;
        this.cleanSlate;
        this.initialX;
        this.initialY;
        this.zoomFactor = 1.0;
        this.isPanning;
        this.listOfLinks = [];
        // Each input to the NavigationNodes main class
        this.inputs = {};

        try {
            // Will tell you if something goes bad with your inputs
            this.inputs.bookCanvas = new NavigationNodes_Canvas(inputElements.canvas);
            // Seperate canvas for just the connecting arrows? Cut down on redraw time.
            // this.inputs.connectionsCanvas = new NavigationNodes_Canvas(inputElements.canvas);
            this.inputs.save = new NavigationNodes_Save(inputElements.saveButton);
            this.inputs.zoomIn = new NavigationNodes_Zoom(inputElements.zoomInButton);
            this.inputs.zoomOut = new NavigationNodes_Zoom(inputElements.zoomOutButton);
            this.inputs.dropDown = new NavigationNodes_Dropdown(inputElements.linkDropdown)
            this.inputs.linkButton = new NavigationNodes_Link(inputElements.linkButton);
        } catch (e) {
            console.error("Error with NavigationNodes init.");
            console.error(e);
            console.error("Please ensure all required input elements have been passed in correctly to NavigationNode constructor");
        }

        // Attach events to each input elements created above
        this.attachEvents();
        this.inputs.linkButton.disableEvent("click");

        this.loadAssets(function () {
            if (_NavigationNodes.checkIfProjectVirgin() ||
                    _NavigationNodes.debugInfo.fakeProjectVirgin) {
                _NavigationNodes.placeVirginProjectBooks.call(_NavigationNodes);
                _NavigationNodes.saveJSON.call(_NavigationNodes);
            }
            _NavigationNodes.determineLinks.call(_NavigationNodes);
            _NavigationNodes.drawAllBooks.call(_NavigationNodes);
            _NavigationNodes.saveJSON.call(_NavigationNodes);
        });
    }
}

