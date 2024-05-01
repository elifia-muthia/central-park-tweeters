$(document).ready(function() {
    show_results(results);

    $(".accordion").click(function(){
        // Toggle the "active" class on the clicked accordion
        $(this).toggleClass("active");

        // Select the next element (assumed to be the panel)
        var panel = $(this).next();

        console.log(panel)
        console.log(panel.css("maxHeight"))
        // console.log(panel.css("margin-bottom"))
        // console.log(accordion.css("margin"))

        // Check if the panel is open
        if (panel.css("maxHeight") !== "0px" && panel.css("maxHeight")) {
            // Panel is open, set maxHeight to null to close it
            panel.css("maxHeight", "0px");
            // panel.css("margin-bottom","2px"); 
        } else {
            // Panel is closed, open it by setting maxHeight to the scrollHeight
            panel.css("maxHeight", panel.prop("scrollHeight") + "px");
        }
    });
});


function show_results(results) {
    $.each(results, function(index, bird) {
        console.log(bird)
        // Create a container for each bird
        var birdDiv = $('<div>').addClass('bird-tone');


        // Add the title
        // birdDiv.append($('<h3>').text(bird.title));

        birdDiv.append($('<button class = "accordion">').text(bird.title));

        var panelDiv = $('<div>').addClass('panel');
        birdDiv.append(panelDiv)

        panelDiv.append($('<p class="panel-spacing">Listen to the recording: </p>'))

        // Add the audio player if a sound file is available
        if (bird.sound) {
            var audioHtml = '<audio controls class="panel-spacing"><source src="' + bird.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
            // birdDiv.append($(audioHtml));
            panelDiv.append($(audioHtml));
        }

        if (bird.info) {
            // birdDiv.append($('<p>').text(bird.info));
            panelDiv.append($('<p>').text(bird.info));
        }

        // Append this bird's div to the main container
        $('#tone').append(birdDiv);
    });
}



// function show_results(results) {
//     $.each(results, function(index, bird) {
//         console.log(bird)
//         // Create a container for each bird
//         var birdDiv = $('<div>').addClass('bird-tone');

//         // Add the title
//         birdDiv.append($('<h3>').text(bird.title));

//         // Add the audio player if a sound file is available
//         if (bird.sound) {
//             var audioHtml = '<audio controls><source src="' + bird.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
//             birdDiv.append($(audioHtml));
//         }

//         if (bird.info) {
//             birdDiv.append($('<p>').text(bird.info));
//         }

//         // Append this bird's div to the main container
//         $('#tone').append(birdDiv);
//     });
// }