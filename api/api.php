<?php
header("Content-Type:application/json");
if (isset($_GET['search']) && $_GET['search']!="") {
    #include('db.php');
    $search = $_GET['order_id'];
    $json_response = file_get_contents('https://www.facebook.com/');
    echo $json_response;
}
if (isset($_GET['category']) && $_GET['category']!="") {
    include('db.php');
    $genre = $_GET['category'];

    $stmt = $con->prepare("SELECT * FROM categories WHERE genre = ?");
    $stmt->bind_param("s", $genre);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows === 0) {
        categoryResponse(NULL, NULL, 200,"No Record Found");
    }
    else{
        while($row = $result->fetch_assoc()) {
            $response_code = 200;
            $response_desc = "Product searched";
            $product_link =$row['link'];
            categoryResponse($genre, $product_link, $response_code,$response_desc);
        }
    }
    mysqli_close($con);

}
if (isset($_GET['price_fluct']) && $_GET['price_fluct']!="") {
    include('db.php');
    $link = $_GET['price_fluct'];

    $stmt = $con->prepare("SELECT * FROM product_log where link=?");
    $stmt->bind_param("s", $link);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows === 0) {
        productLogResponse(NULL, NULL,NULL, 200,"No Record Found");
    }
    else{
        while($row = $result->fetch_assoc()) {
            $response_code = 200;
            $response_desc = "Price fluctuation for selected product";
            $date =$row['date_update'];
            $price=$row['price'];
            productLogResponse($date, $price,$product_link, $response_code,$response_desc);
        }
    }
    mysqli_close($con);

}


else{
    response( 400,"Invalid Request");
}

function categoryResponse($genre,$product_link,$response_code,$response_desc){
    $response['genre'] = $genre;
    $response['product_link'] = $product_link;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}
function productLogResponse($date,$product_link,$price,$response_code,$response_desc){
    $response['product_link'] = $product_link;
    $response['date'] = $date;
    $response['price']=$price;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}
function response($response_code,$response_desc){
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
}
?>
