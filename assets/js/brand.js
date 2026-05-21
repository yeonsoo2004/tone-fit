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
