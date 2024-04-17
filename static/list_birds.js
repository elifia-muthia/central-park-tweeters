$(document).ready(function() {
    show_results(results);
});


function show_results(results) {
    $.each(results, function(index, bird) {
        var row = $('<tr>')
            .attr('data-id', bird.id) 
            .append(
                $('<td>').text(bird.name),
                $('<td>').text(bird.season)
            )
            .click(function() {
                window.location.href = '/view/' + $(this).data('id');
            });
    
        $('table tbody').append(row);
    });
    
   

}