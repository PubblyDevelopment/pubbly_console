<?php

chdir("../../../");
require("../php/classes/html_fragment.php");
$bookName = filter_var($_GET['book'], FILTER_SANITIZE_STRING);
// If book exists in fs
$bookPath = (file_exists("books/$bookName/MainXML.xml")) ? 
	"books/$bookName" : false;

// If we've got an engine to display it with
$enginePath = "http://cdn.pubbly.com/pubbly_engine/";
$version = file_get_contents("$enginePath/version.txt");
$templateURL = "$enginePath/html/server-run.html";

// If something else I guess
$userLoggedIn = true;

if ($bookPath &&
	$version !== "" &&
	$userLoggedIn) {
	$frag = new Html_fragment($templateURL, [
		["PATH_TO_ENGINE", $enginePath],
		["ENGINE", $version],
		["START_PAGE", 0],
		["XML_NAME", "MainXML.xml"],
		["ENVIRONMENT", "comic"],
		["CACHE_BREAK", ""],
		["PUBBLY_JSON", file_get_contents("$bookPath/Main.json")]
	]);
	$frag->echoOut();
}	else	{
	// Redirect to home
	// header("location: /");
}
?>
