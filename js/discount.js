/**
 * SmartFlow - Discount Banner
 * ===========================
 * Shows a bright "discount" badge in the top-right corner
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
      position: 'fixed',
      top: '16px',
      right: '16px',
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
      textTransform: 'uppercase'
    });

    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes discountPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(255, 77, 77, 0.4); }
        50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(255, 77, 77, 0.6); }
      }
      @media (max-width: 768px) {
        #discount-badge {
          top: 10px;
          right: 10px;
          padding: 8px 14px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(badge);

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
