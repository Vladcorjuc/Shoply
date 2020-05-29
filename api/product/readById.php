<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../database/database.php';
include_once '../objects/product.php';

$database = new Database();
$connection = $database->getConnection();
$product = new Product($connection);
$id = isset($_GET["id"]) ? $_GET["id"] : die();
$product->setId($id);
$query = $product->readById();
$productsNumber = $query->rowCount();
if ($productsNumber > 0) {
    $row = $query->fetch(PDO::FETCH_ASSOC);
    $record = array
    (
        "id" => $row["id"],
        "category" => $row["category"],
        "link" => $row["link"],
        "title" => $row["title"],
        "description" => html_entity_decode($row["description"]),
        "price" => $row["price"],
        "currency" => $row["currency"],
        "offers" => $row["offers"],
        "image" => $row["image"],
        "vendors" => $row["vendors"],
        "views" => $row["views"]
    );
    http_response_code(200);
    print(json_encode($record));
} else {
    http_response_code(404);
    print(json_encode(array("message" => "Produsul cu identificatorul " . $id . " nu exista.")));
}
