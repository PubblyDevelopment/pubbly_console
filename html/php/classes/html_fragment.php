<?php

class Html_fragment
{

    private $fsLoc = "";
    private $fileContents = "";
    // Array of swaps, before echo change [["this","that"]]
    private $swaps = [];
    // HTML string that will eventually get echoed
    private $html = "";

    private function genSwappedHTML()
    {
        $swaps = $this->swaps;
        $error = false;
        try {
            $out = file_get_contents($this->fsLoc);
        } catch (Exception $e) {
            $error = "<html><head><script>console.error(`Could not file $this->fsLoc`);</script></head><body><h2>Error</h2></body></html>";
        }
        if ($error) {
            return $error;
        } else {
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
    }

    private function genComments()
    {
        $commentLoc = "<!-- " . $this->fsLoc . " -->";
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
        return $commentLoc . $commentSwaps;
    }

    private function addDefaultSwaps()
    {
        // SHOULD be in config.php
        $brand = (defined("BRAND")) ? BRAND : "";
        array_push($this->swaps, ["BRAND", $brand]);
    }

    public function echoOut()
    {
        echo $this->html;
    }

    public function printOut($where)
    {
        file_put_contents($where, $this->html);
    }

    function __construct($fsLoc, $swaps)
    {
        $this->fsLoc = $fsLoc;
        $this->swaps = $swaps;
        // Load HTML file passed through
        $this->addDefaultSwaps();
        $comments = $this->genComments();
        $htmlText = $this->genSwappedHTML();
        $this->html = $comments . $htmlText;
    }
}
