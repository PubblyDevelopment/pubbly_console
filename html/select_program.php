<?php

// $programName = base64_decode($_GET['program_name']);
//  && isset($programName)
include('../includes/loginCheck.php');
if (loginCheck() === true) {
    $html = file_get_contents('html/select_program.html');
    // $html = "<script>window.programName = '$programName';</script>" . $html;
    echo $html;
} else {
    header("Location: login.php");
}
?>