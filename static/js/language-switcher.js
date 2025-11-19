// static/js/lang-switcher.js
// Requires applyTranslations(lang) from i18n.js to be available

(function () {
    const switcher = document.getElementById("customLangSwitcher");
    if (!switcher) return;

    const btn = document.getElementById("langCurrent");
    const list = document.getElementById("langList");
    const items = list.querySelectorAll("li");
    const supported = ["pt","en","fr","de","es","ja","zh"];

    function openClose(open) {
        if (open) {
            switcher.classList.add("open");
            switcher.setAttribute("aria-expanded", "true");
            btn.setAttribute("aria-expanded", "true");
        } else {
            switcher.classList.remove("open");
            switcher.setAttribute("aria-expanded", "false");
            btn.setAttribute("aria-expanded", "false");
        }
    }

    // set current from localStorage / browser
    const saved = localStorage.getItem("lang");
    let current = (saved && supported.includes(saved)) ? saved : (navigator.language || "").slice(0,2);
    if (!supported.includes(current)) current = "pt";

    function setCurrent(lang) {
        const label = switcher.querySelector(".label");
        const flag = switcher.querySelector(".flag");
        if (label) label.textContent = lang.toUpperCase();
        if (flag) flag.setAttribute("data-lang", lang);
        // visually set selected in list
        items.forEach(li => li.classList.toggle("selected", li.getAttribute("data-lang") === lang));
        // persist and apply translations
        localStorage.setItem("lang", lang);
        if (window.applyTranslations) window.applyTranslations(lang);
    }

    // initialize
    setCurrent(current);

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = switcher.classList.contains("open");
        openClose(!isOpen);
    });

    items.forEach(li => {
        li.addEventListener("click", (e) => {
            const lang = li.getAttribute("data-lang");
            setCurrent(lang);
            openClose(false);
        });
    });

    // close when clicking outside
    document.addEventListener("click", (e) => {
        if (!switcher.contains(e.target)) openClose(false);
    });

    // keyboard accessibility
    btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openClose(true);
            items[0].focus();
        }
    });
})();