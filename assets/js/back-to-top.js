(function () {
    'use strict';

    window.ToneFit = window.ToneFit || {};

    var scrollThreshold = 200;
    var defaultBottomPx = 40;
    var topSafeMarginPx = 8;
    var ticking = false;
    var footer = null;
    var footerObserver = null;
    var defaultsCached = false;

    function getButtons() {
        return document.querySelectorAll('.back-to-top');
    }

    function getViewportHeight() {
        return window.visualViewport ? window.visualViewport.height : window.innerHeight;
    }

    function readDefaultBottomOffset(btn) {
        if (!btn) {
            return defaultBottomPx;
        }

        var styles = getComputedStyle(btn);
        var offsetVar = styles.getPropertyValue('--back-to-top-offset').trim();

        if (offsetVar) {
            var rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            var parsed = parseFloat(offsetVar);

            if (offsetVar.endsWith('rem')) {
                return parsed * rootFont;
            }

            if (offsetVar.endsWith('px')) {
                return parsed;
            }

            return parsed * rootFont;
        }

        var computedBottom = parseFloat(styles.bottom);
        return Number.isFinite(computedBottom) ? computedBottom : defaultBottomPx;
    }

    function cacheDefaults(buttons) {
        if (defaultsCached || !buttons.length) {
            return;
        }

        defaultBottomPx = readDefaultBottomOffset(buttons[0]);
        defaultsCached = true;
    }

    function scrollToTop() {
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (typeof ScrollSmoother !== 'undefined' && typeof ScrollSmoother.get === 'function') {
            var smoother = ScrollSmoother.get();

            if (smoother) {
                smoother.scrollTo(0, !reducedMotion);
                return;
            }
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }

    function update() {
        var buttons = getButtons();

        if (!buttons.length) {
            ticking = false;
            return;
        }

        cacheDefaults(buttons);
        footer = document.querySelector('.footer');

        var viewportHeight = getViewportHeight();
        var btnHeight = buttons[0].offsetHeight || 56;
        var maxBottomPx = Math.max(
            defaultBottomPx,
            viewportHeight - btnHeight - topSafeMarginPx
        );
        var bottomPx = defaultBottomPx;

        if (footer) {
            var rect = footer.getBoundingClientRect();
            var footerInView = rect.top < viewportHeight && rect.bottom > 0;

            if (footerInView) {
                var footerTop = Math.max(0, Math.min(rect.top, viewportHeight));
                var liftPx = viewportHeight - footerTop + defaultBottomPx;

                bottomPx = Math.max(defaultBottomPx, liftPx);
            }
        }

        bottomPx = Math.min(bottomPx, maxBottomPx);

        buttons.forEach(function (btn) {
            btn.style.bottom = bottomPx + 'px';
            btn.classList.toggle('is-visible', window.scrollY > scrollThreshold);
        });

        ticking = false;
    }

    function scheduleUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        requestAnimationFrame(update);
    }

    function bindFooterObserver() {
        if (typeof ResizeObserver === 'undefined') {
            return;
        }

        footer = document.querySelector('.footer');

        if (!footer) {
            return;
        }

        if (footerObserver) {
            footerObserver.disconnect();
        }

        footerObserver = new ResizeObserver(scheduleUpdate);
        footerObserver.observe(footer);
    }

    function bindGlobalListeners() {
        if (window.ToneFit._backToTopListenersBound) {
            return;
        }

        window.ToneFit._backToTopListenersBound = true;

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.back-to-top')) {
                return;
            }

            event.preventDefault();
            scrollToTop();
        });

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate, { passive: true });

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', scheduleUpdate, { passive: true });
            window.visualViewport.addEventListener('scroll', scheduleUpdate, { passive: true });
        }
    }

    function init() {
        bindGlobalListeners();

        if (!getButtons().length) {
            return;
        }

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
