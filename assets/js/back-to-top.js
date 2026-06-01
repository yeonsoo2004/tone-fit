(function () {
    var btn = document.querySelector('.back-to-top');
    var footer = document.querySelector('.footer');
    if (!btn) return;

    var scrollThreshold = 200;
    var defaultBottomPx = 40;
    var ticking = false;

    function getLayoutViewportHeight() {
        return window.innerHeight;
    }

    function cacheDefaults() {
        var prevBottom = btn.style.bottom;
        btn.style.bottom = '';
        defaultBottomPx = parseFloat(getComputedStyle(btn).bottom) || 40;
        btn.style.bottom = prevBottom;
    }

    function update() {
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

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    cacheDefaults();
    update();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', function () {
        cacheDefaults();
        scheduleUpdate();
    }, { passive: true });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', scheduleUpdate, { passive: true });
        window.visualViewport.addEventListener('scroll', scheduleUpdate, { passive: true });
    }

    if (typeof ResizeObserver !== 'undefined' && footer) {
        var footerObserver = new ResizeObserver(scheduleUpdate);
        footerObserver.observe(footer);
    }
})();
