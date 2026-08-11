// ===== TELEGRAM.JS =====
// Отправка заказов в Telegram-канал через Bot API

// ⚠️ ВАЖНО: Вставьте сюда ваш Bot Token (получите через @BotFather)
const TELEGRAM_BOT_TOKEN = '7954644782:AAHJGqoUqU0ETmQO8rVrbjZMK-H5eM73OTQ';
// Chat ID канала/чата для заказов
const TELEGRAM_CHAT_ID = '-5581883408';

// Отправка сообщения в Telegram
function sendToTelegram(formData) {
    const name = formData.get('name') || 'Не указано';
    const email = formData.get('email') || 'Не указано';
    const message = formData.get('message') || 'Не указано';

    // Определяем язык (по наличию кириллицы в сообщении)
    const isRussian = /[а-яА-ЯёЁ]/.test(message) || /[а-яА-ЯёЁ]/.test(name);
    const lang = isRussian ? 'ru' : 'en';

    const text = lang === 'ru'
        ? `📩 <b>Новая заявка с сайта SmartFlow</b>\n\n` +
          `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
          `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
          `💬 <b>Сообщение:</b>\n${escapeHtml(message)}`
        : `📩 <b>New order from SmartFlow website</b>\n\n` +
          `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
          `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
          `💬 <b>Message:</b>\n${escapeHtml(message)}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.ok) {
            throw new Error(data.description || 'Telegram API error');
        }
        console.log('✅ Заявка отправлена в Telegram');
        return true;
    })
    .catch(error => {
        console.error('❌ Ошибка отправки в Telegram:', error);
        return false;
    });
}

// Экранирование HTML-символов для безопасности
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
