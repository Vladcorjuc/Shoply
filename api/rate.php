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
    $user='';
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

    if(!empty($data->product)&&!empty($data->stars)){
        if($data->stars > 0 && $data->stars < 6){
            if(isProduct($data->product)==False){
                http_response_code(401);
                echo json_encode(array("message"=>"product not found"));
                exit();
            }
            $query="INSERT INTO rating(user,product,rating) VALUES (:user,:product,:rating)";
            $statement= Database::getConnection()->prepare($query);
            $statement->execute(array(
                'user' => $user->username,
                'product' => $data->product,
                'rating' => $data->stars
            ));
            if ($statement->rowCount() == 0) {
                http_response_code(401);
                echo  json_encode(array("message"=>"Unable to rate."));
            }
            else {
                echo json_encode(array("message"=>"You rated this product!"));
            }
        }
        else{
            http_response_code(404);
            $password_error=array("message"=>"Stars need to be an integer from 1-5");
            echo json_encode($password_error);
        }
    }
    else{
        http_response_code(404);
        $password_error=array("message"=>"Rating needs a product");
        echo json_encode($password_error);
    }

    function isProduct($link){
        $query="SELECT * FROM products where link=:link";
        $statement=Database::getConnection()->prepare($query);
        $statement->execute(array('link'=>$link));
        if($statement->rowCount()==0)
            return False;
        return True;
    }

