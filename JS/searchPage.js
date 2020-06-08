let parameters = new URLSearchParams(window.location.search);
let searchQuery;
removeMessages();
if (parameters.has("search")) {
    searchQuery = parameters.get("search");
} else {
    createNoFoundMessage();
}
let searchRequest = new XMLHttpRequest();
searchRequest.onreadystatechange = addProducts;


searchRequest.onloadend = listenMessage;
searchRequest.open("GET", "../php/controllers/search_controller.php?text=" + searchQuery, true);
searchRequest.send();


function listenMessage() {
    if (this.status === 404) {
        removeMessages();
        createNoFoundMessage();
    }
}

function addProducts() {
    if (this.readyState === searchRequest.DONE && this.status === 200) {
        removeMessages();
        createFoundMessage();
        let productsElement = document.getElementsByClassName("products")[0];
        if (typeof productsElement !== "undefined") {
            productsElement.parentNode.removeChild(productsElement);
        }
        productsElement = document.createElement("div");
        productsElement.setAttribute("class", "products");
        let container = document.getElementsByClassName("container")[0];
        container.appendChild(productsElement);
        let productObjects = JSON.parse(this.responseText);
        let productObject;
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

            productsElement.appendChild(productElement);
        }
    }
}

function createFoundMessage() {
    let messageDiv = document.getElementById("found-message");
    messageDiv.style.display = "block";
}

function createNoFoundMessage() {
    let messageDiv = document.getElementById("no-found-message");
    messageDiv.style.display = "block";
}

function removeMessages() {
    document.getElementById("no-found-message").style.display = "none";
    document.getElementById("found-message").style.display = "none";
}