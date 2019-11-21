<?php

require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");

if (LOGGED_IN) {
    require_once(CLASS_ROOT . "/html_fragment.php");

    $errors=["Couldn't create a new zip.",
             "Bad zip.",
             "Must be a zip file.",
             "Something went wrong with the upload."];

    $errorMsg = isset($_GET['err']) ? $errors[$_GET['err']] : '';

    $html = new Html_fragment("html/audio_upload_form.html", [
            ["HOMEPAGE_LOGO", "assets/logo.png"],
            ["ERROR", $errorMsg],
        ]);
    $html->echoOut();
} else {
    header("Location: index.php");
}