$(document).ready(function(){

var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var next = 0;

//JSON Object with questions & correct answers
var questionsArray = [
    {
        questionText: "who?",
        choices: [
            "you",
            "me",
            "her",
            "him"
        ],
        correct: "her"
    },
    {
        questionText: "what?",
        choices: [
            "this",
            "that",
            "it",
        ],
        correct: "this"
    },
    {
        questionText: "where?",
        choices: [
            "here",
            "there",
            "yonder",
            "near"

        ],
        correct: "near"
    }
]

var currentQuestion = questionsArray[0];
var numChoices = currentQuestion.choices.length;

//function to start the game
function startGame() {
    //reset answers on game start
    correctAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;
    var currentQuestion = questionsArray[0];
    
    console.log('started!');
    $('#questionText').text(currentQuestion.questionText);
    for (var i = 0; i<numChoices; i++) {
        var choice = currentQuestion.choices[i];
        $('#answers').append('<div class="choice" data-attribute='+ choice +'>'+ choice +'</div>');
    }

    //hide the intro on game start
    $('#intro').hide();

    //show the questions div on game start
    $('#questions').show();
}

// for (var i = 0; i<questionsArray.length; i++) {
$('.next').click(function() {
    $('#answers').empty();
    console.log('next clicked!');
    next++;
    currentQuestion = questionsArray[next];
    numChoices = currentQuestion.choices.length;
    $('#questionText').text(currentQuestion.questionText);
    for (var i = 0; i<numChoices; i++) {
        var choice = currentQuestion.choices[i];
        $('#answers').append('<div class="choice" data-attribute='+ choice +'>'+ choice +'</div>');
    }
});

//call start game function when user clicks start or restart
$('.start-restart').click(function() {
startGame();
});

});