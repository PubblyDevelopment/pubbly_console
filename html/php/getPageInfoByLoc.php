<?php
/**
 * Created by PhpStorm.
 * User: Jason
 * Date: 8/26/2016
 * Time: 5:45 PM
 * 
 * Updated 1-21-10: Added option to also get page names
 */

function getPageInfoByLoc($loc) {
    if ($loc) {
        if (file_exists($loc)) {
            $xml = simplexml_load_file($loc);
            $pageCount = count($xml->Pages->Page);
            $pageNames = $xml->Pages->Page->PageName;
            
            $pageHeight = (string)$xml->Info->SinglePageHeight;
            $pageWidth = (string)$xml->Info->SinglePageWidth;
            $pageDisplay = (string)$xml->Info->PageDisplay;
                $ret = [];
                $ret[0] = [];
                $ret[0]["count"] = $pageCount;
                $ret[0]["width"] = $pageWidth;
                $ret[0]["height"] = $pageHeight;
                $ret[0]["names"] = [];

                foreach($xml->Pages->Page as $thing) {
                    array_push($ret[0]["names"], (string)$thing->PageName);
                }
                //var_dump($ret[0]["names"]);
                return $ret;
        }   else    {
            return "error: XML '$loc' not found";
        }
    }   else    {
        return "error: Only works for children of series or a fixed book";
    }
}
?>