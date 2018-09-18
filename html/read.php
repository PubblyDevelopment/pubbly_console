<?php

$types = [
    "b" => "book",
    "p" => "parent",
    "c" => "child",
    "u" => "unit",
    "t" => "tutorial"
];
$type = $types[$_GET['t']];
require_once("engine/latest.php");
$engineCode = (isset($_GET['engineCode']) && $_GET['engineCode'] == "new") ? $latestEngineRelease : "old";


$postSpecs = [
    "type" => $type,
    "engineCode" => $engineCode
];

if ($type == "book") {
    $id = $_GET['id'];
    $xmlName = "MainXML.xml";
    $loc = "books/$id";
    $postSpecs['id'] = $id;
    $jsonName = "Main";
} else if ($type == "child") {
    $seriesName = base64_decode($_GET['sn']);
    $childName = base64_decode($_GET['cn']);
    $loc = "series/$seriesName";
    $xmlName = "$childName.xml";
    $postSpecs['childName'] = $childName;
    $postSpecs['seriesName'] = $seriesName;
    $jsonName = $childName;
} else if ($type == "unit") {
    // url = "read.php?t=u&sc=" + btoa(schoolName) + "&su=" + btoa(subjectName) + "&l=" + btoa(levelName) + "&u=" + btoa(unitName);
    $school = base64_decode($_GET['sc']);
    $subject = base64_decode($_GET['su']);
    $level = base64_decode($_GET['l']);
    $unit = base64_decode($_GET['u']);

    $loc = "schools/$school/$subject/$level/$unit";
    $xmlName = "MainXML.xml";
    $postSpecs['schoolName'] = $school;
    $postSpecs['subjectName'] = $subject;
    $postSpecs['levelName'] = $level;
    $postSpecs['unitName'] = $unit;
    $jsonName = "Main";
} else if ($type == "tutorial") {
    // url = "read.php?t=u&sc=" + btoa(schoolName) + "&su=" + btoa(subjectName) + "&l=" + btoa(levelName) + "&u=" + btoa(unitName);
    $school = base64_decode($_GET['sc']);
    $unit = base64_decode($_GET['u']);

    $loc = "schools/$school/tutorials/$unit";
    $xmlName = "MainXML.xml";
    $postSpecs['schoolName'] = $school;
    $postSpecs['unitName'] = $unit;
    $jsonName = "Main";
}
require_once("php/site_error/_master.php");
require_once("php/html_fragments_by_known_types/engine.php");
$htmlFileName = ($type == "child") ? "$childName.html" : "index.html";

// Old garbage engine again
if ($engineCode == "old") {
    if (!file_exists("$loc/$htmlFileName")) {
        $oldHTML = file_get_contents("engine/old/index.html");
        $dots = ($type == "unit") ? "../../../../../" : "../../";

        $frag = new Engine("old", [
            ["XML_NAME", $xmlName],
            ["DOTS", $dots],
        ]);
        file_put_contents("$loc/$htmlFileName", $frag->html);
    }
    header("location: $loc/$htmlFileName");
} else {
    $jsonLoc = "$loc/$jsonName.$engineCode.json";
    $jsonUpdated = (file_exists("$jsonLoc")) ? filemtime("$jsonLoc") : 0;
    $xmlUpdated = (file_exists("$loc/$xmlName")) ? filemtime("$loc/$xmlName") : 0;
    if ($jsonUpdated <= $xmlUpdated) {
        new Engine("$engineCode-build", [
            ["BUILD_POST_SPECS", json_encode($postSpecs)],
            ["BUILD_POST_LOC", "build.php"],
            ["BOOK_LOC", "$loc"],
            ["XML_NAME", "$xmlName"],
        ]);
    } else {
        new Engine("$engineCode-run", [
            ["PUBBLY_JSON", file_get_contents("$jsonLoc")]
        ]);
    }
}

?>