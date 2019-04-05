let header = {
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
            view: "label",
            template: "<p class='toolbarCenterLabel'>Select Map</p>"
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
let selectMap = {
    header: "Select Map",
    id: "selectMap",
    collapsed: false,
    body: {
        rows: [
            {
                id: "mapList",
                view: "datatable",
                select: "multiselect",
                width: "100%",
                autoheight: true,
                editable: true,
                scroll: false,
                columns: [
                    { id: "map_id", header: "ID", width: 50, editor: false },
                    { id: "name", header: "Name", width: 200, editor: "text", },
                    { id: "unit_count", header: "Unit count", width: 100, editor: false, },
                    { id: "status", header: "Status", width: 100, editor: false },
                    { id: "modified", header: "Modified", width: 100, editor: false },
                ],
                url: "php/ajax/getMaps.php",
                on: {
                    onAfterEditStop: function (state, editor) {
                        var THIS = this;
                        if (state.value !== state.old) {
                            // editor.column is name or longname
                            $.ajax("ajax/rename/renameSchool.php?oldName=" + state.old + "&newName=" + state.value).done(
                                function (ret) {
                                    if (ret == "done") {
                                        webix.message("Changes to " + editor.column + " saved.");
                                    } else if (ret == "taken") {
                                        var sel = THIS.getSelectedId();
                                        var row = THIS.getItem(sel.row);
                                        row.name = state.old;
                                        THIS.updateItem(sel.row, row);
                                        THIS.refresh();
                                        webix.message("Name already taken! Rename to something else.");
                                    } else {
                                        document.body.innerHTML = ret;
                                    }
                                }
                            );
                        }
                    },
                    onItemClick: function (id) {
                        let item = this.getItem(id);
                        window.selectedMapName = item.name;
                        $$("editMap").enable();
                        $$("export_server").enable();
                        $$("export_zip").enable();
                    },
                }
            },
            { height: 20 },
        ],
    },
};
let actionBar = {
    width: 150,
    rows: [
        {
            rows: [
                {},
                {
                    view: "button", label: "New",
                    on: {
                        onItemClick: function () {
                            let newName = window.prompt("Enter a name");
                            if (newName) {
                                new fake_post("php/process/newMap.php", {
                                    name: newName,
                                });
                            }
                        }
                    },
                },
                {},
                {
                    id: "editMap", view: "button", label: "Edit",
                    disabled: true, on: {
                        onItemClick: function () {
                            window.location.href = "edit_map.php?mapName=" + btoa(window.selectedMapName);
                        }
                    }
                },
                {},
                {
                    view: "button", label: "Rename", on: {
                        onItemClick: function () {
                            let newName = window.prompt("Enter a name");
                            if (selectedMapName && newName) {
                                new fake_post("php/process/renameMap.php", {
                                    oldName: selectedMapName,
                                    newName: newName,
                                });
                            }
                        }
                    },
                },
                {},
                {
                    view: "button", label: "Delete", css: "delete",
                    on: {
                        onItemClick: function () {
                            if (selectedMapName && window.confirm("You sure?")) {
                                new fake_post("php/process/deleteMap.php", {
                                    name: selectedMapName,
                                });
                            }
                        }
                    },
                },
                {},
            ]
        },
        {
            template: "<hr>",
            height: 26,
        },
        {
            rows: [
                {
                    rows: [
                        {
                            id: "export_server", view: "button", label: "View Server",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "read.php?engineCode=new&t=m&mn=" + window.selectedMapName
                                }
                            }
                        },

                        {
                            id: "export_server_prerequisite",
                            hidden: true,
                            view: "label",
                            align: "center",
                            label: "<i class='fa fa-warning' style='color:red'></i> - Create map first",
                        },
                        {
                            id: "export_server_outdated",
                            hidden: true,
                            view: "label",
                            align: "center",
                            label: "<i class='fa fa-warning'></i> - Outdated",
                        },
                    ]
                },
                { gravity: 0.2 },
                {
                    rows: [
                        {
                            id: "export_zip", view: "button", label: "Export for market",
                            disabled: false, on: {
                                onItemClick: function () {
                                    // ajax call to see if export exists
                                    /*
                                    var request = new XMLHttpRequest();
                                    request.open('GET', 'http://www.mozilla.org', true);
                                    request.onreadystatechange = function () {
                                        if (request.readyState === 4) {
                                            if (request.status === 404) {
                                                createMapDownloadForMarket({
                                                    done: function (url) {
                                                        window.location.href = url;
                                                    },
                                                    fail: function (message) {
                                                        webix.message("Error: " + message);
                                                    }
                                                });
                                            } else {
                                                when = Date.now();
                                                // Ask if you want old or new
                                                webix.modalbox({
                                                    title: "<h2>There is an existing export on the server</h2>",
                                                    buttons: ["Download old", "Re-export new"],
                                                    width: 500,
                                                    text: "Old zip exported: <b>" + when + "</b>",
                                                    callback:function(result){
                                                        webix.message(result);
                                                    }
                                                })
                                            }
                                        }
                                    };
                                    request.send();
                                    */
                                    $$("exportingNewMap").show();
                                    createMapDownloadForMarket({
                                        done: function (url) {
                                            $$("exportingNewMap").hide();
                                            window.location.href = url;
                                        },
                                        fail: function (message) {
                                            $$("exportingNewMap").hide();
                                            webix.message("Error: " + message);
                                        }
                                    });
                                }
                            }
                        },
                        {
                            id: "view_zip", hidden: true, view: "button", label: "Download Offline ZIP",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "map/" + window.selectedMapName + "/offline.zip";
                                }
                            }
                        },
                        {
                            id: "export_zip_prerequisite",
                            hidden: true,
                            view: "label",
                            align: "center",
                            // label: "<i class='fa fa-warning' style='color:red'></i> - Export/Update server first",
                            label: "<i class='fa fa-warning' style='color:red'></i> - Feature coming soon",
                        },
                        {
                            id: "export_zip_outdated",
                            hidden: true,
                            view: "label",
                            align: "center",
                            label: "<i class='fa fa-warning'></i> - Outdated",
                        },
                    ]
                },
                { gravity: 0.2 },
                {
                    rows: [
                        {
                            id: "export_apk", view: "button", label: "Export APK",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "export_map_apk.php?mapName=" + btoa(window.selectedMapName);
                                }
                            }
                        },
                        {
                            id: "view_apk", hidden: true, view: "button", label: "Download APK",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "map/" + window.selectedMapName + "/apk/development.apk";
                                }
                            }
                        },
                        {
                            id: "export_apk_prerequisite",
                            hidden: true,
                            view: "label",
                            align: "center",
                            // label: "<i class='fa fa-warning' style='color:red'></i> - Export/Update ZIP first",
                            label: "<i class='fa fa-warning' style='color:red'></i> - Feature coming soon",
                        },
                        {
                            id: "export_apk_outdated",
                            hidden: true,
                            view: "label",
                            align: "center",
                            label: "<i class='fa fa-warning'></i> - Outdated",
                        },
                    ]
                },
            ]
        }
    ]
}

