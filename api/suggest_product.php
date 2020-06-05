<?php
require_once '../database/database.php';
require_once '../jwt/jwt_params.php';
require_once '../jwt/src/JWT.php';
require_once '../jwt/src/BeforeValidException.php';
require_once '../jwt/src/ExpiredException.php';
require_once '../jwt/src/SignatureInvalidException.php';
define('K_CLOSEST_NUMBER', 0.3);

use Firebase\JWT\JWT;

header("Content-Type:application/json");

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->jwt)) {
    try {
        $decoded_jwt = JWT::decode($data->jwt, JWT_KEY, array("HS256"));
        $user = $decoded_jwt->data;
    } catch (Exception $exception) {
        http_response_code(401);
        echo json_encode(array("message" => $exception->getMessage()));
        exit();
    }
}

$userList = getUserList();
$userRating = populateUserRating();
$neigbours = array();
$productSuggestion = array();

foreach ($userList as $username) {
    if ($username != $user->username) {
        $similarities = cosineSimilarity($userRating[$user->username], $userRating[$username], $user->username, $username);
        if ($similarities > 0) {
            array_push($neigbours, array('similarity' => $similarities, 'user' => $username));
        }
    }
}

if (count($neigbours) > 0) {
    usort($neigbours, 'similaritySort');
    $products = getAllProducts();
    foreach ($products as $product) {
        $score = 0;
        $count = 0;

        $maxNeighbours = K_CLOSEST_NUMBER * count($neigbours);
        if ($maxNeighbours <= 2) {
            $maxNeighbours = count($neigbours);
        }
        for ($i = 0; $i < $maxNeighbours; $i++) {
            if (array_key_exists($product, $userRating[$neigbours[$i]['user']])) {
                $score += $userRating[$neigbours[$i]['user']][$product];
                $count++;
            }
        }
        if ($count > 0) {
            $score /= $count;
            array_push($productSuggestion, array('score' => $score, 'product' => $product));
        }
    }

    if (count($productSuggestion) > 0) {
        usort($productSuggestion, 'scoreSort');
        echo json_encode(array('product_suggestion' => $productSuggestion[count($productSuggestion) - 1]['product']));
        exit();
    }

}
echo json_encode(array('msg' => 'Not enough Information.Please rate some products so we can know your taste.'));

function scoreSort($a, $b)
{
    return $a['score'] < $b['score'];
}

function similaritySort($a, $b)
{
    return $a['similarity'] < $b['similarity'];
}

function getAllProducts()
{
    $query = "SELECT DISTINCT product from rating";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
    $products = array();
    foreach ($rows as $row) {
        array_push($products, $row['product']);
    }
    return $products;
}

function getUserList()
{
    $query = "SELECT DISTINCT user from rating";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
    $users = array();
    foreach ($rows as $row) {
        array_push($users, $row['user']);
    }
    return $users;
}

function populateUserRating()
{

    $query = "SELECT user,product,rating from rating";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
    $userRating = array();
    foreach ($rows as $row) {
        $userRating[$row['user']][$row['product']] = $row['rating'];
    }
    return $userRating;
}

function getProducts($username)
{
    $query = "SELECT product from rating where user=:username";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute(array("username" => $username));

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
    $products = array();
    foreach ($rows as $row) {
        array_push($products, $row['product']);
    }
    return $products;
}

function cosineSimilarity($A, $B, $userA, $userB)
{

    $dot = 0.0;
    $denomA = 0.0;
    $denomB = 0.0;
    $productA = getProducts($userA);
    $productB = getProducts($userB);

    foreach ($productA as $user) {
        if (array_search($user, $productB)) {
            $dot += $A[$user] * $B[$user];
        }
        $denomA += $A[$user] * $A[$user];
    }
    foreach ($productB as $user) {
        $denomB += $B[$user] * $B[$user];
    }

    if ($denomA == 0 || $denomB == 0)
        return 0;
    return $dot / (sqrt($denomA) * sqrt($denomB));
}