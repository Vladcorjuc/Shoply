<?php
require_once '../database/database.php';
require_once '../jwt/jwt_params.php';
require_once '../jwt/src/JWT.php';
require_once '../jwt/src/BeforeValidException.php';
require_once '../jwt/src/ExpiredException.php';
require_once '../jwt/src/SignatureInvalidException.php';

use Firebase\JWT\JWT;

header("Content-Type:application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $query = "SELECT username, password from users where username = :username";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute(array("username" => $data->username));
    $row = $statement->fetch(PDO::FETCH_ASSOC);

    $user = array(
        "username" => $row['username'],
        "password" => $row['password']
    );

    if (password_verify($data->password, $user["password"])) {
        $token = array(
            "iss" => JWT_ISS,
            "aud" => JWT_AUD,
            "iat" => JWT_IAT,
            "exp" => JWT_EXP,
            "data" => array(
                "username" => $data->username
            )
        );
        $jwt = JWT::encode($token, JWT_KEY);
        echo json_encode(array("jwt" => $jwt));

    } else {
        http_response_code(401);
        $password_error = array("message" => "Wrong password");
        echo json_encode($password_error);
    }

} else {
    http_response_code(404);
    $password_error = array("message" => "Authenticate with username and password");
    echo json_encode($password_error);
}