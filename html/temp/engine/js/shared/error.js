/*
    Wanted to build out a better way for designers to diagnose book issues... 

    The many many different versions of possible XMLs this poor js has to support... long term projects with no clear end point. Ah well,

    Turned out the error is mostly for when the XML is broken, and it doesn't give a whole lot of information to the designers, and any errored books need to be looked at by yours truly anyway, but
    still somewhat OK for af ew things, so keeping it in.
*/
function error(level, type, message) {
    // level ["fatal","warn","log"] | type ~Abouts where the error happened~ | message ~anything~
    level = (level === true) ? "fatal" : level.toString().toLowerCase();
    type = type.toLowerCase();

    var message = "";
    message += autocase(type);
    message += " error:\n";
    message += message;
    if (level === "update") {
        changeHTML(messyHTML("newEngineUpdate"));
    } else if (level === "fatal") {
        if (window.testing) {
            console.error("Fatal error");
        } else {
            fatalProductionError(message);
        }
    } else if (level === "warn") {
        console.warn(message);
        // window.alert(message);
    } else if (level === "log") {
        console.log(message);
    } else {
        console.error(`Unknown error level of ${level}, logging: `);
        console.log(message);
    }
}
function fatalProductionError(msg) {
    // When stuff breaks on our production platform! Display a client friendly error message page
    console.error(msg);
    // window.location.href = ("error.html");
}

function changeHTML(html) {
    // Only change once (first fatal);
    if (!window.htmlChanged) {
        window.htmlChanged = true;
        document.body.innerHTML = html;
    }
}
/*
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    error("fatal","window error", errorMsg);
    return false;
}
*/