var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var weekday = document.getElementById("weekday");
var month = document.getElementById("month");
var day = document.getElementById("day");
var week = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
}
var h24 = true;

document.getElementById("h12").addEventListener("click", function() {
    h24 = false;
    document.getElementById("h12").style.display = "none";
    document.getElementById("h24").style.display = "block";
});

document.getElementById("h24").addEventListener("click", function() {
    h24 = true;
    document.getElementById("h24").style.display = "none";
    document.getElementById("h12").style.display = "block";
});

function displayTime() {
    var time = new Date();
    var hoursValue = time.getHours();
    var minutesValue = time.getMinutes();
    var secondsValue = time.getSeconds();
    var weekdayValue = week[time.getDay()];
    var monthValue = time.getMonth() + 1;
    var dayValue = time.getDate();
    if (h24 === false && hoursValue > 12) {
        hoursValue = hoursValue - 12;
        document.getElementById("ampm").innerHTML = "PM";
    } else {
        document.getElementById("ampm").innerHTML = "AM";
    }
    if (h24 === true) {
        document.getElementById("ampm").innerHTML = "24H";
    }
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