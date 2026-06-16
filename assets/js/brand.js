/**
 * BRAND GNB
 * LNB: Identity, Smart Kiosk
 */
(function () {
    'use strict';

    const FADE_FROM = { y: 50, opacity: 0 };
    const FADE_TO = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
    };

    function initVisionCircles() {
        const circles = document.querySelectorAll('.identity-vision-section .dotted-circle');
        if (!circles.length || typeof gsap === 'undefined') return;

        gsap.to(circles[0], {
            rotation: 360,
            duration: 50,
            repeat: -1,
            ease: 'none',
            transformOrigin: '50% 50%',
        });

        if (circles[1]) {
            gsap.to(circles[1], {
                rotation: -360,
                duration: 50,
                repeat: -1,
                ease: 'none',
                transformOrigin: '50% 50%',
            });
        }
    }

    function initKioskKvFade() {
        const kvGroup = document.querySelector('.kiosk-kv-section .kv-fade-group');
        if (!kvGroup || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            gsap.set(kvGroup, { opacity: 1, y: 0, clearProps: 'transform' });
            return;
        }

        gsap.fromTo(
            kvGroup,
            { y: 36, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.15,
                ease: 'power3.out',
                clearProps: 'transform',
            }
        );
    }

    function initKioskWorksSlide() {
        const workItems = document.querySelectorAll('.kiosk-works-section .work-item[data-slide]');
        if (!workItems.length || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

        if (reducedMotion) return;

        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        workItems.forEach((item) => {
            const textCol = item.querySelector('.slide-text-col');
            if (!textCol) return;

            const direction = item.getAttribute('data-slide');
            const fromX = direction === 'right' ? 80 : -80;

            const tweenVars = {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'transform',
            };

            if (hasScrollTrigger) {
                tweenVars.scrollTrigger = {
                    trigger: item,
                    start: 'top 82%',
                    once: true,
                };
            }

            gsap.fromTo(textCol, { x: fromX, opacity: 0 }, tweenVars);
        });

        if (hasScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    /**
     * 스크롤 fade-up (메인 타이틀 제외, .fade-up 요소만)
     * - KV 로드 애니메이션: kvLoad 옵션
     * - 그룹 순차: [data-fade-stagger] (기본 stagger 0.12)
     */
    function initPageScrollFadeUp(pageSelector, options = {}) {
        const page = document.querySelector(pageSelector);
        if (!page) return;

        const fadeEls = page.querySelectorAll('.fade-up');
        if (!fadeEls.length || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
            return;
        }

        const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.set(fadeEls, FADE_FROM);

        const staggered = new Set();
        const kvLoad = options.kvLoad;

        if (kvLoad && kvLoad.items.length) {
            kvLoad.items.forEach((el) => staggered.add(el));
            gsap.fromTo(kvLoad.items, kvLoad.from || { y: 40, opacity: 0 }, {
                ...FADE_TO,
                stagger: kvLoad.stagger ?? 0.15,
                delay: kvLoad.delay ?? 0.2,
            });
        }

        page.querySelectorAll('[data-fade-stagger]').forEach((group) => {
            const items = group.querySelectorAll('.fade-up');
            if (!items.length) return;

            items.forEach((el) => staggered.add(el));

            const staggerAttr = group.getAttribute('data-fade-stagger');
            let stagger = 0.12;

            if (staggerAttr !== '' && staggerAttr !== null) {
                const parsed = parseFloat(staggerAttr, 10);
                if (!Number.isNaN(parsed)) stagger = parsed;
            }

            const tweenVars = {
                ...FADE_TO,
                stagger,
            };

            if (hasScrollTrigger) {
                tweenVars.scrollTrigger = {
                    trigger: group,
                    start: 'top 85%',
                    once: true,
                };
            }

            gsap.fromTo(items, FADE_FROM, tweenVars);
        });

        const skipClosest = options.skipIfClosest
            ? Array.isArray(options.skipIfClosest)
                ? options.skipIfClosest
                : [options.skipIfClosest]
            : [];

        fadeEls.forEach((el) => {
            if (staggered.has(el)) return;
            if (skipClosest.some((selector) => el.closest(selector))) return;

            const tweenVars = { ...FADE_TO };

            if (hasScrollTrigger) {
                tweenVars.scrollTrigger = {
                    trigger: el,
                    start: 'top 88%',
                    once: true,
                };
            }

            gsap.fromTo(el, FADE_FROM, tweenVars);
        });

        if (hasScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    function initFadeUp() {
        initPageScrollFadeUp('.identity-main', {
            kvLoad: {
                items: gsap.utils.toArray('.identity-kv-section .fade-up'),
                from: { y: 40, opacity: 0 },
                stagger: 0.15,
                delay: 0.2,
            },
            skipIfClosest: '.identity-kv-section',
        });
    }

    function initKioskScrollFadeUp() {
        initPageScrollFadeUp('.kiosk-main', {
            skipIfClosest: ['.kiosk-cta-section', '.kiosk-compare-section'],
        });
    }

    function initKioskCompareFade() {
        const table = document.querySelector('.kiosk-compare-section .compare-table.fade-up');
        if (!table || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            gsap.set(table, { opacity: 1, y: 0, clearProps: 'transform' });
            return;
        }

        const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.fromTo(
            table,
            FADE_FROM,
            {
                ...FADE_TO,
                scrollTrigger: hasScrollTrigger
                    ? {
                          trigger: table,
                          start: 'top 85%',
                          once: true,
                      }
                    : undefined,
            }
        );
    }

    function initKioskCta() {
        const section = document.querySelector('.kiosk-cta-section');
        const bgArea = section && section.querySelector('.bg-area');
        const fadeEls = section && section.querySelectorAll('.fade-up');
        if (!section || !bgArea || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            gsap.set(bgArea, { opacity: 1, scale: 1, clearProps: 'transform' });
            if (fadeEls.length) {
                gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
            }
            return;
        }

        const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
        if (!hasScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        const targets = fadeEls.length ? [bgArea, ...fadeEls] : [bgArea];
        let played = false;

        function resetCta() {
            gsap.killTweensOf(targets);
            gsap.set(bgArea, { opacity: 0, scale: 1.2 });
            if (fadeEls.length) {
                gsap.set(fadeEls, { y: 50, opacity: 0 });
            }
        }

        function playCta() {
            gsap.killTweensOf(targets);
            gsap.to(bgArea, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power2.out',
            });
            if (fadeEls.length) {
                gsap.to(fadeEls, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                });
            }
        }

        resetCta();

        const st = ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            onEnter: () => {
                if (played) return;
                played = true;
                playCta();
                st.kill(); // 한 번만 재생, 이후 유지
            },
            onEnterBack: () => {
                if (played) return;
                played = true;
                playCta();
                st.kill(); // 한 번만 재생, 이후 유지
            },
        });

        ScrollTrigger.refresh();
    }

    function initCounters() {
        if (!document.querySelector('.identity-counting-section') || typeof gsap === 'undefined') {
            return;
        }

        if (typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.counter-num').forEach((counter) => {
            const targetNumber = parseInt(counter.getAttribute('data-target'), 10);

            gsap.to(counter, {
                innerHTML: targetNumber,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.identity-counting-section',
                    start: 'top 80%',
                    once: true,
                },
                onUpdate: function () {
                    counter.innerHTML = Math.floor(this.targets()[0].innerHTML).toLocaleString();
                },
            });
        });
    }

    function initSeasonSwiper() {
        if (!document.querySelector('.season-swiper') || typeof Swiper === 'undefined') return;

        new Swiper('.season-swiper', {
            slidesPerView: 1.5,
            spaceBetween: 20,
            loop: true,
            centeredSlides: false,
            pagination: {
                el: '.season-swiper .swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                },
            },
        });
    }

    function initSpaceSwiper() {
        if (!document.querySelector('.space-swiper') || typeof Swiper === 'undefined') return;

        new Swiper('.space-swiper', {
            slidesPerView: 1.5,
            spaceBetween: 20,
            loop: true,
            centeredSlides: false,
            pagination: {
                el: '.space-swiper .swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                },
            },
        });
    }

    function initKioskCounters() {
        const section = document.querySelector('.kiosk-counting-section');
        if (!section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const counters = Array.from(section.querySelectorAll('.counter-num')).map((counter) => {
            const targetNumber = parseFloat(counter.getAttribute('data-target'), 10);
            const decimalPlaces = parseInt(counter.getAttribute('data-decimal'), 10) || 0;
            return { counter, targetNumber, decimalPlaces, state: { val: 0 }, tween: null };
        });

        if (!counters.length) return;

        function formatValue(val, decimalPlaces) {
            return val
                .toFixed(decimalPlaces)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function resetCounters() {
            counters.forEach((item) => {
                if (item.tween) {
                    item.tween.kill();
                    item.tween = null;
                }
                item.state.val = 0;
                item.counter.innerHTML = formatValue(0, item.decimalPlaces);
            });
        }

        function playCounters() {
            counters.forEach((item) => {
                if (item.tween) {
                    item.tween.kill();
                }
                item.state.val = 0;
                item.counter.innerHTML = formatValue(0, item.decimalPlaces);

                item.tween = gsap.to(item.state, {
                    val: item.targetNumber,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        item.counter.innerHTML = formatValue(item.state.val, item.decimalPlaces);
                    },
                });
            });
        }

        resetCounters();

        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: playCounters,
            onEnterBack: playCounters,
            onLeave: resetCounters,
            onLeaveBack: resetCounters,
        });
    }

    function initKioskTechFade() {
        const techList = document.querySelector('.kiosk-tech-section .tech-list');
        const items = document.querySelectorAll('.kiosk-tech-section .tech-fade-item');
        if (!techList || !items.length || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
            return;
        }

        const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.set(items, FADE_FROM);

        const tweenVars = {
            ...FADE_TO,
            stagger: 0,
        };

        if (hasScrollTrigger) {
            tweenVars.scrollTrigger = {
                trigger: techList,
                start: 'top 85%',
                once: true,
            };
        }

        gsap.fromTo(items, FADE_FROM, tweenVars);

        if (hasScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    function initComparisonCheckIcons() {
        const section = document.querySelector('.identity-why-section');
        const icons = section ? section.querySelectorAll('.ani-check-icon') : [];
        if (!icons.length || typeof gsap === 'undefined') return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        icons.forEach(function (icon) {
            const bgCircle = icon.querySelector('.bg-circle');
            const progressCircle = icon.querySelector('.progress-circle');
            const checkMark = icon.querySelector('.check-mark');
            if (!bgCircle || !progressCircle || !checkMark) return;

            if (reducedMotion) {
                gsap.set(progressCircle, { strokeDashoffset: 0 });
                gsap.set(bgCircle, { attr: { fill: '#D4734A' } });
                gsap.set(checkMark, { strokeDashoffset: 0 });
                return;
            }

            if (typeof ScrollTrigger === 'undefined') {
                gsap.set(progressCircle, { strokeDashoffset: 0 });
                gsap.set(bgCircle, { attr: { fill: '#D4734A' } });
                gsap.set(checkMark, { strokeDashoffset: 0 });
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            gsap.set(progressCircle, { strokeDashoffset: 70 });
            gsap.set(bgCircle, { attr: { fill: '#F6F6F6' } });
            gsap.set(checkMark, { strokeDashoffset: 20 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: icon,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                delay: Array.prototype.indexOf.call(icons, icon) * 0.18,
            })
                .to(progressCircle, {
                    strokeDashoffset: 0,
                    duration: 0.65,
                    ease: 'power2.out',
                })
                .to(
                    bgCircle,
                    { attr: { fill: '#D4734A' }, duration: 0.35, ease: 'power1.inOut' },
                    '-=0.25'
                )
                .to(
                    checkMark,
                    { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
                    '-=0.15'
                );
        });

        ScrollTrigger.refresh();
    }

    function initKioskFrameSwiper() {
        const swiperEl = document.querySelector('.kiosk-frame-swiper');
        if (!swiperEl || typeof Swiper === 'undefined') return;

        new Swiper(swiperEl, {
            slidesPerView: 2,
            spaceBetween: 16,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });
    }

    function initFeatureVideo() {
        const video = document.querySelector('.identity-feature-section .feature-video');
        if (!video) return;

        const container = video.closest('.img-col') || video.parentElement;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.removeAttribute('controls');

        function tryPlay() {
            video.muted = true;
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function () {});
            }
        }

        function tryPlayWithRetry() {
            tryPlay();
            [150, 400, 900, 1500].forEach(function (delay) {
                window.setTimeout(tryPlay, delay);
            });
        }

        ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(function (eventName) {
            video.addEventListener(eventName, tryPlay, { once: true });
        });

        if (typeof IntersectionObserver !== 'undefined' && container) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                        tryPlayWithRetry();
                    }
                });
            }, { threshold: [0, 0.2, 0.5, 1] });

            observer.observe(container);
        }

        if (typeof ScrollTrigger !== 'undefined' && container && typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.create({
                trigger: container,
                start: 'top 88%',
                once: true,
                onEnter: function () {
                    tryPlayWithRetry();
                    gsap.delayedCall(1, tryPlayWithRetry);
                },
            });
        }

        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                tryPlay();
            }
        });

        document.addEventListener('touchstart', function unlockVideo() {
            tryPlay();
            document.removeEventListener('touchstart', unlockVideo);
        }, { once: true, passive: true });
    }

    function initBrandPages() {
        const identityPage = document.querySelector('.identity-main');
        const kioskPage = document.querySelector('.kiosk-main');

        if (identityPage) {
            initVisionCircles();
            initFadeUp();
            initFeatureVideo();
            initCounters();
            initSeasonSwiper();
            initSpaceSwiper();
            initComparisonCheckIcons();
        }

        if (kioskPage) {
            initKioskKvFade();
            initKioskWorksSlide();
            initKioskFrameSwiper();
            initKioskScrollFadeUp();
            initKioskCounters();
            initKioskTechFade();
            initKioskCompareFade();
            initKioskCta();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBrandPages);
    } else {
        initBrandPages();
    }
})();