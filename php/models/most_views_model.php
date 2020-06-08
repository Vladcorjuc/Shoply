<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . "/../../database/database.php";

function getMostViewedProducts()
{
    $query = "SELECT image, title, COALESCE(FLOOR(AVG(rating)), 0) AS rating, price, offers,p.link as link FROM products p" .
        " LEFT JOIN rating r ON p.link = r.product GROUP BY image, title, price, offers,views,p.link ORDER BY views DESC LIMIT 20";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute();
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