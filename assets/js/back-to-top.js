(function () {
    'use strict';

    var scrollThreshold = 200;
    var defaultBottomPx = 40;
    var ticking = false;
    var btn = null;
    var footer = null;
    var footerObserver = null;
    var inited = false;

    function getLayoutViewportHeight() {
        return window.innerHeight;
    }

    function cacheDefaults() {
        if (!btn) return;

        var prevBottom = btn.style.bottom;
        btn.style.bottom = '';
        defaultBottomPx = parseFloat(getComputedStyle(btn).bottom) || 40;
        btn.style.bottom = prevBottom;
    }

    function update() {
        if (!btn) return;

        var viewportHeight = getLayoutViewportHeight();
        var bottomPx = defaultBottomPx;

        if (footer) {
            var footerTop = footer.getBoundingClientRect().top;

            if (footerTop < viewportHeight) {
                bottomPx = viewportHeight - footerTop + defaultBottomPx;
            }
        }

        btn.style.bottom = bottomPx + 'px';
        btn.style.right = '';
        btn.classList.toggle('is-visible', window.scrollY > scrollThreshold);
        ticking = false;
    }

    function scheduleUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    function bindFooterObserver() {
        if (typeof ResizeObserver === 'undefined' || !footer) {
            return;
        }

        if (footerObserver) {
            footerObserver.disconnect();
        }

        footerObserver = new ResizeObserver(scheduleUpdate);
        footerObserver.observe(footer);
    }

    function init() {
        btn = document.querySelector('.back-to-top');
        if (!btn) {
            return;
        }

        footer = document.querySelector('.footer');

        if (!inited) {
            inited = true;

            btn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            window.addEventListener('scroll', scheduleUpdate, { passive: true });
            window.addEventListener('resize', function () {
                cacheDefaults();
                scheduleUpdate();
            }, { passive: true });

            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', scheduleUpdate, { passive: true });
                window.visualViewport.addEventListener('scroll', scheduleUpdate, { passive: true });
            }
        }

        cacheDefaults();
        bindFooterObserver();
        scheduleUpdate();
    }

    document.addEventListener('includes:loaded', init);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
