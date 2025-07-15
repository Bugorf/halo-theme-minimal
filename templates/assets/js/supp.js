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
    } else {
        // 切换到夜间模式
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        changeIcon("dark");
    }
}

// 页面加载时根据 localStorage 设置主题
document.addEventListener('DOMContentLoaded', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    changeIcon(theme);
});

function changeIcon(mode) {
    if (mode === "dark") {
        themeIcon.textContent = '☀️';
        themeIconMobile.textContent = '☀️';

        btn.classList.remove('bg-black', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    } else {
        themeIcon.textContent = '🌙';
        themeIconMobile.textContent = '🌙✨';

        btn.classList.remove('bg-white', 'text-black');
        btn.classList.add('bg-black', 'text-white');
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