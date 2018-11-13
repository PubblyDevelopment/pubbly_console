<?php

$mapID = $_GET['mapID'];

chdir("../../");
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(WEB_ROOT . "/php/nodeMovements.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/sec_session.php");
if (LOGGED_IN) {
    $query = new Mysql_query();
    $mapName = $query->fetchSingle("SELECT name FROM map WHERE map_id = ?", ["s", $mapID]);
    $nodes = $query->fetchArray("SELECT map_node_id, name, child_id, book_id, unit_id FROM map_node WHERE map_id = ?", ["s", $mapID]);
    if (!isset($nodes[0]) || !is_array($nodes[0])) {
        $nodes = [$nodes];
    }
    foreach ($nodes as $node) {
        $toName = $node['name'];
        $id = $node['map_node_id'];
        if (isset($node['child_id'])) {
            $fromType = "variable";
            $fromID = $node['child_id'];
        } else if (isset($node['book_id'])) {
            $fromType = "static";
            $fromID = $node['book_id'];
        } else if (isset($node['unit_id'])) {
            $fromType = "unit";
            $fromID = $node['unit_id'];
        }
        $xmlFromLoc = getXmlLocFromNodeTypeAndId($fromType, $fromID);
        if ($fromType === "variable") {
            $assetPrefix = "C" . $query->fetchSingle("SELECT childID FROM children WHERE child_id = ?", ["s", $fromID]) . "_";
        } else {
            $assetPrefix = "";
        }
        $toLoc = "map/$mapName/$toName";
        // Legacy support
        if (!is_dir("$toLoc/videos")) {
            mkdir("$toLoc/videos");
        }
        moveNodeXmlToNodeFsLoc($xmlFromLoc, $assetPrefix, "$toLoc");
    }
    echo "done";
} else {
    echo "Bad pass for nodeFromType, or not logged in, you figure it out.";
}