$(document).ready(function() {
    show_results();
});

function show_results() {
    $.each(history, function(index, quiz) {
        console.log("history: " + quiz)
        var row = $('<tr>').attr('data-id', quiz.id);
        
        var capitalized_difficulty = quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1);

        row.append(
            $('<td>').text(quiz.datetime),
            $('<td>').text(capitalized_difficulty),
            $('<td>').text(quiz.score + " out of " + quiz.questions.length)
        );
        
        row.click(function() {
            window.location.href = '/past_quiz/' + $(this).data('id');
        });
        
        $('table tbody').append(row);

    })
}