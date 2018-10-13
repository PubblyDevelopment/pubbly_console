<?php

$postSpecs = json_decode($_POST['buildPostSpecs'], true);
$data = base64_decode($_POST['data']);

if ($postSpecs['type'] == "book") {
    $bookLoc = "books/" . $postSpecs['id'];
    $jsonName = "Main";
} else if ($postSpecs['type'] == "child") {
    $bookLoc = "series/" . $postSpecs['seriesName'];
    $jsonName = $postSpecs['childName'];
} else if ($postSpecs['type'] == "parent") {
    // $bookLoc = "books/" . $postSpecs['id'];
} else if ($postSpecs['type'] == "unit") {
    $school = $postSpecs['schoolName'];
    $subject = $postSpecs['subjectName'];
    $level = $postSpecs['levelName'];
    $unit = $postSpecs['unitName'];

    $bookLoc = "schools/$school/$subject/$level/$unit";
    $jsonName = "Main";
} else if ($postSpecs['type'] == "tutorial") {
    $school = $postSpecs['schoolName'];
    $unit = $postSpecs['unitName'];

    $bookLoc = "schools/$school/tutorials/$unit";
    $jsonName = "Main";
} else if ($postSpecs['type'] == "programUnit") {
    $programName = $postSpecs['programName'];
    $unitLoc = $postSpecs['unitLoc'];
    $bookLoc = "program/$programName/web/$unitLoc";
    $jsonName = "Main";
}
if ($bookLoc) {
    $engineCode = $postSpecs['engineCode'];
    $bookData = json_decode($data);
    $prettyBookData = json_encode($bookData, JSON_PRETTY_PRINT);
    file_put_contents("$bookLoc/$jsonName.$engineCode.json", $prettyBookData);
    $jsonModified = filemtime("$bookLoc/$jsonName.$engineCode.json") . "000"; // JS and PHP stamp difs
    file_put_contents("$bookLoc/$jsonName.$engineCode.json.modified", $jsonModified);
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = "Not authorized to write book JSON. Authors can only build one draft at a time.";
}

header('Content-type: application/json');
echo json_encode($response);
?>