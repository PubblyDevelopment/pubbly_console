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
                    {id: "programID", header: "ID", width: 50, editor: false},
                    {id: "programName", header: "Name", width: 200, editor: "text", },
                    {id: "unitCount", header: "Unit count", width: 100, editor: false, },
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
                        window.selectedProgramName = item.programName;

                        $$("viewWeb").enable();
                        $$("editProgram").enable();
                    },
                }
            },
            {height: 20},
        ],
    },
};
let actionBar = {
    cols: [
        {},
        {id: "editProgram", view: "button", label: "Edit",
            disabled: true, on: {
                onItemClick: function () {
                    window.location.href = "edit_program.php?programName=" + btoa(window.selectedProgramName);
                }
            }
        },
        {},

        {id: "viewWeb", view: "button", label: "View Web",
            disabled: true, on: {
                onItemClick: function () {
                    window.location.href = "view_program.php?programName=" + btoa(window.selectedProgramName);
                }
            }},
        {},
        {id: "viewAPK", view: "button", label: "Create APK",
            disabled: true, on: {
                onItemClick: function () {
                    window.location.href = "export_program.php?programName=" + btoa(window.selectedProgramName);
                }
            }},
        {},
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