<?php

$programName = base64_decode($_GET['programName']);

include('../includes/loginCheck.php');
if (loginCheck() === true && isset($programName)) {
    require("php/classes/program.php");
    require("php/classes/html_fragment.php");
    $program = new Program($programName);
    if ($program->info['outdated']) {
        $program->indirectUpdateProgram();
    }
    $frag = new Html_fragment("html/edit_program.html", [
        ["PROGRAM_NAME", $program->info['name']],
        ["PROGRAM_JSON", $program->json],
        ["PROGRAM_ID", $program->info['id']],
    ]);
    $frag->echoOut();
} else {
    header("Location: login.php");
}
?>