var quizContainer = document.querySelector("#quiz-container");
var results = document.querySelector("#results");
var container = document.querySelector(".container");
var statsTable = document.querySelector("#leaderboard");

var questions = [
    {
        question: "Which of the following is false about J.R.R. Tolkien?",
        answers: ["Tolkien worked on the staff for the Oxford English Dictionary","Tolkien was a soldier in World War I","Tolkien spent 7 years creating the LoTR world and writing the trilogy","Tolkien was born in South Africa"],
        correct: "Tolkien spent 7 years creating the LoTR world and writing the trilogy"
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

var score;
var currentQIndex;
var timeRemaining;
var startBtn = document.querySelector("#start");

function initialCond() {
    score = 0;
    currentQIndex = 0;
    timeRemaining = 15*questions.length;
    quizContainer.style.display = "none";
    results.style.display = "none";
    startBtn.style.display = "block";
}

initialCond();

// Create timer

var wrongAnswer = 10;
var timerInt;
var timer = document.querySelector("#timer");
timer.textContent = "Time Remaining: " + timeRemaining + " seconds";
timer.style.display = "none";

// Timer functionality, counts down every 1000ms and at 0 seconds calls the end game function, when timer starts the start button will disappear and the quiz content will be shown

function countdown() {
    timer.style.display = "block";
    quizContainer.style.display = "block";
    results.style.display = "block";
    startBtn.style.display = "none";
    document.querySelector("#introduction").style.display = "none";
    timerInt = setInterval(function() {
        timer.textContent = "Time Remaining: " + timeRemaining + " seconds";

        if (timeRemaining <= 0) {
            clearInterval(timerInt);
            timesUp();
        }
        timeRemaining--;
    }, 1000);

    renderQuestions(currentQIndex);
}

// Times up function
function timesUp() {
    // Condition if game ends due to running out of time
    if (timeRemaining <= 0) {            
        endHeader.textContent = "You ran out of time! Try again?"
        container.append(endHeader);
        var restart = document.createElement("button");
        restart.innerHTML = "Try Again";
        restart.onclick = initialCond();
    }
}

// End game function

function endGame() {
    // Clear screen
    quizContainer.style.display = "none";
    results.style.display = "none";
    timer.style.display = "none";
    var endHeader = document.createElement("h2");
    document.querySelector("#title").textContent = "You Finished the Quiz!"

        clearInterval(timerInt);
        statsTable.style.display = "block";
        endHeader.textContent = "Congratulations! You finished the quiz!";
        container.append(endHeader);
        var finalScoreH3 = document.createElement("h3");
        finalScoreH3.textContent = "You got " + score + " question(s) correct and your final score is: " + timeRemaining + "!";
        container.append(finalScoreH3);

        // Allow for user to enter their name

        var namePrompt = document.createElement("label");
        namePrompt.setAttribute("id", "name-prompt");
        namePrompt.textContent = "Enter your name: ";
        container.append(namePrompt);

        var nameInput = document.createElement("input");
        var form = document.createElement("form");
        container.appendChild(form);
        nameInput.setAttribute("placeholder", "Enter Your Name");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name-input");
        form.appendChild(nameInput);

        submitName = document.createElement("button");
        submitName.innerHTML = "Submit";
        submitName.setAttribute("type", "submit");
        submitName.setAttribute("id", "name-submit");
        container.appendChild(submitName);

    // Use local storage commands to store and save player data

        submitName.addEventListener("click", function() {

            // Define variable the name input value
            var userName = nameInput.value;
            // Define empty array for the key:value pairs of users and their score
            nameInput.value = ""; 

            if (!userName || userName === "") {
                var warning = document.createElement("h4");
                warning.textContent = "You must input a number!";
                container.append(warning);
            }
            else {
                var stats = {username: userName, score: timeRemaining};
                var storedScores = localStorage.getItem("stats");
                if (storedScores === null) {
                    storedScores = [];
                }
                else {
                    storedScores = JSON.parse(storedScores);
                }
                // console.log(storedScores)
                
                // Set max length of storeScores to 5 to match with the leaderboard table dimensions
                if (storedScores.length > 4){
                    storedScores.pop();
                    storedScores.unshift(stats);
                }
                else {
                    storedScores.unshift(stats);
                }
                // console.log(storedScores.length);
                // console.log(stats);
                var stringifyScores = JSON.stringify(storedScores);
                localStorage.setItem("stats", stringifyScores);
                // console.log(localStorage.stats);
                
                // Display stats on leaderboard
                for (var j=0; j<JSON.parse(localStorage.stats).length; j++) {
                    console.log(j);
                    var ind = JSON.parse(localStorage.stats)[j];
                    console.log(ind);
                    document.querySelector("#u"+(j+1)).textContent = ind.username;
                    document.querySelector("#s"+(j+1)).textContent = ind.score;
                }
            }
        });

        // Get form to submit with enter button as well
        form.addEventListener('submit', function() {
            event.preventDefault();
            submitName.click();
        });

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
    displayedAnswers.forEach(function(choice) {
        var listEl = document.createElement("li");
        quizContainer.appendChild(ulEl);
        listEl.textContent = choice;
        ulEl.appendChild(listEl);
    })
}

// Check if a chosen answer is correct or not, if not deduct 10 seconds from the timer

quizContainer.addEventListener ("click", function(event) {
    event.preventDefault();
    var obj = event.target;

    // If the target is a list element...
    if (obj.matches("li")) {
        if (obj.textContent === questions[currentQIndex].correct) {
            score++;
            results.textContent = "You are correct!";
        }
        else {
            timeRemaining = timeRemaining - wrongAnswer;
            timer.textContent = "Time Remaining: " + timeRemaining + " seconds";
            results.textContent = "Sorry, that is not correct. The correct answer is: " + questions[currentQIndex].correct + ".";
        }
    }

    // Go to next question
    currentQIndex++;

    // What do when ALL questions are asked
     if (currentQIndex >= questions.length) {
         endGame();
     }
     else {
         renderQuestions(currentQIndex);
     }
});

// Start button will start the timer
startBtn.addEventListener("click", countdown);