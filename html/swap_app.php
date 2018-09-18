<?php

$seriesName = base64_decode($_GET['series_name']);

include('../includes/loginCheck.php');
if (loginCheck() === true && isset($seriesName)) {
    $html = file_get_contents('html/swap_app.html');
    $html = "<script>window.seriesName = '$seriesName';</script>" . $html;
    echo $html;
} else {
    header("Location: login.php");
}
?>