/**
 * Contact Page — FAQ accordion (store.js accordion behavior)
 */
(function () {
    'use strict';

    var faqSection = document.querySelector('.contact-faq-section');
    if (!faqSection) {
        return;
    }

    var items = faqSection.querySelectorAll('.contact-faq-item');

    function closeItem(item) {
        var trigger = item.querySelector('.contact-faq-trigger');
        item.classList.remove('is-open');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }
    }

    function openItem(item) {
        var trigger = item.querySelector('.contact-faq-trigger');
        item.classList.add('is-open');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'true');
        }
    }

    function bindAccordion() {
        items.forEach(function (item) {
            var trigger = item.querySelector('.contact-faq-trigger');
            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', function () {
                var isOpen = item.classList.contains('is-open');

                items.forEach(function (other) {
                    if (other !== item && other.classList.contains('is-open')) {
                        closeItem(other);
                    }
                });

                if (isOpen) {
                    closeItem(item);
                } else {
                    openItem(item);
                }
            });

            trigger.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                }
            });
        });
    }

    bindAccordion();
})();
