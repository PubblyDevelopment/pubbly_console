<?php

require_once("config.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/html_fragment.php");
require_once(CLASS_ROOT . "/map.php");
$mapName = base64_decode($_GET['mapName']);

if (LOGGED_IN) {
    $query = new Mysql_query();
    $map_id = $query->fetchSingle("SELECT map_id FROM map WHERE name = ?", ["s", $mapName]);

    // Build JSON from sql query
    $nodePathMap = $query->fetchArray("
SELECT
    mp.map_id,
    mp.name AS mapName,
    mn.map_node_id AS map_node_id,
    mn.name AS nodeName,
    mn.has_cover AS hasCover,
    mn.is_entry AS isEntryNode,
    np.from_node_id AS from_node_id,
    fn.name AS from_node_name,
    np.map_node_path_id AS map_node_path_id,
    np.from_link_name AS from_link_name,
    np.from_link_page AS from_link_page,
    np.to_node_id AS to_node_id,
    tn.name AS to_node_name
FROM
    map mp
RIGHT JOIN map_node mn ON
    mp.map_id = mn.map_id
RIGHT JOIN map_node_path np ON
    mn.map_node_id = np.from_node_id
LEFT JOIN map_node fn ON 
    np.from_node_id = fn.map_node_id
LEFT JOIN map_node tn ON 
    np.to_node_id = tn.map_node_id
WHERE
    mp.name = ?", ["s", $mapName]);
    // see webix_getUnits.php... Same prob.
    if (!isset($nodePathMap[0]) || !is_array($nodePathMap[0])) {
        $nodePathMap = [$nodePathMap];
    }
    // pprint_r($nodePathMap);
    $map = [];
    $baseCoverSrc = "map/" . $mapName;
    for ($i = 0; $i < count($nodePathMap); $i++) {
        $node = $nodePathMap[$i];
        if ($node) {
            $nodeName = $node['nodeName'];
            if (!isset($map[$nodeName])) {

                $cover = ($node['hasCover']) ?
                        "$baseCoverSrc/$nodeName/cover.png" :
                        "NavigationNodesUI/assets/booknotfound.png";
                $map[$nodeName] = [
                    "node_id" => $node['map_node_id'],
                    "name" => $nodeName,
                    "cover" => $cover,
                    "isEntryNode" => $node['isEntryNode'],
                    "paths" => []
                ];
            }
            $toLinkName = (isset($node['to_node_name'])) ?
                    $node['to_node_name'] : false;
            $fromLinkPage = $node['from_link_page'] + 1;
            $link = [
                "map_node_path_id" => $node['map_node_path_id'],
                "name" => $node['from_node_name'],
                "page" => $fromLinkPage,
                "url" => $toLinkName
            ];
            array_push($map[$node['nodeName']]['paths'], $link);
        }
    }
    $json = json_encode($map);
    $frag = new Html_fragment("html/edit_map.html", [
        ["MAP_ID", $map_id],
        ["MAP_NAME", $mapName],
        ["MAP_JSON", $json]
    ]);
    $frag->echoOut();
} else {
    header("Location: login.php");
}
?>