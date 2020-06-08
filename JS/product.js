let parameters = new URLSearchParams(window.location.search);
let name;
if (parameters.has("name")) {
    name = parameters.get("name");
} else {
    name = "copiatoare-c83-xerox-workcentre-6515v-dn-p352968539";
}

let historyRequest = new XMLHttpRequest();
historyRequest.onreadystatechange = addView;
historyRequest.open("GET", "../php/controllers/history_controller.php?name=" + name, true);
historyRequest.send();

let productInformationRequest = new XMLHttpRequest();
productInformationRequest.onreadystatechange = addProductInformation;
productInformationRequest.open("GET", "../php/controllers/product_controller.php?name=" + name, true);
productInformationRequest.send();

function addView() {
    if (this.readyState === historyRequest.DONE) {
        let response = JSON.parse(this.responseText);
    }
}

function addProductInformation() {
    if (this.readyState === productInformationRequest.DONE && this.status === 200) {
        let productInformation = JSON.parse(this.responseText);
        let image = document.getElementsByClassName("image")[0];
        image.setAttribute("src", decodeURIComponent(productInformation.image));

        let characteristics = document.getElementsByClassName("characteristics")[0];
        if (productInformation.characteristics === "") {
            characteristics.setAttribute("style", "display:none;");
        } else {
            characteristics.innerHTML = productInformation.characteristics;
        }

        let title = document.getElementsByClassName("title")[0];
        title.textContent = productInformation.title;

        let starElement = document.getElementById("rating-" + productInformation.rating);
        starElement.checked = true;
        for (let stars = 1; stars <= 5; ++stars) {
            let starElement = document.getElementById("rating-" + stars);
            starElement.addEventListener("click", () => {
                let ratingRequest = new XMLHttpRequest();
                ratingRequest.onreadystatechange = addMessage;
                ratingRequest.open("GET", "../php/controllers/rating_controller.php?name="
                    + name + "&" + "stars=" + stars, true);
                ratingRequest.send();
            });
        }

        updateRatings(productInformation);

        let price = document.getElementsByClassName("price")[0];
        let priceText = document.createTextNode("de la " + addPoint(productInformation.price));
        price.appendChild(priceText);
        let decimals = document.createElement("sup");
        decimals.textContent = "99";
        price.appendChild(decimals);
        if (parseInt(productInformation.price) < 20) {
            let currency = document.createTextNode(" Lei");
            price.appendChild(currency);
        } else {
            let currency = document.createTextNode(" de Lei");
            price.appendChild(currency);
        }

        let offers = document.getElementsByClassName("offers")[0];
        let words = productInformation.offers.split(" ");
        if (words[0] === "o" || parseInt(words[0]) < 1) {
            offers.textContent = "(o oferta)";
        } else if (parseInt(words[0]) < 20) {
            offers.textContent = "(" + words[0] + " oferte)";
        } else {
            offers.textContent = "(" + words[0] + " de oferte)";
        }

        updateViews(productInformation);
    }
}

function addMessage() {
    if (this.readyState === productInformationRequest.DONE) {
        let response = JSON.parse(this.responseText);
        let ratingText = document.getElementsByClassName("rating-text")[0];
        ratingText.textContent = response.message;
        productInformationRequest = new XMLHttpRequest();
        productInformationRequest.onreadystatechange = updateRating;
        productInformationRequest.open("GET", "../php/controllers/product_controller.php?name=" + name +
            "&rating=true", true);
        productInformationRequest.send();
    }
}

function updateRating() {
    if (this.readyState === productInformationRequest.DONE && this.status === 200) {
        let productInformation = JSON.parse(this.responseText);
        let starElement = document.getElementById("rating-" + productInformation.rating);
        starElement.checked = true;
        updateRatings(productInformation);
    }
}

function updateRatings(productInformation) {
    let ratings = document.getElementsByClassName("ratings")[0];
    let ratingsNumber = parseInt(productInformation.ratings);
    if (ratingsNumber === 1) {
        ratings.textContent = "(un vot)";
    }
    else if (ratingsNumber < 20) {
        ratings.textContent = "(" + ratingsNumber + " voturi)";
    }
    else {
        ratings.textContent = "(" + ratingsNumber + " de voturi)";
    }
}

function updateViews(productInformation) {
    let views = document.getElementsByClassName("views")[0];
    let viewsNumber = parseInt(productInformation.views);
    if (viewsNumber=== 1) {
        views.textContent = "o vizualizare";
    } else if (viewsNumber < 20) {
        views.textContent = viewsNumber + " vizualizari";
    } else {
        views.textContent = viewsNumber + " de vizualizari";
    }
}
