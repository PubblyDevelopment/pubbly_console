let ajax_general = function (scriptName, info, cbs, type = 'post') {
    let url = "php/ajax/" + scriptName + ".php";
    $.ajax({
        url: url,
        type: type,
        data: info,
    }).done(function (ret) {
// Probably a php error.
        if (ret.split("<").length > 5) {
            document.body.innerHTML = ret;
        } else {
            cbs.done(ret);
        }
    }).fail(function (err) {
        webix.message("Ajax call " + url + " failed, please try again later");
        console.error(err);
        if (cbs.fail) {
            cbs.fail();
        }
    });
}

let wf_addNodeToMap = function (nodeFromType, nodeFromID) {
    if (nodeFromID) {
        ajax_general("addNodeToMap", {
            mapID: window.mapID,
            nodeFromType: nodeFromType,
            nodeFromID: nodeFromID
        }, {done: function (newNode) {
                let node = JSON.parse(newNode);
                console.log(node);
                console.log("TODO: Push into map and soft refresh UI");
                // navigationNodes.json[node.name] = node;
                window.location.href = window.location.href;

            }
        }, 'get');
    }
}
/*
 $.ajax({
 url: "php/ajax/flushTest.php",
 xhrFields: {
 onprogress: function (e) {
 let status = false;
 try {
 let updateLines = e.target.responseText.split("</br>");
 status = updateLines[updateLines.length - 2];
 } catch (e) {
 }
 if (status) {
 console.log(status);
 } else {
 console.error("Could not interpret status");
 console.error(e.target.responseText);
 }
 
 }
 },
 success: function (text) {
 console.log("done");
 }
 });
 */
let w_header = {
    view: "toolbar",
    height: 55,
    autoWidth: true,
    cols: [
        {
            view: "button", value: "Home", width: 80, on: {
                onItemClick: function () {
                    window.location.href = "index.php";
                }
            }
        },
        {
            view: "button", value: "Select Map", width: 80, on: {
                onItemClick: function () {
                    window.location.href = "select_map.php";
                }
            }
        },
        {
            view: "label",
            template: "<p class='toolbarCenterLabel'>Edit Map</p>"
        },
        {
            view: "button", value: "Logout", width: 80, on: {
                onItemClick: function () {
                    window.location.href = "logout.php";
                }
            }
        }
    ]
};
let w_unitList = {
    header: "Units",
    body: {
        id: "unitList",
        view: "tree",
        scroll: "y",
        // template: "#name#: #length# children",
        select: true,
        on: {
            onItemDblClick: function (e, id) {
                let unitID = this.getItem(e).unit_id;
                console.log(unitID);
                wf_addNodeToMap("unit", unitID);
            },
        }
    },
};
let w_resizer = {view: "resizer"};
let w_variableList = {
    header: "Variable uploads",
    body: {
        id: "variableList",
        view: "tree",
        scroll: "y",
        // template: "#name#: #length# children",
        select: true,
        on: {
            onItemDblClick: function (e) {
                let variableID = this.getItem(e).variable_id;
                wf_addNodeToMap("variable", variableID);
            },
        }
    },
};
let w_staticList = {
    header: "Static uploads",
    body: {
        id: "staticList",
        view: "tree",
        scroll: "y",
        // template: "#name#: #length# children",
        select: true,
        on: {
            onItemDblClick: function (e) {
                let staticID = this.getItem(e).static_id;
                wf_addNodeToMap("static", staticID)
            },
        }
    },
};

$(document).ready(function () {
// Build header
    webix.ui({
        container: "webixHeader",
        id: "header",
        rows: [
            w_header
        ]
    });
    // Build nav node populate stuff
    webix.ui({
        autowidth: true,
        container: "importMapNodesButtonContainer",
        id: "mapNodePopulater",
        view: "accordion",
        rows: [
            w_unitList,
            w_resizer,
            w_variableList,
            w_resizer,
            w_staticList
        ]
    });
    // Resize webix on window resize
    $(window).resize(function () {
        $$("mapNodePopulater").resize();
        $$("header").resize();
    });
    // Get data from server (can't from URL because webix JSON parse debug
    let ajaxCallsToPopulateNodePopulaterElem = [
        [
            "webix_getUnits",
            "unitList",
        ],
        [
            "webix_getVariables",
            "variableList",
        ],
        [
            "webix_getStatics",
            "staticList",
        ],
    ];
    function getWebixFormatedListFromAjaxCall(ajaxScripName, webixDataParseID, doneCB) {
        $.ajax({
            type: "POST",
            url: "php/ajax/" + ajaxScripName + ".php",
            success: function (ret) {
                let data = false;
                try {
                    data = JSON.parse(ret);
                } catch (e) {
                    //
                }
                if (data) {
                    $$(webixDataParseID).parse(data);
                } else {
                    document.body.innerHTML = ret;
                    console.error("Error parsing data");
                    console.error(ret);
                }
                if (doneCB)
                    doneCB();
            }
        });
    }

    ajaxCallsToPopulateNodePopulaterElem.map(i => getWebixFormatedListFromAjaxCall.apply(this, i));
});