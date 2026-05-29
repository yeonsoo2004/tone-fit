(function () {
    var tabBtns   = document.querySelectorAll('.frame-tab-btn');
    var tabPanels = document.querySelectorAll('.frame-tab-panel');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.dataset.tab;

            tabBtns.forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(function (p) {
                p.classList.remove('is-active');
                p.classList.remove('is-visible');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            var activePanel = document.getElementById('tab-' + target);
            if (activePanel) {
                activePanel.classList.add('is-active');
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        activePanel.classList.add('is-visible');
                    });
                });
            }
        });
    });

    var fadeTargets = document.querySelectorAll('.frame-fade-up');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeTargets.forEach(function (el) {
            if (!el.classList.contains('frame-tab-panel') || el.classList.contains('is-active')) {
                observer.observe(el);
            }
        });
    } else {
        fadeTargets.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
})();