<?php

function getProgram($programName) {
    return getPrograms($programName)[0];
}

function getPrograms($programName) {
    // execute at web root, todo redo whole php structure
    $ret = [];
    $returnType = isset($_GET['return']) ? $_GET['return'] : "datagrid";
    include_once('../includes/dbConnect.php');
    $con = new DBConnect();
    $sql = $con->mysqli;
    if ($programName === true) {
        $stmt = $sql->prepare("SELECT sch.ID AS programID, sch.outdated AS outdated, sch.name AS programName, count(unt.ID) AS unitCount from schools sch RIGHT JOIN units unt ON unt.schoolID = sch.ID WHERE 1 GROUP BY sch.ID");
    } else {
        $stmt = $sql->prepare("SELECT sch.ID AS programID, sch.outdated AS outdated, sch.name AS programName, count(unt.ID) AS unitCount from schools sch LEFT JOIN units unt ON unt.schoolID = sch.ID WHERE sch.name = ?");
        $stmt->bind_param("s", $programName);
    }
    $stmt->execute();
    if ($result = $stmt->get_result()) {
        if ($returnType == "richselect") {
            $firstRow = [];
            $firstRow['id'] = 1;
            $firstRow['dbid'] = 0;
            $firstRow['value'] = "-- Choose --";
            array_push($ret, $firstRow);
        }
        $r = 0;
        while ($row = $result->fetch_assoc()) {
            if ($returnType == "richselect") {
                $modRow = [];
                $modRow['id'] = $r + 2;
                $modRow['dbid'] = $row['ID'];
                $modRow['value'] = $row['name'];
                array_push($ret, $modRow);
            } else {
                array_push($ret, $row);
            }
            $r++;
        }

        $result->free();
        foreach ($ret as $i => $row) {
            $jsonLoc = "program/" . $row['programName'] . "/data.json";
            if (file_exists($jsonLoc) && $row['outdated'] == 0 && false) {
                $apkLoc = "program/" . $row['programName'] . "/exports/" . $row['programName'] . ".apk";
                if (file_exists($apkLoc)) {
                    $ret[$i]['modified'] = filemtime($apkLoc);
                    $ret[$i]['status'] = "exported";
                } else {
                    $ret[$i]['modified'] = filemtime($jsonLoc);
                    $ret[$i]['status'] = "created";
                }
            } else {
                $ret[$i]['modified'] = "new";
                $ret[$i]['status'] = "new";
            }
        }
        return $ret;
    } else {
        return "error: bad sql stmt";
    }
}

function getProgramUnits($programName) {
    // execute at web root, todo redo whole php structure
    $ret = [];
    $returnType = isset($_GET['return']) ? $_GET['return'] : "datagrid";
    include_once('../includes/dbConnect.php');
    $con = new DBConnect();
    $sql = $con->mysqli;
    $stmt = $sql->prepare('SELECT sch.name AS programName, CONCAT("schools/", sch.name, "/", sub.name, "/", lvl.name, "/", unt.name) AS bookLoc, unt.name AS unitName, unt.ID as unitID 
FROM units unt 
LEFT JOIN schools sch ON unt.schoolID = sch.ID
LEFT JOIN subjects sub ON unt.subjectID = sub.ID
LEFT JOIN levels lvl ON unt.levelID = lvl.ID
WHERE sch.name = ?');
    $stmt->bind_param("s", $programName);
    $stmt->execute();
    if ($result = $stmt->get_result()) {
        while ($row = $result->fetch_assoc()) {
	    array_push($ret, $row);
	}
	$result->free();
	return $ret;
    } else {
        return "error: bad sql stmt";
    }
}

?>