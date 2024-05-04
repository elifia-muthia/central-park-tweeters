var currentQuestionIndex = 0;
var answers = [];
var questions = [];
var difficulty = "";
var mode = "";
var dropped = "";
var currentQuestionType = "";

$(document).ready(function() {
    setDifficulty('none');

    $('#easy-btn').click(function() {
        setDifficulty('easy');
    });

    $('#hard-btn').click(function() {
        setDifficulty('hard');
    });

    $('#quiz-start').click(function() {
        // Check for the button that has the 'selected-difficulty' class
        var selectedDifficulty = $('#difficulty-level .selected-difficulty').attr('id');

        // Ensure a difficulty is selected
        if (!selectedDifficulty) {
            $('#difficulty-warning').show()
            return; // Exit the function if no selection is made
        }

        const viewsToCheck = Array.from({ length: 6 }, (_, i) => `/view/${i + 1}`);

        // Check if all views are in the pages array
        const allViewsPresent = viewsToCheck.every(view => navigated.includes(view));

        if (allViewsPresent == false) {
            $('#startModal').css('display', 'block');
        }
        else {
            startQuiz();
        }
    })

    $('#redo-quiz').click(function() {
        window.location.href = '/quiz';
    })

    $('#go-home').click(function() {
        window.location.href = '/';
    })

    $('.close').click(function() {
        $('#startModal').css('display', 'none');
    });

    // Continue the quiz
    $('#continue-btn').click(function() {
        $('#startModal').hide();
        startQuiz();
    });

    // Decide to study more
    $('#study-more-btn').click(function() {
        $('#startModal').hide();
        window.location.href = '/birds'
    });

    // Click anywhere outside of the modal to close it
    $(window).click(function(event) {
        if ($(event.target).is('#startModal')) {
            $('#startModal').hide();
        }
    });

    $("#past-quiz").click(function() {
        window.location.href = "/quiz_history"
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
    var selectedDifficulty = $('#difficulty-level .selected-difficulty').attr('id');
    // Get the difficulty from the button's id by removing '-btn' and print it or use it
    difficulty = selectedDifficulty.replace('-btn', '');
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
        var selectedAnswer;
        if (mode == "multiple-choice") {
            selectedAnswer = $('input[name="answer"]:checked').val();
        } else if (mode == "drag_and_drop") {
            selectedAnswer = dropped; 
            if (!selectedAnswer) { 
                $('#answer-warning').text('Please place the bird in a valid area before proceeding.'); 
                $('#answer-warning').show();
                return;
            }
        }
    
        if (!selectedAnswer) {
            $('#answer-warning').show();
            return;
        } else {
            $('#answer-warning').hide();
        }
    
        if (currentQuestionIndex < questions.length - 1) {
            answers[currentQuestionIndex] = selectedAnswer; 
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            $('#prev-q-btn').show(); 
        } else {
            $('#submit-quiz-btn').show(); 
            $('#next-q-btn').hide();
        }
    });
    

    $('#prev-q-btn').hide();

    // Set up the click handler for the 'Back' button
    $('#prev-q-btn').click(function() {
        if (currentQuestionIndex > 0) {
            var selectedAnswer = $('input[name="answer"]:checked').val();
            if(mode === "drag_and_drop"){
                selectedAnswer = dropped;
            }
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

    mode = question.type

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

    // Display the media if available
    if (question.type === "multiple-choice") {
        $('#answers').show();
        $('#dd-answers').hide();

        $('#drag-and-drop-question-area').hide();
        currentQuestionType = question.type;
        if (question.media_type === "img" && question.media) {
            $('#question-media').html('<img src="' + question.media + '" alt="Question media" id="question-img">');
        } 
        else if (question.media_type === "audio" && question.media) {
            $('#question-media').html('<audio controls><source src="' + question.media + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
        }
        else {
            $('#question-media').empty(); 
        }

        $('#answers').empty();

        // Loop through choices and create radio buttons for each
        for (var i = 1; i <= 4; i++) {
            var choiceKey = 'choice' + i;
            if (question[choiceKey]) {
                var answerElem = $('<div class="answer"><label class="mcq"><input type="radio" name="answer" value="' + choiceKey + '" />' + question[choiceKey] + '</label></div>');
                $('#answers').append(answerElem);
            }
        }

        // Check previously selected answer if returning to question
        if (answers[index]) {
            $('input[name="answer"][value="' + answers[index] + '"]').prop('checked', true);
        }
    }
    else if (question.type === "drag_and_drop") {
        $('#answers').hide();
        $('#dd-answers').show();

        $('#drag-and-drop-question-area').show();
        currentQuestionType = question.type;
        // initQuizMap(question);
        $('#question-media').html('<audio controls><source src="' + question.media + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');

        $('#dd-answers').empty();
        

        var dropZoneDivs = {
            choice1: $(`
                <div class="drop-zone" id="choice1">
                    <img class="drop_img" src="${question.media1}" alt="${question.choice1}">
                    <div class="label">${question.choice1}</div>
                </div>
            `),
            choice2: $(`
                <div class="drop-zone" id="choice2">
                    <img class="drop_img" src="${question.media2}" alt="${question.choice2}">
                    <div class="label">${question.choice2}</div>
                </div>
            `),
            choice3: $(`
                <div class="drop-zone" id="choice3">
                    <img class="drop_img" src="${question.media3}" alt="${question.choice3}">
                    <div class="label">${question.choice3}</div>
                </div>
            `)
        };

        
        for (let key in dropZoneDivs) {
            $('#dd-answers').append(dropZoneDivs[key]);
        }
    
        var birdImg = $('<img>', {
            id: 'dragBird',
            src: question.drag_bird,
            alt: 'Draggable Bird'
        }).css({
            cursor: 'pointer',
            width: '100px' 
        });
    
        if (answers[index]) {
            $(`#${answers[index]}`).append(birdImg);
        } else {
            $('#dd-answers').append(birdImg);
        }
        
        initializeDragAndDrop();
    }
    
}

function initializeDragAndDrop() {
    setTimeout(() => {
        $('#dragBird').draggable({
            revert: 'invalid', 
            cursor: 'move', 
            containment: 'document' 
        });

        $('.drop-zone').droppable({
            accept: '#dragBird', 
            hoverClass: 'highlighted', 
            drop: function(event, ui) {
                dropped = this.id; 
                console.log(`Dropped in ${this.id}`);
            }
        });
    }, 100); 
}


function showQuizResults() {
    var selectedAnswer = "";
    if(currentQuestionType === "multiple-choice"){
        selectedAnswer = $('input[name="answer"]:checked').val();
        console.log("SelectedAnswer (showQuizResult): " + selectedAnswer)
    }
    else{
        selectedAnswer = dropped;
        console.log("SelectedAnswer (showQuizResult): " + selectedAnswer)
        //selectedAnswer = $('#' + answers[index]).find('img:last-child');
    }
    console.log(selectedAnswer);

    if (!selectedAnswer) {
        $('#answer-warning').show();
        return;
    } else {
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
            "datetime": time_now,
            "difficulty": difficulty}

    submitQuiz(quiz)

}


function submitQuiz(quiz) {
    request_data = {'quiz': quiz}

    $.ajax({
        type: "POST",
        url: "submit_quiz",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request_data),
        success: function(result) {
            console.log("Submitted quiz")
            $("#review-quiz").click(function() {
                id = result['data'].id
                window.location.href = "/past_quiz/" + id
            })
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
