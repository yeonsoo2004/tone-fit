/**
 * Space Concept Page — Fade-Up 진입 · 탭 전환 인터랙션
 * jQuery 3.2.1 · space.css (.space-enter-copy / .space-enter-gallery)
 */
(function ($) {
    'use strict';

    var GALLERY_ENTER_DELAY_MS = 50;
    var PANEL_FADE_MS = 150;

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

    $(function () {
        var $activePanel = $('.space-tab-panels .space-tab-panel.is-active').first();

        resetEnterState($activePanel);
        triggerEnterAnimation($activePanel);

        $('.space-tab-bar .tab-btn').on('click', function () {
            activatePanel($(this).data('panel'));
        });
    });
})(jQuery);
