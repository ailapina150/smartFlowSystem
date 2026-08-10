/**
 * SmartFlow - Centralized Pricing Configuration
 * ==============================================
 * Edit prices here to update them across the entire site.
 * Each key maps to a price shown on the website.
 */

const PRICING = {
  // --- Websites & Landing Pages (landing.html) ---
  website: {
    landing: 150,        // Landing page from $450
    corporate: 450,      // Corporate website from $900
    ecommerce: 900,     // E-commerce from $1,200
  },

  // --- AI Chatbots (chatbots.html) ---
  chatbot: {
    basic: 30,           // Basic chatbot from $20
    pro: 150,            // Pro chatbot from $100
    enterprise: 300,     // Enterprise chatbot from $200
  },

  // --- AI Images & Design (ai-images.html) ---
  aiImage: {
    basic: 5,            // Basic AI image from $3
    standard: 5,         // Standard from $5
    premium: 15,         // Premium from $10
    businessCard: 5,     // Business card from $3
    productPhoto: 5,     // Product photo from $5
    flyer: 15,           // Flyer from $10
    greetingCard: 5,     // Greeting card from $3
    photoEdit: 15,       // Photo editing from $15
  },

  // --- Web Applications (bs.html) ---
  webApp: {
    custom: null,        // Custom quote (no fixed price)
  },

  // --- Homepage service cards (index.html) ---
  homepage: {
    website: 150,        // Websites & Landing Pages from $450
    chatbot: 30,         // AI Chatbots from $20
    aiImage: 5,          // AI Images & Design from $3
  }
};

/**
 * Format a price as "from $X" or "от $X" depending on language.
 * @param {number} price - The price value
 * @param {string} lang - 'en' or 'ru'
 * @returns {string} Formatted price string
 */
function formatPrice(price, lang = 'en') {
  if (price === null || price === undefined) {
    return lang === 'ru' ? 'Индивидуальный расчёт' : 'Custom quote';
  }
  const formatted = price.toLocaleString('en-US');
  return lang === 'ru' ? `от $${formatted}` : `from $${formatted}`;
}