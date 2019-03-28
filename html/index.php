<?php

// Better
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");

if (LOGGED_IN) {
    require_once(CLASS_ROOT . "/html_fragment.php");
    $logo = (ENVIRONMENT === "fastrackids") ? "fastracKids.png" : "logo.png";


    // $header = new Html_fragment("html/header_default.html");
    $html = new Html_fragment("html/index.html", [
        ["HOMEPAGE_LOGO", "assets/$logo"]
    ]);
    $html->echoOut();
} else {
    header("Location: login.php");
}