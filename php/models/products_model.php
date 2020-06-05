<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . "/../../database/database.php";

function getCategories()
{
    $query = "SELECT DISTINCT category FROM categories ORDER BY category";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();
    if ($statement->rowCount() == 0) {
        return null;
    }
    $categories = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $record = array
        (
            "category" => $row["category"],
        );
        array_push($categories, $record);
    }
    return $categories;
}

function getProductsByCategory($category)
{
    $query = "SELECT image, title, COALESCE(FLOOR(AVG(rating)), 0) AS rating, price, offers FROM products p " .
        "JOIN categories c ON p.link = c.link LEFT JOIN rating r ON p.link = r.product WHERE category = :category " .
        "GROUP BY image, title, price, offers";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute(array("category" => $category));
    if ($statement->rowCount() == 0) {
        return null;
    }
    $products = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $record = array
        (
            "image" => urlencode($row["image"]),
            "title" => $row["title"],
            "rating" => $row["rating"],
            "price" => $row["price"],
            "offers" => $row["offers"]
        );
        array_push($products, $record);
    }
    return $products;
}