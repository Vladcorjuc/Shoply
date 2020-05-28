<?php
    require_once '../database/database.php';
    require_once '../jwt/jwt_params.php';
    require_once  '../jwt/src/JWT.php';
    require_once  '../jwt/src/BeforeValidException.php';
    require_once  '../jwt/src/ExpiredException.php';
    require_once  '../jwt/src/SignatureInvalidException.php';

    use Firebase\JWT\JWT;

    header("Content-Type:application/json");

    $data=json_decode(file_get_contents("php://input"));

    if(!empty($data->jwt)){
        try {
            $decoded_jwt = JWT::decode($data->jwt,JWT_KEY,array("HS256"));
            $user = $decoded_jwt->data;
        }
        catch (Exception $exception ){
            http_response_code(401);
            echo json_encode(array("message"=>$exception->getMessage()));
            exit();
        }
    }

    