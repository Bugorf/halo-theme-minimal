import "./styles/tailwind.css";
import "./styles/main.css";
import "../templates/assets/css/content.css";
import "../templates/assets/css/style.css";
import tocbot from "tocbot";
import Alpine from "alpinejs";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import "prismjs/plugins/treeview/prism-treeview.css";
import "prismjs/plugins/treeview/prism-treeview.js";
import "prismjs/plugins/command-line/prism-command-line.css";
import "prismjs/plugins/command-line/prism-command-line.js";

window.Alpine = Alpine;
Alpine.start();

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

document.addEventListener("DOMContentLoaded", function () {
  initializeTocbot();
});

// 临时办法：防止高亮区块偏移
window.addEventListener("load", () => {
  Prism.highlightAll();
});
