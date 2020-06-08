<?php
require_once '../database/database.php';
$stars = 0;
if (isset($_GET['starlink']) && $_GET['starlink'] != '') {
    $stars = getStars($_GET['starlink']);
    echo json_encode(array("response" => $stars));
} else {
    $data = json_decode(file_get_contents("php://input"));
    if (empty($data->link) || empty($data->user) || empty($data->stars)) {
        http_response_code(401);
        echo json_encode(array("response" => "Misused"));
        exit();
    } else {
        $stars = "You rated this product";
        insertStars($data->user, $data->stars, $data->link);
        echo json_encode(array("response" => $stars));
    }

}

function insertStars($username, $stars, $link)
{
    //$stars=intval($stars);
    $query = "INSERT INTO rating(user,product,rating) VALUES ('$username','$link',$stars)";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();
}

function getStars($link)
{
    $query = "SELECT AVG(rating) as average FROM rating where product=$link";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();
    if ($statement->rowCount() == 0) {
        return 0;
    } else {
        $row = $statement->fetch(PDO::FETCH_ASSOC);
        return $row['average'];
    }
}