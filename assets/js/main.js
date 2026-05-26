
(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const headerMenu = header.querySelector('.header-menu');
    const headerNav = header.querySelector('.header-nav');
    const scrollThreshold = 10;
    const closeDelay = 120;
    let closeTimer = null;

    function setMegaOpen(isOpen) {
        header.classList.toggle('is-mega-open', isOpen);
        if (headerNav) {
            headerNav.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    }

    function openMega() {
        clearTimeout(closeTimer);
        setMegaOpen(true);
    }

    function closeMega() {
        closeTimer = setTimeout(function () {
            setMegaOpen(false);
        }, closeDelay);
    }

    function updateHeader() {
        header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
    }

    if (headerMenu) {
        headerMenu.addEventListener('mouseenter', openMega);
        headerMenu.addEventListener('mouseleave', closeMega);
        headerMenu.addEventListener('focusin', openMega);
        headerMenu.addEventListener('focusout', function (e) {
            if (!headerMenu.contains(e.relatedTarget)) {
                closeMega();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            clearTimeout(closeTimer);
            setMegaOpen(false);
        }
    });

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
})();

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
            start: 'top 80%',
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
            start: 'top 80%',
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
            start: 'top 85%',
            once: true
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