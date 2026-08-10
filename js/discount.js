/**
 * SmartFlow - Discount Banner
 * ===========================
 * Shows a bright "discount" badge below the header
 * when the discount is active (current date < endDate).
 * Configure the discount in js/pricing.js → PRICING.discount
 */

(function() {
  // Wait for DOM to be ready
  function init() {
    // Check if PRICING and discount config exist
    if (typeof PRICING === 'undefined' || !PRICING.discount) {
      console.warn('⚠️ Discount config not found in PRICING');
      return;
    }

    const discount = PRICING.discount;
    const percent = discount.percent;
    const endDateStr = discount.endDate;

    // Parse end date
    const endDate = new Date(endDateStr + 'T23:59:59');
    const now = new Date();

    // Check if discount is still active
    if (now > endDate) {
      console.log('ℹ️ Discount expired');
      return;
    }

    // Determine language from <html lang> attribute
    const lang = document.documentElement.lang || 'en';
    const isRu = lang.startsWith('ru');
    const text = isRu ? discount.text.ru : discount.text.en;

    // Create badge element
    const badge = document.createElement('div');
    badge.id = 'discount-badge';
    badge.textContent = text;

    // Style the badge
      Object.assign(badge.style, {
          position: 'fixed',        // или 'absolute' - закрепляем в углу
          top: '250px',              // отступ сверху
          right: '20px',            // отступ справа
          zIndex: '9999',
          background: 'linear-gradient(135deg, #ff4d4d, #ff8c00)',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '40px',
          fontWeight: '800',
          fontSize: '14px',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 20px rgba(255, 77, 77, 0.4)',
          cursor: 'pointer',
          animation: 'discountPulse 2s ease-in-out infinite',
          fontFamily: "'Inter', sans-serif",
          textTransform: 'uppercase',
          textAlign: 'center',
          // Добавляем:
          width: 'auto',            // ширина по содержимому
          maxWidth: '300px',        // опционально - ограничиваем максимальную ширину
          whiteSpace: 'nowrap',     // чтобы текст не переносился
      });

    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes discountPulse {
        0%, 100% { background: linear-gradient(135deg, #ff4d4d, #ff8c00); }
        50% { background: linear-gradient(135deg, #ff6b6b, #ffa500); }
      }
      @media (max-width: 768px) {
        #discount-badge {
          padding: 8px 14px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    // Insert badge right after the header element
    const header = document.querySelector('header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(badge, header.nextSibling);
    } else {
      // Fallback: insert at top of body
      document.body.insertBefore(badge, document.body.firstChild);
    }

    // Optional: click scrolls to contact
    badge.addEventListener('click', function() {
      const contact = document.getElementById('contactSection');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
      }
    });

    console.log(`✅ Discount badge shown: ${text}`);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
