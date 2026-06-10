
(function () {
    const section = document.querySelector('.ai-24hour-section');
    const bg = section?.querySelector('.ai-24hour-bg');
    if (!section || !bg || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bg.style.transform = 'scale(1)';
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(bg, { scale: 1.2 });

    gsap.to(bg, {
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none none',
            once: true
        }
    });
})();

(function () {
    const section = document.querySelector('.ai-24hour-section');
    if (!section || typeof gsap === 'undefined') return;

    const fadeEls = section.querySelectorAll('.fade-up');
    if (!fadeEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const fadeFrom = { y: 50, opacity: 0 };
    const fadeTo = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
    };

    gsap.set(fadeEls, fadeFrom);

    gsap.fromTo(fadeEls, fadeFrom, {
        ...fadeTo,
        stagger: 0.15,
        scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            once: true
        }
    });
})();

(function () {
    const section = document.querySelector('.viral-section');
    const content = section?.querySelector('.viral-content.fade-up');
    if (!section || !content || typeof gsap === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(content, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const fadeFrom = { y: 50, opacity: 0 };
    const fadeTo = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
    };

    gsap.set(content, fadeFrom);

    gsap.fromTo(content, fadeFrom, {
        ...fadeTo,
        delay: 0.6,
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
        }
    });
})();

(function () {
    const trigger = document.querySelector('.identity-grid');
    if (!trigger || typeof gsap === 'undefined') return;

    const fadeEls = trigger.querySelectorAll('.fade-up');
    if (!fadeEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const fadeFrom = { y: 50, opacity: 0 };
    const fadeTo = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
    };

    gsap.set(fadeEls, fadeFrom);

    gsap.fromTo(fadeEls, fadeFrom, {
        ...fadeTo,
        stagger: 0.15,
        scrollTrigger: {
            trigger: trigger,
            start: 'top 70%',
            once: true
        }
    });
})();

(function () {
    const section = document.querySelector('.ai-tone-finder');
    const circleShape = section?.querySelector('.ai-tone-finder-circle-shape');
    const bg = section?.querySelector('.ai-tone-finder-bg');
    if (!section || !circleShape || !bg || typeof gsap === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(circleShape, { opacity: 1, xPercent: 0, x: 0, clearProps: 'transform' });
        gsap.set(bg, { opacity: 1, x: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') {
        gsap.set(circleShape, { opacity: 1 });
        gsap.set(bg, { opacity: 1 });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(circleShape, { xPercent: 0, x: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
        }
    });

    tl.fromTo(
        circleShape,
        { xPercent: 8, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
    ).fromTo(
        bg,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.35'
    );
})();

(function () {
    const section = document.querySelector('.ai-tone-finder');
    const header = section?.querySelector('.ai-tone-finder-header');
    if (!section || !header || typeof gsap === 'undefined') return;

    const headerItems = header.children;
    if (!headerItems.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        header.classList.add('is-header-visible');
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(headerItems, { scale: 0.6, opacity: 0, transformOrigin: 'center right' });

    gsap.to(headerItems, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
            trigger: header,
            start: 'top 70%',
            once: true
        },
        onComplete: function () {
            header.classList.add('is-header-visible');
            gsap.set(headerItems, { clearProps: 'all' });
        }
    });
})();

(function () {
    const section = document.querySelector('.ai-tone-finder');
    const counter = section?.querySelector('.ai-tone-finder-sec .counter-num');
    if (!section || !counter || typeof gsap === 'undefined') return;

    const targetNumber = parseInt(counter.getAttribute('data-target'), 10) || 30;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        counter.textContent = String(targetNumber);
        return;
    }

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    function runCounter() {
        gsap.to(counter, {
            innerHTML: targetNumber,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
                counter.textContent = String(Math.floor(this.targets()[0].innerHTML));
            }
        });
    }

    if (!window.IntersectionObserver) {
        runCounter();
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            runCounter();
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    const triggerTarget = section.querySelector('.ai-tone-finder-header h2') || section;
    observer.observe(triggerTarget);
})();

(function () {
    const section = document.querySelector('.ai-personal-bg');
    const content = section?.querySelector('.ai-personal-bg-content');
    if (!section || !content || typeof gsap === 'undefined') return;

    const fadeEls = content.querySelectorAll('.fade-up');
    if (!fadeEls.length) return;

    const showContent = function () {
        content.classList.add('is-content-visible');
        gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showContent();
        return;
    }

    if (typeof ScrollTrigger === 'undefined') {
        showContent();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const fadeFrom = { y: 50, opacity: 0 };
    const fadeTo = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
    };

    gsap.set(fadeEls, fadeFrom);

    gsap.fromTo(fadeEls, fadeFrom, {
        ...fadeTo,
        stagger: 0.12,
        scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
            invalidateOnRefresh: true
        },
        onComplete: function () {
            content.classList.add('is-content-visible');
            gsap.set(fadeEls, { clearProps: 'opacity,transform' });
        }
    });

    const refreshScroll = function () {
        ScrollTrigger.refresh();
    };

    window.addEventListener('load', refreshScroll);

    const imgs = content.querySelectorAll('img');
    if (imgs.length) {
        let loaded = 0;
        imgs.forEach(function (img) {
            const onImgReady = function () {
                loaded += 1;
                if (loaded === imgs.length) refreshScroll();
            };
            if (img.complete) onImgReady();
            else {
                img.addEventListener('load', onImgReady, { once: true });
                img.addEventListener('error', onImgReady, { once: true });
            }
        });
    }
})();

