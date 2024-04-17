$(document).ready(function() {
    get_page_title(loc);
    show_results(results);
});

function get_page_title(loc) {
    if (loc != null){
        if (loc == 'freshwater') {
            title = 'List of Freshwater Birds:';
        }
        else if (loc == 'open-areas') {
            title = 'List of Open Area Birds:';
        }
        else {
            title = 'List of Woodland Birds:';
        }
        console.log(title);
        $("#list-title").text(title);
    }
    else {
        $("#list-title").text('List of Birds:');
    }
}

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