const themeIcon = document.querySelector('.theme-icon');
const themeIconMobile = document.getElementById("theme-icon");
const btn = document.getElementById('themeToggleBtn');

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        // 切换到白天模式
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        changeIcon("light");
        applyPrismTheme();
    } else {
        // 切换到夜间模式
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        changeIcon("dark");
        applyPrismTheme();
    }
}

// 页面加载时根据 localStorage 设置主题
document.addEventListener('DOMContentLoaded', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    changeIcon(theme);
    applyPrismTheme();
});

function changeIcon(mode) {
    if (mode === "dark") {
        themeIcon.textContent = '☀️';
        themeIconMobile.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
        themeIconMobile.textContent = '🌙✨';
    }
}

// 点击外部时关闭菜单
document.addEventListener('click', function (event) {
    const headerMenu = document.querySelector('.header-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (headerMenu.classList.contains('expanded') && !headerMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        toggleMenu();
    }
});

// 菜单切换
function toggleMenu() {
    const headerMenu = document.querySelector('.header-menu');
    const controlButtons = document.querySelector('.control-buttons');

    if (headerMenu.classList.contains('expanded')) {
        headerMenu.classList.remove('expanded');
        // 恢复其他按钮的可见性，但给动画一些时间
        setTimeout(() => {
            controlButtons.classList.remove('hidden');
        }, 300); // 应该与 menu-item 的最长 transition-delay 匹配
    } else {
        headerMenu.classList.add('expanded');
        controlButtons.classList.add('hidden');
    }
}

// 菜单栏显示
function openMenu() {
    var menu = document.getElementById("menu");
    var burger = document.getElementById("burger");

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        burger.textContent = "X";
    } else {
        menu.classList.add('hidden');
        burger.textContent = "🍔";
    }
}

// 折叠块切换功能
function toggleCollapse(header) {
    const collapse = header.parentElement;
    collapse.classList.toggle('open');
}

// 代码高亮
function applyPrismTheme() {
    const existing = document.getElementById('prism-theme');
    const href = localStorage.getItem("theme") === 'dark'
        ? 'https://cdn.jsdelivr.net/npm/prismjs/themes/prism-okaidia.css'
        : 'https://cdn.jsdelivr.net/npm/prismjs/themes/prism.css';

    if (existing) {
        existing.href = href;
    } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'prism-theme';
        link.href = href;
        document.head.appendChild(link);
    }
}

function parseLineNumbers(lineStr) {
    const lines = [];
    const parts = lineStr.split(',');

    parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(num => parseInt(num.trim()));
            for (let i = start; i <= end; i++) {
                lines.push(i);
            }
        } else {
            lines.push(parseInt(part));
        }
    });

    return lines;
}

function applyHighlight() {
    const preElements = document.querySelectorAll('pre[m-info], pre[m-error], pre[m-warning], pre[m-success]');

    preElements.forEach(pre => {
        const mInfo = pre.getAttribute('m-info');
        const mError = pre.getAttribute('m-error');
        const mWarning = pre.getAttribute('m-warning');
        const mSuccess = pre.getAttribute('m-success');

        const lineHighlights = pre.querySelectorAll('.line-highlight');

        lineHighlights.forEach(highlightDiv => {
            const dataRange = highlightDiv.getAttribute('data-range');
            if (!dataRange) return;

            const rangeLines = parseLineNumbers(dataRange);

            if (mInfo) {
                const infoLines = parseLineNumbers(mInfo);
                const hasMatch = rangeLines.some(rangeLine => infoLines.includes(rangeLine));
                if (hasMatch) {
                    highlightDiv.classList.add('m-info-highlight');
                }
            }

            if (mError) {
                const errorLines = parseLineNumbers(mError);
                const hasMatch = rangeLines.some(rangeLine => errorLines.includes(rangeLine));
                if (hasMatch) {
                    highlightDiv.classList.add('m-error-highlight');
                }
            }

            if (mWarning) {
                const warningLines = parseLineNumbers(mWarning);
                const hasMatch = rangeLines.some(rangeLine => warningLines.includes(rangeLine));
                if (hasMatch) {
                    highlightDiv.classList.add('m-warning-highlight');
                }
            }

            if (mSuccess) {
                const successLines = parseLineNumbers(mSuccess);
                const hasMatch = rangeLines.some(rangeLine => successLines.includes(rangeLine));
                if (hasMatch) {
                    highlightDiv.classList.add('m-success-highlight');
                }
            }
        });
    });
}

// 防止高亮插件动态刷新让自定义样式失效
const observer = new MutationObserver(() => {
    applyHighlight();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

window.addEventListener('load', () => {
    applyHighlight();
});