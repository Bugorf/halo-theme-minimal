import "./styles/tailwind.css";
import "./styles/main.css";
import "../templates/assets/css/content.css";
import "../templates/assets/css/style.css";
import tocbot from "tocbot";
import Alpine from "alpinejs";

function initializeTocbot() {
  tocbot.init({
    tocSelector: ".toc",
    contentSelector: "#content",
    headingSelector: "h1, h2, h3, h4",
    extraListClasses: "space-y-1 dark:border-slate-500",
    extraLinkClasses:
      "group flex items-center justify-between rounded py-1 px-1.5 transition-all hover:bg-gray-100 text-sm opacity-80 dark:hover:bg-slate-700 dark:text-slate-50",
    collapseDepth: 6,
    headingsOffset: 100,
    scrollSmooth: false,
    tocScrollOffset: 50,
  });
}

document.addEventListener("DOMContentLoaded", initializeTocbot);

window.Alpine = Alpine;
Alpine.start();
