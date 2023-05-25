var gamePage = document.getElementById("game");
var hsLink = document.getElementById("high-score-link");
var timerText = document.getElementById("timer");
var startPage = document.getElementById("start");
var startButton = document.querySelector("#start button");
var questionsPage = document.getElementById("questions");
var questionText = document.getElementById("question");
var answers = document.getElementById("answers");
var rightOrWrong = document.getElementById("right-wrong");
var finishPage = document.getElementById("finish");
var finalScore = document.getElementById("final-score");
var initialsInput = document.querySelector("#finish input");
var initialsButton = document.querySelector("#finish button");
var highScoresPage = document.getElementById("high-scores-page");
var highScoresOl = document.getElementById("high-scores");
var backButton = document.getElementById("back");
var clearButton = document.getElementById("clear");

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
        answers: [
            "javascript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correct: 3,
        visited: false
    }
];

var currentQuestion = {};

var timer = 60;
var score  = 0;

var questionsAnswered = 0;

var interval = {};

var highScores = [];

function compareScores(a, b) {
    if (a.score < b.score) {
        return 1;
    } else if (a.score > b.score) {
        return -1;
    }
    return 0;
}

function init() {
    questionsPage.style.display = "none";
    finishPage.style.display = "none";
    highScoresPage.style.display = "none";
    startPage.style.display = "block";

    timer = 60;
    score = 0;
    timerText.textContent = "60";
    questionsAnswered = 0;
    rightOrWrong.textContent = "";

    clearQuestion();

    for (var i = 0; i < questionObjects.length; i++) {
        questionObjects[i].visited = false;
    }

    var highScoresObject = JSON.parse(localStorage.getItem("highScores"));
    if (highScoresObject) {
        highScores = highScoresObject;
    }
}

function finish() {
    questionsPage.style.display = "none";
    highScoresPage.style.display = "none";
    startPage.style.display = "none";
    finishPage.style.display = "block";

    finalScore.textContent = score;

    clearInterval(interval);
}

function start() {
    startPage.style.display = "none";
    finishPage.style.display = "none";
    highScoresPage.style.display = "none";
    questionsPage.style.display = "block";

    newQuestion();
    displayCurrentQuestion();

    interval = setInterval(function() {
        timer--;
        timerText.textContent = timer;

        if (timer === 0) {
            finish();
        }
    }, 1000);
}

function newQuestion() {
    currentQuestion  = questionObjects[Math.floor(Math.random() * questionObjects.length)];
    while (currentQuestion.visited) {
        currentQuestion  = questionObjects[Math.floor(Math.random() * questionObjects.length)];
    }

    currentQuestion.visited = true;
}

function clearQuestion() {
    answers.innerHTML = "";
}

function displayCurrentQuestion() {
    //Render question text
    questionText.textContent = currentQuestion.question;

    //Render answers
    for (var i = 0; i < 4; i++) {
        var button = document.createElement("button");
        var li = document.createElement("li");
        li.append(button);

        button.textContent = currentQuestion.answers[i];

        answers.append(li);
    }
}

function handleAnswer(right) {
    if (right) {
        rightOrWrong.textContent = "Correct!";
        score += 5;
    } else {
        rightOrWrong.textContent = "Incorrect.";
        timer -= 5;
    }
    clearQuestion();
    newQuestion();
    displayCurrentQuestion();
}

function displayHighScores() {
    questionsPage.style.display = "none";
    highScoresPage.style.display = "block";
    startPage.style.display = "none";
    finishPage.style.display = "none";

    highScoresOl.innerHTML = "";

    highScores.sort(compareScores);
    for (var i = 0; i < highScores.length; i++) {
        var element = document.createElement("li");
        element.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScoresOl.append(element);
    }
}

startButton.addEventListener("click", start);
answers.addEventListener("click", function(event) {
    questionsAnswered++;
    if (questionsAnswered === questionObjects.length) {
        finish();
        return;
    }
    if (event.target.textContent === currentQuestion.answers[currentQuestion.correct]) {
        handleAnswer(true);
    } else {
        handleAnswer(false);
    }
});

initialsButton.addEventListener("click", function() {
    var initials = initialsInput.value;
    if (initials !== "") {
        highScores.push({initials: initials, score: score});
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }    
});

backButton.addEventListener("click", function() {
    init();
});

clearButton.addEventListener("click", function() {
    highScores = [];
    localStorage.clear();
    displayHighScores();
});

init();