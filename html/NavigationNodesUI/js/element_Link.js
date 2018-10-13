class NavigationNodes_Link extends NavigationNodes_element {
    constructor(elem) {
        super(elem);
        this.availableEvents.push("click");
    }
}