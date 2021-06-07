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


fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(data.hasOwnProperty("alerts"));
    sunRise = new Date(data.current.sunrise * 1000);
    sunSet = new Date(data.current.sunset * 1000);

    if (data.hasOwnProperty("alerts")) {
      var alertStart = new Date(data.alerts[0].start * 1000);
      var alertEnd = new Date(data.alerts[0].end * 1000);
      var startHour = alertStart.getHours();
      if (startHour < 10) {
        startHour = "0" + startHour.toString();
      }
      var endHour = alertEnd.getHours();
      if (endHour < 10) {
        endHour = "0" + endHour.toString();
      }
      alert.innerHTML = `
      ${data.alerts[0].description} Starts: ${startHour}:${alertStart.getMinutes()}, ends: ${endHour}:${alertEnd.getMinutes()}
      `
    }

    contentCurrent.innerHTML += `
    <h3>Aktuális időjárás</h3>
    <div class="ajax-top">
      <div class="current">
        <img class="city-icon" src="https://openweathermap.org/img/wn/${data.current.weather[0]["icon"]}@2x.png">
        <div class="city-text">
          <span class="city-temp">${Math.round(data.current.temp)}˚C</span>
          <span class="description-text">${data.current.weather[0]["description"]}</span>
        </div>
      </div>
      <div class="additional-data">
        <span><span class="legend">UV index: </span>${data.current.uvi}</span>
        <span><span class="legend">Valós érzet: </span>${Math.round(data.current.feels_like)}°C</span>
        <span><span class="legend">Páratartalom: </span>${data.current.humidity}%</span>
        <span><span class="legend">Napkelte: </span>0${sunRise.getHours()}:${sunRise.getMinutes()}</span>
        <span><span class="legend">Napnyugta: </span>${sunSet.getHours()}:${sunSet.getMinutes()}</span>
      </div>
    </div>
    `

    for (let i = 1; i <= 24; i++) {
      currentHour = new Date(data.hourly[i].dt * 1000).getHours();
      if (currentHour < 10) {
        currentHour = "0" + currentHour.toString();
      }
      contentHourly.innerHTML += `
      <div class="hourly-container">
        <span class="legend">${currentHour}:00: </span>
        <img class="small-icon" src="https://openweathermap.org/img/wn/${data.hourly[i - 1].weather[0]["icon"]}@2x.png">
        <span>${Math.round(data.hourly[i - 1].temp)}˚C, </span>
        <span>${data.hourly[i - 1].weather[0]["description"]}</span>
      </div>`
    }

    for (let j = 0; j <= 6; j++) {
      currentDate = new Date(data.daily[j].dt * 1000);
      contentDaily.innerHTML += `
      <div class="daily">
        <h4>${weekDays[currentDate.getDay()]} (${month[currentDate.getMonth()]} ${currentDate.getDate()}.)</h4>
        <div class="daily-container">
          <img class="city-icon" src="https://openweathermap.org/img/wn/${data.daily[j].weather[0]["icon"]}@2x.png">
          <div class="city-text">
            <span class="city-temp-daily"><span class="legend">Nappal: </span>${Math.round(data.daily[j].temp.day)}˚C, ${data.daily[j].weather[0]["description"]}</span>
            <span class="city-temp-daily"><span class="legend">Éjjel: </span>${Math.round(data.daily[j].temp.night)}˚C</span>
          </div>
        </div>
      </div>
      `
    }
  })
  .catch(() => {
    msg.textContent = "Hiba történt.";
});