(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const headerMenu = header.querySelector('.header-menu');
    const headerNav = header.querySelector('.header-nav');
    const scrollThreshold = 10;
    const closeDelay = 120;
    let closeTimer = null;

    const menuToggle = header.querySelector('.header-menu-toggle');
    const mobileNav = header.querySelector('.header-mobile-nav');

    function setMegaOpen(isOpen) {
        header.classList.toggle('is-mega-open', isOpen);
        if (headerNav) {
            headerNav.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    }

    function setMobileNavOpen(isOpen) {
        header.classList.toggle('is-mobile-nav-open', isOpen);
        document.body.classList.toggle('is-header-nav-open', isOpen);

        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
        }

        if (mobileNav) {
            mobileNav.hidden = !isOpen;
            mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        }

        if (isOpen) {
            clearTimeout(closeTimer);
            setMegaOpen(false);
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

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            setMobileNavOpen(!header.classList.contains('is-mobile-nav-open'));
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMobileNavOpen(false);
            });
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            clearTimeout(closeTimer);
            setMegaOpen(false);
            setMobileNavOpen(false);
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            setMobileNavOpen(false);
        }
    });

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
})();
