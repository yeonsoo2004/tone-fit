/**
 * 공통 헤더 — 메가메뉴 · 모바일 메뉴 · 스크롤 시 is-scrolled
 * include.js 로드 후에도 동작하도록 includes:loaded 대기
 */
(function () {
    'use strict';

    var headerInited = false;

    function initHeader() {
        if (headerInited) {
            return;
        }

        var header = document.querySelector('.header');
        if (!header) {
            return;
        }

        headerInited = true;

        var headerMenu = header.querySelector('.header-menu');
        var headerNav = header.querySelector('.header-nav');
        var scrollThreshold = 10;
        var closeDelay = 120;
        var closeTimer = null;

        var menuToggle = header.querySelector('.header-menu-toggle');
        var mobileNav = header.querySelector('.header-mobile-nav');

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
            var forceScrolled = document.body.classList.contains('page-store');
            header.classList.toggle('is-scrolled', forceScrolled || window.scrollY > scrollThreshold);
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
    }

    function bootHeader() {
        initHeader();
    }

    window.ToneFit = window.ToneFit || {};
    window.ToneFit.initHeader = initHeader;

    var hasIncludeSlots = document.querySelectorAll('[data-include]').length > 0;

    if (hasIncludeSlots) {
        document.addEventListener('includes:loaded', bootHeader);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootHeader);
    } else {
        bootHeader();
    }
})();
