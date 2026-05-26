/**
 * Contact Page — FAQ accordion
 * 한 번에 하나만 열림 · 화면(섹션 밖) 클릭 시 전부 닫힘
 */
(function () {
    'use strict';

    var faqSection = document.querySelector('.contact-faq-section');
    if (!faqSection) {
        return;
    }

    var items = faqSection.querySelectorAll('.contact-faq-item');
    var triggers = faqSection.querySelectorAll('.contact-faq-trigger');
    var panels = faqSection.querySelectorAll('.contact-faq-panel');

    function closeAll() {
        var i;
        for (i = 0; i < items.length; i++) {
            triggers[i].setAttribute('aria-expanded', 'false');
            panels[i].hidden = true;
            items[i].classList.remove('is-open');
        }
    }

    function openItem(index) {
        closeAll();
        triggers[index].setAttribute('aria-expanded', 'true');
        panels[index].hidden = false;
        items[index].classList.add('is-open');
    }

    triggers.forEach(function (trigger, index) {
        trigger.addEventListener('click', function (event) {
            event.stopPropagation();

            if (items[index].classList.contains('is-open')) {
                closeAll();
                return;
            }

            openItem(index);
        });
    });

    document.addEventListener('click', function () {
        closeAll();
    });

    faqSection.addEventListener('click', function (event) {
        if (!event.target.closest('.contact-faq-trigger')) {
            closeAll();
        }
    });
})();

/**
 * Contact Page — 파일 첨부
 */
(function () {
    'use strict';

    var fileInput = document.getElementById('contact-inquiry-file');
    var fileBtn = document.querySelector('.contact-inquiry-file-btn');
    var fileNameEl = document.getElementById('contact-inquiry-file-name');

    if (!fileInput || !fileBtn || !fileNameEl) {
        return;
    }

    fileBtn.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];

        if (!file) {
            fileNameEl.textContent = '';
            return;
        }

        fileNameEl.textContent = file.name;
    });
})();
