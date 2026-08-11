// ===== CONTACT-RU.JS =====
// Загрузка русской контактной секции

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('contactSection');
    if (!container) {
        console.warn('Не найден контейнер #contactSection');
        return;
    }

    console.log('Загрузка русской контактной секции...');

    // Пути для загрузки
    const paths = [
        'contact-section-ru.html',
        './contact-section-ru.html',
        '/contact-section-ru.html'
    ];

    function tryLoad(index) {
        if (index >= paths.length) {
            // Все пути не сработали - используем встроенный HTML
            console.error('Все пути не сработали, используем встроенный HTML');
            container.innerHTML = getContactHTML();
            initContactForm();
            return;
        }

        fetch(paths[index])
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
                console.log('Контактная секция загружена из:', paths[index]);
                initContactForm();
            })
            .catch(() => {
                console.warn('Не удалось загрузить из:', paths[index]);
                tryLoad(index + 1);
            });
    }

    tryLoad(0);
});

// ===== HTML ЗАПАСНОЙ ВЕРСИИ =====
function getContactHTML() {
    return `
        <section class="full-section" id="contact">
            <div class="container">
                <div class="contact-section" style="border-top: none; padding-top:0;">
                    <div class="contact-grid">
                        <div class="contact-info">
                            <h2>Давайте создадим<br />что-то незабываемое.</h2>
                            <p>Мы всегда открыты для смелых идей и новых знакомств.</p>
                            <div class="contact-item" onclick="copyToClipboard('bs.smartflow@gmail.com', 'Email')">
                                <span class="emoji">&#128231;</span>
                                <span>bs.smartflow@gmail.com</span>
                            </div>
                            <div class="contact-item">
                                <span class="emoji">&#128222;</span>
                                <a href="tel:+48518856974" style="text-decoration:none; color:inherit;">Краков +48 518 856 974</a>
                            </div>
                            <div class="contact-item">
                                <span class="emoji">&#128222;</span>
                                <a href="tel:+375298211966" style="text-decoration:none; color:inherit;">Минск +375 29 821 19 66</a>
                            </div>
                            <div class="contact-item">
                                <span class="emoji">&#128222;</span>
                                <a href="tel:+74851234567" style="text-decoration:none; color:inherit;">Москва +7 485 123 45 67</a>
                            </div>
                            <div class="socials">
                                <a href="https://t.me/Hanalapina" target="_blank" rel="noopener">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle; margin-right:6px;">
                                        <path d="M9.04 15.51l-.38 5.35c.54 0 .78-.23 1.06-.51l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L22.9 4.5c.31-1.4-.51-1.94-1.45-1.6L1.7 9.9c-1.38.54-1.36 1.31-.25 1.65l5.02 1.57L18.5 5.9c.57-.38 1.09-.17.66.21L9.04 15.51z"/>
                                    </svg>
                                    Telegram
                                </a>
                                <a href="https://wa.me/375298211966" target="_blank" rel="noopener">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle; margin-right:6px;">
                                        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.33-1.66a11.88 11.88 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4z"/>
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                        <form id="contactForm" class="contact-form">
                            <input type="text" name="name" placeholder="Ваше имя" required />
                            <input type="email" name="email" placeholder="Ваш email" required />
                            <textarea name="message" placeholder="Расскажите о вашем проекте..." required></textarea>
                            <button type="submit" class="btn">Отправить сообщение</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// ===== ИНИЦИАЛИЗАЦИЯ ФОРМЫ =====
function initContactForm() {
    const form = document.querySelector('#contactSection #contactForm');
    if (!form) {
        console.error('Форма не найдена');
        return;
    }

    console.log('Форма найдена, инициализация...');

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Отправка формы...');

        const formData = new FormData(this);
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        // Отправка в Telegram (параллельно с Formspree)
        sendToTelegram(formData);

        fetch('https://formspree.io/f/mrenebpo', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                console.log('Ответ:', response.status);
                if (response.ok) {
                    showToast('Сообщение отправлено успешно! Мы свяжемся с вами.');
                    newForm.reset();
                } else {
                    throw new Error('Server error');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                showToast('Не удалось отправить. Попробуйте позже.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });
}