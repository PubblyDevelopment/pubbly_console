<?php

// Shared functions used to package content for release, for local, hosted, or APK wrapped delivery

function addEngine($htmlTemplate, $zip)
{
    // $htmlTemplate: ["offline-json", "offline-xml"]
    // $zip: new ZipArchive();

    // Engine always added at zip root
    if ($htmlTemplate === "offline-json") {
        $neededEngineFolders = ["css", "js/run", "js/shared", "js/third_party", "js/utility", "assets"];
    } else if ($htmlTemplate === "offline-xml") {
        // skip scss, testers, html templates, all that
        $neededEngineFolders = ["css", "js", "assets"];
    } else {
        return false;
    }
    foreach ($neededEngineFolders as $engineFolder) {
        $root = realpath("pubbly_engine/$engineFolder");
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($root),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $relativePath = substr($file->getRealPath(), strlen($root) + 1);
                $zip->addFile($file->getRealPath(), "pubbly_engine/$engineFolder/$relativePath");
            }
        }
    }
    return $zip;
}

function package($packetName, $serverLoc, $exportLoc, $exportType)
{
    $exportFile = "$exportLoc/$packetName.zip";
    $errorMessage = "";
    try {
        rrmdir($exportLoc);
        mkdir($exportLoc); // permissions denied doesn't throw???
        if (!is_dir($exportLoc)) {
            throw new Exception('mkdir permissions');
        }
        $xmlStr = file_get_contents("$serverLoc/MainXML.xml");
    } catch (Exception $e) {
        if ($e->getMessage() == "mkdir permissions") {
            $whoami = get_current_user();
            $errorMessage = 'Permissions error with folder ' . $exportLoc . '. Please execute ' .
                '"chmod 766 html/packages -R"' .
                '"chown www-data:' . $whoami . ' html/packages -R"';
        } else {
            $errorMessage = "Export is missing MainXML.xml file";
        }
    }
    if ($errorMessage) {
        echo '{"status":"error","message":"' . $errorMessage . '"}';
    } else {
        $assetFolders = ["images", "audio", "video"];
        foreach ($assetFolders as $assetFolder) {
            if (is_dir("$serverLoc/$assetFolder")) {
                rcopy("$serverLoc/$assetFolder", "$exportLoc/$assetFolder");
            }
        }

        if (file_exists("$serverLoc/Main.json")) {
            $engineIndexType = "offline-json";
            $packetData = file_get_contents("$serverLoc/Main.json");
            $dataType = "PUBBLY_JSON";
        } else {
            $engineIndexType = "offline-xml";
            $packetData = $xmlStr;
            $dataType = "XML_STRING";
        }

        if ($exportType == "standalone") {
            $pathToData = "";
        } else {
            $pathToData = $exportLoc;
        }
        $frag = new Html_fragment("pubbly_engine/html/$engineIndexType.html", [
            ["PATH_TO_ENGINE", "pubbly_engine/"],
            ["PATH_TO_BOOK", $pathToData],
            [$dataType, $packetData],
        ]);
        $frag->printOut("$exportLoc/index.html");

        $zip = new ZipArchive();
        $zip->open($exportFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        $root = realpath($exportLoc);
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($root),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        $base = ($exportType === "standalone") ? "" : $exportLoc . "/";
        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $relativePath = substr($file->getRealPath(), strlen($root) + 1);
                $zip->addFile($file->getRealPath(), $base . $relativePath);
            }
        }

        if ($exportType === "standalone") {
            $zip = addEngine($engineIndexType, $zip);
        }
        $zip->close();


        echo '{"status":"success", "message": "Everything worked dawg", "url": "' . $exportFile . '"}';
    }
}
