document.getElementsByClassName("search-button-big")[0].addEventListener("click", function () {
    var text = document.getElementsByClassName("search-text")[0].value;
    if (text != null && text !== "") {
        location.replace("search.html?search=" + text);
    }

});



