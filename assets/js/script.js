var gamePage = document.getElementById("game");
var hsLink = document.getElementById("high-score-link");
var timer = document.getElementById("timer");
var startPage = document.getElementById("start");
var startButton = document.querySelector("#start button");
var questionsPage = document.getElementById("questions");
var questionText = document.getElementById("question");
var answers = document.getElementById("answers");
var rightOrWrong = document.getElementById("right-wrong");
var highScoresPage = document.getElementById("high-scores");
var finalScore = document.getElementById("final-score");
var initialsInput = document.querySelector("#high-scores input");
var initialsButton = document.querySelector("#high-scores button");

function init() {
    questionsPage.style.display = "none";
    highScoresPage.style.display = "none";
}

function start() {
    startPage.style.display = "none";
    highScoresPage.style.display = "none";
    questionsPage.style.display = "block";
}

startButton.addEventListener("click", start);

init();