(function () {
    const content = document.querySelector('.ai-pet-content');
    if (!content || typeof gsap === 'undefined') return;

    const fadeEls = content.children;
    if (!fadeEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        content.classList.add('is-pet-content-visible');
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(fadeEls, { y: 50, opacity: 0 });

    gsap.to(fadeEls, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            once: true
        },
        onComplete: function () {
            content.classList.add('is-pet-content-visible');
            gsap.set(fadeEls, { clearProps: 'all' });
        }
    });
})();

(function () {
    const titleSpan = document.querySelector('.franchise-promo-title span');
    if (titleSpan) {
        const fullTitle = titleSpan.textContent.trim();
        const mobileTitleMql = window.matchMedia('(max-width: 402px)');

        function applyFranchiseTitleBreak() {
            if (mobileTitleMql.matches) {
                titleSpan.innerHTML = fullTitle.replace('기념 ', '기념<br>');
            } else {
                titleSpan.textContent = fullTitle;
            }
        }

        applyFranchiseTitleBreak();
        if (typeof mobileTitleMql.addEventListener === 'function') {
            mobileTitleMql.addEventListener('change', applyFranchiseTitleBreak);
        } else if (typeof mobileTitleMql.addListener === 'function') {
            mobileTitleMql.addListener(applyFranchiseTitleBreak);
        }
    }
})();

(function () {
    const benefits = document.querySelector('.franchise-benefits');
    if (!benefits || typeof gsap === 'undefined') return;

    const circles = benefits.querySelectorAll('.franchise-benefit-circle');
    if (!circles.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        gsap.set(circles, { scale: 1 });
        circles.forEach(function (circle) {
            gsap.set(circle.querySelectorAll('.franchise-benefit-plus, .franchise-benefit-line'), {
                opacity: 1,
                y: 0
            });
        });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(circles, { scale: 0 });

    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: benefits,
            start: 'top 70%',
            once: true
        }
    });

    circles.forEach(function (circle, index) {
        const textEls = circle.querySelectorAll('.franchise-benefit-plus, .franchise-benefit-line');
        const offset = index * 0.35;

        gsap.set(textEls, { opacity: 0, y: 10 });

        masterTl.to(
            circle,
            {
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.35)'
            },
            offset
        ).to(
            textEls,
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: 'power2.out'
            },
            offset + 0.6
        );
    });

    const franchiseLayoutMql = window.matchMedia('(max-width: 402px)');
    function refreshFranchiseScroll() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    if (typeof franchiseLayoutMql.addEventListener === 'function') {
        franchiseLayoutMql.addEventListener('change', refreshFranchiseScroll);
    } else if (typeof franchiseLayoutMql.addListener === 'function') {
        franchiseLayoutMql.addListener(refreshFranchiseScroll);
    }

    window.addEventListener('resize', refreshFranchiseScroll, { passive: true });
})();

