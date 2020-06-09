let mostViewsRequest = new XMLHttpRequest();
mostViewsRequest.onreadystatechange = createProducts;
mostViewsRequest.open("GET", "../php/controllers/most_views_controller.php?views=1", true);
mostViewsRequest.send();

function createProducts() {
    if (this.readyState === mostViewsRequest.DONE && this.status === 200) {
        let container = document.getElementById("most-view-container");
        let productObjects = JSON.parse(this.responseText);
        for (let index = 0; index < productObjects.length; ++index) {
            let productObject = productObjects[index];
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

            container.appendChild(productElement);
        }
    }
}


let forward = document.getElementById('right-arrow');
forward.onclick = function () {
    var container = document.getElementById('most-views');
    sideScroll(container, 'right', 1, 960, 10);
};

var back = document.getElementById('left-arrow');
back.onclick = function () {
    var container = document.getElementById('most-views');
    sideScroll(container, 'left', 1, 883, 10);
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