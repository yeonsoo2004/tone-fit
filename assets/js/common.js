(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const headerMenu = header.querySelector('.header-menu');
    const headerNav = header.querySelector('.header-nav');
    const scrollThreshold = 10;
    const closeDelay = 120;
    let closeTimer = null;

    function setMegaOpen(isOpen) {
        header.classList.toggle('is-mega-open', isOpen);
        if (headerNav) {
            headerNav.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    }

    function openMega() {
        clearTimeout(closeTimer);
        setMegaOpen(true);
    }

    function closeMega() {
        closeTimer = setTimeout(function () {
            setMegaOpen(false);
        }, closeDelay);
    }

    function updateHeader() {
        header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
    }

    if (headerMenu) {
        headerMenu.addEventListener('mouseenter', openMega);
        headerMenu.addEventListener('mouseleave', closeMega);
        headerMenu.addEventListener('focusin', openMega);
        headerMenu.addEventListener('focusout', function (e) {
            if (!headerMenu.contains(e.relatedTarget)) {
                closeMega();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            clearTimeout(closeTimer);
            setMegaOpen(false);
        }
    });

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
})();
