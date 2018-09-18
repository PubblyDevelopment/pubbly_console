<?php

include('../includes/loginCheck.php');
if (loginCheck() === true) {
    $html = file_get_contents('html/variable_exports.html');
    echo $html;
} else {
    header("Location: login.php");
}
?>