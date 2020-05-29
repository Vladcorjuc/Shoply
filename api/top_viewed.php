<?php
require_once '../database/database.php';

header("Content-Type:application/json");

$data=json_decode(file_get_contents("php://input"));

if(!empty($data->number)){
    $query="SELECT link FROM products ORDER BY views LIMIT $data->number";
    $statement= Database::getConnection()->prepare($query);
    $statement->execute();
    if ($statement->rowCount() == 0) {
        http_response_code(401);
        echo  json_encode(array("message"=>"Unable to retrieve products"));
    }
    else {
        $rows= $statement->fetchAll(PDO::FETCH_ASSOC);
        $products=array();
        foreach ($rows as $row){
            array_push($products,$row['link']);
        }
        echo  json_encode(array("top"=>$products));

    }
}
else{
    http_response_code(404);
    $password_error=array("message"=>"please provide a number");
    echo json_encode($password_error);
}