let hostOn = "https://127.0.0.1:5000";
let child = "";

function createProducts(products) {
    let container = document.createElement("div");
    container.setAttribute("id", "most-view-container");

    let productObjects = JSON.parse(products);
    for (let index = 0; index < productObjects.length; ++index) {
        let productObject = productObjects[index];
        let productElement = document.createElement("div");
        productElement.setAttribute("class", "product");
        let productImageAnchor = document.createElement("a");
        productImageAnchor.href = "http://localhost:80/html/product.html?name=" + scrapePathName(productObject["link"]);

        let productImage = document.createElement("img");
        productImage.setAttribute("src", productObject["image"]);
        productImage.setAttribute("class", "image");

        productImageAnchor.appendChild(productImage);
        productElement.appendChild(productImageAnchor);


        let productTitleAnchor = document.createElement("a");
        productTitleAnchor.href = "http://localhost:80/html/product.html?name=" + scrapePathName(productObject["link"]);
        let productTitle = document.createElement("div");
        productTitle.setAttribute("class", "title");
        productTitle.textContent = parseTitle(productObject["title"]);
        productTitleAnchor.appendChild(productTitle);
        productElement.appendChild(productTitleAnchor);

        let productPrice = document.createElement("div");
        productPrice.setAttribute("class", "price");
        productPrice.textContent = "de la " + addPoint(productObject.price) + " Lei";
        productElement.appendChild(productPrice);

        container.appendChild(productElement);

    }
    return container;
}

function createFirstPart() {
    return " <div id=\"most-viewed\">\n" + "<div id=\"border-left\"></div>";
}

function createSecondPart() {
    return "<div id=\"border-right\"></div> </div>";
}

function validProduct() {
    if (response.message === "OK" && response.data.length > 0) {
        if (JSON.parse(response.data).length >= 1) {
            if (child != null && child !== "" && !child.closed) {
                child.close();
                child = "";
            }
            let products = response.data;
            let first_part = createFirstPart();
            let mid_part = createProducts(products);
            let second_part = createSecondPart();


            child = window.open("background_popup.html", "_blank",
                "width=275px,height=390px;top=200, left=1500").document.write(createStyle() + " " + first_part + "<div id='most-view-container'>" +
                mid_part.innerHTML + "</div>" + second_part);
        }

    }
}

function readyStateChange(xmlHttpRequest) {
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                response = {data: JSON.parse(this.responseText), message: "OK"};
            } else {
                response = {data: "Eroare", message: "ERROR"};
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
    xmlHttpRequest.open("GET", hostOn + "/search_extension?search=" + searchedText, true);
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
            var searchedText = queryDict['q'];
            if (searchedText === null)
                searchedText = queryDict["oq"];
            if (searchedText) {
                searchProducts(searchedText, validProduct);
            }
        }
    );
}, {url: [{urlMatches: 'https://www.google.com/'}]});

function parseTitle(title) {
    var words = title.split(/,| |-|\(|\)/);
    if (words.length <= 6)
        return title;
    var newTitle = words[0];
    for (var i = 1; i < 6; i++) {
        if (words[i] !== "cu") {
            newTitle = newTitle.concat(" " + words[i]);
        }
    }
    return newTitle;
}

function addPoint(numberString) {
    let number = numberString;
    numberString = numberString.toString();
    if (numberString.length >= 4) {
        number = numberString.substr(0, numberString.length - 3) + "." +
            numberString.substr(numberString.length - 3);
        [numberString.slice(0, numberString.length - 3), ".", numberString.slice(numberString.length - 3)].join('');
        return number;
    }
    return number;

}

function scrapePathName(link) {
    let pathName = link.split(".ro/")[1].replace(/\//g, "-");
    if (pathName[pathName.length - 1] === "-") {
        pathName = pathName.slice(0, -1);
    }
    if (link.includes("compari.ro") && !link.includes("https://www.compari.ro")) {
        let doubleSlash = "//";
        return link.substring(link.indexOf(doubleSlash) + doubleSlash.length,
            link.indexOf(".compari.ro")) + "-" + pathName;
    }
    return pathName;
}

function createStyle() {
    let styleElement = "\
    #most-view-container::-webkit-scrollbar {\
        width: 0.2em;\
    }\
    #most-view-container::-webkit-scrollbar-track {\
        -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);\
    }\
    #most-view-container::-webkit-scrollbar-thumb {\
        background-color: coral;\
        outline: 1px solid coral;\
    }\
    a{text-decoration:none;}\
    #most-view-container{\
        max-width: 260px;\
        display: flex;\
        border-style: solid;\
        border-color: coral;\
        overflow-x: auto;\
        overflow-y: hidden;\
        color: #5e5e5e;\
        min-height: 310px;}\
        * {\
        font-family: \"Open Sans\", sans-serif;\
    }\
.product {\
        position: relative;\
        display: flex;\
        flex-flow: column;\
        justify-content: space-evenly;\
        padding: 5px;\
        border-radius: 5px;\
        background: white;\
        -webkit-box-shadow: 0 0 20px 5px rgba(255, 95, 35, 0.15);\
        box-shadow: 0 0 20px 5px rgba(255, 95, 35, 0.15);\
        min-width: 200px;\
        max-width: 200px\
        color: coral;\
        min-height: 280px;\
        max-height: 280px;\
        margin: 15px auto 15px 15px;\
        overflow: hidden;\
        cursor: pointer;\
    " + "}\
.product:hover {\
        box-shadow: 0 0 20px 5px rgba(255, 95, 35, 0.25);\
        transition: all 0.2s ease;\
    }\
.image {\
        display: block;\
        margin-top: 10px;\
        margin-left: auto;\
        margin-right: auto;\
        cursor: pointer;\
        min-height: 150px;\
        max-height: 150px;\
        max-width: 150px;\
        max-width: 150px;\
    }\
.rating{\
        font-size: 10px;\
    }\
.title{\
        min-height:50px\
        max-height: 50px;\
        color: rgb(50, 50, 50);\
        cursor: pointer;\
        text-overflow: ellipsis;\
    }\
.title, .price, .offers,.rating {\
        text-align: center;\
    }\
    #most-viewed{\
    align-items: center;\
    }";
    return "<style>" + styleElement + " </style>";
}