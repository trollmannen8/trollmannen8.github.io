var hourHand = document.querySelector('.hand-hour');
var minuteHand = document.querySelector('.hand-minute');
var secondHand = document.querySelector('.hand-seconds');


function getTime() {
    var now = new Date();

    var seconds = now.getSeconds();
    var secondsDegree = (((seconds / 60) * 360) + 90);
    secondHand.style.transform = `rotate(${secondsDegree}deg)`


    var minutes = now.getMinutes();
    var minutesDegree = ((((minutes + seconds / 60) / 60) * 360) + 90);
    minuteHand.style.transform = `rotate(${minutesDegree}deg)`


    var hours = now.getHours();
    var hoursDegree = ((((hours + minutes / 60) / 12) * 360) + 90);
    hourHand.style.transform = `rotate(${hoursDegree}deg)`



}

setInterval(getTime, 1000);