<?php 

	$target_dir = "staging/audio_caps/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

	echo basename($_FILES["fileToUpload"]["name"]);

	$ext = pathinfo($target_file, PATHINFO_EXTENSION);

	if (strtolower($ext) == "zip") {
		echo "yay";
	}
	else {
		echo "bruh what u doin";
	}
?>