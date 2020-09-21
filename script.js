var quizContainer = document.querySelector("#quiz-container");
var results = document.querySelector("#results");
var container = document.querySelector(".container");
var statsTable = document.querySelector("#leaderboard");

var questions = [
    {
        question: "Which of the following is FALSE about J.R.R. Tolkien?",
        answers: ["Tolkien worked on the staff for the Oxford English Dictionary","Tolkien was a soldier in World War I","Tolkien spent 7 years creating the LoTR world and writing the trilogy","Tolkien was born in South Africa"],
        correct: "Tolkien spent 7 years creating the LoTR world and writing the trilogy"
    },
    {
        question: "Who finds and helps Frodo, Sam, Merry, and Pippin through the Old Forest at the start of the first book?",
        answers: ["Tom Bombadil","Radagast the Brown","Gandalf", "Gildor"],
        correct: "Tom Bombadil"
    },
    {
        question: "Who of the following is NOT a bearer of one of the Three Elven Rings?",
        answers: ["Galadriel","Elrond","Celebrimbor","Gandalf"],
        correct: "Celebrimbor"
    },
    {
        question: "Who kills the leader of the Nazgul, the Witch-King of Angmar?",
        answers: ["Eomer","Aragorn","Legolas","Eowyn and Merry"],
        correct: "Eowyn and Merry"
    },
    {
        question: "___ Rings were given to the Elves, ___ Rings were given to the Dwarves, and ___ Rings were given to Men.",
        answers: ["Three, Seven, Nine", "Three, Nine, Seven","Three, Four, Seven","Three, Eight, Nine"],
        correct: "Three, Seven, Nine"
    },
    {
        question: "Gimli's father was one of the thirteen dwarves under Thorin Oakenshield's lead in 'The Hobbit'. Which one was his father?",
        answers: ["Balin", "Gloin","Dwalin","Oin"],
        correct: "Gloin"
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
        timer.style.display = "none";
        results.style.display = "none";
        var timeHeader = document.createElement("h2");      
        timeHeader.textContent = "You ran out of time! Try again?"
        container.append(timeHeader);
        var restart = document.createElement("button");
        restart.setAttribute("id","refresh");
        restart.innerHTML = "Try Again";
        container.append(restart);
        restart.addEventListener("click", function() {
            window.location.reload();
        });
    }
}

// End game function

function endGame() {
    // Clear screen
    quizContainer.style.display = "none";
    results.style.display = "none";
    timer.style.display = "none";
    var endHeader = document.createElement("h2");
    document.querySelector("#title").textContent = "Trivia Complete!"

        clearInterval(timerInt);
        statsTable.style.display = "block";
        endHeader.textContent = "Congratulations! You finished the quiz!";
        container.append(endHeader);
        var finalScoreH3 = document.createElement("h3");
        finalScoreH3.textContent = "You got " + score + " question(s) correct and your final score is: " + timeRemaining + "!";
        container.append(finalScoreH3);

        // Allow for user to enter their name
        var newContainer = document.createElement("div");
        newContainer.setAttribute("id","score-container");
        container.appendChild(newContainer);

        var namePrompt = document.createElement("h4");
        namePrompt.setAttribute("id", "name-prompt");
        namePrompt.textContent = "Enter your name: ";
        newContainer.append(namePrompt);

        var nameInput = document.createElement("input");
        var form = document.createElement("form");
        var formContainer = document.createElement("div");
        formContainer.setAttribute("id","form-container");
        newContainer.appendChild(formContainer);
        formContainer.appendChild(form);
        nameInput.setAttribute("placeholder", "Enter Your Name");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name-input");
        form.appendChild(nameInput);

        submitName = document.createElement("button");
        submitName.innerHTML = "Submit";
        submitName.setAttribute("type", "submit");
        submitName.setAttribute("id", "name-submit");
        formContainer.appendChild(submitName);
        
        var playAgain = document.createElement("button");
        playAgain.innerHTML = "Play Again";
        playAgain.setAttribute("id","refresh");
        document.body.appendChild(playAgain);

    // Use local storage commands to store and save player data
        playAgain.addEventListener("click", function() {
            window.location.reload();
        })

        var warning = document.createElement("h4");
        container.append(warning);
        var storedScores = localStorage.getItem("stats");

    // Function to display scores
    function displayScores() {
        for (var j=0; j<JSON.parse(localStorage.stats).length; j++) {
            console.log(j);
            var ind = JSON.parse(localStorage.stats)[j];
            console.log(ind);
            document.querySelector("#u"+(j+1)).textContent = ind.username;
            document.querySelector("#s"+(j+1)).textContent = ind.score;
        };
    };

        // Display Scores
        if (localStorage.stats !== undefined) {
            displayScores();
        }

        submitName.addEventListener("click", function() {

            warning.textContent = "";
            // Define variable the name input value
            var userName = nameInput.value;
            // Define empty array for the key:value pairs of users and their score
            nameInput.value = ""; 

            if (!userName || userName === "") {
                warning.textContent = "You must input a number!"
            }
            else {
                var stats = {username: userName, score: timeRemaining};
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
                displayScores();
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
    // Display each question in the quiz container
    for (var i=0; i<questions.length; i++) {
        var displayedQuestion = questions[currentQIndex].question;
        var displayedAnswers = questions[currentQIndex].answers;
        quizContainer.textContent = displayedQuestion;
    }
    console.log(displayedAnswers);
    // Display the possible answers for each question choice
    displayedAnswers.forEach(function(choice) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = choice;
        quizContainer.appendChild(buttonEl);
    })
}

// Check if a chosen answer is correct or not, if not deduct 10 seconds from the timer

quizContainer.addEventListener ("click", function(event) {
    event.preventDefault();
    var obj = event.target;

    // If the target is a list element...
    if (obj.matches("button")) {
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