const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const city = document.getElementById("city");
const msg = document.querySelector(".top-banner .msg");
const alert = document.querySelector("#alert");
const contentCurrent = document.querySelector("#content-current");
const contentHourly = document.querySelector("#content-hourly");
const contentDaily = document.querySelector("#content-daily");
const apiKey = "944cb94e82e619709c4178e16db05e96";
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=47.49&lon=19.04&appid=${apiKey}&units=metric&lang=hu`;
const time = new Date();
var currentHour;
var currentDate;
var sunRise;
var sunSet;
var weekDays = {
  0: "Vasárnap",
  1: "Hétfő",
  2: "Kedd",
  3: "Szerda",
  4: "Csütörtök",
  5: "Péntek",
  6: "Szombat"
};
var month = {
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
    ajaxItems.forEach(function(item) {
      item.style.display = "block";
    });
    console.log(weather);
    console.log(weather.hasOwnProperty("alerts"));
    sunRise = new Date(weather.current.sunrise * 1000);
    sunSet = new Date(weather.current.sunset * 1000);

    if (weather.hasOwnProperty("alerts")) {
      var alertStart = new Date(weather.alerts[0].start * 1000);
      var alertEnd = new Date(weather.alerts[0].end * 1000);
      var startHour = alertStart.getHours();
      if (startHour < 10) {
        startHour = "0" + startHour.toString();
      }
      var startMinute = alertStart.getMinutes();
      if (startMinute < 10) {
        startMinute = "0" + startMinute.toString();
      }
      var endHour = alertEnd.getHours();
      if (endHour < 10) {
        endHour = "0" + endHour.toString();
      }
      var endMinute = alertEnd.getMinutes();
      if (endMinute < 10) {
        endMinute = "0" + endMinute.toString();
      }
      alert.innerHTML = `
      ${weather.alerts[0].event}, starts: ${startHour}:${startMinute}, ends: ${endHour}:${endMinute}
      `
    }

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
        <span><span class="legend">Napkelte: </span>0${sunRise.getHours()}:${sunRise.getMinutes()}</span>
        <span><span class="legend">Napnyugta: </span>${sunSet.getHours()}:${sunSet.getMinutes()}</span>
      </div>
    </div>
    `
    contentHourly.innerHTML += `<h3>Óránkénti előrejelzés a következő 24 órára</h3>`
    for (let i = 1; i <= 24; i++) {
      currentHour = new Date(weather.hourly[i].dt * 1000).getHours();
      if (currentHour < 10) {
        currentHour = "0" + currentHour.toString();
      }
      contentHourly.innerHTML += `
      
      <div class="hourly-container">
        <span class="legend">${currentHour}:00: </span>
        <img class="small-icon" src="https://openweathermap.org/img/wn/${weather.hourly[i - 1].weather[0]["icon"]}@2x.png">
        <span>${Math.round(weather.hourly[i - 1].temp)}˚C, </span>
        <span>${weather.hourly[i - 1].weather[0]["description"]}</span>
      </div>`
    }
    contentDaily.innerHTML += `<h3>Előrejelzés 7 napra</h3>`
    for (let j = 0; j <= 6; j++) {
      currentDate = new Date(weather.daily[j].dt * 1000);
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
  });

msg.textContent = "";
form.reset();
input.focus();
});