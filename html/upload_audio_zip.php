<?php 
require_once("config.php");
$file = isset($_FILES['fileToUpload']) ? $_FILES['fileToUpload'] : false;

// Puts the uploaded zip into the staging area webroot/staging/audio_caps/theZip.zip
if ($file) {
    if ($file['type'] == "application/x-zip-compressed" || $file['type'] == "application/zip") {

        $tmpLoc = $file['tmp_name'];

		// Probs dumb + bad
        $stagingLoc = "staging/audio_caps/";
        $uniqueID = uniqid();
        $origName = basename($file['name'], ".zip");
        $shortName = $origName . $uniqueID;
        $newZipLoc = $stagingLoc . $shortName . ".zip";
                
        move_uploaded_file($tmpLoc, $newZipLoc);
        
        $zip = new ZipArchive;
        $result = $zip->open($newZipLoc);
        if ($result === TRUE) {
        	$zip->extractTo($stagingLoc . $shortName);
        	$zip->close();

        	// Once we extract the zip, we can delete the original bc IT'S DEAD TO ME
        	unlink($newZipLoc);

        	$dir = new DirectoryIterator($stagingLoc . $shortName . "/" . $origName);

        	$res = $zip->open($stagingLoc . $shortName . ".zip", ZipArchive::CREATE | ZipArchive::OVERWRITE);
        	if ($res === TRUE) {
        		$toBeDeleted = [];
	        	foreach ($dir as $fileInfo) {
	        		if (!$fileInfo->isDot()) {
	        			$fn = $fileInfo->getFilename();
	        			$exp = explode(".", $fn);
	        			$newFn = strtoupper($exp[0]) . "." . strtolower($exp[1]);
	        			
	        			if (file_exists($fileInfo->getPathname())) {
	        				$zip->addFile($fileInfo->getPathname(), $newFn);
	        			}
	        		}
	        	}
	        	$zip->close();
	        	
				$downloadFile = $stagingLoc . $shortName . ".zip";
				$stupid = filesize($downloadFile);

				// This is grotesque
				header("HTTP/1.1 200 OK");
				header('Content-Type: "application/zip"');
				header('Content-Disposition: attachment; filename='. $origName . "_renamed.zip");
				header('Expires: 0');
				header('Cache-Control: must-revalidate');
				header('Pragma: public');
				header('Content-Length: ' . filesize($downloadFile));
				readfile($downloadFile);
				
				// Move the thing to deleted cause we doooooo not need it (but also like......is the CRON even running??? Who's to say :) )
				rename($stagingLoc . $shortName . ".zip", "deletedZips/" . $shortName . ".zip");
				exit;
	        }
	        else {
	        	header("Location: audio_caps.php?err=1"); // echo  "Couldn't make a new zip"
	        }
        }
        else {
        	header("Location: audio_caps.php?err=2"); //echo "Bad zip";
        }
    }
    else {
    	header("Location: audio_caps.php?err=3"); //echo "Has to be a zip file.";
    }
}
else {
	header("Location: audio_caps.php?err=4"); //echo "Something went wrong with the upload. Sorry.";
}
?>