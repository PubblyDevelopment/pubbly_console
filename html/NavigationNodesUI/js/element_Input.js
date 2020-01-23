/*
    element_Entry.js
    Author: Wallis Muraca

    Element class for entry node button
*/

class NavigationNodes_Input extends NavigationNodes_element {
    constructor(elem) {
        super(elem);
        this.dropDown = elem;
        console.log("***" + elem.options.item(0));
        //this.availableEvents.push("click");
    }

    populateDropdown(node) {
        let options = node.all_page_names;
    	//select.options[select.options.length] = new Option(name)
        this.makeDropdownEmpty();
        
        for (let o in options) {
            this.dropDown.options[this.dropDown.options.length] = new Option(options[o]);
        }
        this.enable();
    }

    getDropdownSelection() {
        return this.dropDown.selectedIndex;
    }

    makeDropdownEmpty() {
        for (let o in this.dropDown.options) {
            this.dropDown.options.remove(o);
        }
        this.disable();
    }

    enable() {
        this.dropDown.disabled=false;
    }

    disable() {
        //this.dropDown.addAttribute("disabled");
        this.dropDown.disabled=true;
    }
}