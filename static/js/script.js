function initModal() {
    const modal = document.getElementById('modal-registration');
    const openButtons = document.querySelectorAll('[data-modal-target="registration"]');
    const closeButton = modal.querySelector('[data-modal-close]');
    const form = document.getElementById('registrationForm');
    const submitButton = form.querySelector('.btn-primary');
    const loader = document.getElementById('loader-reg');
    const statusMsg = document.getElementById('status-reg');
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        form.reset();
        submitButton.innerText = 'Надіслати Заявку';
        submitButton.disabled = false;
        loader.style.display = 'none';
        statusMsg.innerText = '';
    }
    openButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.innerText = 'Обробка...';
        loader.style.display = 'block';
        statusMsg.innerText = '';
        setTimeout(() => {
            loader.style.display = 'none';
            statusMsg.style.color = 'green';
            statusMsg.innerText = ' Заявку успішно надіслано! Ми зв\'яжемося з вами.';
            setTimeout(closeModal, 3000);
        }, 2000);
    });
}
function initReviewsCarousel() {
    const carousel = document.querySelector('.review-carousel');
    if (!carousel) return;
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = carousel.querySelector('.review-card').offsetWidth + 20; // ширина картки + відступ
    prevBtn.addEventListener('click', () => {
        carousel.scrollLeft -= cardWidth;
    });
    nextBtn.addEventListener('click', () => {
        carousel.scrollLeft += cardWidth;
    });
}
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                }
            });
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
}
function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-value');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    statItems.forEach(item => observer.observe(item));
    function animateValue(element) {
        const targetValueStr = element.getAttribute('data-target');
        let targetValue = parseFloat(targetValueStr);
        const isDecimal = targetValueStr.includes('.');
        const originalText = element.textContent.trim();
        let prefix = '';
        let suffix = '';
        if (originalText.includes('+')) suffix = '+';
        if (originalText.includes('M')) suffix = 'M';
        if (originalText.includes('B')) suffix = 'B';
        if (originalText.includes('%')) suffix = '%';
        let start = 0;
        let duration = 2000;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            let currentValue = start + percentage * (targetValue - start);
            let displayValue;
            if (isDecimal) {
                displayValue = currentValue.toFixed(1);
            } else {
                displayValue = Math.floor(currentValue);
            }
            element.textContent = displayValue.toLocaleString('uk-UA') + suffix;
            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                 element.textContent = originalText;
            }
        }
        window.requestAnimationFrame(step);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initReviewsCarousel();
    initFAQ();
    initStatsAnimation();
});
