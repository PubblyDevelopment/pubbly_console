<?php
require_once("../../config.php");

$unit = $_GET['unitName'];
$level = isset($_GET['levelName']) ? $_GET['levelName'] : false;
$subject = isset($_GET['subjectName']) ? $_GET['subjectName'] : false;
$isTutorial = isset($_GET['isTutorial']) ? $_GET['isTutorial'] : false;
$school = $_GET['schoolName'];
chdir('../../');
if ($isTutorial) {
    $xmlLoc = "schools/$school/tutorials/$unit/MainXML.xml";
} else {
    $xmlLoc = "schools/$school/$subject/$level/$unit/MainXML.xml";
}
if (file_exists($xmlLoc)) {
    $xml = simplexml_load_file($xmlLoc);
    $info = ["TimeToInterrupt", "PrjNameLong", "ReturnPageToPreviousStateOnInterruptions", "DisallowPageNavigation"];
    $ret = array();
    for ($i = 0; $i < count($info); $i++) {
        $prop = $info[$i];
        $ret[$prop] = (string) $xml->Info->$prop;
    }

    echo json_encode($ret);
}
?>