const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const content = document.querySelector("#content");
const apiKey = "944cb94e82e619709c4178e16db05e96";

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@4x.png`;

      const markup = `
        <div class="city-name" data-name="${name},${sys.country}">
          <span>${name},</span>
          <span>${sys.country}</span>
        </div>
        <div class="display">
          <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          </figure>
          <div class="weather-text">
            <div class="city-temp">${Math.round(main.temp)}°C</div>
            <div class="description-text">${weather[0]["description"]}</div>
          </div>
        </div>
      `;
      content.innerHTML = markup;
      document.querySelector(".ajax-section").style.display = "block";
    })
    .catch(() => {
      msg.textContent = "This is not a valid city.";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});