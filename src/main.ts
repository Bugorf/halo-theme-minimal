import "./styles/tailwind.css";
import "./styles/main.css";
import "../templates/assets/css/content.css";
import "../templates/assets/css/style.css";
import tocbot from "tocbot";
import Prism from "prismjs";

import {
  applyHighlight,
  toggleMenu,
  openMenu,
  applyPrismTheme,
  changeIcon,
  toggleTheme,
  toggleCollapse,
} from "../templates/assets/js/supp.js";

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

function initializeTocbot() {
  tocbot.init({
    tocSelector: ".toc",
    contentSelector: "#content",
    headingSelector: "h1, h2, h3",
    extraListClasses: "space-y-1 dark:border-slate-500",
    extraLinkClasses:
      "group flex items-center justify-between rounded py-1 px-1.5 transition-all hover:bg-gray-100 text-sm opacity-80 dark:hover:bg-slate-700 dark:text-slate-50",
    collapseDepth: 6,
    headingsOffset: 100,
    scrollSmooth: true,
    orderedList: false,
    tocScrollOffset: 50,
  });
}

// 没有标题时隐藏目录
const toc = document.querySelector<HTMLElement>("#summary");
const hasHeadings = document.querySelectorAll("#content h2, #content h3").length > 0;

if (!hasHeadings && toc) {
  toc.style.display = "none";
}

// 临时办法：防止高亮区块偏移
window.addEventListener("load", () => {
  Prism.highlightAll();
  applyHighlight();
});

window.addEventListener("DOMContentLoaded", () => {
  initializeTocbot();
  applyPrismTheme();

  document.querySelectorAll("table").forEach((table) => {
    if (!table.closest(".table-container")) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-container";
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  const theme = document.documentElement.getAttribute("data-theme");
  changeIcon(theme);
});

// 点击外部时关闭菜单
document.addEventListener("click", function (event) {
  const headerMenu = document.querySelector(".header-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  if (
    headerMenu?.classList.contains("expanded") &&
    !headerMenu.contains(event.target as Node) &&
    !menuToggle?.contains(event.target as Node)
  ) {
    toggleMenu();
  }
});

// 防止高亮插件动态刷新让自定义样式失效
const observer = new MutationObserver(() => {
  applyHighlight();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

//深色模式按钮点击事件
const themeToggleBtn = document.querySelectorAll(".themeToggleBtn");
themeToggleBtn?.forEach((e) => {
  e.addEventListener("click", function () {
    toggleTheme();
  });
});

//菜单点击事件
const menuDiv = document.getElementById("menuDiv");
const toggleM = document.getElementById("toggleMenu");

menuDiv?.addEventListener("click", function () {
  openMenu();
});
toggleM?.addEventListener("click", function () {
  toggleMenu();
});

// 折叠块点击事件
const clp = document.querySelectorAll(".clp-header");
clp.forEach((e) => {
  e.addEventListener("click", function () {
    toggleCollapse(e);
  });
});
