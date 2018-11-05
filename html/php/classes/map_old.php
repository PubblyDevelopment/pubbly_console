<?php

class Map {

    public $info = [];
    public $units = [];
    private $sql = false;

    public function buildWeb() {
        $mapName = $this->info['name'];
        $json = json_decode($this->json, true);
        $possibleEntryPoints = [];
        $units = $this->retUnits();
        foreach ($units as $unit) {
            $possibleEntryPoints[$unit['name']] = str_replace("/", "-", $unit['loc']);
        }
        foreach ($units as $unit) {
            $inProgUnitName = str_replace("/", "-", $unit['loc']);
            $latestEngineRelease;
            $unitInProgLoc = "map/$mapName/web/$inProgUnitName";
            $json[$unit['name']]['modified'] = 999999999999999999999999999;
            if (
            // It's been moved before
                    is_dir("$unitInProgLoc")
                    // it's been viewed in the newest engine
                    && file_exists("$unitInProgLoc/Main." . LATEST_ENGINE_RELEASE . ".json")
                    // It's been viewed after the most recent XML update
                    && filemtime("$unitInProgLoc/Main." . LATEST_ENGINE_RELEASE . ".json") > filemtime($unit['loc'] . "/MainXML.xml")
                    // It's been viewed after the most recent NavNode changes
                    // TODO: save modified time in JSON from navnode _main.js
                    && filemtime("$unitInProgLoc/Main." . LATEST_ENGINE_RELEASE . ".json") > $json[$unit['name']]['modified']) {
                // no update required
            } else {
                $inProgUnitName = str_replace("/", "-", $unit['loc']);
                $unitInProgLoc = "map/" . $this->info['name'] . "/web/$inProgUnitName";
                rrmdir($unitInProgLoc);
                rcopy($unit['loc'], $unitInProgLoc);
                $latestJSON = "$unitInProgLoc/Main." . LATEST_ENGINE_RELEASE . ".json";
                if (file_exists($latestJSON)) {
                    unlink($latestJSON);
                }
                if (file_exists("$unitInProgLoc/index.php")) {
                    unlink("$unitInProgLoc/index.php");
                }
                if (file_exists("$unitInProgLoc/index.html")) {
                    unlink("$unitInProgLoc/index.html");
                }

                $links = $json[$unit['name']]['links'];
                $xml = simplexml_load_file("$unitInProgLoc/MainXML.xml");
                $p = -1;
                foreach ($links as $link) {
                    $page = $link['page'];
                    $linkName = $link['name'];
                    $toUnitName = $link['url'];
                    $ul = false;
                    foreach ($units as $unit) {
                        if ($unit['name'] == $toUnitName) {
                            $unitLoc = $unit['loc'];
                            unset($possibleEntryPoints[$unit['name']]);
                            $ul = str_replace("/", "-", $unitLoc);
                            break;
                        }
                    }
                    if ($ul) {
                        $url = "?t=pg&pn=" . base64_encode($mapName) . "&ul=" . base64_encode($ul);
                        $xmlPage = $xml->Pages->Page[$page];
                        foreach ($xmlPage->Links->children() as $xmlLink) {
                            if ((string) $xmlLink->Name == $linkName) {
                                foreach ($xmlLink->Triggers->children() as $trigger) {
                                    foreach ($trigger->Targets->children() as $target) {
                                        if ((string) $target->Type == "Page" && (string) $target->Destination == "To be Determined") {
                                            $target->Type = "URL";
                                            $target->Destination = "base64Encoded(" .
                                                    base64_encode($url) . ")";
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        echo "Empty NavNode connection.<br>";
                        echo " -- Unit: " . $unit['name'] . "<br>";
                        echo " -- Link: $linkName<br>";
                        echo " -- Page: $page<br>";
                        echo "<br><br><br>";
                    }
                }
                saveXML($xml, "$unitInProgLoc/MainXML.xml");
            }
        }
        reset($possibleEntryPoints);

        $entryPoint = isset($possibleEntryPoints[key($possibleEntryPoints)]) ?
                $possibleEntryPoints[key($possibleEntryPoints)] :
                false;
        if (!$entryPoint) {
            echo "Error: Cannot determine map entry point<br>";
        }
        file_put_contents("map/$mapName/entry.txt", $entryPoint);
        return $entryPoint;
    }

    /* ---------------------------------------------------------------------- */

    public function createSkeleton() {
        $this->createSkeleton_fs();
        $this->createSkeleton_json();
    }

    private function createSkeleton_fs() {
        $mapName = $this->mapName;
        if (!is_dir("map/$mapName")) {
            mkdir("map/$mapName");
            mkdir("map/$mapName/web");
            mkdir("map/$mapName/apk");
        }
    }

    private function createSkeleton_json() {
        $json = $this->generateFreshJson();
        $dataLoc = "map/" . $mapName = $this->info['name'] . "/data.json";
        file_put_contents($dataLoc, json_encode($json));
    }

    private function generateFreshJson() {
        $units = $this->retUnits();
        $json = [];
        foreach ($units as $unit) {
            $xmlLoc = $unit['loc'] . "/MainXML.xml";
            $unitJSON = [
                "id" => $unit["id"],
                "name" => $unit['name'],
                "cover" => $unit['cover'],
                "links" => [],
            ];
            if (file_exists($xmlLoc)) {
                $xml = simplexml_load_file($xmlLoc);
                $p = -1;
                foreach ($xml->Pages->children() as $page) {
                    $p++;
                    foreach ($page->Links->children() as $link) {
                        foreach ($link->Triggers->children() as $trigger) {
                            foreach ($trigger->Targets->children() as $target) {
                                if ((string) $target->Type == "Page" && (string) $target->Destination == "To be Determined") {
                                    $linkJSON = [];
                                    $linkJSON['name'] = (string) $link->Name;
                                    $linkJSON['page'] = $p;
                                    $linkJSON['url'] = false;
                                    array_push($unitJSON['links'], $linkJSON);
                                }
                            }
                        }
                    }
                }
            }
            $json[$unit['name']] = $unitJSON;
        }
        return $json;
    }

    /* ---------------------------------------------------------------------- */

    private function retUnits() {
        $dbUnits = $this->getUnitsInfo_db();
        $units = $dbUnits;
        foreach ($units as $k => $unit) {
            $coverLoc = $unit['loc'] . "/cover.png";
            $units[$k]['cover'] = (file_exists($coverLoc)) ?
                    $coverLoc : false;
        }
        return $units;
    }

    private function getUnitsInfo_db() {
        $units = $this->sql->fetchArray("
SELECT
    CONCAT(
        'schools/', sch.name, '/', sub.name, '/', lvl.name, '/', unt.name
    ) AS loc,
    unt.name AS name,
    unt.ID AS id
FROM
    units unt
LEFT JOIN schools sch ON
    unt.schoolID = sch.ID
LEFT JOIN subjects sub ON
    unt.subjectID = sub.ID
LEFT JOIN levels lvl ON
    unt.levelID = lvl.ID
WHERE
    sch.name = ?", ["s", $this->info['name']]);
        return $units;
    }

    /* ---------------------------------------------------------------------- */

    public function directUpdateMap($newJSON) {
// Designers have saved JSON from NavigationNodesUI

        $this->directUpdateMap_cleanDB();
        $this->directUpdateMap_addLinksDB($newJSON);
        $dataLoc = "map/" . $mapName = $this->info['name'] . "/data.json";
        file_put_contents($dataLoc, json_encode($newJSON));
    }

    private function directUpdateMap_cleanDB() {
        return $this->sql->execSingle("
DELETE 
    plc 
FROM
    maplinkconnections plc
LEFT JOIN
    schools sch
ON
    plc.map_id = sch.ID
WHERE
    sch.name = ?", ["s", $this->info['name']]);
    }

    private function directUpdateMap_addLinksDB($json) {
        foreach ($json as $unit) {
            foreach ($unit['links'] as $link) {
                if ($link['url'] !== false) {
                    $qry = "
INSERT INTO
    maplinkconnections 
    (fromUnitID, fromUnitPage, fromUnitLinkName, toUnitID, map_id)
SELECT
    funt.ID AS fromUnitID, 
    ? AS fromUnitPage, 
    ? AS fromUnitLinkName,
    tunt.ID AS toUnitID, 
    sch.ID AS map_id
FROM
    schools sch
LEFT JOIN units funt ON
    sch.ID = funt.schoolID
LEFT JOIN units tunt ON
    sch.ID = tunt.schoolID
WHERE
    funt.name = ? AND
    tunt.name = ? AND
    sch.name = ?";
                    $this->sql->execSingle($qry, [
                        "sssss",
                        $link['page'],
                        $link['name'],
                        $unit['name'],
                        $link['url'],
                        $this->info['name'],
                    ]);
                }
            }
        }
    }

    /* ---------------------------------------------------------------------- */

    public function indirectUpdateMap() {
// unit dependencies have changed indirectly (units restiched, assets re-swapped, new units added to map).
        $jsonWithLocs = $this->indirectUpdateMap_mergeOldJson();
        $jsonWithLinks = $this->indirectUpdateMap_addLinksFromServer($jsonWithLocs);
        $dataLoc = "map/" . $this->info['name'] . "/data.json";
        file_put_contents($dataLoc, json_encode($jsonWithLinks));
        $this->json = json_encode($jsonWithLinks);
        $this->indirectUpdateMap_removeOutdatedFromDB();
    }

    private function indirectUpdateMap_mergeOldJson() {
        $dataLoc = "map/" . $mapName = $this->info['name'] . "/data.json";
        $newJSON = $this->generateFreshJson();
        if (file_exists($dataLoc)) {
            $oldJSON = json_decode(file_get_contents($dataLoc), true);
// Things that AREN'T in the newJSON that ARE in the old
// X/Y locations for each cover
            foreach ($oldJSON as $name => $oldUnit) {
                if (isset($newJSON[$name])) {
                    if (isset($oldUnit["x"])) {
                        $newJSON[$name]["x"] = $oldUnit["x"];
                        $newJSON[$name]["y"] = $oldUnit["y"];
                    }
                    $coverSrc = ($newJSON[$name]["cover"] === false) ?
                            "NavigationNodesUI/assets/booknotfound.png" :
                            $newJSON[$name]["cover"];
                    $sizes = getimagesize($coverSrc);
                    $newJSON[$name]["width"] = $sizes[0];
                    $newJSON[$name]["height"] = $sizes[1];
                }
            }
        }
        return $newJSON;
    }

    private function indirectUpdateMap_addLinksFromServer($json) {
        $unitLinks = $this->sql->fetchArray("
SELECT
    funt.name AS fromUnitName,
    plc.fromUnitLinkName AS fromLinkName,
    plc.fromUnitPage AS fromPage,
    tunt.name AS toUnitName
FROM
    schools sch
RIGHT JOIN maplinkconnections plc ON
    plc.map_id = sch.ID
LEFT JOIN units funt ON
    plc.fromUnitID = funt.ID
LEFT JOIN units tunt ON
    plc.toUnitID = tunt.ID
WHERE
    sch.name = ?", ["s", $this->mapName]);
        foreach ($unitLinks as $plc) {
            $unitInJson = $json[$plc['fromUnitName']];
            if (isset($unitInJson)) {
                foreach ($unitInJson['links'] as $k => $link) {
                    if ($link['name'] == $plc['fromLinkName'] && $link['page'] == $plc['fromPage']) {
                        $json[$plc['fromUnitName']]['links'][$k]['url'] = $plc['toUnitName'];
                    }
                }
            }
        }
        return $json;
    }

    private function indirectUpdateMap_removeOutdatedFromDB() {
        return $this->sql->execSingle("UPDATE schools SET outdated = 0 WHERE name = ?", ["s", $this->mapName]);
    }

    /* ---------------------------------------------------------------------- */

    private function getMapInfo() {
        $dbInfo = $this->getMapInfo_db();
        $fsInfo = $this->getMapInfo_fs();
        $exportStatuses = $this->getMapInfo_exportStatus($dbInfo['map_name']);

        $exportStatuses['database'] = ($dbInfo['outdated']) ? "outdated" : "ready";
        // Zip dependent on server, apk dependent on ZIP
        if ($exportStatuses['database'] !== "ready") {
            // exportStatuses['server'] = "new";
            $exportStatuses['zip'] = "new";
            $exportStatuses['apk'] = "new";
        } else if ($exportStatuses['server'] !== "ready") {
            $exportStatuses['zip'] = "new";
            $exportStatuses['apk'] = "new";
        } else if ($exportStatuses['zip'] !== "ready") {
            $exportStatuses['apk'] = "new";
        }

        $this->info = [
            "id" => $dbInfo['map_id'],
            "name" => $dbInfo['map_name'],
            "outdated" => $dbInfo['outdated'],
            "unit_count" => $dbInfo['unit_count'],
            "modified" => $fsInfo['modified'],
            "status" => $fsInfo['status'],
            "export_statuses" => $exportStatuses
        ];
    }

    private function getMapInfo_db() {
        $dbInfo = $this->sql->fetchArray("
SELECT
    sch.ID AS map_id,
    sch.outdated AS outdated,
    sch.name AS map_name,
    COUNT(unt.ID) AS unit_count
FROM
    schools sch
LEFT JOIN units unt ON
    unt.schoolID = sch.ID
WHERE
    sch.name = ?", ["s", $this->mapName]);
        return $dbInfo;
    }

    private function getMapInfo_fs() {
        $fsInfo = [];
        $mapName = $this->mapName;
        $jsonLoc = "map/$mapName/data.json";
        if (file_exists($jsonLoc)) {
            $apkLoc = "map/$mapName/exports/$mapName.apk";
            if (file_exists($apkLoc)) {
                $fsInfo['modified'] = filemtime($apkLoc);
                $fsInfo['status'] = "exported";
            } else {
                $fsInfo['modified'] = filemtime($jsonLoc);
                $fsInfo['status'] = "created";
            }
        } else {
            $fsInfo['modified'] = 0;
            $fsInfo['status'] = "new";
        }
        return $fsInfo;
    }

    private function getMapInfo_exportStatus($mapName) {
        // Possible statuses: ["new", "outdated", "ready"]
        $statuses = [
            "server" => "new",
            "zip" => "new",
            "apk" => "new",
        ];

        $jsonLoc = "map/$mapName/data.json";
        $entryPointLoc = "map/$mapName/entry.txt";
        $offlineZipLoc = "map/$mapName/offline.zip";
        $apkLoc = "map/$mapName/apk/development.apk";

        if (file_exists($jsonLoc)) {
            // $timeCheck = filemtime($jsonLoc) < filemtime($entryPointLoc);
            if (
            // JSON has been exported (buildWeb)
                    file_exists($entryPointLoc)
                    // entry point has been changed more recently than data.json
                    && filemtime($jsonLoc) < filemtime($entryPointLoc)) {
                $statuses['server'] = "ready";
            } else {
                $statuses['server'] = "outdated";
            }
        }

        return $statuses;
    }

    /* ---------------------------------------------------------------------- */

    function __construct($mapName) {
        require_once("php/classes/mysql_query.php");
        require_once("php/recursives.php");
        require_once("php/saveXML.php");
        require_once("engine/latest.php");
        $this->sql = new Mysql_query();

        $this->mapName = $mapName;

        $this->getMapInfo($mapName);
        if ($this->info['name']) {
            // $this->getUnits();
            // $this->info['status'] = "new";
            // $this->info['outdated'] = true;

            if ($this->info['status'] === "new") {
                $this->createSkeleton();
            }

            $this->json = file_get_contents("map/" . $this->info['name'] . "/data.json");
        } else {
            echo "Error: new Map(), but name passed ($mapName) not found on server of FS";
        }
    }

}
