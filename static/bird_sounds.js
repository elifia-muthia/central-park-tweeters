$(document).ready(function() {
    show_results(results);
});


function show_results(results) {
    $.each(results, function(index, bird) {
        console.log(bird)
        // Create a container for each bird
        var birdDiv = $('<div>').addClass('bird-tone');

        // Add the title
        birdDiv.append($('<h3>').text(bird.title));

        // Add the audio player if a sound file is available
        if (bird.sound) {
            var audioHtml = '<audio controls><source src="' + bird.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
            birdDiv.append($(audioHtml));
        }

        if (bird.info) {
            birdDiv.append($('<p>').text(bird.info));
        }

        // Append this bird's div to the main container
        $('#tone').append(birdDiv);
    });
}