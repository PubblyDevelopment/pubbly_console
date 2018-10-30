<?php

/**
 * Created by PhpStorm.
 * User: Jason
 * Date: 9/23/2016
 * Time: 3:10 PM
 */
chdir('../');
$id = $_GET['bookID'];
$folderName = $_GET['folderName'];

include_once("../../includes/loginCheck.php");
if (loginCheck()) {
    $con = new DBConnect();
    $sql = $con->mysqli;
    $sqlObj = $sql->prepare("UPDATE books SET `folder` = ? WHERE ID = ?");
    $sqlObj->bind_param('ss', $folderName, $id);
    $sqlObj->execute();
    echo "done";
}
?>