$(document).ready(function() {

    //JSON Object with questions & correct answers
    var questionsArray = [{
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
    var numQuestions = questionsArray.length;
    var numChoices = currentQuestion.choices.length;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unanswered = 0;
    var next = 0;

    var remaining = 3;    
    

    //function to start the game
    function startGame() {
        //reset answers on game start
        correctAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        next = 0;
        currentQuestion = questionsArray[0];
        
        $('#questionText').text(currentQuestion.questionText);
        for (var i = 0; i < numChoices; i++) {
            var choice = currentQuestion.choices[i];
            $('#answers').append('<div class="choice" data-attribute=' + choice + '>' + choice + '</div>');
        }

        //hide the intro & outro on game start
        $('#intro').hide();
        $('#outro').hide();

        //show the questions div on game start
        $('#questions').show();
    }

    function checkChoice() {
        
    }

    function endGame(){
        $('#questions').hide();
        $('#outro').show();
        $('#correct span').text(correctAnswers);
        $('#wrong span').text(wrongAnswers);
        $('#unanswered span').text(unanswered);
    }

    //show next question & answers on click
    $('#answers').on('click', '.choice', function() {
        //empty the choices before displaying next question
        $('#answers').empty();

        //define correct answer variable
        var correctAnswer = currentQuestion.correct;

        //increment to the next question
        next++;
        currentQuestion = questionsArray[next];


        if (next < numQuestions) {
            //define a variable for number of choices for current question
            numChoices = currentQuestion.choices.length;

            //fill in current question text from JSON
            $('#questionText').text(currentQuestion.questionText);

            //show as many choices as current question has
            for (var i = 0; i < numChoices; i++) {
                var choice = currentQuestion.choices[i];
                $('#answers').append('<div class="choice" data-attribute=' + choice + '>' + choice + '</div>');
            }
        }

        //grab the value of chosen answer
        var chosen = $(this).attr('data-attribute');

        //if correct answer chosen
        if (chosen === correctAnswer) {
            correctAnswers++;
            console.log('correct: ' + correctAnswers);
        }

        //if incorrect answer chosen
        else if (chosen !== correctAnswer) {
            wrongAnswers++;
            console.log('wrong: ' + wrongAnswers);
        }

        //if time ran out
        else {
            unanswered++;
            console.log('unanswered: ' + unanswered);
        }

        checkChoice();

        if (next == numQuestions) {
            endGame();
        }

    });

    //call start game function when user clicks start or restart
    $('.start-restart').click(function() {
        startGame();
    });

});