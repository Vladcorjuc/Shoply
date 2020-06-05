let hostOn = "https://127.0.0.1:5000";

function createProduct(product, value) {

    let string = "card".concat(value);
    let card = document.getElementById(string);

    let productImage = document.createElement("IMG");
    productImage.src = product["image"];
    productImage.style.width = "60px";
    productImage.style.height = "70px";
    productImage.style.marginTop = "10px";
    productImage.style.marginLeft = "10px";

    let productTitle = document.createElement("H4");
    productTitle.innerText = product["title"];
    productTitle.style.marginTop = "30px";
    productTitle.style.marginLeft = "20px";
    productTitle.style.width = "140px";
    productTitle.style.color = "coral";

    card.appendChild(productImage);
    card.appendChild(productTitle);

}

function createProductsPopup(product1, product2, product3) {
    createProduct(product1, 1);
    createProduct(product2, 2);
    createProduct(product3, 3);

    window.open("background_popup.html", "extension_popup",
        "resizable=0,top=100,left=960,width=200,titlebar=no,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,height=250,,directories=0,status=0");
}

function validProduct() {
    if (response.message === "OK" && response.data.length) {
        let products = response.data;
        createProductsPopup(products[0], products[1], products[2])
    }
}

function readyStateChange(xmlHttpRequest) {
    xmlHttpRequest.onreadystatechange = function () {
        // readyState: 0 = unsent, 1 = opened, 2 = headers_received, 3 = loading, 4 = done
        if (this.readyState === 4) {
            if (this.status === 200) {
                response = {data: JSON.parse(this.responseText), message: "OK"};
                console.log(response);
            } else {
                response = {data: JSON.parse(this.responseText), message: "ERROR"};
            }
        }
    };
}

function searchProducts(searchedText, callback) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.timeout = 2000;
    readyStateChange(xmlHttpRequest);
    xmlHttpRequest.onload = function () {
        callback();
    };
    xmlHttpRequest.ontimeout = function () {
    };
    xmlHttpRequest.open("GET", hostOn + "/search?search=" + searchedText, true);
    xmlHttpRequest.send();
}

chrome.webNavigation.onCompleted.addListener(function () {
    chrome.tabs.getSelected(
        null,
        function (tab) {
            var queryDict = {};
            var urlArgs = tab.url.split('?');
            urlArgs[1].split("&")
                .forEach(function (item) {
                    queryDict[item.split("=")[0]] = item.split("=")[1]
                });
            console.log(queryDict);
            var searchedText = queryDict['q'];
            if (searchedText === null)
                searchedText = queryDict["oq"];
            if (searchedText) {
                searchProducts(searchedText, validProduct);
            } else {
                return;
            }
        }
    );
}, {url: [{urlMatches: 'https://www.google.com/'}]});

