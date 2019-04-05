<?php

require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/html_fragment.php");

if (LOGGED_IN) {
    $frag = new Html_fragment("html/swap_app.html", [
        ["SERIES_NAME", base64_decode($_GET['series_name'])]
    ]);
    $frag->echoOut();
} else {
    header("Location: index.php");
}