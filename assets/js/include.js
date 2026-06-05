/**
 * HTML 컴포넌트 로더 (data-include)
 * 로드 완료 후 'includes:loaded' 이벤트 발생 → common.js 등에서 헤더 초기화
 */
(function () {
    'use strict';

    var INCLUDE_ATTR = 'data-include';
    var INCLUDE_BASE_ATTR = 'data-include-base';

    /** 서브(../assets) 푸터·헤더 경로를 메인(./assets) 기준으로 변환 */
    function applyIncludeBase(html, base) {
        if (!html || !base) {
            return html;
        }

        var normalized = base.endsWith('/') ? base : base + '/';

        if (normalized === './') {
            return html.replace(/\.\.\/assets\//g, './assets/');
        }

        return html;
    }

    function runScripts(container) {
        container.querySelectorAll('script').forEach(function (oldScript) {
            var script = document.createElement('script');
            Array.from(oldScript.attributes).forEach(function (attr) {
                script.setAttribute(attr.name, attr.value);
            });
            script.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(script, oldScript);
        });
    }

    function loadIncludeElement(el) {
        var path = el.getAttribute(INCLUDE_ATTR);
        if (!path) {
            return Promise.resolve();
        }

        return fetch(path)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('컴포넌트 로드 실패: ' + path + ' (' + response.status + ')');
                }
                return response.text();
            })
            .then(function (html) {
                var base = el.getAttribute(INCLUDE_BASE_ATTR);
                el.innerHTML = applyIncludeBase(html, base);
                runScripts(el);
            });
    }

    var NAV_SECTION_BY_PAGE = {
        'identity.html': 'BRAND',
        'smart-kiosk.html': 'BRAND',
        'frame.html': 'FRAME',
        'store.html': 'STORE',
        'space.html': 'FRANCHISE',
        'startup.html': 'FRANCHISE',
        'news.html': 'COMMUNITY',
        'contact.html': 'COMMUNITY'
    };

    function getCurrentPageName() {
        var path = window.location.pathname;
        var page = path.split('/').pop();

        if (!page || page === '/') {
            return 'index.html';
        }

        return page;
    }

    function resolveLinkPageName(href) {
        if (!href) {
            return '';
        }

        try {
            return new URL(href, window.location.href).pathname.split('/').pop() || '';
        } catch (error) {
            return href.split('/').pop().split('?')[0].split('#')[0] || '';
        }
    }

    function markActiveHeaderNav() {
        var header = document.querySelector('.header');
        if (!header) {
            return;
        }

        var currentPage = getCurrentPageName();
        var activeSection = NAV_SECTION_BY_PAGE[currentPage];

        header.querySelectorAll('.header-nav-link').forEach(function (link) {
            var isCurrent = activeSection && link.textContent.trim() === activeSection;

            link.classList.toggle('is-current', isCurrent);

            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        header.querySelectorAll('.header-mobile-link, .header-mobile-sublist a').forEach(function (link) {
            var isCurrent = resolveLinkPageName(link.getAttribute('href')) === currentPage;

            link.classList.toggle('is-current', isCurrent);

            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function loadAllIncludes() {
        var elements = document.querySelectorAll('[' + INCLUDE_ATTR + ']');
        if (!elements.length) {
            markActiveHeaderNav();
            document.dispatchEvent(new CustomEvent('includes:loaded', { detail: { count: 0 } }));
            return Promise.resolve();
        }

        return Promise.all(Array.from(elements).map(loadIncludeElement))
            .then(function () {
                markActiveHeaderNav();
                document.dispatchEvent(new CustomEvent('includes:loaded', {
                    detail: { count: elements.length }
                }));
            });
    }

    function boot() {
        loadAllIncludes().catch(function (error) {
            console.error('[include.js]', error);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
