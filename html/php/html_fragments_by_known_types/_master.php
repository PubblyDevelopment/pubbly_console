<?php

class html_fragments_by_known_types {

    // Info of type specific page... Set from checkAndLoadFile
    public $info = false;
    // String of HTML once loaded from FILE
    public $file = "";
    // Array of swaps, before echo change [["this","that"]]
    public $swaps = [];
    // HTML string that will eventually get echoed
    public $html = "";

    // Check for __construct type, and existance in reader known type array
    // Load INFO into $this->info prop
    // Load FILE into $this->file prop
    // return boolean of success
    public function checkAndLoadFile($type) {
        if (isset($type) && isset($this->types[$type])
        ) {
            $this->info = $this->types[$type];
            if (isset($this->info['html'])) {
                $this->file = $this->info['html'];
                return true;
            } else if (file_exists($this->info['fsLoc'])) {
                $this->file = file_get_contents($this->info['fsLoc']);
                return true;
            } else {
                $message = "Partial HTML <b>$type</b> is not in the <b>" . $this->info['fsLoc'] . "</b> file system.";
                $solution = "";
                new Site_error("$message<br>$solution", "php/classes/html_class_by_known_type.php");
                return false;
            }
        } else {
            $message = "Partial HTML <b>$type</b> is not known <b>$this->whoAmI</b> file.";
            $solution = "";
            new Site_error("$message<br>$solution", "php/classes/html_class_by_known_type.php");
            return false;
        }
    }

    // Check for duplicates and add swap to array
    public function addSwap($from, $to) {
        // TODO: Fill this variable out.
        $doesNotExistYet = true;
        if ($doesNotExistYet) {
            array_push($this->swaps, [$from, $to]);
        }
    }

    // Actually execute the swaps
    public function swapVars() {
        $swaps = $this->swaps;
        $out = $this->file;
        for ($s = 0; $s < count($swaps); $s++) {
            $replace = $swaps[$s][0];
            $with = $swaps[$s][1];
            // Add brackets if lazy... ["this","that"] works as well as ["{this}","that"];
            if ($replace[0] !== '{' && $replace[strlen($replace) - 1] !== '}') {
                $replace = "{" . $replace . "}";
            }
            $out = str_replace($replace, $with, $out);
        }
        return $out;
    }

    function __construct($type, $swaps) {
        // Global swaps
        // $this->addSwap("REL_ROOT", ".");

        $buildType = isset($this->types[$type]['buildType']) ?
                $this->types[$type]['buildType'] :
                "echo";

        // Load HTML file passed through
        if ($this->checkAndLoadFile($type)) {
            // Custom swaps from 2x array to obj conversion
            $customSwaps = [];
            for ($nk = 0; $nk < count($swaps); $nk++) {
                // null kill, because the sun came up.
                if (!isset($swaps[$nk][1])) {
                    array_splice($swaps, $nk, 1);
                }
            }

            for ($cs = 0; $cs < count($swaps); $cs++) {
                // Get rid of null swaps
                $customSwaps[$swaps[$cs][0]] = $swaps[$cs][1];
            }
            // $cs: Number of custom swaps to make

            for ($ds = 0; $ds < count($this->info['defaultSwaps']); $ds++) {
                $default = $this->info['defaultSwaps'][$ds];

                $custom = isset($customSwaps[$default[0]]) ?
                        $customSwaps[$default[0]] :
                        false;

                if ($custom === false) {
                    $this->addSwap($default[0], $default[1]);
                } else {
                    $this->addSwap($default[0], $custom);
                    unset($customSwaps[$default[0]]);
                    $cs--;
                }
            }
            // $cs: Number of remaining unknown swaps
            if ($cs > 0) {
                $knownSwaps = [];
                for ($s = 0; $s < count($this->info['defaultSwaps']); $s++) {
                    array_push($knownSwaps, $this->info['defaultSwaps'][$s][0]);
                }
                $unknownSwaps = [];
                foreach ($customSwaps as $unknownName => $swap) {
                    array_push($unknownSwaps, $unknownName);
                }
                $pluralVariable = ($cs > 1) ? "s" : "";
                $error = "$cs Unrecognized swap variable$pluralVariable in " . $this->info['fsLoc'] . " fragment call.<br>" .
                        "<p>Known: </p>" .
                        "<ul><li>" .
                        implode("<li>", $knownSwaps) .
                        "</ul>" .
                        "<p>Unknown: </p>" .
                        "<ul><li>" .
                        implode("<li>", $unknownSwaps) .
                        "</ul>" .
                        "</div>";
                new Site_Error($error, "php/html_fragments_by_known_type/_master.php");
            }
            $this->html = $this->swapVars();
            $environment = "development";
            if ($environment !== "production") {
                /*
                  <!-- LargeLogoRollovers -->
                  <!-- html/body/TOP/LargeLogoRollovers.html -->
                  <!-- Swaps
                  REL_ROOT: {REL_ROOT}
                  SMALL_SCREEN_CLASS_DISPLAY: {SMALL_SCREEN_CLASS_DISPLAY}
                  ([d-none, ""]) Whether to hide/show the logo on small screens
                  -->
                 */
                $commentTitle = "<!-- $type -->";
                $commentLoc = "<!-- " . $this->info['fsLoc'] . " -->";
                $commentSwaps = "<!-- SWAPS" . "\r\n";
                $swaps = $this->swaps;
                for ($s = 0; $s < count($swaps); $s++) {
                    $replace = $swaps[$s][0];
                    $with = $swaps[$s][1];
                    // Add brackets if lazy... ["this","that"] works as well as ["{this}","that"];
                    if ($replace[0] !== '{' && $replace[strlen($replace) - 1] !== '}') {
                        $replace = "{" . $replace . "}";
                    }
                    $commentSwaps .= "    $replace: '$with'" . "\r\n";
                }
                $commentSwaps .= "-->";

                $this->html = $commentTitle . $commentLoc . $commentSwaps . $this->html;
            } else {
                // $this->html;
            }
            if ($buildType == "echo") {
                echo $this->html;
            }
        }
    }
}
