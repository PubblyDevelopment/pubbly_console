<?php

chdir('../../');
$ret = [];
$returnType = isset($_GET['return']) ? $_GET['return'] : "datagrid";
require("php/getprograms.php");
$ret = getPrograms(true);
echo json_encode($ret);
?>