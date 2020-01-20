<?php

// Ajax request sends the following:

// Current Map ID
$mapID = $_GET['mapID'];

// The FROM node we're making the connection with
$fromPathID = $_GET['fromPathID'];

// The TO node we're making the connection with
$toNodeID = $_GET['toNodeID'];

// Start page, if it exists
$startPage = NULL;
if (isset($_GET['startPage'])) {
    $startPage = $_GET['startPage'];
}

chdir("../../");
require_once("config.php");
require_once(INC_ROOT . "/dbConnect.php");
require_once(WEB_ROOT . "/php/main.php");
require_once(WEB_ROOT . "/php/saveXML.php");
require_once(CLASS_ROOT . "/mysql_query.php");
require_once(CLASS_ROOT . "/sec_session.php");

if (LOGGED_IN) {
    $query = new Mysql_query();
    
    // Blank node paths get inserted when XML is parsed in the function createNodeSkeletonPathsFromXmlDoc
    // when node is first inserted
    $query->execSingle("
        UPDATE 
            map_node_path 
        SET 
            to_node_id = ?, to_node_start_page = ?
        WHERE 
            map_node_path_id = ?", 
        ["sss", $toNodeID, $startPage, $fromPathID]);
    
    $info = $query->fetchArray("
        SELECT
            CONCAT(
                'map/',
                mp.name,
                '/',
                mn.name,
                '/MainXML.xml'
            ) AS xmlPath,
            fmnp.from_link_name AS linkName,
            fmnp.from_link_page AS linkPage,
            mp.name AS map_name,
            mn.name AS map_node_name
        FROM
            map_node_path fmnp
        RIGHT JOIN map_node mn ON
            fmnp.from_node_id = mn.map_node_id
        RIGHT JOIN map mp ON
            mp.map_id = mn.map_id
        WHERE
            fmnp.map_node_path_id = ?", 
        ["s", $fromPathID]);
        
    $toNodeName = $query->fetchSingle("
        SELECT 
            mn.name 
        FROM 
            `map_node_path` mnp 
        RIGHT JOIN 
            map_node mn 
        ON 
            mnp.to_node_id = mn.map_node_id 
        WHERE 
            mnp.map_node_path_id = ?", 
        ["s", $fromPathID]);


    $linkName = $info['linkName'];
    $page = $info['linkPage'];
    $mapName = $info['map_name'];

    $url = "?engineCode=new&t=m&mn=$mapName&nn=$toNodeName";

    if (isset($startPage)) {
        $url = $url . "&sp=$startPage";
    }

    $xml = simplexml_load_file($info['xmlPath']);
    $xmlPage = $xml->Pages->Page[$page];
    foreach ($xmlPage->Links->children() as $xmlLink) {
        if ((string) $xmlLink->Name == $linkName) {
            foreach ($xmlLink->Triggers->children() as $trigger) {
                foreach ($trigger->Targets->children() as $target) {
                    if (
                            ((string) $target->Type == "Page" && (string) $target->Destination == "To be Determined")
                            || ((string) $target->Action == "Has been determined")) {
                        $target->Type = "URL";
                        $target->Action = "Has been determined";
                        $target->Destination = "base64Encoded(" .
                                base64_encode($url) . ")";
                    }
                }
            }
        }
    }
    saveXML($xml, $info['xmlPath']);
} else {
    echo "Bad pass for nodeFromType, or not logged in, you figure it out.";
}
