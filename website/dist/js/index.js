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
      "https://yfznhpscnnprxco4gazhgb5ilq0wudef.lambda-url.us-east-1.on.aws/"
  );
  let data = await response.json();
  counter.innerHTML = `Views: ${data}`;
}
updateCounter();
