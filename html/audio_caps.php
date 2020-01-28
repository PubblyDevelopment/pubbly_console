<?php

require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");


require_once(CLASS_ROOT . "/html_fragment.php");

$errors=[
    1 => "Couldn't create a new zip.",
    2 => "Bad zip.",
    3 => "Must be a zip file.",
    4 => "Something went wrong with the upload."];

//$errorMsg = isset($_GET['err']) && $_GET['err'] < 4 && $_GET['err'] >= 0 ? $errors[$_GET['err']] : '';
$err = isset($_GET['err']) ? $_GET['err'] : false;

$errorMsg = isset($errors[$err]) ? $errors[$err] : '';

$html = new Html_fragment("html/audio_upload_form.html", [
        ["HOMEPAGE_LOGO", "assets/logo.png"],
        ["ERROR", $errorMsg],
    ]);
$html->echoOut();
