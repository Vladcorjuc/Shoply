<?php
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

function getProductsByCategory($category, $sortBy)
{
    $criteria = "COALESCE(FLOOR(AVG(rating)), 0) DESC";
    switch ($sortBy) {
        case "most-viewed":
            $criteria = "views DESC";
            break;
        case "price-ascending":
            $criteria = "CONVERT(price, UNSIGNED)";
            break;
        case "price-descending":
            $criteria = "CONVERT(price, UNSIGNED) DESC";
    }
    $query = "SELECT p.link, image, title, COALESCE(FLOOR(AVG(rating)), 0) AS rating, price, offers FROM products p " .
        "JOIN categories c ON p.link = c.link LEFT JOIN rating r ON p.link = r.product WHERE category = :category " .
        "GROUP BY p.link, image, title, price, offers, views ORDER BY " . $criteria;
    $statement = Database::getConnection()->prepare($query);
    $statement->execute(array("category" => $category));
    if ($statement->rowCount() == 0) {
        return null;
    }
    $products = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $record = array
        (
            "link" => urlencode($row["link"]),
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
