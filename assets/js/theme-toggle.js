// Theme Toggle with localStorage
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const htmlElement = document.documentElement;
  
  // Set theme icon based on current theme
  function updateIcon() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (themeIcon) {
      themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
  }
  
  // Set theme and update icon
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    localStorage.setItem('habitopedia-theme', theme);
    updateIcon();
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }
  
  // Initialize icon on page load (theme already set by inline script)
  updateIcon();
  
  // Add click listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('habitopedia-theme');
    if (!savedTheme) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
