<?php

// bad
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/html_fragment.php");

if (LOGGED_IN) {
    header("Location: index.php");
} else {
    $htmlFile = (ENVIRONMENT === "sandbox") ? "register_with_conditions" : "register";
    $errors = (isset($_GET['errors'])) ? $_GET['errors'] : "";
    
    $frag = new Html_fragment("html/$htmlFile.html", [
        ["ERROR_LIST", $errors],
    ]);

    $frag->echoOut();
}
?>