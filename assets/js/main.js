(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    function updateHeaderBg() {
        header.classList.toggle('is-scrolled', window.scrollY > 0);
    }

    updateHeaderBg();
    window.addEventListener('scroll', updateHeaderBg, { passive: true });
})();

// MotionPathPlugin 등록
gsap.registerPlugin(MotionPathPlugin);

// 애니메이션 생성
const animation = gsap.to("#rotatingText textPath", {
  attr: { startOffset: "100%" },  // 시작점을 경로의 100% 위치로 이동
  duration: 8,                     // 8초 소요
  ease: "linear",                  // 일정한 속도
  repeat: -1,                      // 무한 반복
  paused: false                     // 초기 상태: -
});

// 제어 함수
function playAnimation() {
  animation.play();
}

function pauseAnimation() {
  animation.pause();
}

function resetAnimation() {
  animation.restart();
}