var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var targetDiv = document.querySelector('.your-div-class'); // Replace with your actual target div class or ID

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active');
    body.classList.toggle('lock-scroll');
};

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) { // Change 100 to the desired scroll position
        targetDiv.classList.add('scrolled');
    } else {
        targetDiv.classList.remove('scrolled');
    }
});
