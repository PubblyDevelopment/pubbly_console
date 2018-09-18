window.selectedBook = false, window.selectedBookID = false, window.newBookTimeout = false;


var header = {
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
            template: "<p class='toolbarCenterLabel'>Static Exports</p>"
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

var newBook = {
    header: "New Export",
    id: "newBookCont",
    collapsed: true,
    body: {
        rows: [
            {
                id: "createTab",
                header: "New Book",
                cols: [
                    {gravity: 1},
                    {
                        gravity: 5,
                        maxWidth: 400,
                        autoheight: true,
                        rows: [
                            {height: 10, },
                            {
                                header: "Step 1", collapsed: false, body: {
                                    view: "form",
                                    gravity: 1,
                                    elements: [
                                        {
                                            view: "text", label: "Name: ", id: "newBookName", labelWidth: 150, on: {
                                                onTimedKeyPress: function () {
                                                    var requestName = $$("newBookName").getValue();
                                                    if (requestName) {
                                                        if (newBookTimeout) {
                                                            window.clearTimeout(newBookTimeout);
                                                        }
                                                        $$("newBook").disable();
                                                        $$("newBook").setValue("Checking...");
                                                        $$("newBook").refresh();
                                                        window.newBookTimeout = window.setTimeout(function () {
                                                            var jqxhr = $.ajax("ajax/check/checkBookName.php?name=" + requestName)
                                                                    .done(function (ret) {
                                                                        if (ret == "") {
                                                                            $$("newBook").enable();
                                                                            $$("newBook").setValue("Create");
                                                                            $$("newBook").refresh();
                                                                        } else {
                                                                            $$("newBook").disable();
                                                                            $$("newBook").setValue("Name taken");
                                                                            $$("newBook").refresh();
                                                                        }
                                                                    })
                                                                    .fail(function () {
                                                                        alert("error");
                                                                    })
                                                        }, 500);
                                                    } else {
                                                        $$("newBook").disable();
                                                        $$("newBook").setValue("Enter a name");
                                                        $$("newBook").refresh();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            view: "button", id: "newBook", value: "Enter a name", disabled: true, on: {
                                                onItemClick: function () {
                                                    $$("newBookName").disable();
                                                    $$(this).disable();
                                                    $$(this).setValue("Please wait...");
                                                    $$(this).refresh();
                                                    var requestName = $$("newBookName").getValue();
                                                    if (requestName) {
                                                        // Check one last time, just to be safe and stuff and things and
                                                        $.ajax("ajax/check/checkBookName.php?name=" + requestName).done(function (ret) {
                                                            if (ret == "") {
                                                                $.ajax("ajax/new/newBook.php?name=" + requestName).done(function (ret) {
                                                                    if (ret == "true" || ret == 1) {
                                                                        window.newBookName = requestName;
                                                                        $$('uploadBookCont').enable();
                                                                        $$('uploadBookCont').expand();
                                                                        $$("newBook").disable();
                                                                        $$("newBook").setValue("Upload book");
                                                                        $$("newBook").refresh();
                                                                        $$('uploadBookCont').enable();
                                                                        $$('uploadBookCont').expand();
                                                                        $$('uploadBook').enable();
                                                                        $$('uploadBook').data.upload = "ajax/upload/uploadBook.php?bookName=" + requestName;
                                                                    } else {
                                                                        console.error(ret);
                                                                    }
                                                                });
                                                            } else {
                                                                $$("newBook").disable();
                                                                $$("newBook").setValue("Name taken");
                                                                $$("newBook").refresh();
                                                                $$("newBookName").enable();
                                                            }
                                                        });
                                                    } else {
                                                        $$(this).enable();
                                                        $$(this).setValue("Enter a name");
                                                        $$("newBookName").enable();
                                                    }
                                                }
                                            }
                                        },
                                    ]
                                },
                            },
                            {
                                header: "Step 2",
                                id: "uploadBookCont",
                                height: 260,
                                disabled: true,
                                collapsed: true,
                                body: {
                                    view: "form",
                                    rows: [
                                        {
                                            view: "uploader",
                                            id: "uploadBook",
                                            disabled: true,
                                            view: "uploader",
                                            width: 200,
                                            value: "Upload zip",
                                            upload: "ajax/upload/uploadBook.php",
                                            on: {
                                                onUploadComplete: function () {
                                                    webix.message("Upload complete!");
                                                    window.location.href = window.location.href;
                                                }
                                            },
                                        },
                                        {
                                            view: "list", id: "mylist", type: "uploader", autoheight: true, borderless: true,
                                        },
                                    ]
                                }
                            },
                            {height: 10, },
                        ]
                    },
                    {gravity: 1},
                ],
            },
        ]
    }
};

var selectBook = {
    header: "Select Export",
    id: "selectBook",
    collapsed: false,
    body: {
        rows: [
            {
                id: "bookList",
                view: "datatable",
                select: "multiselect",
                width: "100%",
                autoheight: true,
                editable: true,
                scroll: false,
                columns: [
                    {id: "ID", header: "", width: 50, },
                    {id: "name", header: "Name", width: 200, editor: "text", },
                    {id: "pages", header: "Pages", width: 100, editor: false, },
                    {id: "longname", header: "Long Name", fillspace: true, editor: "text", },
                ],
                url: "ajax/get/getBooks.php",
                on: {
                    onItemClick: function (id) {
                        var unitName = this.getItem(id).name;
                        window.selectedBook = unitName;
                        window.selectedBookID = this.getItem(id).ID;
                        $$("deleteBook").enable();
                        $$("viewBookOld").enable();
                        $$("viewBookNew").enable();
                        $$("reuploadBook").enable();
                        $$('reuploadBook').data.upload = "ajax/upload/uploadBook.php?bookName=" + window.selectedBook;
                        $$("downloadBook").enable();


                    },
                    onAfterEditStop: function (state, editor) {
                        var THIS = this;
                        if (state.value != state.old) {
                            // editor.column is name or longname
                            $.ajax("ajax/rename/renameBook.php?" + editor.column + "=" + state.value + "&id=" + window.selectedBookID + "&oldname=" + state.old).done(
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
                    }
                }
            },
            {height: 20},
            {
                cols: [
                    {},
                    {
                        value: "New", view: "button", on: {
                            onItemClick: function () {
                                $$("newBookCont").expand();
                                $$("selectBook").collapse();
                            }
                        }
                    },
                    {},

                    {value: "View old", id: "viewBookOld", view: "button", disabled: true, on: {onItemClick: function () {
                                window.location.href = "read.php?t=b&id=" + window.selectedBookID;
                            }
                        }
                    },
                    {value: "View new", id: "viewBookNew", view: "button", disabled: true, on: {onItemClick: function () {
                                window.location.href = "read.php?engineCode=new&t=b&id=" + window.selectedBookID;
                            }
                        }
                    },

                    {},
                    {
                        view: "button",
                        id: "downloadBook",
                        disabled: true,
                        width: 150,
                        value: "Download",
                        on: {
                            onItemClick: function () {
                                var url = "ajax/download/prepBookDownload.php?id=" + selectedBookID + "&name=" + window.selectedBook;
                                $$("downloadBook").setValue("Preparing download");
                                $$("downloadBook").disable();
                                $$("downloadBook").refresh();
                                $.ajax(url)
                                        .done(function (ret) {
                                            $$("downloadBook").setValue("Done!");
                                            $$("downloadBook").refresh();
                                            if (ret == "done") {
                                                window.location.href = window.selectedBookID + "/" + window.selectedBook + ".zip";
                                            } else {
                                                console.log(ret);
                                            }
                                            window.setTimeout(function () {
                                                $$("downloadBook").setValue("Download");
                                                $$("downloadBook").enable();
                                                $$("downloadBook").refresh();
                                            }, 500)

                                        })
                                        .fail(function () {
                                            webix.message("error: Bad ajax call");
                                        })
                            }
                        },
                    },
                    {},
                    {
                        view: "uploader",
                        id: "reuploadBook",
                        disabled: true,
                        view: "uploader",
                        width: 150,
                        value: "Reupload",
                        upload: "ajax/upload/uploadBook.php",
                        on: {
                            onUploadComplete: function () {
                                webix.message("Upload complete!");
                                window.location.href = window.location.href;
                            }
                        },
                    },
                    {},
                    {
                        value: "Delete", id: "deleteBook", view: "button", css: "delete", disabled: true, on: {
                            onItemClick: function () {
                                var url = "ajax/delete/deleteBook.php?bookName=" + window.selectedBook;
                                deletePrompt(window.selectedBook, "export", url, false)
                            }
                        }
                    },
                    {},
                ],
            },
            {height: 20},
        ],
    },
};

$(document).ready(function () {
    webix.ui({
        view: "scrollview",
        width: "100%",
        body: {
            type: "space",
            rows: [
                header,
                selectBook,
                newBook,
            ]
        }
    });
})
