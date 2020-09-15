var quizContainer = document.querySelector("#quiz-container");
var results = document.querySelector("#results");

var questions = [
    {
        question: "What is 1 + 1?",
        answers: ["1","2","3"],
        correct: "2"
    },
    {
        question: "What is 2 + 5?",
        answers: ["3","7","2"],
        correct: "7"
    },
    {
        question: "What is 11 + 1?",
        answers: ["12","10","34"],
        correct: "12"
    }
];

function initialCond() {
    var score = 0;
    var currentQIndex = 0;
    var timeRemaining = 15*questions.length;
    quizContainer.style.display = "none";
    results.style.display = "none";
    startBtn.style.display = "block";
}

initialCond();

// Create timer

var wrongAnswer = 10;
var timer = document.querySelector("#timer");
timer.textContent = "Time Remaining: " + timeRemaining + " seconds";
var startBtn = document.querySelector("#start");

// Timer functionality, counts down every 1000ms and at 0 seconds calls the end game function, when timer starts the start button will disappear and the quiz content will be shown

function countdown() {
    quizContainer.style.display = "block";
    results.style.display = "block";
    startBtn.style.display = "none";
    var timerInt = setInterval(function() {
        timer.textContent = "Time Remaining: " + timeRemaining + " seconds";

        if (timeRemaining <= 0) {
            clearInterval(timerInt);
            endGame();
        }
        timeRemaining--;
    }, 1000);

    renderQuestions(currentQIndex);
}

// End game function

function endGame() {
    // Clear screen
    quizContainer.style.display = "none";
    results.style.display = "none";
    var endHeader = document.createElement("h2")

    if (timeRemaining <= 0) {
        endHeader.textContent = "You ran out of time! Try again?"
        quizContainer.appendChild(endHeader);
        var restart = document.createElement("button");
        restart.innerHTML = "Try Again";
        restart.onclick = initialCond();
    }
    else {
        endHeader.textContent = "Congratulations! You finished the quiz!";
        quizContainer.appendChild(endHeader);
        
    }
}

// Display questions

function renderQuestions(currentQIndex) {
    ulEl = document.createElement("ul");
    // Display each question in the quiz container
    for (var i=0; i<questions.length; i++) {
        var displayedQuestion = questions[currentQIndex].question;
        var displayedAnswers = questions[currentQIndex].answers;
        quizContainer.textContent = displayedQuestion;
    }
    console.log(displayedAnswers);
    // Display the possible answers for each question choice
    displayedAnswers.forEach(function(choice)) {
        var listEl = document.createElement("li");
        quizContainer.appendChilc(ulEl);
        listEl.textContent = choice;
        ulEl.appendChild(listEl);
        // When you click on an answer, program will you if it correct or not
        listEl.addEventListener("click", checkAnswer()); // Create a check answer function
    }
}

// Check if a chosen answer is correct or not, if not deduct 10 seconds from the timer

function checkAnswer(event) {

}


// Start button will start the timer
startBtn.addEventListener("click", countdown);