/**
 * Contact Page — FAQ accordion
 * CSS grid 전환 · 한 번에 하나만 열림 · 같은 항목 재클릭 시 닫힘
 */
(function () {
    'use strict';

    var faqSection = document.querySelector('.contact-faq-section');
    if (!faqSection) {
        return;
    }

    var items = faqSection.querySelectorAll('.contact-faq-item');
    var triggers = faqSection.querySelectorAll('.contact-faq-trigger');

    function setItemState(item, isOpen) {
        var trigger = item.querySelector('.contact-faq-trigger');
        var panel = item.querySelector('.contact-faq-panel');

        item.classList.toggle('is-open', isOpen);
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    function closeAll() {
        items.forEach(function (item) {
            setItemState(item, false);
        });
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            event.stopPropagation();

            var item = trigger.closest('.contact-faq-item');
            var isOpen = item.classList.contains('is-open');

            closeAll();

            if (!isOpen) {
                setItemState(item, true);
            }
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
