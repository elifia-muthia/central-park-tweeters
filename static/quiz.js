var currentQuestionIndex = 0;
var answers = [];
var questions = [];

$(document).ready(function() {
    setDifficulty('none');

    $('#easy-btn').click(function() {
        setDifficulty('easy');
    });

    $('#hard-btn').click(function() {
        setDifficulty('hard');
    });

    $('#quiz-start').click(function() {
        startQuiz();
    })

    $('#redo-quiz').click(function() {
        window.location.href = '/quiz';
    })

    $('#go-home').click(function() {
        window.location.href = '/';
    })
});

function setDifficulty(difficulty) {
    console.log(difficulty)
    $('#easy-btn, #hard-btn').removeClass('selected-difficulty');

    // Add 'selected-difficulty' class to the selected button based on difficulty
    if (difficulty === 'easy') {
        $('#easy-btn').addClass('selected-difficulty');
    } else if (difficulty === 'hard') {
        $('#hard-btn').addClass('selected-difficulty');
    }
}

function startQuiz() {
    // Check for the button that has the 'selected-difficulty' class
    var selectedDifficulty = $('#difficulty-level .selected-difficulty').attr('id');

    // Ensure a difficulty is selected
    if (!selectedDifficulty) {
        $('#difficulty-warning').show()
        return; // Exit the function if no selection is made
    }

    // Get the difficulty from the button's id by removing '-btn' and print it or use it
    var difficulty = selectedDifficulty.replace('-btn', '');
    console.log("Starting quiz with difficulty:", difficulty);

    getQuizQuestions(difficulty, function(quiz_questions) {
        console.log(quiz_questions);
        questions = quiz_questions
        doQuiz();
    });

}

function getQuizQuestions(difficulty, handleData) {
    request_data = {'level': difficulty}

    $.ajax({
        type: "POST",
        url: "get_quiz_questions",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request_data),
        success: function(result) {
            handleData(result.data);
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}

function doQuiz() {
    $('#quiz-landing').hide();
    $('#quiz-section').show();
    displayQuestion(currentQuestionIndex);

    $('#submit-quiz-btn').hide();

    // Set up the click handler for the 'Next' button
    $('#next-q-btn').click(function() {
        var selectedAnswer = $('input[name="answer"]:checked').val();

        if (!selectedAnswer) {
            // If no answer is selected, show the warning message
            $('#answer-warning').show();
            return; // Do not proceed to the next question or submit the quiz
        } else {
            // If an answer is selected, hide the warning message (if it was shown previously)
            $('#answer-warning').hide();
        }

        if (currentQuestionIndex < questions.length - 1) {
            // Save current answer before moving on
            answers[currentQuestionIndex] = selectedAnswer; // Store the answer
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            $('#prev-q-btn').show(); // Show back button after the first question
        } 
    });

    $('#prev-q-btn').hide();

    // Set up the click handler for the 'Back' button
    $('#prev-q-btn').click(function() {
        if (currentQuestionIndex > 0) {
            var selectedAnswer = $('input[name="answer"]:checked').val();
            answers[currentQuestionIndex] = selectedAnswer;
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            if (currentQuestionIndex === 0) {
                $('#prev-q-btn').hide(); // Hide back button on the first question
            }
            $('#submit-quiz-btn').hide();
            $('#next-q-btn').show();
        }
    });

    $('#submit-quiz-btn').click(showQuizResults);
}

function displayQuestion(index) {
    var question = questions[index];

    console.log(question)

    if (index === questions.length - 1) {
        $('#next-q-btn').hide();
        $('#submit-quiz-btn').show();
    } else {
        $('#next-q-btn').show();
    }

    // Display question number and total
    $('#question-num').text('Question ' + (index + 1) + ' of ' + questions.length);

    // Display the question text
    $('#question').text(question['question']);

    // Display the media if available
    if (question.media_type === "img" && question.media) {
        $('#question-media').html('<img src="' + question.media + '" alt="Question media" id="question-img">');
    } 
    else if (question.media_type === "audio" && question.media) {
        $('#question-media').html('<audio controls><source src="' + question.media + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
    }
    else {
        $('#question-media').empty(); // Clear previous media if none is present
    }

    $('#answers').empty();

    // Loop through choices and create radio buttons for each
    for (var i = 1; i <= 4; i++) {
        var choiceKey = 'choice' + i;
        if (question[choiceKey]) {
            var answerElem = $('<div class="answer"><label><input type="radio" name="answer" value="' + choiceKey + '" />' + question[choiceKey] + '</label></div>');
            $('#answers').append(answerElem);
        }
    }

    // Check previously selected answer if returning to question
    if (answers[index]) {
        $('input[name="answer"][value="' + answers[index] + '"]').prop('checked', true);
    }

    
}

function showQuizResults() {
    var selectedAnswer = $('input[name="answer"]:checked').val();

    if (!selectedAnswer) {
        // If no answer is selected, show the warning message
        $('#answer-warning').show();
        return; // Do not proceed to the next question or submit the quiz
    } else {
        // If an answer is selected, hide the warning message (if it was shown previously)
        $('#answer-warning').hide();
    }

    answers[currentQuestionIndex] = selectedAnswer;

    $('#quiz-section').hide();
    $('#quiz-results').show();

    var score = gradeQuiz();

    $('#quiz-score').text(score + ' out of ' + questions.length);

    
    const combinedOptions = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    };
    const now = new Date();
    let time_now = now.toLocaleString('en-US', combinedOptions);

    quiz = {"questions": questions, 
            "answers": answers, 
            "score": score, 
            "datetime": time_now}

    getQuizHistory(quiz, function(quiz_history) {
        console.log(quiz_history);
        questions = quiz_history
        showQuizHistory(quiz_history);
    });

}

function showQuizHistory(quiz_history) {
    $.each(quiz_history, function(index, quiz) {
        if (index !== quiz_history.length - 1) {
            var row = $('<tr>').attr('data-id', quiz.id);
            
            row.append(
                $('<td>').text(quiz.datetime),
                $('<td>').text(quiz.score + " out of " + quiz.questions.length)
            );
            
            row.click(function() {
                window.location.href = '/past_quiz/' + $(this).data('id');
            });
            
            $('table tbody').append(row);
        }
    })
}

function getQuizHistory(quiz, handleQuizHistory) {
    request_data = {'quiz': quiz}

    $.ajax({
        type: "POST",
        url: "submit_quiz",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request_data),
        success: function(result) {
            handleQuizHistory(result.data);
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}

function gradeQuiz() {
    var score = 0;
    for (var i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}