(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollThreshold = 10;

    function updateHeader() {
        header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
})();