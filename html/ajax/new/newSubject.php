<?php
require_once("../../config.php");


chdir('../');
include('../../includes/dbConnect.php');
$schoolName = $_GET["schoolName"];
$subjectName = $_GET["subjectName"];
$con = new DBConnect();
$sql = $con->mysqli;

include('../php/checkSchoolNames.php');
$ret = checkNameTaken($schoolName, $subjectName, false, false);
if (isset($ret["subject"])) {
    echo "error: School name taken";
}   else    {
    $schoolID = $ret["school"];
    $sqlObj = $sql->prepare("INSERT INTO subjects (schoolID, name) VALUES (?, ?)");
    $sqlObj->bind_param('ss', $schoolID, $subjectName);
    $sqlObj->execute();
    $sqlPass = true;

    mkdir("../schools/$schoolName/$subjectName");
    echo "done";
}



?>