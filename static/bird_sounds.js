$(document).ready(function() {
    show_results(results);

    $(".accordion").click(function(){
        $(this).toggleClass("active");

        var panel = $(this).next();

        if (panel.css("maxHeight") !== "0px" && panel.css("maxHeight")) {
            panel.css("maxHeight", "0px");
        } else {
            panel.css("maxHeight", panel.prop("scrollHeight") + "px");
        }
    });
});


function show_results(results) {
    $.each(results, function(index, bird) {
        console.log(bird)
        // Create a container for each bird
        var birdDiv = $('<div>').addClass('bird-tone');
        birdDiv.append($('<button class = "accordion">').text(bird.title));


        var panelDiv = $('<div>').addClass('panel');
        birdDiv.append(panelDiv)
        // panelDiv.append($('<h3><strong>'+ bird.title +'</strong></h3>'))



        var colDiv= $('<div>').addClass('col-md-12');
        panelDiv.append(colDiv)
        var rowDiv= $('<div>').addClass('row');
        colDiv.append(rowDiv)

        // panelDiv.append($('<img src ='+ bird.image +'>'))

        var colDiv2= $('<div>').addClass('col-md-6');
        rowDiv.append(colDiv2)
        var rowDiv2= $('<div>').addClass('row');
        colDiv2.append(rowDiv2)

        var colDiv3= $('<div>').addClass('col-md-6');
        rowDiv.append(colDiv3)
        var rowDiv3= $('<div>').addClass('row');
        colDiv3.append(rowDiv3)

        rowDiv2.append($('<img class="img-sound" src ='+ bird.image +'>'))
        // rowDiv2.append(rowDiv2)
        colDiv2.append($('<div class="row">'+bird.example+'</div>'))

        rowDiv3.append($('<p class="panel-spacing">Listen to the recording: </p>')); 
        // Add the audio player if a sound file is available
        if (bird.sound) {
            var audioHtml = '<audio controls class="panel-spacing"><source src="' + bird.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
            // panelDiv.append($(audioHtml));
            rowDiv3.append($(audioHtml));

        }

        if (bird.info) {
            // panelDiv.append($('<p>').text(bird.info));
            rowDiv3.append($('<p>').text(bird.info));

        }

        // Append this bird's div to the main container
        $('#tone').append(birdDiv);
    });
}

