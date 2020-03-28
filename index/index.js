const hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0];
const navigationBarLinks = document.getElementsByClassName('navigation-bar-links')[0];
const searchIcon = document.getElementsByClassName('search-icon')[0];
const searchBox = document.getElementsByClassName('search-box')[0];

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navigationBarLinks.classList.toggle('active');
});

searchIcon.addEventListener('click', () => {
    searchIcon.classList.toggle('active');
    searchBox.classList.toggle('active');
});
