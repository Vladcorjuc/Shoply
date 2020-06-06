let categoriesRequest = new XMLHttpRequest();
categoriesRequest.onreadystatechange = addCategories;
categoriesRequest.open("GET", "../php/controllers/products_controller.php?categories=1", true);
categoriesRequest.send();

function addCategories() {
    if (this.readyState === categoriesRequest.DONE && this.status === 200) {
        let categoriesElement = document.getElementsByClassName("categories")[0];
        let categoryObjects = JSON.parse(decodeURIComponent(this.responseText));
        categoryObjects.forEach(categoryObject => {
            let categoryElement = document.createElement("li");
            categoryElement.setAttribute("class", "category");
            let categoryName = categoryObject.category;
            categoryElement.textContent = categoryName[0].toUpperCase() + categoryName.slice(1);
            categoryElement.addEventListener('click', () => {
                let productsRequest = new XMLHttpRequest();
                productsRequest.onreadystatechange = addProducts;
                productsRequest.open("GET", "../php/controllers/products_controller.php?category="
                    + categoryName, true);
                productsRequest.send();
            });
            categoriesElement.appendChild(categoryElement);
        });
    }
}

function addProducts() {
    if (this.readyState === categoriesRequest.DONE && this.status === 200) {
        let productsElement = document.getElementsByClassName("products")[0];
        if (typeof productsElement !== "undefined") {
            productsElement.parentNode.removeChild(productsElement);
        }
        productsElement = document.createElement("div");
        productsElement.setAttribute("class", "products");
        let container = document.getElementsByClassName("container")[0];
        container.appendChild(productsElement);
        let productObjects = JSON.parse(this.responseText);
        for (let index = 0; index < productObjects.length; ++index) {
            let productObject = productObjects[index];
            let productElement = document.createElement("div");
            productElement.setAttribute("class", "product");
            let productImage = document.createElement("img");
            productImage.setAttribute("src", decodeURIComponent(productObject.image));
            productImage.setAttribute("class", "image");
            productElement.appendChild(productImage);

            let productTitle = document.createElement("div");
            productTitle.setAttribute("class", "title");
            productTitle.textContent = productObject.title;
            productElement.appendChild(productTitle);

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
            productPrice.textContent = productObject.price + " Lei";
            productElement.appendChild(productPrice);

            let productOffers = document.createElement("div");
            productOffers.setAttribute("class", "offers");
            productOffers.textContent = "(" + productObject.offers + ")";
            productElement.appendChild(productOffers);

            productsElement.appendChild(productElement);
        }
    }
}
