// static/js/i18n.js

(function () {
    const DEFAULT_LANG = "pt";
    const SUPPORTED = ["pt", "en", "fr", "de", "es", "ja", "zh"];

    function detectLang() {
        const saved = localStorage.getItem("lang");
        if (saved && SUPPORTED.includes(saved)) return saved;

        const browser = (navigator.language || navigator.userLanguage || "").slice(0, 2).toLowerCase();
        return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
    }

    function applyMeta(dict) {
        if (dict["meta.title"]) document.title = dict["meta.title"];
        if (dict["meta.description"]) {
            const metaDesc = document.querySelector("meta[name='description']");
            if (metaDesc) metaDesc.setAttribute("content", dict["meta.description"]);
        }
    }

    function applyTranslations(lang) {
        const dict = window.translations?.[lang] || window.translations?.[DEFAULT_LANG] || {};

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) el.textContent = dict[key];
        });

        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            if (dict[key]) el.innerHTML = dict[key];
        });

        applyMeta(dict);

        // Update <html lang="...">
        document.documentElement.setAttribute("lang", lang);

        // Persist
        localStorage.setItem("lang", lang);

        // Update selector label if present
        const label = document.querySelector("[data-i18n='lang.selector']");
        if (label) label.textContent = dict["lang.selector"] || "Language";
    }

    function initSelector() {
        const select = document.getElementById("languageSelect");
        if (!select) return;
        select.addEventListener("change", (e) => applyTranslations(e.target.value));
    }

    // Initialize
    document.addEventListener("DOMContentLoaded", () => {
        const lang = detectLang();
        const select = document.getElementById("languageSelect");
        if (select) select.value = lang;
        applyTranslations(lang);
        initSelector();
    });

    // Expose for manual use if needed
    window.applyTranslations = applyTranslations;
})();