let currentCategory="calculatoare";
init();
let categoryRequest = new XMLHttpRequest();
makeRequest();

document.getElementById("first-category").addEventListener("click", function () {
    deleteNavClass();
    currentCategory="calculatoare";
    document.getElementById("first-category").style.color="white";
    document.getElementById("first-category").classList.add("selected-category");
    makeRequest();
});
document.getElementById("second-category").addEventListener("click", function () {
    deleteNavClass();
    currentCategory="electronice";
    document.getElementById("second-category").style.color="white";
    document.getElementById("second-category").classList.add("selected-category");
    makeRequest();
});
document.getElementById("third-category").addEventListener("click", function () {
    deleteNavClass();
    currentCategory="jucarii";
    document.getElementById("third-category").style.color="white";
    document.getElementById("third-category").classList.add("selected-category");
    makeRequest();
});
document.getElementById("fourth-category").addEventListener("click", function () {
    deleteNavClass();
    currentCategory="sport";
    document.getElementById("fourth-category").style.color="white";
    document.getElementById("fourth-category").classList.add("selected-category");
    makeRequest();
});

function deleteNavClass() {
    document.getElementById("first-category").classList.remove("selected-category");
    document.getElementById("first-category").style.color="coral";

    document.getElementById("second-category").classList.remove("selected-category");
    document.getElementById("second-category").style.color="coral";

    document.getElementById("third-category").classList.remove("selected-category");
    document.getElementById("third-category").style.color="coral";

    document.getElementById("fourth-category").classList.remove("selected-category");
    document.getElementById("fourth-category").style.color="coral";
}
function init() {
    deleteNavClass();
    currentCategory="calculatoare";
    document.getElementById("first-category").style.color="white";
    document.getElementById("first-category").classList.add("selected-category");
}
function createProducts() {
    if (this.readyState === categoryRequest.DONE && this.status === 200) {
        let container = document.getElementById("category-container");
        document.getElementById("category-container").innerHTML='';
        let productObjects = JSON.parse(this.responseText);
        for (let index = 0; index < productObjects.length; ++index) {
            let productObject = productObjects[index];
            let productElement = document.createElement("div");
            productElement.setAttribute("class", "product");
            productElement.style.width="215px";
            productElement.style.minHeigh="300px";

            let productImage = document.createElement("img");
            productImage.setAttribute("src", decodeURIComponent(productObject.image));
            productImage.setAttribute("class", "image");
            productElement.appendChild(productImage);

            let productTitle = document.createElement("div");
            productTitle.setAttribute("class", "title");
            productTitle.textContent = parseTitle(productObject.title);
            productElement.appendChild(productTitle);

            let productRating = document.createElement("div");
            productRating.setAttribute("class", "rating");
            let star = 0;
            for (; star < productObject.rating; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "on fa fa-star");
                starElement.style.fontSize="15px";
                productRating.appendChild(starElement);
            }
            for (; star < 5; ++star) {
                let starElement = document.createElement("i");
                starElement.setAttribute("class", "off fa fa-star");
                starElement.style.fontSize="15px";
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

            container.appendChild(productElement);
        }
    }
}
function makeRequest() {
    categoryRequest=new XMLHttpRequest();
    categoryRequest.onreadystatechange = createProducts;
    categoryRequest.open("GET", "../php/controllers/home-products-controller.php?category=".concat(currentCategory), true);
    categoryRequest.send();
}
function parseTitle(title) {
    var words = title.split(/,| |-/);
    if(words.length<=6)
        return title;
    var newTitle=words[0];
    for(var i=1;i<6;i++){
        if(words[i]!=="cu") {
            newTitle = newTitle.concat(" " + words[i]);
        }
    }
    return newTitle;
}