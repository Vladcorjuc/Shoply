let contentPanel = null;
let alternativesButton = null;
let priceButton = null;
let similarButton = null;
let searchButton = null;
let products = null;
let isProductSelected = false;
let selectedProduct = null;
let response = null;
//let hostOn="https://shoply-scraper.ew.r.appspot.com";
let hostOn = "https://127.0.0.1:5000";

window.onload = function () {
    contentPanel = document.getElementById("content");
    alternativesButton = document.getElementById("alternatives-button");
    priceButton = document.getElementById("price-button");
    similarButton = document.getElementById("similar-products-button");
    searchButton = document.getElementById("search-button");
    if (document.readyState !== "loading") {
        ExtensionView.firstMenuOption();
        ExtensionController.pageController();
    } else {
        contentPanel.innerHTML = "<p>celka</p>";
        ExtensionView.firstMenuOption();
        document.addEventListener("DOMContentLoaded", ExtensionController.pageController());
    }
};

class ExtensionModel {
    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie += cname + "=" + cvalue + ";" + expires + ";path=/\n";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static readyStateChange(xmlHttpRequest) {
        xmlHttpRequest.onreadystatechange = function () {
            // readyState: 0 = unsent, 1 = opened, 2 = headers_received, 3 = loading, 4 = done
            if (this.readyState === 1) {
                ExtensionView.activateLoadingScreen();
            }
            if (this.readyState === 4) {
                if (this.status === 200) {
                    response = {data: JSON.parse(this.responseText), message: "OK"};
                } else {
                    response = {data: {"message": "aaaa"}, message: "ERROR"};
                }
            }
        };
    }

    static readyStateChangeVendors(xmlHttpRequest) {
        xmlHttpRequest.onreadystatechange = function () {
            // readyState: 0 = unsent, 1 = opened, 2 = headers_received, 3 = loading, 4 = done
            if (this.readyState === 1) {
                ExtensionView.activateVendorsLoadingScreen();
            }
            if (this.readyState === 4) {
                if (this.status === 200) {
                    response = {data: JSON.parse(this.responseText), message: "OK"};
                } else {
                    response = {data: JSON.parse(this.responseText), message: "ERROR"};
                }
            }
        };
    }

    static getProductsFromServer(searchedText, callback) {
        let xmlHttpRequest = new XMLHttpRequest();
        //xmlHttpRequest.timeout = 2000;
        this.readyStateChange(xmlHttpRequest);
        xmlHttpRequest.onload = function () {
            callback();
        };
        xmlHttpRequest.ontimeout = function () {
        };
        xmlHttpRequest.open("GET", hostOn + "/search_extension?search=" + searchedText, true);
        xmlHttpRequest.send();

    }

    static getProductVendorsFromServer(productURL, callback) {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.timeout = 2000;
        this.readyStateChangeVendors(xmlHttpRequest);
        xmlHttpRequest.onload = function () {
            ExtensionView.removeVendorsLoadingScreen();
            if (response !== null && response.message === "OK") {
                callback(response);
            }
        };
        xmlHttpRequest.ontimeout = function () {
        };
        xmlHttpRequest.open("GET", hostOn + "/vendors?product_link=" + productURL,
            true);
        this.setCookie("product", productURL, 365);
        xmlHttpRequest.send();
    }

    static getData(productURL, callback) {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.timeout = 2000;
        this.readyStateChangeVendors(xmlHttpRequest);
        xmlHttpRequest.onload = function () {
            ExtensionView.removeVendorsLoadingScreen();
            if (response !== null && response.message === "OK") {
                callback();
            }
        };
        xmlHttpRequest.ontimeout = function () {
        };
        xmlHttpRequest.open("GET", hostOn + "/data?product_link=" + productURL, true);
        xmlHttpRequest.send();
    }
}

