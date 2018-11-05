<?php

require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(WEB_ROOT . "/php/main.php");

if (LOGGED_IN) {
    header("Location: index.php");
} else {
    $html = file_get_contents('html/login.html');
    echo $html;
}