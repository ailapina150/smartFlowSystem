// ===== CONTACT SECTION LOADER =====
// Загружает секцию контактов из внешнего файла

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('contactSection');
    if (!container) {
        console.warn('⚠️ Контейнер #contactSection не найден');
        return;
    }

    console.log('🔄 Загрузка секции контактов...');

    // Проверяем, не загружена ли уже секция
    if (container.querySelector('#contact')) {
        console.log('✅ Секция контактов уже загружена');
        return;
    }

    fetch('contact-section.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} — файл не найден`);
            }
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
            console.log('✅ Секция контактов загружена');
            // Форма будет обработана в contact.js
        })
        .catch(error => {
            console.error('❌ Ошибка загрузки:', error);
            container.innerHTML = `
                <section class="full-section" id="contact">
                    <div class="container">
                        <div style="text-align:center; padding:40px 0; color:rgba(255,255,255,0.4);">
                            ⚠️ Failed to load contact section.<br />
                            <small style="font-size:14px;">Please refresh the page or contact us directly:</small><br />
                            <strong style="color:rgba(255,255,255,0.7);">bs.smartflow@gmail.com</strong>
                        </div>
                    </div>
                </section>
            `;
        });
});