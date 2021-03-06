<?php
require("config.php");
$types = [
    "b" => "book",
    "p" => "parent",
    "c" => "child",
    "u" => "unit",
    "t" => "tutorial",
    "m" => "map",
];
$type = $types[$_GET['t']];

$release = 2;

// CDN:
//$pathToEngine = "http://cdn.pubbly.com/pubbly_engine/releases/$release/";

// Local, for testing
$pathToEngine = "pubbly_engine/";
$version = rtrim(file_get_contents("$pathToEngine/version.txt"));
$forceDebug = isset($_GET['fb']) ? $_GET['fb'] : false;

$postSpecs = [
    "type" => $type,
    "engineCode" => $version,
];
$seriesName = "";
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
} else if ($type == "map") {
    $mapName = $_GET['mn'];
    $nodeName = false;

    if (isset($_GET['nn'])) {
        $nodeName = $_GET['nn'];
        $loc = "map/$mapName/$nodeName";
    } else {
        $entryPointLoc = "map/$mapName/entryPoint.php";
        if (file_exists($entryPointLoc)) {
            require("map/$mapName/entryPoint.php");
            $nodeName = $entryPoint;
            $loc = "map/$mapName/$entryPoint";
        }
    }

    if (isset($loc)) {
        $xmlName = "MainXML.xml";
        $postSpecs['mapName'] = $mapName;
        $postSpecs['nodeName'] = $nodeName;
        $jsonName = "Main";
    } else {
        echo "Error: No entry point specified for map... Cannot view";
    }
}
if (isset($loc)) {
    require_once("php/classes/site_error.php");
    require_once("php/classes/html_fragment.php");
    $htmlFileName = ($type == "child") ? "$childName.html" : "index.html";

    // Old garbage engine again
    
        $jsonLoc = "$loc/$jsonName.$version.json";
        $jsonUpdated = (file_exists("$jsonLoc")) ? filemtime("$jsonLoc") : 0;
        $xmlUpdated = (file_exists("$loc/$xmlName")) ? filemtime("$loc/$xmlName") : 0;
        // $engineUpdated = stat("pubbly_engine/")['mtime'];
        if (
            $jsonUpdated <= $xmlUpdated // JSON outdated from XML
            // || $jsonUpdated <= $engineUpdated // JSON outdated from build process
            || $forceDebug // Lazy JASON
        ) {
            echo "<!-- $jsonLoc -->";
            $frag = new Html_fragment("$pathToEngine/html/server-build.html", [
                ["PATH_TO_ENGINE", "$pathToEngine"],
                ["ENGINE", "$version"],
                ["START_PAGE", 0],
                ["BUILD_POST_SPECS", json_encode($postSpecs)],
                ["BUILD_POST_LOC", "build.php"],
                ["PATH_TO_BOOK", "$loc/"],
                ["XML_NAME", "$xmlName"],
                ["ENVIRONMENT", "console"]
            ]);
            $frag->echoOut();
        } else {
            $frag = new Html_fragment("$pathToEngine/html/server-run.html", [
                ["PATH_TO_ENGINE", "$pathToEngine"],
                ["ENGINE", "$version"],
                ["START_PAGE", 0],
                ["JSON_LOC", $jsonLoc],
                ["PUBBLY_JSON", file_get_contents("$jsonLoc")],
                ["ENVIRONMENT", "console"]
            ]);
            $frag->echoOut();
        }
}
