<?php

require("config.php");
require(CLASS_ROOT . "/html_fragment.php");
$errors = (isset($_GET['errors'])) ? $_GET['errors'] : "";
$frag = new Html_fragment("html/register.html", [
    ["ERROR_LIST", $errors],
        ]);
$frag->echoOut();
?>