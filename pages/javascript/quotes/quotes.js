let quotes = [
    "Talk is cheap. Show me the code. (Linus Torvalds)",
    "Happiness should be a function without any parameters. (Pranshu Midha)",
    "Programming is like sex. One mistake and you have to support it for the rest of your life. (Michael Sinz)",
    "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. (Mosher’s Law of Software Engineering)",
    "First, solve the problem. Then, write the code. (John Johnson)",
    "Code is like humor. When you have to explain it, it’s bad. (Cory House)",
    "So much complexity in software comes from trying to make one thing do two things. (Ryan Singer)",
    "Copy-and-Paste was programmed by programmers for programmers actually. (Unknown)",
    "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live. (John F. Woods)",
    "Software and cathedrals are much the same — first we build them, then we pray. (Sam Redwine)",
    "There are two ways to write error-free programs; only the third works. (Alan Perlis)"
]

function randomQuote() {
    let i = Math.floor(Math.random() * quotes.length);
    let display = document.getElementById("quote");

    display.innerHTML = `<img src="left-quote.png"><p id="text">${quotes[i]}</p><img src="right-quote.png">`;
}

document.getElementById("button").addEventListener("click", randomQuote);