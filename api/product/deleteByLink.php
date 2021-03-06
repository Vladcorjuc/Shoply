<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
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
if (empty($data->link)) {
    http_response_code(400);
    print(json_encode(array("message" => "Nu ai furnizat link-ul.")));
}
$product = new Product($connection);
$product->setLink($data->link);
if ($product->deleteByLink()) {
    http_response_code(200);
    echo json_encode(array("message" => "Pretul a fost sters."));
} else {
    http_response_code(204);
    echo json_encode(array("message" => "Produsul nu exista in baza de date."));
}
