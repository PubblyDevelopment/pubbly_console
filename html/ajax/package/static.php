<?php



ini_set('max_execution_time', 300); // 5 minutes
chdir("../../");
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/sec_session.php");
require_once(CLASS_ROOT . "/html_fragment.php");
require_once(WEB_ROOT . "/php/recursives.php");
require_once(WEB_ROOT . "/php/packageContent.php");

if (LOGGED_IN && isset($_GET['staticID'])) {
    $errorMessage = "";

    $ID = $_GET['staticID'];
    $exportType = isset($_GET['type']) ? $_GET['type'] : "standalone";

    $query = new Mysql_query();
    $packetName = $query->fetchSingle("SELECT name FROM books WHERE ID = ?", ["s", $ID]);
    $serverLoc = "books/$ID";
    $exportLoc = "packages/staticExports/$packetName";
    // Export type "standalone": add engine
    // Export type "dependent": DO NOT add engine (apk or server)

    package($packetName, $serverLoc, $exportLoc, $exportType);
} else {
    echo '{"status":"error","message":"Not logged in"}';
}
