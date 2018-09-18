$(document).ready(function () {
    webix.ui({
        view: "scrollview",
        width: "100%",
        height: "100%",
        css: "whiteBG",
        body: {
            type: "space",
            rows: [
                {cols: [
                        {},
                        {width: 200, height: 200,
                            rows: [
                                {template: "<img id=logo src='assets/logo.png'/>"},
                            ]
                        },
                        {},
                        {height: 200, width: 200},
                        {},
                        {height: 200, width: 200},
                        {},
                        {height: 200, width: 100},
                        {width: 100, rows: [
                                {view: "label", label: "L O G O U T", css: "hoverHand",
                                    on: {
                                        onItemClick: function () {
                                            window.location.href = "logout.php";
                                        }},
                                },
                                {},
                            ]},
                        {},
                    ],
                },
                {},
                {cols: [
                        {},
                        {view: "button", value: "PROGRAMS", height: 200, width: 200, css: "greyBtn",
                            on: {
                                onItemClick: function () {
                                    webix.message("Unavailable.");
                                    // window.location.href="schools/deploy.php";
                                },
                            }
                        },
                        {},
                        {view: "button", value: "STITCH APP", height: 200, width: 200, css: "greyBtn",
                            on: {
                                onItemClick: function () {
                                    window.location.href = "select_unit.php";
                                },
                            }
                        },
                        {},
                        {view: "button", value: "VARIABLE EXPORTS", height: 200, width: 200, css: "greyBtn",
                            on: {
                                onItemClick: function () {
                                    window.location.href = "variable_exports.php";
                                },
                            }
                        },
                        {},
                        {view: "button", value: "STATIC EXPORTS", height: 200, width: 200, css: "greyBtn",
                            on: {
                                onItemClick: function () {
                                    window.location.href = "static_exports.php";
                                },
                            }
                        },
                        {},
                    ],
                },
                {cols: [
                        {},
                        {width: 200},
                        {},
                        {width: 200},
                        {},
                        {width: 200},
                        {},
                        {
                            cols: [
                                {template: "<img style='position:absolute;height:48;width:200' src='assets/powered_by_pubbly.png' />", "width": 200, },
                            ]
                        },
                        {},
                    ]},
                {},
            ]
        },
    });
})