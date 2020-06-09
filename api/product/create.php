<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../jwt/jwt_params.php';
require_once '../../jwt/src/JWT.php';
require_once '../../jwt/src/BeforeValidException.php';
require_once '../../jwt/src/ExpiredException.php';
require_once '../../jwt/src/SignatureInvalidException.php';
require_once '../../database/database.php';
require_once '../objects/product.php';

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));
if (empty($data->jwt)) {
    http_response_code(401);
    print(json_encode(array("message" => "Nu ai autorizatie.")));
    exit();
}
try {
    $decoded_jwt = JWT::decode($data->jwt, JWT_KEY, array("HS256"));
    $user = $decoded_jwt->data;
} catch (Exception $exception) {
    http_response_code(401);
    echo json_encode(array("message" => $exception->getMessage()));
    exit();
}
if ($user->username != "admin") {
    http_response_code(401);
    print(json_encode(array("message" => "Nu ai drepturi de administrator.")));
    exit();
}
$database = new Database();
$connection = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
if (empty($data->category) || empty($data->link) || empty($data->title) || empty($data->price) || empty($data->image)) {
    http_response_code(400);
    print(json_encode(array("message" => "Nu ai furnizat categoria, link-ul, titlul, pretul sau imaginea.")));
}
$product = new Product($connection);
$product->setCategory($data->category);
$product->setLink($data->link);
$product->setTitle($data->title);
$product->setPrice($data->price);
$product->setImage($data->image);
if ($product->create()) {
    http_response_code(201);
    echo json_encode(array("message" => "Produsul a fost adaugat."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Eroare interna."));
}
