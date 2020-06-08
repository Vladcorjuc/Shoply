let parameters = new URLSearchParams(window.location.search);
let name;
if (parameters.has("name")) {
    name = parameters.get("name");
} else {
    name = "copiatoare-c83-xerox-workcentre-6515v-dn-p352968539";
}

let productInformationRequest = new XMLHttpRequest();
productInformationRequest.onreadystatechange = addProductInformation;
productInformationRequest.open("GET", "../php/controllers/product_controller.php?name=" + name, true);
productInformationRequest.send();

function addProductInformation() {
    if (this.readyState === productInformationRequest.DONE && this.status === 200) {
        let productInformation = JSON.parse(this.responseText);
        let image = document.getElementsByClassName("image")[0];
        image.setAttribute("src", decodeURIComponent(productInformation.image));

        let characteristics = document.getElementsByClassName("characteristics")[0];
        if (productInformation.characteristics === "") {
            characteristics.setAttribute("style", "display:none;");
        }
        else {
            characteristics.innerHTML = productInformation.characteristics;
        }

        let title = document.getElementsByClassName("title")[0];
        title.textContent = productInformation.title;

        let price = document.getElementsByClassName("price")[0];
        let priceText = document.createTextNode("de la " + productInformation.price);
        price.appendChild(priceText);
        let decimals = document.createElement("sup");
        decimals.textContent = "99";
        price.appendChild(decimals);
        if (parseInt(productInformation.price) < 20) {
            let currency = document.createTextNode(" Lei");
            price.appendChild(currency);
        }
        else {
            let currency = document.createTextNode(" de Lei");
            price.appendChild(currency);
        }

        let offers = document.getElementsByClassName("offers")[0];
        let words = productInformation.offers.split(" ");
        if (words[0] === "o" || parseInt(words[0]) < 1) {
            offers.textContent = "(o oferta)";
        }
        else if (parseInt(words[0]) < 20) {
            offers.textContent = "(" + words[0] + " oferte)";
        }
        else {
            offers.textContent = "(" + words[0] + " de oferte)";
        }

        let views = document.getElementsByClassName("views")[0];
        if (productInformation.views === 1) {
            views.textContent = "o vizualizare";
        }
        else if (productInformation.views < 20) {
            views.textContent = productInformation.views + " vizualizari";
        }
        else {
            views.textContent = productInformation.views + " de vizualizari";
        }
    }
}