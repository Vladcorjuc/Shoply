let parameters = new URLSearchParams(window.location.search);
let category;
if (parameters.has("category")) {
    category = parameters.get("category");
} else {
    category = "birou";
}
let sortBy;
if (parameters.has("sort-by")) {
    sortBy = parameters.get("sort-by");
} else {
    sortBy = "most-popular";
}
let categoriesRequest = new XMLHttpRequest();
categoriesRequest.onreadystatechange = addCategories;
categoriesRequest.open("GET", "../php/controllers/products_controller.php?categories=true", true);
categoriesRequest.send();

const selectedOption = document.getElementsByClassName("selected-option")[0];
const options = document.getElementsByClassName("options")[0];
let arrow = document.createElement("div");
arrow.setAttribute("class", "arrow");
const optionList = document.querySelectorAll(".option");
selectedOption.textContent = document.getElementsByClassName(sortBy)[0].textContent;
arrow = document.createElement("div");
arrow.setAttribute("class", "arrow");
selectedOption.appendChild(arrow);
selectedOption.addEventListener("click", () => {
    options.classList.toggle("active");
    arrow.classList.toggle("active");
});
optionList.forEach(option => {
    option.addEventListener("click", () => {
        selectedOption.textContent = option.getElementsByTagName("label")[0].textContent;
        arrow = document.createElement("div");
        arrow.setAttribute("class", "arrow");
        selectedOption.appendChild(arrow);
        options.classList.remove("active");
        option.addEventListener("click", () => {
            const newSortBy = option.getElementsByTagName("input")[0].id;
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname +
                "?category=" + category + "&sort-by=" + newSortBy;
            window.history.pushState({path: newUrl}, "", newUrl);
            productsRequest = new XMLHttpRequest();
            productsRequest.onreadystatechange = addProducts;
            productsRequest.open("GET", "../php/controllers/products_controller.php?category="
                + category + "&" + "sort-by=" + newSortBy, true);
            productsRequest.send();
        });
    });
});

let productsRequest = new XMLHttpRequest();
productsRequest.onreadystatechange = addProducts;
productsRequest.open("GET", "../php/controllers/products_controller.php?category=" + category +
    "&sort-by=" + sortBy, true);
productsRequest.send();

function addCategories() {
    if (this.readyState === categoriesRequest.DONE && this.status === 200) {
        let categoriesElement = document.getElementsByClassName("categories")[0];
        let categoryObjects = JSON.parse(decodeURIComponent(this.responseText));
        categoryObjects.forEach(categoryObject => {
            let categoryElement = document.createElement("li");
            categoryElement.setAttribute("class", "category");
            let newCategory = categoryObject.category;
            categoryElement.textContent = newCategory[0].toUpperCase() + newCategory.slice(1);
            categoryElement.addEventListener("click", () => {
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname +
                    "?category=" + newCategory + "&sort-by=most-popular";
                window.history.pushState({path: newUrl}, "", newUrl);
                selectedOption.textContent = "Cele mai populare";
                arrow = document.createElement("div");
                arrow.setAttribute("class", "arrow");
                selectedOption.appendChild(arrow);
                productsRequest = new XMLHttpRequest();
                productsRequest.onreadystatechange = addProducts;
                productsRequest.open("GET", "../php/controllers/products_controller.php?category="
                    + newCategory + "&sort-by=most-popular", true);
                productsRequest.send();
            });
            categoriesElement.appendChild(categoryElement);
        });
    }
}

function addProducts() {
    if (this.readyState === productsRequest.DONE && this.status === 200) {
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
