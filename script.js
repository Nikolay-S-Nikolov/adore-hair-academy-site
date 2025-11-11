document.addEventListener('DOMContentLoaded', function() {
    // 1. Намиране на елементите
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelectorAll('.main-nav a');

    // 2. Слушател за клик на хамбургер иконата
    hamburger.addEventListener('click', function() {
        // Превключва класа, който активира CSS-а за показване на менюто
        header.classList.toggle('nav-open');
        // Превключва класа за анимация на иконата (X)
        hamburger.classList.toggle('is-active'); 
    });

    // 3. Затваряне на менюто при клик върху линк (за по-добър UX)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('nav-open')) {
                header.classList.remove('nav-open');
                hamburger.classList.remove('is-active');
            }
        });
    });
});