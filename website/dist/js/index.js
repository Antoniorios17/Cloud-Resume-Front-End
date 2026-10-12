const themeToggle = document.getElementById('theme-toggle');

function updateThemeToggle() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeToggle();
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (error) {}
  updateThemeToggle();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

const counter = document.querySelector(".counter-number");
async function updateCounter() {
  let response = await fetch(
      " https://tq2vs34svaxi2fw7s4yhnpxuie0xbget.lambda-url.us-east-1.on.aws/"
  );
  let data = await response.json();
  counter.innerHTML = `Visits: ${data}`;
}
updateCounter();
