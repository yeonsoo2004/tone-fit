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

    function getInquiryPage() {
        return $('.startup-page, .contact-page').first();
    }

    function initStartupFadeUp() {
        var $page = getInquiryPage();

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

    function initStartupFeatureVideo() {
        var $page = $('.startup-page');

        if (!$page.length) {
            return;
        }

        var $section = $page.find('.startup-feature-section');
        var video = $section.find('.startup-brand-video')[0];

        if (!video || !$section.length) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        function playVideo() {
            video.muted = true;

            var playPromise = video.play();

            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function () {});
            }
        }

        function pauseVideo() {
            if (!video.paused) {
                video.pause();
            }
        }

        if (!window.IntersectionObserver) {
            playVideo();
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        playVideo();
                    } else {
                        pauseVideo();
                    }
                });
            },
            {
                threshold: 0.35
            }
        );

        observer.observe($section[0]);
    }

    function initStartupInquiryFile() {
        var $page = getInquiryPage();

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
            $fileName.text(file ? file.name : '선택된 파일 없음');
        });
    }

    var INQUIRY_MSG_REQUIRED = '필수 항목입니다.';
    var INQUIRY_MSG_INVALID = '잘못된 형식입니다.';
    var INQUIRY_MSG_SUCCESS = '제출이 완료되었습니다.';

    function trimInquiryValue(value) {
        return (value || '').trim();
    }

    function isValidInquiryEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }

    function isValidInquiryTel(value) {
        if (!/^[\d-]+$/.test(value)) {
            return false;
        }

        var digits = value.replace(/\D/g, '');

        if (digits.length < 9 || digits.length > 11) {
            return false;
        }

        if (/^01/.test(digits)) {
            return digits.length === 10 || digits.length === 11;
        }

        return true;
    }

    function validateInquiryField(fieldKey, value) {
        var trimmed = trimInquiryValue(value);

        if (!trimmed) {
            return { valid: false, message: INQUIRY_MSG_REQUIRED };
        }

        if (fieldKey === 'tel' && !isValidInquiryTel(trimmed)) {
            return { valid: false, message: INQUIRY_MSG_INVALID };
        }

        if (fieldKey === 'email' && !isValidInquiryEmail(trimmed)) {
            return { valid: false, message: INQUIRY_MSG_INVALID };
        }

        return { valid: true, message: '' };
    }

    function setInquiryFieldError($error, message) {
        if (!$error.length) {
            return;
        }

        $error.text(message || '');
    }

    function initStartupInquirySubmit() {
        var $page = getInquiryPage();

        if (!$page.length) {
            return;
        }

        var $form = $page.find('.startup-inquiry-form');

        if (!$form.length) {
            return;
        }

        var fields = [
            { key: 'name', $input: $form.find('#startup-inquiry-name'), $error: $form.find('#startup-inquiry-name-error') },
            { key: 'tel', $input: $form.find('#startup-inquiry-tel'), $error: $form.find('#startup-inquiry-tel-error') },
            { key: 'email', $input: $form.find('#startup-inquiry-email'), $error: $form.find('#startup-inquiry-email-error') },
            { key: 'message', $input: $form.find('#startup-inquiry-message'), $error: $form.find('#startup-inquiry-message-error') },
            { key: 'privacy', $input: $form.find('#startup-inquiry-privacy'), $error: $form.find('#startup-inquiry-privacy-error'), isCheckbox: true }
        ];

        function validateOne(field) {
            if (field.isCheckbox) {
                var isChecked = field.$input.is(':checked');
                setInquiryFieldError(field.$error, isChecked ? '' : INQUIRY_MSG_REQUIRED);
                return isChecked;
            }

            var result = validateInquiryField(field.key, field.$input.val());
            setInquiryFieldError(field.$error, result.valid ? '' : result.message);
            return result.valid;
        }

        function validateAll() {
            var isValid = true;

            fields.forEach(function (field) {
                if (!validateOne(field)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        fields.forEach(function (field) {
            var events = field.isCheckbox ? 'change' : 'input blur';

            field.$input.on(events, function () {
                if (field.$error.text()) {
                    validateOne(field);
                }
            });
        });

        $form.on('submit', function (event) {
            event.preventDefault();

            if (!validateAll()) {
                return;
            }

            window.alert(INQUIRY_MSG_SUCCESS);
            $form[0].reset();
            fields.forEach(function (field) {
                setInquiryFieldError(field.$error, '');
            });
            $page.find('#startup-inquiry-file-name').text('선택된 파일 없음').removeClass('has-file');
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
        initStartupFeatureVideo();
        initStartupInquiryFile();
        initStartupInquirySubmit();
    });
})(jQuery);
