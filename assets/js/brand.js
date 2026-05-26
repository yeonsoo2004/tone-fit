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

    function initFadeUp() {
        const fadeEls = document.querySelectorAll('.identity-main .fade-up');
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
        const kvFrom = { y: 40, opacity: 0 };
        const identityKvItems = gsap.utils.toArray('.identity-kv-section .fade-up');

        if (identityKvItems.length) {
            gsap.fromTo(identityKvItems, kvFrom, {
                ...FADE_TO,
                stagger: 0.15,
                delay: 0.2,
            });
        }

        document.querySelectorAll('.identity-main [data-fade-stagger]').forEach((group) => {
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

        fadeEls.forEach((el) => {
            if (el.closest('.identity-kv-section') || staggered.has(el)) return;

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

    function initBrandPages() {
        const identityPage = document.querySelector('.identity-main');
        const kioskPage = document.querySelector('.kiosk-main');

        if (identityPage) {
            initVisionCircles();
            initFadeUp();
            initCounters();
            initSeasonSwiper();
            initSpaceSwiper();
        }

        if (kioskPage) {
            initKioskKvFade();
            initKioskWorksSlide();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBrandPages);
    } else {
        initBrandPages();
    }
})();
