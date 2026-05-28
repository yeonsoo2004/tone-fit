(function () {
    'use strict';

    /* =========================================
       1. LNB 탭 전환
    ========================================= */
    const tabBtns = document.querySelectorAll('.lnb-tab-btn[data-tab]');
    const tabPanels = document.querySelectorAll('.news-tab-panel[data-panel]');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetTab = btn.getAttribute('data-tab');

            // 버튼 상태 업데이트
            tabBtns.forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // 패널 표시/숨김
            tabPanels.forEach(function (panel) {
                if (panel.getAttribute('data-panel') === targetTab) {
                    panel.removeAttribute('hidden');
                } else {
                    panel.setAttribute('hidden', '');
                }
            });
        });
    });

    /* =========================================
       2. 모달 열기/닫기
    ========================================= */
    const overlay = document.getElementById('newsModalOverlay');
    const modal = document.getElementById('newsModal');
    const closeBtn = document.getElementById('newsModalClose');
    const imgWrap = document.getElementById('newsModalImgWrap');

    // 카드 클릭 → 모달 열기
    document.addEventListener('click', function (e) {
        const card = e.target.closest('.news-card');
        if (!card) return;
        openModal(card);
    });

    // 키보드(Enter/Space)로 카드 접근성 지원
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.news-card');
        if (!card) return;
        e.preventDefault();
        openModal(card);
    });

    function openModal(card) {
        // 카드 내 이미지가 있으면 모달에도 표시, 없으면 placeholder 유지
        const cardImg = card.querySelector('.news-card-img-wrap img');

        if (cardImg) {
            imgWrap.innerHTML = '<img src="' + cardImg.src + '" alt="이벤트 상세 이미지">';
        } else {
            imgWrap.innerHTML = '<div class="news-modal-img-placeholder">이미지 준비 중</div>';
        }

        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // 닫기 버튼
    closeBtn.addEventListener('click', closeModal);

    // 오버레이 배경 클릭 시 닫기
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            closeModal();
        }
    });

})();
