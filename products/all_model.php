<?php
require_once '../database/database.php';
require_once 'all_view.php';

class AllModel
{
    public function getAllForCard()
    {
        $query = "SELECT image, title, price, offers FROM products LIMIT 10";
        $statement = Database::getConnection()->prepare($query);
        $statement->execute();
        $all = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $record = array
            (
                "image" => $row["image"],
                "title" => $row["title"],
                "price" => $row["price"],
                "offers" => $row["offers"],
            );
            array_push($all, $record);
        }
        return $all;
    }
}
