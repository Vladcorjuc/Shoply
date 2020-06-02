<?php

class Product
{
    private $connection;
    private $table = "products";
    private $id;
    private $category;
    private $link;
    private $title;
    private $description;
    private $price;
    private $currency;
    private $offers;
    private $image;
    private $vendors;
    private $views;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function setConnection($connection)
    {
        $this->connection = $connection;
    }

    public function getTable()
    {
        return $this->table;
    }

    public function setTable(string $table)
    {
        $this->table = $table;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setCategory($category)
    {
        $this->category = $category;
    }

    public function getLink()
    {
        return $this->link;
    }

    public function setLink($link)
    {
        $this->link = $link;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getCurrency()
    {
        return $this->currency;
    }

    public function setCurrency($currency)
    {
        $this->currency = $currency;
    }

    public function getOffers()
    {
        return $this->offers;
    }

    public function setOffers($offers)
    {
        $this->offers = $offers;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getVendors()
    {
        return $this->vendors;
    }

    public function setVendors($vendors)
    {
        $this->vendors = $vendors;
    }

    public function getViews()
    {
        return $this->views;
    }

    public function setViews($views)
    {
        $this->views = $views;
    }

    public function readAll()
    {
        $statement = "SELECT * FROM products p JOIN categories c on p.link = c.link ORDER BY p.id";
        $query = $this->connection->prepare($statement);
        $query->execute();
        return $query;
    }

    public function readById()
    {
        $statement = "SELECT * FROM products p JOIN categories c on p.link = c.link WHERE p.id = :id";
        $query = $this->connection->prepare($statement);
        $query->execute(array("id" => $this->id));
        return $query;
    }

    public function readByCategory()
    {
        $statement = "SELECT * FROM products p JOIN categories c on p.link = c.link WHERE category = :category ORDER BY p.id";
        $query = $this->connection->prepare($statement);
        $query->execute(array("category" => $this->category));
        return $query;
    }

    public function create() {
        $statement = "INSERT INTO products SET link = :link, title = :title, price = :price";
        $query = $this->connection->prepare($statement);
        return $query->execute(array("link" => $this->link, "title" => $this->title, "price" => $this->price));
    }

    public function updatePrice() {
        $statement = "UPDATE products SET price = :price WHERE id = :id";
        $query = $this->connection->prepare($statement);
        if ($query->execute(array("price" => $this->price, "id" => $this->id))) {
            $statement = "INSERT INTO product_log (link, price) VALUES (:link, :price)";
            $query = $this->connection->prepare($statement);
            return $query->execute(array("link" => $this->link, "price" => $this->price));
        }
        return false;
    }

    public function deleteById() {
        $statement = "DELETE FROM products WHERE id = :id";
        $query = $this->connection->prepare($statement);
        return $query->execute(array("id" => $this->id));
    }
}
