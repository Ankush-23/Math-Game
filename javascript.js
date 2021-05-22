var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on the start/rest 
document.getElementById("startreset").onclick = function() {
    if (playing == true) { //if we are playing
        location.reload(); //reload the page
    } else { //if we are not playing

        // change the playing mode
        playing = true;
        // set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show the countdown box
        show("timeremaining")
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide countdown box
        hide("gameover");

        // change the button to reset the game
        document.getElementById("startreset").innerHTML = "Reset game";

        //start countdown
        startCountdown();

        //generate a new Q&A

        generateQA();
    }

}

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);

                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);

            }
        }
    }
}

//functions

//start counter
function startCountdown() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + "</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start game";
        }

    }, 1000);
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

// hide function
function hide(id) {
    document.getElementById(id).style.display = "none";

}

// show function
function show(id) {
    document.getElementById(id).style.display = "block";
}

//generate question and multiple answers

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    //fill with wrong answers
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random());
            }
            while (answers.indexOf(wrongAnswer) > -1) {

            }
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }

    }


}