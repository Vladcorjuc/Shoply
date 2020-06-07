<?php
require_once __DIR__ . "/../../database/database.php";

function getProductInformation($name)
{
    if (strpos($name, "_")) {
        $name = explode("_", $name)[1];
    }
    $name = str_replace("-", "", $name);
    $query = "SELECT title, characteristics, description, price, image, COALESCE(FLOOR(AVG(rating)), 0) AS rating, " .
        "COUNT(rating) AS ratings, offers, views FROM products p LEFT JOIN rating r ON p.link = r.product " .
        "WHERE REPLACE(REPLACE(link, '/', ''), '-', '') LIKE CONCAT('%', :name, '%') GROUP BY title, characteristics, " .
        "description, price, image, offers, views";
    $statement = Database::getConnection()->prepare($query);
    $statement->execute(array("name" => $name));
    if ($statement->rowCount() == 0) {
        echo "ana";
        return null;
    }
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    return array
    (
        "title" => $row["title"],
        "characteristics" => str_replace("<b> ", "<b>", trim($row["characteristics"])),
        "description" => str_replace("\n ", "\n\t", preg_replace("/ +/", " ",
            str_replace("\xc2\xa0", " ", trim($row["description"])))),
        "price" => $row["price"],
        "image" => urlencode($row["image"]),
        "rating" => $row["rating"],
        "ratings" => $row["ratings"],
        "offers" => $row["offers"],
        "views" => $row["views"]
    );
}