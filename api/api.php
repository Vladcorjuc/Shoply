<?php
require_once '../database/database.php';

    header("Content-Type:application/json");
    if (isset($_GET['search']) && $_GET['search']!="") {
        $search = $_GET['search'];
        $search_url = "https://127.0.0.1/search?search=".$search;
        $json_file=file_get_contents($search_url);
        if($json_file!=""){
            searchResponse($json_file,200,"list of searched products.");
        }
        else{
            searchResponse("",200,"No product found.");
        }
    }
} else if (isset($_GET['category']) && $_GET['category'] != "") {
    $category = $_GET['category'];

    $statement = "SELECT * FROM categories WHERE category = :category";
    $query = Database::getConnection()->prepare($statement);
    $query->execute(array('category' => $category));
    if ($query->rowCount() == 0) {
        categoryResponse(NULL, NULL, 200, "No record found.");
    } else {
        $rows = $query->fetch(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            categoryResponse($row['link'], $category, 200, "Product searched");
        }
    }
} else if (isset($_GET['price_fluct']) && $_GET['price_fluct'] != "") {
    $link = $_GET['price_fluct'];

    $statement = "SELECT * FROM product_log WHERE link = :link";
    $query = Database::getConnection()->prepare($statement);
    $query->execute(array('link' => $link));
    if ($query->rowCount() == 0) {
        productLogResponse(NULL, NULL, NULL, 200,
            "No record found");
    } else {
        $rows = $query->fetch(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            productLogResponse($link, $row['price'], $row['updated_at'], 200,
                "Price fluctuation for selected product");
        }
    }
} else if (isset($_GET['info']) && $_GET['info'] != "") {
    $inipath = php_ini_loaded_file();

    if ($inipath) {
        echo 'Loaded php.ini: ' . $inipath;
    } else {
        echo 'A php.ini file is not loaded';
    }
} else {
    response(400, "Invalid Request");
}

function categoryResponse($product_link, $category, $response_code, $response_desc)
{
    $response['product_link'] = $product_link;
    $response['category'] = $category;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}

function productLogResponse($product_link, $price, $date, $response_code, $response_desc)
{
    $response['product_link'] = $product_link;
    $response['price'] = $price;
    $response['date'] = $date;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}

function searchResponse($search_json, $response_code, $response_desc)
{
    $response['search-jon'] = $search_json;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}

function response($response_code, $response_desc)
{
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}
