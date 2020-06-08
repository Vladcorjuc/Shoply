const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");

const loginElement = document.getElementById("login");
const registerElement = document.getElementById("register");
const buttonElement = document.getElementById("button");

const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");

function register() {
    loginButton.style.color = "coral";
    registerButton.style.color = "white";
    loginElement.style.left = "-400px";
    registerElement.style.left = "50px";
    buttonElement.style.left = "110px";
    if (loginError !== null) {
        loginError.style.visibility = "hidden";
    }
    if (registerError !== null) {
        registerError.style.visibility = "visible";
    }
}

function login() {
    loginButton.style.color = "white";
    registerButton.style.color = "coral";
    loginElement.style.left = "50px";
    registerElement.style.left = "450px";
    buttonElement.style.left = "0";
    if (loginError !== null) {
        loginError.style.visibility = "visible";
    }
    if (registerError !== null) {
        registerError.style.visibility = "hidden";
    }
}


let footer = document.getElementsByTagName("footer")[0];
let footerLine = document.createElement("hr");
footerLine.setAttribute("class", "footer-line");
footer.appendChild(footerLine);
let copyrightText = document.createElement("div");
copyrightText.setAttribute("class", "copyright-text");
footer.appendChild(copyrightText);
