$(document).ready(function(){

var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

//JSON Object with questions & correct answers
var questions = {
    question1: {
        questionText: "who?",
        choices: {
            answer1: "you",
            answer2: "me",
            answer3: "her",
            answer4: "him"
        },
        correct: "her"
    },
    question2: {
        questionText: "what?",
        choices: {
            answer1: "this",
            answer2: "that",
            answer3: "it",
            answer4: "those"
        },
        correct: "this"
    }
}

function startGame() {
    correctAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;
    console.log('started!');
}

$('.start-restart').click(function() {
startGame();
});

});