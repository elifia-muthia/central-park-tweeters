var currentQuestionIndex = 0;
var questions = [];
var answers = [];

$(document).ready(function() {
    getQuizQuestions(id, function(past_quiz) {
        console.log(past_quiz);
        questions = past_quiz.questions
        answers = past_quiz.answers
        render_quiz();
    });

});

function getQuizQuestions(id, handleData) {
    quiz = {'id': id}

    $.ajax({
        type: "POST",
        url: "/get_past_quiz",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(quiz),
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


function render_quiz() {
    displayQuestion(currentQuestionIndex);

    $('#submit-quiz-btn').hide();

    $('#submit-quiz-btn').click(function() {
        window.location.href = "/quiz_history"
    })

    // Set up the click handler for the 'Next' button
    $('#next-q-btn').click(function() {
        if (currentQuestionIndex < questions.length - 1) {
            // Save current answer before moving on
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            $('#prev-q-btn').show(); // Show back button after the first question
        } 
    });

    $('#prev-q-btn').hide();

    // Set up the click handler for the 'Back' button
    $('#prev-q-btn').click(function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            if (currentQuestionIndex === 0) {
                $('#prev-q-btn').hide(); // Hide back button on the first question
            }
            $('#next-q-btn').show();
        }
        $('#submit-quiz-btn').hide();
        $("#next-q-btn").text("Next")

    });
}

function displayQuestion(index) {
    var question = questions[index];
    var answer = answers[index];

    console.log(question)
    console.log(answer)

    if (index === questions.length - 1) {
        $('#next-q-btn').hide();
        $('#submit-quiz-btn').show();
    } else {
        $('#next-q-btn').show();
    }

    // Display question number and total
    $('#question-num').text('Question ' + (index + 1) + ' of ' + questions.length);

    // Display the question text
    $('#question').text(question.question);

    $("#question-media").empty();

    if (question.type === "multiple-choice") {
        if (question.media_type === "img") {
            $('#question-media').html('<img src="' + question.media + '" alt="Question media" id="question-img">');
        } 
        else if (question.media_type === "audio") {
            $('#question-media').html('<audio controls><source src="' + question.media + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
        }
    }
    else {
        var contentHtml = `
            <img id="media-image" src="${question.drag_bird}" alt="Descriptive alt text">
            <audio controls>
                <source src="${question.media}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        $('#question-media').html(contentHtml);
    }

    $('#your-answer').html('<strong>Your answer:</strong> ' + question[question.answer]);
    $('#correct-answer').html('<strong>Correct answer:</strong> ' + question[answer]);
    
    if (question.answer == answer) {
        $('#result-icon').html('<img src="/static/assets/checkmark.webp">');
    }
    else {
        $('#result-icon').html('<img src="/static/assets/wrong.png">');
    }

}