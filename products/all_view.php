<?php

class AllView
{
    public function getView($all)
    {
        ob_start();
        $domDocument = new DOMDocument;
        @$domDocument->loadHTMLfile("all.tpl");
        $index = 1;
        foreach ($all as $product) {
            $image = $domDocument->getElementById("image-" . $index);
            $image->setAttribute("src", $product["image"]);
            $title = $domDocument->getElementById("title-" . $index);
            $title->nodeValue = $product["title"];
            $price = $domDocument->getElementById("price-" . $index);
            $price->nodeValue = $product["price"] . " RON";
            $offers = $domDocument->getElementById("offers-" . $index);
            $offers->nodeValue = "(" . $product["offers"] . ")";
            $index = $index + 1;
        }
        $domDocument->saveHTMLFile("all.tpl");
        include 'all.tpl';
        $output = ob_get_contents();
        ob_end_clean();
        return $output;
    }
}
