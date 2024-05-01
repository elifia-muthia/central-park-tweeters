$(document).ready(function() {
    get_bird_info(id)
});

function get_bird_info(id) {
    bird = {"id": id}

    $.ajax({
        type: "POST",
        url: "/get_view_bird",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(bird),
        success: function(result){
            let bird_info = result["data"]
            display_bird_info(bird_info)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function display_bird_info(birdData) {
    $('#bird-name').text(birdData.name);
    $('#bird-scientific-name').text(birdData.scientific_name);
    $('#bird-habitat').text("Habitat: " + birdData.habitat);
    $('#bird-img').html('<img src="' + birdData.image + '" alt="' + birdData.name + '">');
    $('#bird-sound').html('<audio controls><source src="' + birdData.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
    $('#bird-tone').text("Tone: " + birdData.tone);
    $('#bird-video').html('<iframe width="560" height="315" src="' + birdData.video + '" frameborder="0" allowfullscreen></iframe>');
    $('#bird-description').text("Description: " + birdData.description);
    $('#bird-fun-fact').text("Fun fact: " + birdData.fun_fact);
    $('#bird-season').text("Season: " + birdData.season);
}