<?php

ini_set('max_execution_time', 900); // 15 minutes

chdir("../../");
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/sec_session.php");
require_once(WEB_ROOT . "/php/recursives.php");

if (LOGGED_IN && isset($_GET['mapName'])) {
    $mapName = $_GET['mapName'];
    $exportType = isset($_GET['type']) ? $_GET['type'] : "anywhere";

    $query = new Mysql_query();
    $entranceNodeName = $query->fetchSingle("SELECT mn.name FROM map mp LEFT JOIN map_node mn ON mp.map_id = mn.map_id WHERE mp.name = ? AND mn.is_entry = 1", ["s", $mapName]);
    if ($entranceNodeName) {
        // first remove any old exports
        $mapServerLoc = "map/$mapName";
        $mapExportLoc = "download/map/$mapName";
        $mapExportFile = "$mapExportLoc/$mapName-$exportType.zip";

        if (!is_dir($mapExportLoc)) {
            mkdir($mapExportLoc);
        }
        if (is_file("$mapExportFile")) {
            unlink("$mapExportFile");
        }

        function checkNode($loc)
        {
            if (
                file_exists("$loc/cover.png")
                && file_exists("$loc/MainXML.xml")
            ) {
                return true;
            } else {
                return false;
            }
        }
        $errorMessage = "";
        $files = scandir("$mapServerLoc");
        foreach ($files as $nodePath) {
            if ($nodePath !== "." && $nodePath !== ".." && is_dir("$mapServerLoc/$nodePath")) {
                if (checkNode("$mapServerLoc/$nodePath")) {
                    rcopy("$mapServerLoc" . "/" . "$nodePath", "$mapExportLoc" . "/" . "$nodePath");

                    if ($exportType === "market") {
                        $nodeFiles = scandir("$mapExportLoc/$nodePath");
                        foreach ($nodeFiles as $nodeFile) {
                            // Get rid of HTML, could interfere.
                            if (count(explode(".html", $nodeFile)) > 1) {
                                unlink("$mapExportLoc/$nodePath/$nodeFile");
                            }
                        }
                    } else if ($exportType === "anywhere") {
                        // Check for XML of JSON,
                        // Echo in server-build.html with XML or server-run.html with JSON
                    }
                } else {
                    $errorMessage .= "$nodePath is missing a cover, ";
                }
            }
        }
        if ($errorMessage === "") {
            file_put_contents("$mapExportLoc/entrance.txt", "$entranceNodeName");

            $rootPath = realpath($mapExportLoc);
            $zip = new ZipArchive();
            $zip->open($mapExportFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($rootPath),
                RecursiveIteratorIterator::LEAVES_ONLY
            );
            $noZip = array("index.php", "index.html");

            foreach ($files as $name => $file) {
                // Skip directories (they would be added automatically)
                if (!$file->isDir()) {
                    // Get real and relative path for current file
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($rootPath) + 1);

                    // Add current file to archive
                    if (!in_array($relativePath, $noZip)) {
                        $zip->addFile($filePath, $relativePath);
                    }
                }
            }
            // Zip archive will be created only after closing object
            $zip->close();
            echo '{"status":"success", "message": "Everything worked dawg", "url": "' . $mapExportFile . '"}';
        } else {
            echo '{"status":"error","message":"' . $errorMessage . '"}';
        }
    } else {
        echo '{"status":"error","message":"Map does not have an entrance!"}';
    }
} else {
    echo '{"status":"error","message":"Not logged in"}';
}
