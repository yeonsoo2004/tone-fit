(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollThreshold = 10;

    function updateHeader() {
        header.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
    }

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