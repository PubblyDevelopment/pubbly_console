<?php 

require_once("config.php");
$file = isset($_FILES['fileToUpload']) ? $_FILES['fileToUpload'] : false;

// Puts the uploaded zip into the staging area webroot/staging/audio_caps/theZip.zip
if ($file) {
    if ($file['type'] == "application/x-zip-compressed" || $file['type'] == "application/zip") {

        $tmpLoc = $file['tmp_name'];


        $stagingLoc = "staging/audio_caps/";
        $uniqueID = uniqid();
        $origName = basename($file['name'], ".zip");
        $shortName = $origName . $uniqueID;
        $newZipLoc = $stagingLoc . $shortName . ".zip";
        
        // Add uniqueID later , ".zip" // basename
        //$whereToMoveTheThing = $stagingLoc . "/" . $shortName .;
        
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
	        	
	        	//rrmdir($stagingLoc . $shortName);

	        	header("Location:" . $stagingLoc . $shortName . ".zip");
	        	

	        }
	        else {
	        	header("Location: audio_caps.php?err=0"); // echo  "Couldn't make a new zip"
	        }
        }
        else {
        	header("Location: audio_caps.php?err=1"); //echo "Bad zip";
        }
    }
    else {
    	header("Location: audio_caps.php?err=2"); //echo "Has to be a zip file.";
    }
}
else {
	header("Location: audio_caps.php?err=3"); //echo "Something went wrong with the upload. Sorry.";
}



// TODO: Turn this thing into an AJAX call.... :/
// Add uniqueness

?>

