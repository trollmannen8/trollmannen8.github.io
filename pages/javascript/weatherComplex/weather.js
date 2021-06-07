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
    sunRise = new Date(data.current.sunrise * 1000);
    sunSet = new Date(data.current.sunset * 1000);

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
        <span>UV index: ${data.current.uvi}</span>
        <span>Valós érzet: ${Math.round(data.current.feels_like)}°C</span>
        <span>Páratartalom: ${data.current.humidity}%</span>
        <span>Napkelte: 0${sunRise.getHours()}:${sunRise.getMinutes()}</span>
        <span>Napnyugta: ${sunSet.getHours()}:${sunSet.getMinutes()}</span>
      </div>
    </div>
    `

    for (let i = 1; i <= 24; i++) {
      currentHour = time.getHours() + i;
      if (currentHour >= 24) {
        currentHour = currentHour -24
      }
      if (currentHour < 10) {
        currentHour = "0" + currentHour.toString();
      }
      contentHourly.innerHTML += `
      <div class="hourly-container">
        <span class="hour">${currentHour}:00: </span>
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
            <span class="city-temp-daily">Nappal: ${Math.round(data.daily[j].temp.day)}˚C, ${data.daily[j].weather[0]["description"]}</span>
            <span class="city-temp-daily">Éjjel: ${Math.round(data.daily[j].temp.night)}˚C</span>
          </div>
        </div>
      </div>
      `
    }
  })
  .catch(() => {
    msg.textContent = "Hiba történt.";
});

