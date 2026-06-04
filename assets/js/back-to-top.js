(function () {
    'use strict';

    var scrollThreshold = 200;
    var defaultBottomPx = 40;
    var topSafeMarginPx = 8;
    var ticking = false;
    var btn = null;
    var footer = null;
    var footerObserver = null;
    var inited = false;
    var defaultsCached = false;

    function getViewportHeight() {
        return window.visualViewport ? window.visualViewport.height : window.innerHeight;
    }

    function readDefaultBottomOffset() {
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

    function cacheDefaults() {
        if (defaultsCached) {
            return;
        }

        defaultBottomPx = readDefaultBottomOffset();
        defaultsCached = true;
    }

    function update() {
        if (!btn) {
            return;
        }

        footer = document.querySelector('.footer');

        var viewportHeight = getViewportHeight();
        var btnHeight = btn.offsetHeight || 56;
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

        btn.style.bottom = bottomPx + 'px';
        btn.classList.toggle('is-visible', window.scrollY > scrollThreshold);
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

    function init() {
        btn = document.querySelector('.back-to-top');

        if (!btn) {
            return;
        }

        if (!inited) {
            inited = true;
            cacheDefaults();

            btn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            window.addEventListener('scroll', scheduleUpdate, { passive: true });
            window.addEventListener('resize', scheduleUpdate, { passive: true });

            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', scheduleUpdate, { passive: true });
                window.visualViewport.addEventListener('scroll', scheduleUpdate, { passive: true });
            }
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