class ExtensionView {
    static graphCallback() {
        let graph = document.createElement("CANVAS");
        graph.id = "data_graph";
        graph.style.width = "400px";
        document.getElementById("content").appendChild(graph);
        let data = response.data;
        let dates = [];
        let prices = [];
        for (let i = 0; i < data.length; i++) {
            dates.push(data[i].y);
            prices.push(parseInt(data[i].x, 10));
        }
        let ctx = document.getElementById('data_graph').getContext('2d');
        let chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dates,
                datasets: [{
                    label: "PRICES",
                    data: prices,
                    borderColor: "coral",
                    fill: false,
                    borderWidth: 1
                }]
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMax: 1000000
                    }
                }]
            }
        });
        document.getElementById("content").appendChild(graph);
    }

    static searchVendorsCallback(data) {
        let productVendors = data.data;
        let vendorsDiv = document.createElement("DIV");
        vendorsDiv.style.marginTop = "30px";
        vendorsDiv.style.marginLeft = "15%";
        let vendorsUl = document.createElement("UL");
        vendorsUl.style.overflow = "auto";
        vendorsUl.className = "extension-vendors";
        vendorsUl.style.maxHeight = "100px";
        vendorsUl.className
        for (let key in productVendors) {
            if (productVendors.hasOwnProperty(key)) {
                let vendorLi = ExtensionView.createVendorDiv(productVendors[key]);
                vendorsUl.appendChild(vendorLi);
            }
        }
        vendorsDiv.appendChild(vendorsUl);
        contentPanel.appendChild(vendorsDiv);
    };

    static searchOptionCallback() {
        contentPanel.innerHTML = "";
        if (response.message === "OK" && response.data.length) {
            products = JSON.parse(response.data);
            isProductSelected = false;
        } else {
            ExtensionView.removeLoadingScreen();
            products = null;
        }
        ExtensionView.firstMenuOption(products);
    }

    static searchOption() {
        const searchedText = document.getElementById("search-text").value;
        if (searchedText !== null && searchedText !== '') {
            ExtensionModel.getProductsFromServer(searchedText, this.searchOptionCallback);
        }
    }

    static firstMenuOption() {
        alternativesButton.style.backgroundColor = "white";
        priceButton.style.backgroundColor = "white";
        similarButton.style.backgroundColor = "white";

        if (products === null) {
            contentPanel.innerHTML = "";
            contentPanel.appendChild(ExtensionView.createNotMessage("Nu ai cautat niciun produs."));
        } else {
            contentPanel.innerHTML = "";
            ExtensionView.removeLoadingScreen();
            for (let key in products) {
                if (products.hasOwnProperty(key)) {
                    ExtensionView.createProductElement(products[key]);
                }
            }
        }
        if (isProductSelected === true) {
            ExtensionView.removeLoadingScreen();
            contentPanel.innerHTML = "";
            ExtensionView.createProductPage();
        }
    }

    static secondMenuOption() {
        alternativesButton.style.backgroundColor = "white";
        priceButton.style.backgroundColor = "white";
        similarButton.style.backgroundColor = "white";

        if (products === null) {
            contentPanel.innerHTML = "";
            contentPanel.appendChild(ExtensionView.createNotMessage("Nu ai cautat niciun produs."));
        }
        if (isProductSelected === false) {
            contentPanel.innerHTML = "";
            contentPanel.appendChild(ExtensionView.createNotMessage("Nu ai cautat niciun produs."));
        } else {
            contentPanel.innerHTML = "";
            this.createGraph();
        }
    }

    static thirdMenuOption() {
        alternativesButton.style.backgroundColor = "white";
        priceButton.style.backgroundColor = "white";
        similarButton.style.backgroundColor = "white";

        if (products == null) {
            contentPanel.innerHTML = "";
            contentPanel.appendChild(ExtensionView.createNotMessage("Nu ai cautat niciun produs."));
        }
        if (isProductSelected === false) {
            contentPanel.innerHTML = "";
            contentPanel.appendChild(ExtensionView.createNotMessage("Nu ai cautat niciun produs."));
        } else {
            contentPanel.innerHTML = "";
            ExtensionView.removeLoadingScreen();
            for (let key in products) {
                if (products.hasOwnProperty(key) && products[key]["title"] !== selectedProduct["title"]) {
                    ExtensionView.createProductElement(products[key]);
                }
            }
        }
    }

    static createNotMessage(message) {
        let notMessage = document.createElement("P");
        notMessage.innerText = message;
        notMessage.style.marginTop = "20px";
        notMessage.style.width = "100%";
        notMessage.style.fontFamily = "\"Open Sans\", sans-serif";
        notMessage.style.fontSize = "large";
        notMessage.style.textAlign = "center";
        notMessage.style.color = "#5e5e5e";
        return notMessage;
    }

    static createProductElement(product) {
        let productDiv = document.createElement("DIV");
        productDiv.style.display = "flex";
        productDiv.style.marginTop = "5px";
        productDiv.style.marginLeft = "10px";
        productDiv.style.marginRight = "10px";
        productDiv.style.width = "96%";
        productDiv.style.height = "90px";
        productDiv.style.border = "2px solid";
        productDiv.style.borderColor = "#ffb441";

        let productImage = document.createElement("IMG");
        productImage.src = product["image"];
        productImage.onerror = function () {
            this.src = "broken.png";
        };
        productImage.style.width = "60px";
        productImage.style.height = "70px";
        productImage.style.marginTop = "10px";
        productImage.style.marginLeft = "10px";

        let productTitle = document.createElement("H5");
        productTitle.innerText = product["title"].substring(0, 50);
        productTitle.style.marginTop = "30px";
        productTitle.style.marginLeft = "20px";
        productTitle.style.width = "140px";
        productTitle.style.color = "coral";

        let priceElement = document.createElement("P");


        priceElement.innerText = "de la " + ExtensionView.addPoint(product["price"]) + " lei";
        priceElement.style.marginTop = "30px";
        priceElement.style.width = "80px";
        priceElement.style.color = "coral";


        let chevronElement = document.createElement("INPUT");
        chevronElement.type = "image";
        chevronElement.src = "chevron.png";
        chevronElement.style.marginTop = "20px";
        chevronElement.style.marginLeft = "10px";
        chevronElement.style.width = "50px";
        chevronElement.style.height = "50px";

        chevronElement.addEventListener("click", function () {
            isProductSelected = true;
            ExtensionView.activateLoadingScreen();
            selectedProduct = product;
            ExtensionView.firstMenuOption();
        }, false);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(chevronElement);

        document.getElementById("content").appendChild(productDiv);
    }

    static addPoint(numberString) {
        let number = numberString;
        numberString = numberString.toString();
        if (numberString.length >= 4) {
            number = numberString.substr(0, numberString.length - 3) + "." +
                numberString.substr(numberString.length - 3);
            [numberString.slice(0, numberString.length - 3), ".", numberString.slice(numberString.length - 3)].join('');
            console.log(number);
            return number;
        }
        return number;

    }

    static createProductPage() {
        let productDiv = document.createElement("DIV");
        let infoDiv = document.createElement("DIV");
        infoDiv.style.display = "flex";
        infoDiv.style.width = "100%";

        let productTitle = document.createElement("H3");
        productTitle.innerText = selectedProduct["title"];
        productTitle.style.width = "100%";
        productTitle.style.textAlign = "center";
        productTitle.style.color = "coral";

        let productImage = document.createElement("IMG");
        productImage.src = selectedProduct['image'];
        productImage.alt = "Nicio imagine";
        productImage.style.marginLeft = "40px";
        productImage.style.marginTop = "10px";

        infoDiv.appendChild(productImage);

        if (selectedProduct['description'] !== null && selectedProduct['description'] !== "None") {
            let productDescription = document.createElement("P");
            productDescription.style.marginLeft = "30px";
            productDescription.style.marginTop = "10px";
            productDescription.innerHTML = selectedProduct['description'] + "<br>";

            infoDiv.appendChild(productDescription);
        }
        productDiv.appendChild(productTitle);
        productDiv.appendChild(infoDiv);

        contentPanel.appendChild(productDiv);
        ExtensionModel.getProductVendorsFromServer(selectedProduct["link"], this.searchVendorsCallback);
    }

    static createVendorDiv(productVendor) {
        let vendorLi = document.createElement("LI");
        vendorLi.style.display = "flex";
        vendorLi.style.width = "85%";
        vendorLi.style.border = "1px solid";
        vendorLi.style.borderColor = "#ffb441";

        let vendorName = document.createElement("H5");
        vendorName.innerText = productVendor["name"];
        vendorName.style.marginTop = "10px";
        vendorName.style.marginLeft = "20px";
        vendorName.style.width = "140px";
        vendorName.style.color = "coral";

        let vendorLogo = document.createElement("IMG");
        vendorLogo.src = productVendor["logo"];
        vendorLogo.onerror = function () {
            this.src = "broken.png";
        };
        vendorLogo.style.marginTop = "10px";
        vendorLogo.style.marginLeft = "10px";
        vendorLogo.style.width = "120px";
        vendorLogo.style.height = "20px";

        let vendorPrice = document.createElement("H4");
        vendorPrice.innerText = this.addPoint(productVendor["price"]) + " Lei";
        vendorPrice.style.marginTop = "10px";
        vendorPrice.style.marginLeft = "20px";
        vendorPrice.style.width = "140px";
        vendorPrice.style.color = "coral";

        vendorLi.appendChild(vendorName);
        vendorLi.appendChild(vendorLogo);
        vendorLi.appendChild(vendorPrice);

        return vendorLi;
    }

    static activateLoading() {
        document.getElementById("loading").style.display = "block";
        let loadingImage = document.createElement("IMG");
        loadingImage.src = "loading.gif";
        loadingImage.style.alignItems = "center";
        loadingImage.style.width = "50px";
        document.getElementById("loading").appendChild(loadingImage);
    }

    static activateLoadingScreen() {
        document.getElementById("content").innerHTML = "";
        this.activateLoading();
    }

    static removeLoadingScreen() {
        document.getElementById("loading").innerHTML = "";
    }

    static activateVendorsLoadingScreen() {
        document.getElementById("loading").style.top = "75%";
        this.activateLoading();
    }

    static removeVendorsLoadingScreen() {
        document.getElementById("loading").style.top = "50%";
        document.getElementById("loading").innerHTML = "";
    }

    static createGraph() {
        ExtensionModel.getData(selectedProduct['link'], ExtensionView.graphCallback);
    }
}

class ExtensionController {
    static pageController() {
        let alternatives = document.getElementsByClassName("alternatives")[0];
        let prices = document.getElementsByClassName("prices")[0];
        let similars = document.getElementsByClassName("similars")[0];
        alternatives.addEventListener("click", () => {
            alternatives.style.backgroundColor = "peachpuff";
            prices.style.backgroundColor = "white";
            similars.style.backgroundColor = "white";
        });
        prices.addEventListener("click", () => {
            alternatives.style.backgroundColor = "white";
            prices.style.backgroundColor = "peachpuff";
            similars.style.backgroundColor = "white";
        });
        similars.addEventListener("click", () => {
            alternatives.style.backgroundColor = "white";
            prices.style.backgroundColor = "white";
            similars.style.backgroundColor = "peachpuff";
        });
        alternativesButton.addEventListener("click", function () {
            ExtensionView.firstMenuOption()
        });
        priceButton.addEventListener("click", function () {
            ExtensionView.secondMenuOption()
        });
        similarButton.addEventListener("click", function () {
            ExtensionView.thirdMenuOption()
        });
        searchButton.addEventListener("click", function () {
            ExtensionView.searchOption()
        });
    }
}
