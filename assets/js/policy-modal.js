/**
 * Footer 이용약관 / 개인정보처리방침 모달
 */
(function () {
    'use strict';

    var POLICY_CONTENT = {
        terms: {
            title: '이용약관',
            desc: 'TONE:FIT 서비스 이용을 위한 약관입니다.',
            body: ''
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 1 조 (목적)</h3>'
                + '<p class="ft-20-r color-main">이 약관은 TONE:FIT(이하 "회사"라 함)이 제공하는 무인 포토부스 및 웹사이트 서비스의 이용과 관련하여, 회사와 이용자 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.</p>'
                + '</article>'
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 2 조 (용어의 정의)</h3>'
                + '<ul class="policy-list ft-20-r color-main">'
                + '<li>① "서비스"란 회사가 이용자에게 제공하는 AI 퍼스널 컬러 진단 및 사진 촬영, 인화 등의 온/오프라인 제반 서비스를 의미합니다.</li>'
                + '<li>② "이용자"란 회사의 약관에 따라 회사가 제공하는 서비스를 받는 자를 말합니다.</li>'
                + '</ul>'
                + '</article>'
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 3 조 (약관의 효력 및 변경)</h3>'
                + '<p class="ft-20-r color-main">본 약관은 서비스를 이용하고자 하는 모든 이용자에게 효력이 발생하며, 회사는 필요하다고 인정되는 경우 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있습니다.</p>'
                + '</article>'
        },
        privacy: {
            title: '개인정보처리방침',
            desc: 'TONE:FIT은 이용자의 개인정보를 소중히 보호합니다.',
            body: ''
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 1 조 (개인정보의 처리 목적)</h3>'
                + '<p class="ft-20-r color-main">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 아래 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우 관련 법령에 따라 별도의 동의를 받습니다.</p>'
                + '<ul class="policy-list ft-20-r color-main">'
                + '<li>① 서비스 제공 및 이용자 문의·상담 대응</li>'
                + '<li>② 가맹·제휴 문의 접수 및 계약 이행</li>'
                + '<li>③ 마케팅·홍보 활동(동의한 경우에 한함)</li>'
                + '</ul>'
                + '</article>'
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 2 조 (처리하는 개인정보 항목)</h3>'
                + '<p class="ft-20-r color-main">회사는 서비스 제공을 위해 이름, 연락처, 이메일 등 최소한의 개인정보를 수집할 수 있으며, 수집 시 이용자에게 수집 항목 및 보유 기간을 안내합니다.</p>'
                + '</article>'
                + '<article class="policy-article mb-40">'
                + '<h3 class="ft-28-r color-point mb-10">제 3 조 (개인정보의 보유 및 이용 기간)</h3>'
                + '<p class="ft-20-r color-main">회사는 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터 개인정보를 수집 시에 동의받은 기간 내에서 개인정보를 처리·보유합니다.</p>'
                + '</article>'
        }
    };

    var modalEl = null;
    var dialogEl = null;
    var titleEl = null;
    var descEl = null;
    var bodyEl = null;
    var closeEls = null;
    var lastFocused = null;
    var activeType = null;

    function createModal() {
        if (document.getElementById('policy-modal')) {
            return;
        }

        var html = ''
            + '<div id="policy-modal" class="policy-modal" hidden>'
            + '  <div class="policy-modal__backdrop" data-policy-close tabindex="-1" aria-hidden="true"></div>'
            + '  <div class="policy-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="policy-modal-title">'
            + '    <button type="button" class="policy-modal__close" data-policy-close aria-label="닫기">'
            + '      <span aria-hidden="true">&times;</span>'
            + '    </button>'
            + '    <header class="policy-modal__header text-center mb-40">'
            + '      <h2 id="policy-modal-title" class="policy-modal__title ft-32-b color-point mb-20"></h2>'
            + '      <p class="policy-modal__desc ft-18-r color-main"></p>'
            + '    </header>'
            + '    <div class="policy-modal__scroll">'
            + '      <div class="policy-body policy-modal__body"></div>'
            + '    </div>'
            + '  </div>'
            + '</div>';

        document.body.insertAdjacentHTML('beforeend', html);

        modalEl = document.getElementById('policy-modal');
        dialogEl = modalEl.querySelector('.policy-modal__dialog');
        titleEl = modalEl.querySelector('#policy-modal-title');
        descEl = modalEl.querySelector('.policy-modal__desc');
        bodyEl = modalEl.querySelector('.policy-modal__body');
        closeEls = modalEl.querySelectorAll('[data-policy-close]');

        closeEls.forEach(function (el) {
            el.addEventListener('click', closeModal);
        });

        modalEl.addEventListener('click', function (e) {
            if (e.target === modalEl.querySelector('.policy-modal__backdrop')) {
                closeModal();
            }
        });
    }

    function openModal(type) {
        var data = POLICY_CONTENT[type];
        if (!data || !modalEl) {
            return;
        }

        lastFocused = document.activeElement;
        activeType = type;

        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        bodyEl.innerHTML = data.body;

        modalEl.hidden = false;
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-policy-modal-open');

        var closeBtn = modalEl.querySelector('.policy-modal__close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }

    function closeModal() {
        if (!modalEl || modalEl.hidden) {
            return;
        }

        modalEl.hidden = true;
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-policy-modal-open');
        activeType = null;

        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    function bindTriggers() {
        document.querySelectorAll('[data-policy-open]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var type = btn.getAttribute('data-policy-open');
                openModal(type);
            });
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalEl && !modalEl.hidden) {
            closeModal();
        }
    });

    function init() {
        if (!document.querySelector('[data-policy-open]')) {
            return;
        }

        createModal();
        bindTriggers();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
