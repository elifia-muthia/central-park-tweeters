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

    // var freshwaterIconUrl = "{{ url_for('static', filename='assets/water.png') }}";
    // var openareaIconUrl = "{{ url_for('static', filename='assets/openarea.png') }}";
    // var woodlandIconUrl = "{{ url_for('static', filename='assets/woodlands.png') }}";

    $('#bird-name').text(birdData.name);
    $('#bird-scientific-name').text(birdData.scientific_name);
   
    if(birdData.habitat == "Woodlands"){
        $('#bird-habitat').html('<img class="image-icon" src= "' + woodlandIconUrl + '"> Woodlands </img>');
    }
    else if(birdData.habitat == "freshwater"){
        $('#bird-habitat').html('<img class="image-icon" src= "' + freshwaterIconUrl + '"> Freshwater </img>');
    }
    else if(birdData.habitat == "open-areas"){
        $('#bird-habitat').html('<img class="image-icon" src= "' + openareaIconUrl + '"> Open Areas </img>');
    }
    else{
        $('#bird-habitat').text(birdData.habitat);
    }
    $('#bird-img').html('<img class = "bird-img" src="' + birdData.image + '" alt="' + birdData.name + '">');
    $('#bird-sound').html('<audio controls><source src="' + birdData.sound + '" type="audio/mpeg">Your browser does not support the audio element.</audio>');
    $('#bird-tone').text(birdData.tone);
    $('#bird-video').html('<iframe width="560" height="315" src="' + birdData.video + '" frameborder="0" allowfullscreen></iframe>');
    $('#bird-description').text(birdData.description);
    $('#bird-fun-fact').text(birdData.fun_fact);
    // $('#bird-season').text(birdData.season);

    console.log(birdData.season)

    if(birdData.season == "Spring"){
        $('#bird-season').html('<img class="image-icon" src= "' + springIconUrl + '"> Spring </img>');
    }
    else if((birdData.season == "All year round" )||(birdData.season == "All year long" ) ){
        $('#bird-season').html('<img class="image-icon" src= "' + allyearIconUrl + '"> All Year Round </img>');
    }
    else if(birdData.season == "Spring and Fall"){
        $('#bird-season').html('<img class="image-icon" src= "' + springIconUrl + '"></img><img class="image-icon" src= "' + fallIconUrl + '">Spring and Fall </img>');
    }
    else{
        $('#bird-season').text(birdData.season);
    }
}