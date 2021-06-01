var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

function displayTime() {
    var time = new Date();
    var hoursValue = time.getHours();
    var minutesValue = time.getMinutes();
    var secondsValue = time.getSeconds();
    if (hoursValue < 10) {
        hoursValue = "0" + hoursValue.toString();
    }
    if (minutesValue < 10) {
        minutesValue = "0" + minutesValue.toString();
    }
    if (secondsValue < 10) {
        secondsValue = "0" + secondsValue.toString();
    }
    
    hours.innerHTML = hoursValue;
    minutes.innerHTML = minutesValue;
    seconds.innerHTML = secondsValue;
}

setInterval(displayTime, 1000);