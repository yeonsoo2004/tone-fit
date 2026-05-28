
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
        gsap.set(circleShape, { opacity: 1, xPercent: -18, x: 0 });
        gsap.set(bg, { opacity: 1, x: 0, clearProps: 'transform' });
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(circleShape, { xPercent: -18 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
        }
    });

    tl.fromTo(
        circleShape,
        { xPercent: -18, x: -100, opacity: 0 },
        { xPercent: -18, x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
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

    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(counter, {
        innerHTML: targetNumber,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
        },
        snap: { innerHTML: 1 },
        onUpdate: function () {
            counter.textContent = String(Math.floor(this.targets()[0].innerHTML));
        }
    });
})();

(function () {
    const content = document.querySelector('.ai-personal-bg-content');
    if (!content || typeof gsap === 'undefined') return;

    const fadeEls = content.children;
    if (!fadeEls.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        content.classList.add('is-content-visible');
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
        stagger: 0.1,
        scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            once: true
        },
        onComplete: function () {
            content.classList.add('is-content-visible');
            gsap.set(fadeEls, { clearProps: 'all' });
        }
    });
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
})();

(function () {
    const reviewSwiperEl = document.querySelector('.review-swiper');
    if (!reviewSwiperEl || typeof Swiper === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    new Swiper(reviewSwiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        speed: 600,
        slidesPerGroup: 1,
        grabCursor: true,
        allowTouchMove: true,
        simulateTouch: true,
        autoplay: reducedMotion
            ? false
            : {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false
              }
    });
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