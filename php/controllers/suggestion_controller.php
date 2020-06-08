<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__."/../models/suggest_model.php";
if(isset($_GET["suggest"])){
    session_start();
    $products=getSuggestedProducts("Vlad");
    if($products!=null){
        http_response_code(200);
        echo json_encode($products);
    }
    else{
        http_response_code(404);
        echo "";
    }

}
