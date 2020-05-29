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
$query = $product->readAll();
$productsNumber = $query->rowCount();
if ($productsNumber > 0) {
    $products = array("message" => $productsNumber . " products");
    $products["products"] = array();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
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
        array_push($products["products"], $record);
    }
    http_response_code(200);
    print(json_encode($products));
} else {
    http_response_code(404);
    print(json_encode(array("message" => "Nu exista produse.")));
}
