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

    populateDropdown(optionList) {
        let test = ["Page 3", "Page 5", "Page 9"];
    	//select.options[select.options.length] = new Option(name)

        for (let o in test) {
            this.dropDown.options[this.dropDown.options.length] = new Option(test[o]);
        }
    }
}