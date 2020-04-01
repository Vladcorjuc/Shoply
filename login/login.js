const loginElement = document.getElementById("login");
const registerElement = document.getElementById("register");
const buttonElement = document.getElementById("button");

const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");

function register() {
    loginButton.style.color = "coral";
    registerButton.style.color = "white";
    loginElement.style.left = "-400px";
    registerElement.style.left = "50px";
    buttonElement.style.left = "110px";
}

function login() {
    loginButton.style.color = "white";
    registerButton.style.color = "coral";
    loginElement.style.left = "50px";
    registerElement.style.left = "450px";
    buttonElement.style.left = "0";
}
