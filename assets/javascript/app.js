$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

  // set the time at 60 seconds, and count down by 1 second
  timeRemaining : 60,

  // start the timer, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // decrement the timer and update the UI; stop the timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide the questions and display the end page with results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Skipped questions: " + numUnanswered);
  }
}

// functions to handle the building questions page and scoring
var trivia = {

  // pull questions from the array of questions, loop through them, and append to UI
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // add a Done button to the end of the page and register its click handler
    var doneButton = '<button class="btn btn-danger" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if the user answers are correct, incorrect, or if there are unanswered questions
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop through to compare the text of the label with the user answers
    // increment score counts appropriately
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show the end page with the score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank =
[
  {
    question: "Which Seinfeld writer voiced George Steinbrenner on and off from seasons five through nine?",
    answers: ["Larry David", "Peter Mehlman", "Larry Charles"],
    correct: "Larry David"
  },

  {
    question: "In one episode Jerry agreed to wear a particular article of clothing for an interview by Bryant Gumbel on 'The Today Show' What was it?",
    answers: ["A Sombrero", "An Urban Sombrero", "A Puffy Shirt"],
    correct: "A Puffy Shirt"
  },
  {
    question: "Other than Jerry, who uttered the words 'Hello Newman'?",
    answers: ["Elaine", "Kramer", "Helen Seinfeld"],
    correct: "Helen Seinfeld"
  },
  {
    question: "Which television actress never played one of Jerry's love interests?",
    answers: ["Courtney Cox", "Debra Messing", "Ellen Pompeo"],
    correct: "Ellen Pompeo"
  },
  {
    question: "In 'The Cigar Store Indian', what type of sandwich does Kramer, Jerry and Elaine get on the subway?",
    answers: ["Meatball", "Spam", "Gyro"],
    correct: "Gyro"
  },
  {
    question: "In the episode The Race, what is the name of Jerry's old high school nemesis?",
    answers: ["Duncan Meyer", "Duncan Basketballs", "Duncan Donuts"],
    correct: "Duncan Meyer"
  },
  {
    question: "Who died from licking envelopes?",
    answers: ["George's fiance Susan", "Jerry's Uncle Leo", "Newman"],
    correct: "George's fiance Susan"
  },
  {
    question: "Why does George put his hand in the tip jar at Piesano's in 'The Calzone'?",
    answers: ["He wants the cook to see him put the money in.", "He needs quarters for the meter.", "He dropped his engagement ring."],
    correct: "He wants the cook to see him put the money in."
  },
  {
    question: "What was festivus?",
    answers: ["A Jewish holiday", "A New York street fair", "An alternative holiday celebrated by George's father Frank"],
    correct: "An alternative holiday celebrated by George's father Frank"
  },
  {
    question: "What is Newman's moniker when he is hired to eat the muffin stumps?",
    answers: ["The Cleaner", "The Closer","The muffin man"],
    correct: "The Cleaner"
  }
]
