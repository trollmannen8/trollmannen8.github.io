var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var weekday = document.getElementById("weekday");
var month = document.getElementById("month");
var day = document.getElementById("day");
var week = {
    0: "SU",
    1: "MO",
    2: "TU",
    3: "WE",
    4: "TH",
    5: "FR",
    6: "SA"
}

function displayTime() {
    var time = new Date();
    var hoursValue = time.getHours();
    var minutesValue = time.getMinutes();
    var secondsValue = time.getSeconds();
    var weekdayValue = week[time.getDay()];
    var monthValue = time.getMonth() + 1;
    var dayValue = time.getDate();
    if (hoursValue < 10) {
        hoursValue = "0" + hoursValue.toString();
    }
    if (minutesValue < 10) {
        minutesValue = "0" + minutesValue.toString();
    }
    if (secondsValue < 10) {
        secondsValue = "0" + secondsValue.toString();
    }
    
    weekday.innerHTML = weekdayValue;
    month.innerHTML = monthValue;
    day.innerHTML = dayValue
    hours.innerHTML = hoursValue;
    minutes.innerHTML = minutesValue;
    seconds.innerHTML = secondsValue;
}

setInterval(displayTime, 1000);