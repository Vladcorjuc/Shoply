<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . "/../../database/database.php";
define('K_CLOSEST_NUMBER', 0.3);

function getSuggestedProducts($user)
{
    $userList = getUserList();
    $userRating = populateUserRating();
    $neigbours = array();
    $productSuggestion = array();

    foreach ($userList as $username) {
        if ($username != $user) {
            $similarities = cosineSimilarity($userRating[$user], $userRating[$username], $user, $username);
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
            $suggestedProd = array();
            for ($i = 0; $i < count($productSuggestion); $i++) {
                array_push($suggestedProd, $productSuggestion[$i]["product"]);
            }
            return getProductsByLink($suggestedProd);
        }

    }
    return null;
}

function getProductsByLink($links)
{
    $products = array();

    for ($i = 0; $i < count($links); $i++) {

        $query = "SELECT p.link as link,title,price, image, COALESCE(FLOOR(AVG(rating)), 0) AS rating" .
            ", offers, views FROM products p LEFT JOIN rating r ON p.link = r.product " .
            "WHERE p.link=:link GROUP BY title, price, image, offers, views";
        $statement = Database::getConnection()->prepare($query);
        $statement->execute(array("link" => $links[$i]));
        if ($statement->rowCount() == 0) {
            continue;
        }
        $row = $statement->fetch(PDO::FETCH_ASSOC);
        array_push($products, array
        (
            "link" => $row["link"],
            "title" => $row["title"],
            "price" => $row["price"],
            "image" => urlencode($row["image"]),
            "rating" => $row["rating"],
            "offers" => $row["offers"],
            "views" => $row["views"]
        ));
    }

    return $products;
}

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
        if(!array_key_exists($user,$A) || !array_key_exists($user,$B)){
            continue;
        }
        if (array_search($user, $productB)) {
            $dot += $A[$user] * $B[$user];
        }
        $denomA += $A[$user] * $A[$user];
    }
    foreach ($productB as $user) {
        if(!array_key_exists($user,$B)){
            continue;
        }
        $denomB += $B[$user] * $B[$user];
    }

    if ($denomA == 0 || $denomB == 0)
        return 0;
    return $dot / (sqrt($denomA) * sqrt($denomB));
}