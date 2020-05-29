<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../database/database.php';
include_once '../objects/product.php';

$database = new Database();
$connection = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
if (empty($data->link) || empty($data->title) || empty($data->price)) {
    http_response_code(400);
    print(json_encode(array("message" => "Nu au fost furnizate toate datele necesare.")));
}
$product = new Product($connection);
$product->setLink($data->link);
$product->setTitle($data->title);
$product->setPrice($data->price);
// create the product
if($product->create()){

    // set response code - 201 created
    http_response_code(201);

    // tell the user
    echo json_encode(array("message" => "Produsul a fost adaugat."));
}

// if unable to create the product, tell the user
else{

    // set response code - 503 service unavailable
    http_response_code(503);

    // tell the user
    echo json_encode(array("message" => "Eroare interna."));
}

