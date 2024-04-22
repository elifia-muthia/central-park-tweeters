$(document).ready(function() {
    get_page_title(loc);
    show_results(results, studied);
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

function show_results(results, studied) {
    $.each(results, function(index, bird) {
        var row = $('<tr>').attr('data-id', bird.id);
    
        // Check if the visited page list contains the current bird's page
        var visitedPage = studied.includes('/view/' + bird.id);
    
        row.append(
            $('<td>').text(bird.name),
            $('<td>').text(bird.season)
        );
    
        // Conditionally append a checkmark or an empty cell
        if (visitedPage) {
            var checkmarkTd = $('<td>').html('<img src="/static/assets/checkmark.webp" alt="Visited" style="width:20px; height:20px;">');
            row.append(checkmarkTd);
        } else {
            var emptyTd = $('<td>').html('');
            row.append(emptyTd);
        }
    
        row.click(function() {
            window.location.href = '/view/' + $(this).data('id');
        });
    
        $('table tbody').append(row);
    });
    
}