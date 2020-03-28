const loginElement = document.getElementById("login");
const registerElement = document.getElementById("register");
const buttonElement = document.getElementById("button");

function register() {
    loginElement.style.left = "-400px";
    registerElement.style.left = "50px";
    buttonElement.style.left = "110px";
}

function login() {
    loginElement.style.left = "50px";
    registerElement.style.left = "450px";
    buttonElement.style.left = "0";
}
