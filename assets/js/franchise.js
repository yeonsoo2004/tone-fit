/**
 * Space Concept Page — Fade-Up 진입 · 탭 전환 인터랙션
 * Startup Page — 섹션별 Fade-Up (KV · Feature · Growth · Profit · Franchise · Process · Inquiry)
 * jQuery 3.2.1 · space.css · startup.css
 */
(function ($) {
    'use strict';

    var GALLERY_ENTER_DELAY_MS = 50;
    var PANEL_FADE_MS = 150;
    var STARTUP_FADE_THRESHOLD = 0.15;

    function resetEnterState($panel) {
        $panel.find('.space-enter-copy, .space-enter-gallery').removeClass('is-enter-active');
    }

    function triggerEnterAnimation($panel) {
        if (!$panel || !$panel.length) {
            return;
        }

        var $copy = $panel.find('.space-enter-copy');
        var $gallery = $panel.find('.space-enter-gallery');

        $copy.removeClass('is-enter-active');
        $gallery.removeClass('is-enter-active');

        void $panel[0].offsetHeight;

        window.requestAnimationFrame(function () {
            $copy.addClass('is-enter-active');
            window.setTimeout(function () {
                $gallery.addClass('is-enter-active');
            }, GALLERY_ENTER_DELAY_MS);
        });
    }

    function activatePanel(panelId) {
        var $tabs = $('.space-tab-bar .tab-btn');
        var $panels = $('.space-tab-panels .space-tab-panel');
        var $target = $panels.filter('[data-panel="' + panelId + '"]');

        if (!$target.length || $target.hasClass('is-active') && $target.is(':visible')) {
            return;
        }

        $tabs.removeClass('active').attr('aria-selected', 'false');
        $tabs.filter('[data-panel="' + panelId + '"]').addClass('active').attr('aria-selected', 'true');

        $panels.not($target).removeClass('is-active').attr('hidden', true).stop(true, true).hide();

        resetEnterState($target);

        $target
            .addClass('is-active')
            .removeAttr('hidden')
            .stop(true, true)
            .hide()
            .fadeIn(PANEL_FADE_MS, function () {
                triggerEnterAnimation($target);
            });
    }

    function initStartupFadeUp() {
        var $page = $('.startup-page');

        if (!$page.length) {
            return;
        }

        var $kvCopy = $page.find('.startup-kv-copy.startup-fade-up');
        var $featureCopy = $page.find('.startup-feature-copy.startup-fade-up');
        var $growthVisual = $page.find('.startup-growth-graphic.startup-fade-up');
        var $profitMarquee = $page.find('.startup-profit-marquee.startup-fade-up');
        var $profitCaption = $page.find('.startup-profit-caption.startup-fade-up');
        var $franchiseCards = $page.find('.startup-franchise-cards.startup-fade-up');
        var $franchiseAction = $page.find('.startup-franchise-action.startup-fade-up');
        var $processList = $page.find('.startup-process-list.startup-fade-up');
        var $inquiryInfo = $page.find('.startup-inquiry-info.startup-fade-up');

        function activateFade($target) {
            if ($target && $target.length) {
                $target.addClass('is-fade-active');
            }
        }

        function observeFadeTargets($targets) {
            if (!$targets.length) {
                return;
            }

            if (!window.IntersectionObserver) {
                activateFade($targets);
                return;
            }

            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        activateFade($(entry.target));
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: STARTUP_FADE_THRESHOLD,
                    rootMargin: '0px 0px -5% 0px'
                }
            );

            $targets.each(function () {
                observer.observe(this);
            });
        }

        window.requestAnimationFrame(function () {
            activateFade($kvCopy);
        });

        observeFadeTargets($featureCopy);
        observeFadeTargets($growthVisual);
        observeFadeTargets($profitMarquee);
        observeFadeTargets($profitCaption);
        observeFadeTargets($franchiseCards);
        observeFadeTargets($franchiseAction);
        observeFadeTargets($processList);
        observeFadeTargets($inquiryInfo);
    }

    function initStartupInquiryFile() {
        var $page = $('.startup-page');

        if (!$page.length) {
            return;
        }

        var $fileInput = $page.find('#startup-inquiry-file');
        var $fileName = $page.find('#startup-inquiry-file-name');
        var $fileBtn = $page.find('.startup-inquiry-file-btn');

        if (!$fileInput.length || !$fileName.length || !$fileBtn.length) {
            return;
        }

        $fileBtn.on('click', function () {
            $fileInput.trigger('click');
        });

        $fileInput.on('change', function () {
            var file = this.files && this.files[0];
            $fileName.text(file ? file.name : '');
        });
    }

    $(function () {
        var $activePanel = $('.space-tab-panels .space-tab-panel.is-active').first();

        resetEnterState($activePanel);
        triggerEnterAnimation($activePanel);

        $('.space-tab-bar .tab-btn').on('click', function () {
            activatePanel($(this).data('panel'));
        });

        initStartupFadeUp();
        initStartupInquiryFile();
    });
})(jQuery);
