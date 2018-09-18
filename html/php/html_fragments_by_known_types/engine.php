<?php

/* BODY
 * 
 * This is an open to interpretation thing...
 * Mostly static stuff, like the coming soon page, or the login form. 
 * 
 */
require_once("php/html_fragments_by_known_types/_master.php");

class Engine extends html_fragments_by_known_types {

    public $whoAmI = "engine";
    public $types = [
        "1.0.6-run" => [
            "fsLoc" => "engine/1.0.6/run.html",
            "defaultSwaps" => [
                ["REL_ROOT", "."],
                ["ENGINE", "1.0.6"],
                ["START_PAGE", 0],
                ["PUBBLY_JSON", "{}"],
            ]
        ],
        "1.0.6-build" => [
            "fsLoc" => "engine/1.0.6/build.html",
            "defaultSwaps" => [
                ["REL_ROOT", "."],
                ["ENGINE", "1.0.6"],
                ["START_PAGE", 0],
                ["BUILD_POST_SPECS", ""],
                ["BUILD_POST_LOC", ""],
                ["XML_NAME", ""],
                ["BOOK_LOC", ""]
            ]
        ],
    ];

}
