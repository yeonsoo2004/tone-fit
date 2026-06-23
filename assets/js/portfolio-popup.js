/**
 * Portfolio intro popup — site first visit (session)
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tonefit-portfolio-popup-seen';
    var TEAM_MEMBERS = ['박연수', '김주은', '김수연', '이기훈', '신혜인', '윤태경'];

    function createPopup() {
        if (document.getElementById('portfolio-popup')) {
            return document.getElementById('portfolio-popup');
        }

        var teamItems = TEAM_MEMBERS.map(function (name) {
            return '<li class="portfolio-popup__member">' + name + '</li>';
        }).join('');

        var wrapper = document.createElement('div');
        wrapper.innerHTML =
            '<div id="portfolio-popup" class="portfolio-popup" role="dialog" aria-modal="true" aria-labelledby="portfolio-popup-title" hidden>'
            + '  <div class="portfolio-popup__backdrop" data-portfolio-close tabindex="-1" aria-hidden="true"></div>'
            + '  <div class="portfolio-popup__dialog">'
            + '    <button type="button" class="portfolio-popup__close" data-portfolio-close aria-label="닫기">'
            + '      <span aria-hidden="true"></span>'
            + '    </button>'
            + '    <p class="portfolio-popup__label ft-18-r">PORTFOLIO</p>'
            + '    <h2 id="portfolio-popup-title" class="portfolio-popup__title ft-32-b color-point">포트폴리오 프로젝트 안내</h2>'
            + '    <p class="portfolio-popup__desc ft-18-r color-main">'
            + '      본 사이트는 <strong class="color-orange">포트폴리오용</strong>으로 제작된 팀 프로젝트 작업물입니다.<br>'
            + '      실제 서비스가 아닌 UI/UX 디자인 · 퍼블리싱 결과물임을 안내드립니다.'
            + '    </p>'
            + '    <div class="portfolio-popup__team">'
            + '      <p class="portfolio-popup__team-label ft-18-r color-orange">TEAM</p>'
            + '      <ul class="portfolio-popup__team-list">' + teamItems + '</ul>'
            + '    </div>'
            + '    <button type="button" class="portfolio-popup__confirm ft-18-r" data-portfolio-close>확인</button>'
            + '  </div>'
            + '</div>';

        document.body.appendChild(wrapper.firstElementChild);
        return document.getElementById('portfolio-popup');
    }

    function openPopup(modal) {
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-portfolio-popup-open');
        modal.classList.add('is-visible');

        var confirmBtn = modal.querySelector('.portfolio-popup__confirm');
        if (confirmBtn) {
            confirmBtn.focus();
        }
    }

    function closePopup(modal) {
        modal.classList.remove('is-visible');
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-portfolio-popup-open');

        try {
            sessionStorage.setItem(STORAGE_KEY, '1');
        } catch (e) {
            /* ignore */
        }
    }

    function initPortfolioPopup() {
        if (sessionStorage.getItem(STORAGE_KEY) === '1') {
            return;
        }

        var modal = createPopup();
        if (!modal) {
            return;
        }

        modal.querySelectorAll('[data-portfolio-close]').forEach(function (el) {
            el.addEventListener('click', function () {
                closePopup(modal);
            });
        });

        document.addEventListener('keydown', function onKeydown(e) {
            if (e.key === 'Escape' && !modal.hidden) {
                closePopup(modal);
            }
        });

        window.setTimeout(function () {
            openPopup(modal);
        }, 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolioPopup);
    } else {
        initPortfolioPopup();
    }
})();
