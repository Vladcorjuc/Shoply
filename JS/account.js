let historyRequest = new XMLHttpRequest();
historyRequest.onreadystatechange = createHistory;
historyRequest.open("GET", "../php/controllers/get_history_controller.php?history=true", true);
historyRequest.send();


let suggestRequest = new XMLHttpRequest();
suggestRequest.onreadystatechange = createSlider;
suggestRequest.open("GET", "../php/controllers/suggestion_controller.php?suggest=true", true);
suggestRequest.send();


function createSlider() {
    if (this.readyState === suggestRequest.DONE && this.status === 200) {
        let container = document.getElementById("product-suggest-container");
        let productObjects = JSON.parse(this.responseText);
        if (productObjects.length > 0) {
            document.getElementById("suggestion").style.display = "block";
        }
        for (let index = 0; index < productObjects.length; ++index) {
            let productObject = productObjects[index];
            let productElement = document.createElement("div");
            productElement.setAttribute("class", "product");

            let productImageAnchor = document.createElement("a");
            productImageAnchor.setAttribute("href", "../html/product.html?name=" +
                scrapePathName(productObject.link));
            let productImage = document.createElement("img");
            productImage.setAttribute("src", decodeURIComponent(productObject.image));
            productImage.setAttribute("class", "image");

            productImageAnchor.appendChild(productImage);
            productElement.appendChild(productImageAnchor);

            let productTitleAnchor = document.createElement("a");
            productTitleAnchor.setAttribute("href", "../html/product.html?name=" +
                scrapePathName(productObject.link));
            let productTitle = document.createElement("div");
            productTitle.setAttribute("class", "title");
            productTitle.textContent = parseTitle(productObject.title);
            productTitleAnchor.appendChild(productTitle);
            productElement.appendChild(productTitleAnchor);

            let productRating = document.createElement("div");
            productRating.setAttribute("class", "rating");
            let star = 0;
            for (; star < productObject.rating; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "on fa fa-star");
                starElement.style.fontSize = "15px";
                productRating.appendChild(starElement);
            }
            for (; star < 5; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "off fa fa-star");
                starElement.style.fontSize = "15px";
                productRating.appendChild(starElement);
            }
            productElement.appendChild(productRating);

            let productPrice = document.createElement("div");
            productPrice.setAttribute("class", "price");
            productPrice.textContent = "De la " + addPoint(productObject.price) + " Lei";
            productElement.appendChild(productPrice);

            let productOffers = document.createElement("div");
            productOffers.setAttribute("class", "offers");
            productOffers.textContent = "(" + productObject.offers + ")";
            productElement.appendChild(productOffers);

            container.appendChild(productElement);
        }
    }
}

function createHistory() {
    if (this.readyState === historyRequest.DONE && this.status === 200) {
        let container = document.getElementById("history");
        let productObjects = JSON.parse(this.responseText);
        for (productObject of productObjects) {
            let productElement = document.createElement("div");
            productElement.setAttribute("class", "product");
            let productImageAnchor = document.createElement("a");
            productImageAnchor.setAttribute("href", "../html/product.html?name=" +
                scrapePathName(decodeURIComponent(productObject.link)));
            let productImage = document.createElement("img");
            productImage.setAttribute("src", decodeURIComponent(productObject.image));
            productImage.setAttribute("class", "image");
            productImageAnchor.appendChild(productImage);
            productElement.appendChild(productImageAnchor);

            let productTitleAnchor = document.createElement("a");
            productTitleAnchor.setAttribute("href", "../html/product.html?name=" +
                scrapePathName(decodeURIComponent(productObject.link)));
            let productTitle = document.createElement("div");
            productTitle.setAttribute("class", "title");
            productTitle.textContent = parseTitle(productObject.title);
            productTitleAnchor.appendChild(productTitle);
            productElement.appendChild(productTitleAnchor);

            let productRating = document.createElement("div");
            productRating.setAttribute("class", "rating");
            let star = 0;
            for (; star < productObject.rating; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "on fa fa-star");
                productRating.appendChild(starElement);
            }
            for (; star < 5; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "off fa fa-star");
                productRating.appendChild(starElement);
            }
            productElement.appendChild(productRating);

            let productPrice = document.createElement("div");
            productPrice.setAttribute("class", "price");
            let price = document.createTextNode("de la " + addPoint(productObject.price));
            productPrice.appendChild(price);
            let decimals = document.createElement("sup");
            decimals.textContent = "99";
            productPrice.appendChild(decimals);
            if (parseInt(productObject.price) < 20) {
                let currency = document.createTextNode(" Lei");
                productPrice.appendChild(currency);
            } else {
                let currency = document.createTextNode(" de Lei");
                productPrice.appendChild(currency);
            }
            productElement.appendChild(productPrice);

            let productOffers = document.createElement("div");
            productOffers.setAttribute("class", "offers");
            let words = productObject.offers.split(" ");
            if (words[0] === "o" || parseInt(words[0]) < 1) {
                productOffers.textContent = "(o oferta)";
            } else if (parseInt(words[0]) < 20) {
                productOffers.textContent = "(" + words[0] + " oferte)";
            } else {
                productOffers.textContent = "(" + words[0] + " de oferte)";
            }
            productElement.appendChild(productOffers);
            container.appendChild(productElement);
        }
    }
}


let logoutButton = document.getElementsByClassName("button")[0].addEventListener("click", function () {
    let unsetSessionRequest = new XMLHttpRequest();
    unsetSessionRequest.onreadystatechange = function () {
        location.replace("../php/login.php")
    };
    unsetSessionRequest.open("GET", "../php/controllers/logout_controller.php?logout=true", true);
    unsetSessionRequest.send();
});

let forward = document.getElementById('right-arrow');
forward.onclick = function () {
    var container = document.getElementById('product-suggest');
    sideScroll(container, 'right', 1, 100, 10);
};

var back = document.getElementById('left-arrow');
back.onclick = function () {
    var container = document.getElementById('product-suggest');
    sideScroll(container, 'left', 1, 100, 10);
};

function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
        if (direction === 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}