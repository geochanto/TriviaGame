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

    var number = 5;
    var intervalId;    
    var clockRunning = false;

    //function to start the game
    function startGame() {
        //reset answers on game start
        correctAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        next = 0;
        currentQuestion = questionsArray[0];
        clockRunning = true;
        
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
        countDown();
    }

    function endGame(){
        $('#questions').hide();
        $('#outro').show();
        $('#correct span').text(correctAnswers);
        $('#wrong span').text(wrongAnswers);
        $('#unanswered span').text(unanswered);
        stopWatch();
    }

    function countDown() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }

    function resetWatch() {
        //clearInterval(intervalId);
        number = 5;
        console.log('reset!');
      }

    function stopWatch() {
      clearInterval(intervalId);
      clockRunning = false;
    }
      //move on to next question
      function nextQuestion() {
        $('.modal').modal('show');
        setTimeout(function(){ 
        $('#time').show();
        $('.modal').modal('hide');
        //define a variable for number of choices for current question
        numChoices = currentQuestion.choices.length;

        //fill in current question text from JSON
        $('#questionText').text(currentQuestion.questionText);

        //show as many choices as current question has
        for (var i = 0; i < numChoices; i++) {
            var choice = currentQuestion.choices[i];
            $('#answers').append('<div class="choice" data-attribute=' + choice + '>' + choice + '</div>');
        }
        countDown();
         }, 3000);
      }

      function decrement() {
        //  Decrease number by one.
        number--;
  
        //  Show the number in the #show-number tag.
        $("#remaining").text(number);

        //  Once number hits zero...
        if (number === 0) {
  
          //  ...run the stop function.
          
          resetWatch();
          nextQuestion();
          //  Alert the user that time is up.
          $('.modal-title').html("Time's Up :(");
          $('.modal-body').html('Try your luck with the next Question.');
          unanswered++;
        }
      }
      
    //show next question & answers on click
    $('#answers').on('click', '.choice', function() {
        resetWatch();
        
        //define correct answer variable
        var correctAnswer = currentQuestion.correct;

        //empty the choices before displaying next question
        $('#answers').empty();
        $('#questionText').empty();
        $('#time').hide();
        //increment to the next question
        next++;
        currentQuestion = questionsArray[next];


        if (next < numQuestions) {
            nextQuestion();
        }

        //grab the value of chosen answer
        var chosen = $(this).attr('data-attribute');

        //if correct answer chosen
        if (chosen === correctAnswer) {
            correctAnswers++;
            $('.modal-title').html('You got it!');
            $('.modal-body').html('<b>'+correctAnswer+'</b>' + ' is indeed the correct answer.');
            console.log('correct: ' + correctAnswers);
        }

        //if incorrect answer chosen
        else if (chosen !== correctAnswer) {
            wrongAnswers++;
            $('.modal-title').html('Nope!');
            $('.modal-body').html('<b>'+correctAnswer+'</b>' + ' is the correct answer.');
            console.log('wrong: ' + wrongAnswers);
        }



        if (next == numQuestions) {
            $('.modal').modal('show');
            setTimeout(function(){ 
                $('.modal').modal('hide');
                endGame();
            }, 3000);
        }
    });


    //call start game function when user clicks start or restart
    $('.start-restart').click(function() {
        startGame();
    });

});