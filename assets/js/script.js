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

var questionObjects = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correct: 2,
        visited: false
    },
    {
        question: "The condition in an if/else statement is enclosed within:",
        answers: [
            "quotes", 
            "curly braces",
            "parentheses",
            "square brackets"
        ],
        correct: 2,
        visited: false
    },
    {
        question: "Arrays in Javascript can be used to store:",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correct: 3,
        visited: false
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        answers: [
            "commas",
            "curly braces",
            "quotes",
            "parentheses"
        ],
        correct: 2,
        visited: false
    },
    {
        question: "A very useful tool used during debugging for printing values to the debugger is:",
        anwers: [
            "javascript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correct: 3,
        visited: false
    }
];

function init() {
    questionsPage.style.display = "none";
    highScoresPage.style.display = "none";

    for (var i = 0; i < questionObjects.length; i++) {
        questionObjects[i].visited = false;
    }
}

function start() {
    startPage.style.display = "none";
    highScoresPage.style.display = "none";
    questionsPage.style.display = "block";
}

function displayRandomQuestion() {
    var question  = questionObjects[Math.floor(Math.random() * questionObjects.length)];
    while (question.visited) {
        question  = questionObjects[Math.floor(Math.random() * questionObjects.length)];
    }

    var buttons = [];
    for (var i = 0; i < 4; i++) {
        var button = document.createElement("button");
        button.textContent = question
    }
}

startButton.addEventListener("click", start);

init();