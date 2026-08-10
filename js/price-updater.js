/**
 * price-updater.js - Universal price updater for all pages
 * Automatically updates prices from PRICING object
 * Supports both English and Russian versions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect language from URL or HTML lang attribute
    const isRussian = window.location.pathname.includes('-ru.html') ||
        window.location.pathname.includes('index-ru.html') ||
        document.documentElement.lang === 'ru';
    const lang = isRussian ? 'ru' : 'en';

    // --- Method 1: Using data-price attributes (RECOMMENDED) ---
    const priceElements = document.querySelectorAll('[data-price]');

    priceElements.forEach(el => {
        const path = el.getAttribute('data-price');
        const parts = path.split('.');
        let value = PRICING;

        // Navigate through PRICING object
        for (const part of parts) {
            if (value && value[part] !== undefined) {
                value = value[part];
            } else {
                value = null;
                break;
            }
        }

        // Update element with formatted price
        if (value !== null && value !== undefined) {
            el.textContent = formatPrice(value, lang);
        } else {
            el.textContent = lang === 'ru' ? 'Индивидуальный расчёт' : 'Custom quote';
        }
    });

    // --- Method 2: Legacy support for specific IDs ---
    // This handles pages that still use ID-based price elements
    const priceMap = {
        // English homepage
        'price-homepage-website': { path: 'homepage.website' },
        'price-homepage-chatbot': { path: 'homepage.chatbot' },
        'price-homepage-aiimage': { path: 'homepage.aiImage' },

        // Russian homepage
        'price-homepage-website-ru': { path: 'homepage.website' },
        'price-homepage-chatbot-ru': { path: 'homepage.chatbot' },
        'price-homepage-aiimage-ru': { path: 'homepage.aiImage' },

        // Landing page prices (English)
        'price-landing-landing': { path: 'website.landing' },
        'price-landing-corporate': { path: 'website.corporate' },
        'price-landing-ecommerce': { path: 'website.ecommerce' },

        // Landing page prices (Russian)
        'price-landing-landing-ru': { path: 'website.landing' },
        'price-landing-corporate-ru': { path: 'website.corporate' },
        'price-landing-ecommerce-ru': { path: 'website.ecommerce' },

        // Chatbot prices (English)
        'price-chatbot-basic': { path: 'chatbot.basic' },
        'price-chatbot-pro': { path: 'chatbot.pro' },
        'price-chatbot-enterprise': { path: 'chatbot.enterprise' },

        // Chatbot prices (Russian)
        'price-chatbot-basic-ru': { path: 'chatbot.basic' },
        'price-chatbot-pro-ru': { path: 'chatbot.pro' },
        'price-chatbot-enterprise-ru': { path: 'chatbot.enterprise' },

        // AI Images prices (English)
        'price-ai-basic': { path: 'aiImage.basic' },
        'price-ai-standard': { path: 'aiImage.standard' },
        'price-ai-premium': { path: 'aiImage.premium' },
        'price-ai-businesscard': { path: 'aiImage.businessCard' },
        'price-ai-productphoto': { path: 'aiImage.productPhoto' },
        'price-ai-flyer': { path: 'aiImage.flyer' },
        'price-ai-greetingcard': { path: 'aiImage.greetingCard' },
        'price-ai-photoedit': { path: 'aiImage.photoEdit' },

        // AI Images prices (Russian)
        'price-ai-basic-ru': { path: 'aiImage.basic' },
        'price-ai-standard-ru': { path: 'aiImage.standard' },
        'price-ai-premium-ru': { path: 'aiImage.premium' },
        'price-ai-businesscard-ru': { path: 'aiImage.businessCard' },
        'price-ai-productphoto-ru': { path: 'aiImage.productPhoto' },
        'price-ai-flyer-ru': { path: 'aiImage.flyer' },
        'price-ai-greetingcard-ru': { path: 'aiImage.greetingCard' },
        'price-ai-photoedit-ru': { path: 'aiImage.photoEdit' }
    };

    // Process all ID-based price elements
    Object.entries(priceMap).forEach(([id, config]) => {
        const el = document.getElementById(id);
        if (el) {
            const path = config.path;
            const parts = path.split('.');
            let value = PRICING;

            for (const part of parts) {
                if (value && value[part] !== undefined) {
                    value = value[part];
                } else {
                    value = null;
                    break;
                }
            }

            if (value !== null && value !== undefined) {
                el.textContent = formatPrice(value, lang);
            } else {
                el.textContent = lang === 'ru' ? 'Индивидуальный расчёт' : 'Custom quote';
            }
        }
    });
});