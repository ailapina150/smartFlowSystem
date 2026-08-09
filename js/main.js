// ===== СЛАЙДЕР =====
(function() {
    // Находим элементы
    const track = document.getElementById('sliderTrack');
    if (!track) {
        console.warn('⚠️ Слайдер не найден');
        return;
    }

    const slides = track.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (slides.length === 0) {
        console.warn('⚠️ Нет слайдов');
        return;
    }

    let currentIndex = 0;
    const total = slides.length;

    console.log(`✅ Найдено ${total} слайдов`);

    // --- СОЗДАЁМ ТОЧКИ ---
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goTo(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('span') : [];

    // --- ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ---
    function updateSlider(index) {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(function(dot, i) {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goTo(index) {
        currentIndex = (index + total) % total;
        updateSlider(currentIndex);
    }

    function nextSlide() {
        goTo(currentIndex + 1);
    }

    function prevSlide() {
        goTo(currentIndex - 1);
    }

    // --- ПРИВЯЗЫВАЕМ КНОПКИ ---
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('✅ Кнопка "Вперёд" привязана');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('✅ Кнопка "Назад" привязана');
    }

    // --- АВТОПРОКРУТКА ---
    let autoplay = setInterval(nextSlide, 5000);

    const wrapper = document.querySelector('.slider-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', function() {
            clearInterval(autoplay);
        });
        wrapper.addEventListener('mouseleave', function() {
            clearInterval(autoplay);
            autoplay = setInterval(nextSlide, 5000);
        });
    }

    // --- ЗАПУСК ---
    updateSlider(0);
    console.log('✅ Слайдер запущен');
})();
// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showToast(`${label} copied to clipboard ✓`))
            .catch(() => fallbackCopy(text, label));
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast(`${label} copied to clipboard ✓`);
    } catch (err) {
        showToast(`Copy manually: ${text}`);
    }
    document.body.removeChild(textarea);
}

// ===== TOAST =====
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
// ===== PHONE POPUP =====
function togglePhonePopup() {
    const popup = document.getElementById('phonePopup');
    if (!popup) return;
    popup.classList.toggle('show');
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('phonePopup');
    const btn = document.querySelector('.phone-btn');
    if (!popup || !btn) return;
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
        popup.classList.remove('show');
    }
});
