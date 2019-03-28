function echoErrors(errList, pageName) {
    let pageErrorLists = {
        "register": {
            "100": "Username blank",
            "101": "Email blank",
            "102": "Contact name blank",
            "103": "Password blank",
            "104": "Retyped password blank",
            "105": "Hint blank",
            "106": "PIN blank",
            "107": "Purchaser ID blank",
            "108": "Reader ID blank",

            "200": "Username too short",
            "201": "Password too short",
            "202": "PIN must be 4 digits",

            "300": "Username is taken",
            "301": "Email is already in use",
            "302": "Parent account already has a child by that name",

            "400": "Passwords do not match",
            "401": "Password and hint cannot be the same",
            "402": "Email is invalid",
            "403": "Avatar code is invalid",
            "404": "Old password does not match",

            "500": "No special characters allowed in Username",
            "501": "No special characters allowed in Email",
            "502": "No special characters allowed in Contact name",
            "503": "No special characters allowed in password",
            "504": "No special characters allowed in hint",
            "505": "No special characters allowed in PIN",

            "600": "Server error. Please try again later"
        },
        // TODO, login errors done inline, move to this
        "login": {},
    }

    let lookup = pageErrorLists[pageName];
    if (lookup) {
        pageErrorLists[pageName].map(code => webix.message(lookup[code]));
    }
}