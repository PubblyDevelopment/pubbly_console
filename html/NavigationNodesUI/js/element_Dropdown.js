class NavigationNodes_Dropdown extends NavigationNodes_element {
    constructor(elem) {
        super(elem);
    }

    populateDropdown(node) {
    	document.getElementById('firstNodeSelected').innerHTML = node.name;
    	
    	// Get select element
        let select = document.getElementById("pathSelections");
        
        // Empty options panel to prevent duplicates
        for (let o in select.options) {
            select.options.remove(o);
        }

        for (let l in node.paths)
            select.options[select.options.length] = new Option(node.paths[l].link_name);

        return select.options.length;
          
    }

    getDropdownSelection () {
    	// Get select element
        let select = document.getElementById("pathSelections");

        return select.value;
    }

    setSecondNodeTitle(node) {
    	document.getElementById('secondNodeSelected').innerHTML = node.name;
    }

    setDropdownSelection (selection) {
        let select = document.getElementById("pathSelections");

        for (let o in select.options) {
            if (select.options[o].value == selection) {
                select.options[o].selected = true;
                break;
            }
        }
    }
}    