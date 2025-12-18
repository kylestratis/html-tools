/**
 * Centralized Dark Mode Theme JavaScript
 * Shared across all HTML Tools
 *
 * Usage:
 * 1. Add <link rel="stylesheet" href="theme.css"> in <head>
 * 2. Add <button class="theme-toggle" id="themeToggle"><span class="theme-icon">🌙</span></button> in <body>
 * 3. Add <script src="theme.js"></script> before closing </body>
 * 4. (Optional) Register a callback for theme changes: window.onThemeChange = function() { ... }
 */

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    if (!themeToggle || !themeIcon) {
        console.warn('Theme toggle button or icon not found. Make sure to include the required HTML elements.');
        return;
    }

    // Check for saved theme preference or default to system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);

        // Call optional callback for tools that need to update on theme change
        // (e.g., canvas-based tools that need to redraw)
        if (typeof window.onThemeChange === 'function') {
            window.onThemeChange(theme);
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize theme on page load
    setTheme(getPreferredTheme());

    // Listen for toggle button clicks
    themeToggle.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Export functions for external use if needed
    window.themeManager = {
        getTheme: function() {
            return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        },
        setTheme: setTheme,
        toggleTheme: toggleTheme
    };
})();
