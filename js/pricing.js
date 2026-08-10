/**
 * SmartFlow - Centralized Pricing Configuration
 * ==============================================
 * Edit prices here to update them across the entire site.
 * Each key maps to a price shown on the website.
 */

const PRICING = {
  // --- Websites & Landing Pages (landing.html) ---
  website: {
    landing: 150,        // Landing page from $150
    corporate: 450,      // Corporate website from $450
    ecommerce: 900,     // E-commerce from $900
  },

  // --- AI Chatbots (chatbots.html) ---
  chatbot: {
    basic: 30,           // Basic chatbot from $30
    pro: 150,            // Pro chatbot from $150
    enterprise: 300,     // Enterprise chatbot from $300
  },

  // --- AI Images & Design (ai-images.html) ---
  aiImage: {
    basic: 5,            // Basic AI image from $5
    standard: 5,         // Standard from $5
    premium: 15,         // Premium from $15
    businessCard: 5,     // Business card from $5
    productPhoto: 5,     // Product photo from $5
    flyer: 15,           // Flyer from $15
    greetingCard: 5,     // Greeting card from $5
    photoEdit: 15,       // Photo editing from $15
  },

  // --- Web Applications (bs.html) ---
  webApp: {
    custom: null,        // Custom quote (no fixed price)
  },

  // --- Homepage service cards (index.html) ---
  homepage: {
    website: 150,        // Websites & Landing Pages from $150
    chatbot: 30,         // AI Chatbots from $30
    aiImage: 5,          // AI Images & Design from $5
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