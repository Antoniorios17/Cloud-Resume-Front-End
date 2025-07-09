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
