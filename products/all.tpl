<!DOCTYPE html>
<html lang="ro">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="icon.png">
    <link rel="stylesheet" type="text/css" href="all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="all.js" defer></script>
    <title>Shoply</title>
</head>
<body>
<div class="menu-bar">
    <nav class="navigation-bar">
        <a href="../index/index.html"><img src="logo.png" alt="Shoply" class="logo"></a>
        <div class="search-box">
            <label>
                <input class="search-text" type="text" placeholder="Search product">
            </label>
            <a class="search-button" href="#"><i class="fa fa-search"></i></a>
        </div>
        <div class="menu-icons">
            <a class="search-icon" href="#"><i class="fa fa-search"></i></a>
            <div class="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="navigation-bar-links">
            <ul class="menu">
                <li><a href="#">Products</a></li>
                <li><a href="#">Extension</a></li>
                <li><a href="../login/login.php">Account</a></li>
            </ul>
        </div>
    </nav>
    <hr class="horizontal-line">
</div>
<div class="container">
    <aside>
        <ul class="categories">
            <li>Construcție</li>
            <li>Electronice</li>
            <li>Calculatoare</li>
            <li>Electrocasnice</li>
            <li>Îmbrăcăminte</li>
            <li>Sport</li>
            <li>Sănătate</li>
            <li>Bebeluși</li>
            <li>Casă</li>
            <li>Auto</li>
            <li>Jucării</li>
            <li>Birou</li>
        </ul>
    </aside>
    <div class="products">
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/609787002.apple-iphone-11-64gb.jpg" class="image" id="image-1">
            <div class="title" id="title-1">Apple iPhone 11 64GB Telefoane mobile</div>
            <div class="rating-group">
                <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">
                <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star fa fa-star" id="first"></i></label>
                <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio">
                <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio">
                <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio">
                <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio">
                <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
                <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio">
            </div>
            <div class="price" id="price-1">3275 RON</div>
            <div class="offers" id="offers-1">(173 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/557027181.samsung-galaxy-s10-128gb-dual-g973.jpg" class="image" id="image-2">
            <div class="title" id="title-2">Samsung Galaxy S10 128GB Dual G973 Telefoane mobile</div>
            <div class="price" id="price-2">2503 RON</div>
            <div class="offers" id="offers-2">(131 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/644419776.samsung-galaxy-a71-128gb-6gb-ram-dual-a715f.jpg" class="image" id="image-3">
            <div class="title" id="title-3">Samsung Galaxy A71 128GB 6GB RAM Dual (A715F) Telefoane mobile</div>
            <div class="price" id="price-3">1684 RON</div>
            <div class="offers" id="offers-3">(107 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/641348214.samsung-galaxy-a51-128gb-4gb-ram-dual.jpg" class="image" id="image-4">
            <div class="title" id="title-4">Samsung Galaxy A51 128GB 4GB RAM Dual Telefoane mobile</div>
            <div class="price" id="price-4">1300 RON</div>
            <div class="offers" id="offers-4">(110 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/565057371.huawei-p30-pro-128gb-6gb-ram-dual.jpg" class="image" id="image-5">
            <div class="title" id="title-5">Huawei P30 Pro 128GB 6GB RAM Dual Telefoane mobile</div>
            <div class="price" id="price-5">2284 RON</div>
            <div class="offers" id="offers-5">(111 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/557026686.samsung-galaxy-s10-128gb-dual-g975.jpg" class="image" id="image-6">
            <div class="title" id="title-6">Samsung Galaxy S10+ 128GB Dual G975 Telefoane mobile</div>
            <div class="price" id="price-6">2699 RON</div>
            <div class="offers" id="offers-6">(128 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/565365213.samsung-galaxy-a40-64gb-dual-a405.jpg" class="image" id="image-7">
            <div class="title" id="title-7">Samsung Galaxy A40 64GB Dual A405 Telefoane mobile</div>
            <div class="price" id="price-7">899 RON</div>
            <div class="offers" id="offers-7">(72 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/609787038.apple-iphone-11-pro-64gb.jpg" class="image" id="image-8">
            <div class="title" id="title-8">Apple iPhone 11 Pro 64GB Telefoane mobile</div>
            <div class="price" id="price-8">4468 RON</div>
            <div class="offers" id="offers-8">(129 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/654985395.samsung-galaxy-s20-128gb-8gb-ram-dual.jpg" class="image" id="image-9">
            <div class="title" id="title-9">Samsung Galaxy S20 128GB 8GB RAM Dual Telefoane mobile</div>
            <div class="price" id="price-9">3305 RON</div>
            <div class="offers" id="offers-9">(118 oferte)</div>
        </div>
        <div class="product">
            <img src="https://p1.akcdn.net/thumb/664788213.huawei-p40-lite-128gb-6gb-ram-dual.jpg" class="image" id="image-10">
            <div class="title" id="title-10">Huawei P40 Lite 128GB 6GB RAM Dual Telefoane mobile</div>
            <div class="price" id="price-10">1099 RON</div>
            <div class="offers" id="offers-10">(55 oferte)</div>
        </div>
    </div>
</div>
<footer>
    <div class="simple-footer-line"><br></div>
    <div class="copyright-text">© Copyright 2020 shoply.com</div>
</footer>
</body>
</html>
