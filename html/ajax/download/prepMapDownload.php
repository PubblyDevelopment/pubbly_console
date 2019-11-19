<?php

ini_set('max_execution_time', 900); // 15 minutes

chdir("../../");
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/sec_session.php");
require_once(CLASS_ROOT . "/html_fragment.php");

require_once(WEB_ROOT . "/php/recursives.php");


if (LOGGED_IN && isset($_GET['mapName'])) {
    $mapName = $_GET['mapName'];
    $exportType = isset($_GET['type']) ? $_GET['type'] : "local";

    $query = new Mysql_query();
    $entranceNodeName = $query->fetchSingle("SELECT mn.name FROM map mp LEFT JOIN map_node mn ON mp.map_id = mn.map_id WHERE mp.name = ? AND mn.is_entry = 1", ["s", $mapName]);
    if ($entranceNodeName) {
        //echo $entranceNodeName;
        // first remove any old exports
        $mapServerLoc = "map/$mapName";
        $mapExportLoc = "download/map/$mapName";
        $mapExportFile = "$mapExportLoc/$mapName-$exportType.zip";

        rrmdir($mapExportLoc);
        mkdir($mapExportLoc);

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
                    } else if ($exportType === "local") {
                        // Get correct server run file from the CDN...
                        // $runIndexLoc = "http://cdn.pubbly.com/pubbly_engine/releases/2/html/server-run.html";
			$runIndexLoc = "http://cdn.pubbly.com/pubbly_engine/releases/2/html/offline-run.html";

                        if (file_exists("$mapExportLoc/$nodePath/Main.2.0.0.json")) {
                            // Get JSON string of file
                            $jsonStr = file_get_contents("$mapExportLoc/$nodePath/Main.2.0.0.json");
                            
                            // Explode the map path to get the map name
                            $explodedMapName = explode('/', $mapExportLoc);
                            $mapName = end($explodedMapName);
                            
                            // Replace all map\/[mapName]\/ with an empty string
                            $cleanedUpJson = str_replace('map\/' . $mapName . '\/', '', $jsonStr);

                            // Stupid dang post vars don't work on local :/
                            // $cleanedUpJson = preg_replace('~"\?engineCode.*nn=(.*)"~', '"/${1}.html"', $cleanedUpJson);
                            
                            $frag = new Html_fragment($runIndexLoc, [
                                ["PATH_TO_ENGINE", "engine/"],
                                ["ENGINE", "latest"],
                                ["START_PAGE", 0],
                                ["PATH_TO_BOOK", "$nodePath"],
                                ["PUBBLY_JSON", $cleanedUpJson],
                            ]);
                            $frag->printOut("$mapExportLoc/$nodePath.html");
                        }
                        else {
                            $errorMessage .= "Bad JSON somewhere. Have you opened all the Pubblys?, ";
                            echo '{"status":"error","message":"' . $errorMessage . '"}';
                            break;
                        }
                    }
                } else {
                    $errorMessage .= "$nodePath is missing a cover, ";
                }
            }
        }
        if ($errorMessage === "") {
            if ($exportType === "market") {
                file_put_contents("$mapExportLoc/entrance.txt", "$entranceNodeName");
                file_put_contents("$mapExportLoc/name.txt", "$mapName");
            } else if ($exportType === "local") {
                $entranceHTML = "<html><head><script>window.location.href = '" .
                    $entranceNodeName . ".html';</script></head></html>";
                file_put_contents("$mapExportLoc/index.html", $entranceHTML);
            };

            $rootPath = realpath($mapExportLoc);
            $zip = new ZipArchive();
            $zip->open($mapExportFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($rootPath),
                RecursiveIteratorIterator::LEAVES_ONLY
            );
            foreach ($files as $name => $file) {
                //echo $file;
                // Skip directories (they would be added automatically)
                if (!$file->isDir()) {
                    // Get real and relative path for current file
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($rootPath) + 1);
                    $exp = explode(".", $relativePath);
                    $relativeExt = array_pop($exp);
                    if (
                        // WHY DID YOU SKIP THIS JASON
                        //$relativePath == "index.html" ||
                        $relativePath == "index.php" ||
                        $relativeExt === "json" ||
                        $relativeExt === "modified"
                    ) {
                        // Skipping those.
                    } else {
                        $zip->addFile($filePath, $relativePath);
                    }
                }
            }
            if ($exportType === "local") {
                $rootPath = realpath("pubbly_engine");
                
                $file = "http://cdn.pubbly.com/downloads/engine.zip";
                $newFile = "./temp/engine.zip";
                $newFileUnzippedLoc = "./temp/engine";
                copy($file, $newFile);

                $innerZip = new ZipArchive(); // LOL I HATE THIS

                if ($innerZip->open($newFile) === TRUE) {
                    $innerZip->extractTo($newFileUnzippedLoc);
                    $innerZip->close();
                }
                else {
                    echo "dunno";
                }

                // I H A TE THIS TOO
                $files = new RecursiveIteratorIterator(
                    new RecursiveDirectoryIterator($newFileUnzippedLoc),
                    RecursiveIteratorIterator::LEAVES_ONLY
                );

                foreach ($files as $file) {
                    $splitFilename = explode("/", $file);
                    $subString = $splitFilename[3];
                  
                    //echo "currfile: " . $file;
                    //echo "<br>";
                    $newFile = implode('/', array_slice($splitFilename, 2));
                    //echo "<br>";

                    // So stupid I even have to do this :/
                    if (!$file->isDir()) {
                        $zip->addFile($file, $newFile);
                    }
                }

                unlink("./temp/engine.zip");

                


            }

            // Zip archive will be created only after closing object
            $zip->close();

            // Delete temp engine files so we don't have copie of the engine everywhere.....
            // Uses a recursive album at the bottom of this page
            // Mess
            if ($exportType === "local") {
                $filesToDelete = './temp/engine';
                deleteFiles($filesToDelete);
            }
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

function deleteFiles($dir) {
    foreach(glob($dir . "/*") as $file) {
        if (is_dir($file))
            deleteFiles($file);
        else 
            unlink($file);
    }
    rmdir($dir);
}