(function () {
    const mega = document.querySelector('.franchise-mega');
    const counter = mega?.querySelector('.franchise-mega-value .counter-num');
    if (!mega || !counter || typeof gsap === 'undefined') return;

    const targetNumber = parseInt(counter.getAttribute('data-target'), 10) || 2500;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        counter.textContent = String(targetNumber);
        return;
    }

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    function runCounter() {
        gsap.to(counter, {
            innerHTML: targetNumber,
            duration: 1,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
                counter.textContent = String(Math.floor(this.targets()[0].innerHTML));
            }
        });
    }

    if (!window.IntersectionObserver) {
        runCounter();
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            runCounter();
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    observer.observe(mega);
})();

(function () {
    const marquee = document.querySelector('.review-marquee');
    const track = marquee?.querySelector('.review-track');
    if (!marquee || !track) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const MARQUEE_DURATION_MS = 50000;
    const EASE_FACTOR = 0.14;

    marquee.classList.add('review-marquee--controlled');

    const anim = track.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
        {
            duration: MARQUEE_DURATION_MS,
            iterations: Infinity,
            easing: 'linear'
        }
    );

    let targetRate = 1;
    let currentRate = 1;
    let rafId = null;

    function tickPlaybackRate() {
        const diff = targetRate - currentRate;

        if (Math.abs(diff) < 0.005) {
            currentRate = targetRate;
            anim.playbackRate = currentRate;

            if (currentRate === 0) {
                anim.pause();
            } else {
                anim.play();
            }

            rafId = null;
            return;
        }

        currentRate += diff * EASE_FACTOR;
        anim.playbackRate = currentRate;
        anim.play();
        rafId = requestAnimationFrame(tickPlaybackRate);
    }

    function setTargetRate(rate) {
        targetRate = rate;

        if (rate > 0 && anim.playState === 'paused') {
            anim.play();
        }

        if (!rafId) {
            rafId = requestAnimationFrame(tickPlaybackRate);
        }
    }

    marquee.addEventListener('mouseenter', function () {
        setTargetRate(0);
    });

    marquee.addEventListener('mouseleave', function () {
        setTargetRate(1);
    });
})();

(function () {
    const section = document.querySelector('.frame-section');
    const fadeEls = section?.querySelectorAll('.frame-swiper .frame.fade-up');
    if (!section || !fadeEls?.length || typeof gsap === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(fadeEls, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const fadeFrom = { y: 50, opacity: 0 };
    const fadeTo = {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
    };

    gsap.set(fadeEls, fadeFrom);

    gsap.fromTo(fadeEls, fadeFrom, {
        ...fadeTo,
        scrollTrigger: {
            trigger: section.querySelector('.frame-content') || section,
            start: 'top 70%',
            once: true
        },
        onComplete: function () {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }
    });
})();

(function () {
    const frameSwiperEl = document.querySelector('.frame-swiper');
    if (!frameSwiperEl || typeof Swiper === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    new Swiper(frameSwiperEl, {
        slidesPerView: 4,
        spaceBetween: 20,
        autoHeight: true,
        loop: true,
        speed: 600,
        grabCursor: true,
        allowTouchMove: true,
        simulateTouch: true,
        autoplay: reducedMotion
            ? false
            : {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
              },
        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },
        breakpoints: {
            0: { slidesPerView: 2, spaceBetween: 16 },
            403: { slidesPerView: 1.2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4 }
        }
    });

    if (reducedMotion) {
        // no-op: keep it simple without extra motion features
    }
})();

// MotionPathPlugin 등록
// gsap.registerPlugin(MotionPathPlugin);

// 애니메이션 생성
// const animation = gsap.to("#rotatingText textPath", {
//   attr: { startOffset: "100%" },
//   duration: 8,
//   ease: "linear",
//   repeat: -1,
//   paused: false
// });

// function playAnimation() {
//   animation.play();
// }

// function pauseAnimation() {
//   animation.pause();
// }

// function resetAnimation() {
//   animation.restart();
// }