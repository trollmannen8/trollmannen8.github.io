const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const city = document.getElementById("city");
const msg = document.querySelector(".top-banner .msg");
const alert = document.querySelector("#alert");
const contentCurrent = document.querySelector("#content-current");
const contentHourly = document.querySelector("#content-hourly");
const contentDaily = document.querySelector("#content-daily");
const apiKey = "944cb94e82e619709c4178e16db05e96";
const weekDays = {
  0: "Vasárnap",
  1: "Hétfő",
  2: "Kedd",
  3: "Szerda",
  4: "Csütörtök",
  5: "Péntek",
  6: "Szombat"
};
const weekDaysEn = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}
const month = {
  0: "január",
  1: "február",
  2: "március",
  3: "április",
  4: "május",
  5: "június",
  6: "július",
  7: "augusztus",
  8: "szeptember",
  9: "október",
  10: "november",
  11: "december"
}

function twoDigits(digit) {
  if (digit < 10) {
    digit = "0" + digit.toString();
  }
  return digit;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  contentCurrent.innerHTML = "";
  contentHourly.innerHTML = "";
  contentDaily.innerHTML = "";
  const inputVal = input.value;
  const ajaxItems = document.querySelectorAll(".ajax-section");

  alert.innerHTML = "";
  city.innerHTML = "";

  const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`
  
  fetch(urlGeo)
  .then(response => response.json())
  .then(data => {
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(data);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hu`;
  fetch(url)
  .then(response => response.json())
  .then(weather => {

    console.log(weather);
    console.log(weather.hasOwnProperty("alerts"));
    var sunRise = new Date(weather.current.sunrise * 1000);
    var sunSet = new Date(weather.current.sunset * 1000);

    if (weather.hasOwnProperty("alerts")) {
      var alertStart = new Date(weather.alerts[0].start * 1000);
      var alertEnd = new Date(weather.alerts[0].end * 1000);
      var startHour = alertStart.getHours();
      var startMinute = alertStart.getMinutes();
      var endHour = alertEnd.getHours();
      var endMinute = alertEnd.getMinutes();
      alert.innerHTML = `
      ${weather.alerts[0].event},
       starts: ${weekDaysEn[alertStart.getDay()]}, ${twoDigits(startHour)}:${twoDigits(startMinute)},
        ends: ${weekDaysEn[alertEnd.getDay()]}, ${twoDigits(endHour)}:${twoDigits(endMinute)}
      `
    }

    ajaxItems.forEach(function(item) {
      item.style.display = "block";
    });

    city.innerHTML += `<h3>${data[0].name}, ${data[0].country}</h3>`
    contentCurrent.innerHTML += `
    <h3>Aktuális időjárás</h3>
    <div class="ajax-top">
      <div class="current">
        <img class="city-icon" src="https://openweathermap.org/img/wn/${weather.current.weather[0]["icon"]}@2x.png">
        <div class="city-text">
          <span class="city-temp">${Math.round(weather.current.temp)}˚C</span>
          <span class="description-text">${weather.current.weather[0]["description"]}</span>
        </div>
      </div>
      <div class="additional-data">
        <span><span class="legend">UV index: </span>${weather.current.uvi}</span>
        <span><span class="legend">Valós érzet: </span>${Math.round(weather.current.feels_like)}°C</span>
        <span><span class="legend">Páratartalom: </span>${weather.current.humidity}%</span>
        <span><span class="legend">Napkelte: </span>${twoDigits(sunRise.getHours())}:${twoDigits(sunRise.getMinutes())}</span>
        <span><span class="legend">Napnyugta: </span>${twoDigits(sunSet.getHours())}:${twoDigits(sunSet.getMinutes())}</span>
      </div>
    </div>
    `
    contentHourly.innerHTML += `<h3>Óránkénti előrejelzés a következő 24 órára</h3>`
    for (let i = 1; i <= 24; i++) {
      var currentHour = new Date(weather.hourly[i].dt * 1000).getHours();
      contentHourly.innerHTML += `
      <div class="hourly-container">
        <span class="legend">${twoDigits(currentHour)}:00: </span>
        <img class="small-icon" src="https://openweathermap.org/img/wn/${weather.hourly[i - 1].weather[0]["icon"]}@2x.png">
        <span>${Math.round(weather.hourly[i - 1].temp)}˚C, </span>
        <span>${weather.hourly[i - 1].weather[0]["description"]}</span>
      </div>`
    }
    contentDaily.innerHTML += `<h3>Előrejelzés 7 napra</h3>`
    for (let j = 0; j <= 6; j++) {
      var currentDate = new Date(weather.daily[j].dt * 1000);
      contentDaily.innerHTML += `
      <div class="daily">
        <h4>${weekDays[currentDate.getDay()]} (${month[currentDate.getMonth()]} ${currentDate.getDate()}.)</h4>
        <div class="daily-container">
          <img class="city-icon" src="https://openweathermap.org/img/wn/${weather.daily[j].weather[0]["icon"]}@2x.png">
          <div class="city-text">
            <span class="city-temp-daily"><span class="legend">Nappal: </span>${Math.round(weather.daily[j].temp.day)}˚C, ${weather.daily[j].weather[0]["description"]}</span>
            <span class="city-temp-daily"><span class="legend">Éjjel: </span>${Math.round(weather.daily[j].temp.night)}˚C</span>
          </div>
        </div>
      </div>
      `
    }
  })
  })
  .catch(() => {
    msg.textContent = "Nincs ilyen város.";
    ajaxItems.forEach(function(item) {
      item.style.display = "none";
    });
  });

msg.textContent = "";
form.reset();
input.focus();
});