function createMapDownloadForMarket(cbs) {
    $.ajax("ajax/download/prepMapDownload.php?type=market&mapName=" + window.selectedMapName).done(
        function (ret) {
            try {
                ret = JSON.parse(ret);
                if (ret.status === "success") {
                    cbs.done(ret.url)
                } else {
                    cbs.fail(ret.message);
                }
            } catch (err) {
                document.body.innerHTML = ret;
            }
        }
    );
}

$(document).ready(function () {
    webix.ui({
        view: "window",
        position: "center",
        id: "exportingNewMap",
        head: "Working on it",
        body: {
            rows: [
                {
                    view: "label",
                    align: "center",
                    label: "Process takes about 1sec per 6mb"
                },
                {
                    view: "label",
                    align: "center",
                    label: "(about 3 minutes for a gig)"
                },
                {
                    view: "label",
                    align: "center",
                    label: "Map will download automatically once ready"
                },
            ]
        }
    });
    /*
    webix.ui({
        view: "popup",
        id: "exportOldOrNew",
        height: 250,
        width: 300,
        body: {
            rows: [
                {
                    view: "template",
                    template: "<h2>There is an existing export on the server, last updated:<b>" + when + "</b></h2>"
                },
                {
                    view: "template",
                    template: "<p>Do you want to download the existing, or create a new one?</p>"
                },
                {
                    cols: [
                        {
                            view: "button", value: "Download old", on: {
                                onItemClick: function () {
                                    w_exportOldOrNew_popup.hide();
                                }
                            }
                        },
                        {
                            view: "button", value: "Create new", on: {
                                onItemClick: function () {
                                    createMapDownloadForMarket({
                                        done: function (url) {
                                            w_exportOldOrNew_popup.hide();
                                            window.location.href = url;
                                        },
                                        fail: function (message) {
                                            w_exportOldOrNew_popup.hide();
                                            webix.message("Error: " + message);
                                        }
                                    });
                                }
                            }
                        }
                    ]
                }
            ]
        }
    });
    */
    webix.ui({
        view: "scrollview",
        width: "100%",
        body: {
            type: "space",
            rows: [
                header,
                {
                    cols: [
                        selectMap,
                        actionBar
                    ]
                }
            ]
        }
    });


});