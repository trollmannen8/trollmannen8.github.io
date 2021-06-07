const msg = document.querySelector(".top-banner .msg");
const contentCurrent = document.querySelector("#content-current");
const contentHourly = document.querySelector("#content-hourly");
const contentDaily = document.querySelector("#content-daily");
const apiKey = "944cb94e82e619709c4178e16db05e96";
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=47.49&lon=19.04&appid=${apiKey}&units=metric&lang=hu`;
const time = new Date();
var currentHour;
var weekDays = {
  0: "Vasárnap",
  1: "Hétfő",
  2: "Kedd",
  3: "Szerda",
  4: "Csütörtök",
  5: "Péntek",
  6: "Szombat"
};

console.log(Date.now());
console.log(time.getDay())

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    contentCurrent.innerHTML += `
    <h3>Aktuális időjárás</h3>
    <div class="current">
      <img class="city-icon" src="https://openweathermap.org/img/wn/${data.current.weather[0]["icon"]}@2x.png">
      <div class="city-text">
        <span class="city-temp">${Math.round(data.current.temp)}˚C</span>
        <span class="description-text">${data.current.weather[0]["description"]}</span>
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

    for (let j = 1; j <= 7; j++) {
      let day = time.getDay();
      if (day + j > 6) {
        day = day - 7;
      }
      contentDaily.innerHTML += `
      <div class="daily">
        <h4>${weekDays[day + j]}</h4>
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

