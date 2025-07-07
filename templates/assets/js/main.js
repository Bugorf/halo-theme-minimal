function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    const themeIconMobile = document.getElementById("theme-icon");
    const btn = document.getElementById('themeToggleBtn');

    const isDark = htmlElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        // 切换到白天模式
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙';
        themeIconMobile.textContent = '🌙✨';

        btn.classList.remove('bg-white', 'text-black');
        btn.classList.add('bg-black', 'text-white');
    } else {
        // 切换到夜间模式
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀️';
        themeIconMobile.textContent = '☀️';

        btn.classList.remove('bg-black', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    }
}

// 页面加载时根据 localStorage 设置主题
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

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

/*
// 分享按钮功能
function initializeShareDropdowns() {
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            const dropdownMenu = this.closest('.share-dropdown').querySelector('.share-menu');
            dropdownMenu.classList.toggle('show');
            event.stopPropagation(); 
        });
    });

    // 点击文档其他地方时隐藏分享菜单
    document.addEventListener('click', function (event) {
        document.querySelectorAll('.share-menu').forEach(menu => {
            if (!menu.contains(event.target) && !event.target.classList.contains('share-btn')) {
                menu.classList.remove('show');
            }
        });
    });
}

// 点赞按钮功能
function initializeLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function () {
            const likeCountSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(likeCountSpan.textContent);
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                currentLikes--;
            } else {
                this.classList.add('liked');
                currentLikes++;
            }
            likeCountSpan.textContent = currentLikes;
        });
    });
}

// Pagination Logic
const postsPerPage = 10;
let currentPage = 1;

const postsSection = document.getElementById('postsSection');
const allPosts = Array.from(postsSection.querySelectorAll('.post'));

const paginationContainer = document.getElementById('pagination');

function displayPosts(page) {
    postsSection.innerHTML = '';
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = allPosts.slice(start, end);

    postsToShow.forEach(post => {
        postsSection.appendChild(post);
    });
}

function setupPagination(totalPages) {
    paginationContainer.innerHTML = '';

    // Previous button
    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.classList.add('pagination-link');
    prevLink.textContent = '上一页';
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePagination(true); // 传入 true 表示是用户触发的翻页，需要滚动
        }
    });
    paginationContainer.appendChild(prevLink);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.classList.add('pagination-link');
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add('current');
        }
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            updatePagination(true); // 传入 true 表示是用户触发的翻页，需要滚动
        });
        paginationContainer.appendChild(pageLink);
    }

    // Next button
    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.classList.add('pagination-link');
    nextLink.textContent = '下一页';
    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination(true); // 传入 true 表示是用户触发的翻页，需要滚动
        }
    });
    paginationContainer.appendChild(nextLink);
}

// 修改 updatePagination 函数，接受一个参数来控制是否滚动
function updatePagination(shouldScroll = false) { // 默认不滚动
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    if (totalPages === 0) {
        paginationContainer.style.display = 'none';
        return;
    } else {
        paginationContainer.style.display = 'flex';
    }

    displayPosts(currentPage);
    setupPagination(totalPages);

    const prevButton = paginationContainer.querySelector('.pagination-link:first-child');
    const nextButton = paginationContainer.querySelector('.pagination-link:last-child');

    if (currentPage === 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    if (currentPage === totalPages) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }

    // 只有当 shouldScroll 为 true 时才执行滚动
    if (shouldScroll) {
        postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initPagination() {
    // 首次加载时调用 updatePagination，但不传入 true，所以不会滚动
    updatePagination(false);
}
*/

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