<?php

$programName = base64_decode($_POST['programName']);
$data = $_POST['json'];
$json = json_decode($data, true);
chdir("../../");

include('../includes/loginCheck.php');
if (loginCheck() === true && isset($programName) && isset($data)) {
    require("php/classes/program.php");
    require("php/classes/html_fragment.php");
    $program = new Program($programName);
    $program->directUpdateProgram($json);
    echo "done";
}
/*
  $data = $_POST['json'];
  $programName = base64_decode($_POST['programName']);
  $json = json_decode($data, true);

  chdir("../../");
  include("php/getprograms.php");
  $program = getProgram($programName);

  // Save to FS
  $jsonPretty = json_encode($json, JSON_PRETTY_PRINT);
  $loc = "program/$programName/data.json";
  file_put_contents($loc, $jsonPretty);

  // Save links by unit ID in db
  include_once("../includes/dbConnect.php");
  $con = new dbConnect();
  $sql = $con->mysqli;


  foreach ($json as $unit) {
  $fromID = $unit['unitID'];
  $links = $unit['links'];
  foreach ($links as $link) {
  $toName = $link['url'];
  if ($toName !== false) {
  $toID = $json[$toName]['unitID'];
  connectLinkDB($sql, $fromID, $toID, $program['programID']);
  }
  }
  }

  function connectLinkDB($sql, $fromID, $toID, $progID) {
  $sqlObj = $sql->prepare("SELECT connection_id FROM programlinkconnections WHERE fromUnitID = ? AND toUnitID = ? AND program_id = ?");
  $sqlObj->bind_param('sss', $fromID, $toID, $progID);
  $conID = false;
  $sqlObj->execute();
  $sqlObj->bind_result($conID);
  $sqlObj->fetch();
  $sqlObj = false;
  if ($conID) {
  $sqlObj = $sql->prepare("UPDATE `programlinkconnections` SET `fromUnitID`=?,`toUnitID`=?,`program_id`=? WHERE connection_id = ?");
  $sqlObj->bind_param('ssss', $fromID, $toID, $progID, $conID);
  $sqlObj->execute();
  } else {
  $sqlObj = $sql->prepare("INSERT INTO `programlinkconnections` (`fromUnitID`, `toUnitID`, `program_id`) VALUES (?, ?, ?)");
  $sqlObj->bind_param('sss', $fromID, $toID, $progID);
  $sqlObj->execute();
  }
  }
 */
?>