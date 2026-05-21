/**
 * BRAND GNB
 * LNB: Identity, Smart Kiosk
 */
(function () {
    'use strict';

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

    function initIdentity() {
        const page = document.querySelector('.identity-main');
        if (!page) return;

        initVisionCircles();
    }

    initIdentity();
})();


// 숫자 카운팅 애니메이션 (GSAP ScrollTrigger 활용)
if (document.querySelector('.identity-counting-section')) {
    const counters = document.querySelectorAll('.counter-num');
    
    counters.forEach(counter => {
        const targetNumber = parseInt(counter.getAttribute('data-target'), 10);
        
        gsap.to(counter, {
            innerHTML: targetNumber,
            duration: 2, // 2초 동안 숫자가 올라감
            ease: "power2.out", // 부드럽게 감속
            scrollTrigger: {
                trigger: ".identity-counting-section",
                start: "top 80%", // 섹션이 화면의 80% 지점에 도달하면 시작
            },
            onUpdate: function() {
                // 소수점 버림 및 1,000단위 콤마(,) 찍기
                counter.innerHTML = Math.floor(this.targets()[0].innerHTML).toLocaleString();
            }
        });
    });
}

// Season Content 슬라이더 실행 (무한 루프 및 프로그레스 바 적용)
if (document.querySelector('.season-swiper')) {
    const seasonSwiper = new Swiper('.season-swiper', {
        slidesPerView: 1.5, 
        spaceBetween: 20, 
        loop: true, // 끊기지 않고 무한으로 돌아가도록 추가
        centeredSlides: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        breakpoints: {
            768: {
                slidesPerView: 2.2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2.5, // 텍스트 영역을 줄였으므로 슬라이드가 더 보이도록 수치 조정
                spaceBetween: 40
            }
        }
    });
}