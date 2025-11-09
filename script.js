// Theme Management
const themeToggle = document.getElementById('themeToggle');
const themeOverlay = document.getElementById('themeOverlay');
const themeAnimation = document.getElementById('themeAnimation');
let themeAnimInstance = null;

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Play Theme Toggle Animation
function showThemeAnimation(isDark) {
    themeOverlay.classList.add('active');

    if (themeAnimInstance) themeAnimInstance.destroy();
    themeAnimation.innerHTML = ""; // Remove fallback emojis

    const animationPath = isDark ? 'dark.json' : 'light.json';

    themeAnimInstance = lottie.loadAnimation({
        container: themeAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animationPath
    });

    setTimeout(() => themeOverlay.classList.remove('active'), 2000);
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    showThemeAnimation(newTheme === 'dark');

    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }, 200);
});


// ✅ HERO LOTTIE (WELCOME ANIMATION FIX)
let heroLottieInstance = null;

function loadHeroAnimation() {
    const heroContainer = document.getElementById('heroLottie');
    heroContainer.innerHTML = ""; // Remove emoji fallback completely

    heroLottieInstance = lottie.loadAnimation({
        container: heroContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'welcome.json' // YOU MUST HAVE THIS FILE
    });
}


// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadHeroAnimation(); // ✅ Runs the correct welcome animation
});

// ===== GALLERY SLIDER =====
const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");
const prevButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;

function updateGallery() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentIndex);
    });

    indicators.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateGallery();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateGallery();
});

indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        currentIndex = parseInt(indicator.dataset.index);
        updateGallery();
    });
});

// Initialize
updateGallery();
