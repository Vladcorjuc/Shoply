<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/xml');
echo file_get_contents("../../xml/rss.xml");