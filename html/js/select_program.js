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
            template: "<p class='toolbarCenterLabel'>Select Program</p>"
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
let selectProgram = {
    header: "Select Program",
    id: "selectProgram",
    collapsed: false,
    body: {
        rows: [
            {
                id: "programList",
                view: "datatable",
                select: "multiselect",
                width: "100%",
                autoheight: true,
                editable: true,
                scroll: false,
                columns: [
                    {id: "id", header: "ID", width: 50, editor: false},
                    {id: "name", header: "Name", width: 200, editor: "text", },
                    {id: "unit_count", header: "Unit count", width: 100, editor: false, },
                    {id: "status", header: "Status", width: 100, editor: false},
                    {id: "modified", header: "Modified", width: 100, editor: false},
                ],
                url: "ajax/get/getPrograms.php",
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
                        window.selectedProgramName = item.name;
                        $$("editProgram").enable();
                        item.status = "";

                        for (let exportType in item.export_statuses) {
                            if ($$("export_" + exportType)) {
                                let stat = item.export_statuses[exportType];
                                if (stat == "new") {
                                    $$("export_" + exportType).show();
                                    $$("export_" + exportType).disable();
                                    $$("view_" + exportType).hide();
                                    $$("view_" + exportType).disable();
                                    $$("export_" + exportType + "_prerequisite").show();
                                    $$("export_" + exportType + "_outdated").hide();
                                } else if (stat == "outdated") {
                                    $$("export_" + exportType).show();
                                    $$("export_" + exportType).enable();
                                    $$("view_" + exportType).hide();
                                    $$("view_" + exportType).disable();
                                    $$("export_" + exportType + "_prerequisite").hide();
                                    $$("export_" + exportType + "_outdated").show();
                                } else if (stat == "ready") {
                                    $$("export_" + exportType).hide();
                                    $$("export_" + exportType).disable();
                                    $$("view_" + exportType).show();
                                    $$("view_" + exportType).enable();
                                    $$("export_" + exportType + "_prerequisite").hide();
                                    $$("export_" + exportType + "_outdated").hide();
                                }
                            }
                        }
                    },
                }
            },
            {height: 20},
        ],
    },
};
let actionBar = {
    rows: [
        {
            cols: [
                {gravity: 0.5},
                {id: "editProgram", view: "button", label: "Edit program (NavNodeUI)",
                    disabled: true, on: {
                        onItemClick: function () {
                            window.location.href = "edit_program.php?programName=" + btoa(window.selectedProgramName);
                        }
                    }
                },
                {gravity: 0.5},
            ]
        },
        {
            height: 5, template: "<hr>",
        },
        {
            cols: [
                {
                    rows: [
                        {id: "export_server", view: "button", label: "Export Server",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "export_program_server.php?programName=" + btoa(window.selectedProgramName);
                                }
                            }
                        },
                        {id: "view_server", hidden: true, view: "button", label: "View Server",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "read.php?t=pg&pn=" + btoa(window.selectedProgramName);
                                }
                            }
                        },
                        {
                            id: "export_server_prerequisite",
                            hidden: true,
                            view: "label",
                            align: "center",
                            label: "<i class='fa fa-warning' style='color:red'></i> - Create program first",
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

                {gravity: 0.2},
                {
                    rows: [
                        {id: "export_zip", view: "button", label: "Exprt Offline ZIP",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "export_program_offline.php?programName=" + btoa(window.selectedProgramName);
                                }
                            }
                        },
                        {id: "view_zip", hidden: true, view: "button", label: "Download Offline ZIP",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "program/" + window.selectedProgramName + "/offline.zip";
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

                {gravity: 0.2},
                {
                    rows: [
                        {id: "export_apk", view: "button", label: "Export APK",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "export_program_apk.php?programName=" + btoa(window.selectedProgramName);
                                }
                            }
                        },
                        {id: "view_apk", hidden: true, view: "button", label: "Download APK",
                            disabled: true, on: {
                                onItemClick: function () {
                                    window.location.href = "program/" + window.selectedProgramName + "/apk/development.apk";
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
$(document).ready(function () {
    webix.ui({
        view: "scrollview",
        width: "100%",
        body: {
            type: "space",
            rows: [
                header,
                selectProgram,
                actionBar
            ]
        }
    });
});