class NavigationNodes_Dropdown extends NavigationNodes_element {
    constructor(elem) {
        super(elem);
    }

    populateDropdown(book) {
    	document.getElementById('firstBookSelected').innerHTML = book.name;
    	
    	// Get select element
        let select = document.getElementById("linkSelections");
        
        // Empty options panel to prevent duplicates
        for (let o in select.options) {
            select.options.remove(o);
        }

        for (let l in book.links)
            select.options[select.options.length] = new Option(book.links[l].name);

        return select.options.length;
          
    }

    getDropdownSelection () {
    	// Get select element
        let select = document.getElementById("linkSelections");

        return select.value;
    }

    setSecondBookTitle(book) {
    	document.getElementById('secondBookSelected').innerHTML = book.name;
    }

    setDropdownSelection (selection) {
        let select = document.getElementById("linkSelections");

        for (let o in select.options) {
            if (select.options[o].value == selection) {
                select.options[o].selected = true;
                break;
            }
        }
    }
}    