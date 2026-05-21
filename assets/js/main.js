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