$(document).ready(function() {
    $('#')

    get_bird_info(id)
});

function get_next_page() {
    const targetPages = [
        "/birds",
        "/birds/freshwater",
        "/birds/open-areas",
        "/birds/Woodlands"
    ];

    let lastVisited = null;
    let lastVisitedIndex = -1;

    targetPages.forEach(page => {
        const lastIndex = navigated.lastIndexOf(page);
        if (lastIndex > lastVisitedIndex) {
            lastVisited = page;
            lastVisitedIndex = lastIndex;
        }
    });

    id = +id;

    if (lastVisited == "/birds") {
        if (id < 6) {
            window.location.href = "/view/" + (id+1)
        }
        else {
            window.location.href = lastVisited
        }
    }
    else if (lastVisited == "/birds/freshwater") {
        if (id == 1) {
            window.location.href = "/view/" + (id+1)
        }
        else {
            window.location.href = lastVisited
        }
    }
    else if (lastVisited == "/birds/open-areas") {
        if (id == 5) {
            window.location.href = "/view/" + (id+1)
        }
        else {
            window.location.href = lastVisited
        }
    }
    else if (lastVisited == "/birds/Woodlands") {
        if (id == 3) {
            window.location.href = "/view/" + (id+1)
        }
        else {
            window.location.href = lastVisited
        }
    }

}

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
   
    if(birdData.habitat == "Woodlands"){
        $('#bird-habitat').html('<div class = "info-item"> <span class = "info-icon"> <img  src= "' + woodlandIconUrl + '"></span> <span class = "info-text"> Woodlands</span></div>');
        $('#bird-icon').html('<img class="image-icon" src= "' + woodlandIconUrl + '"></img>');

    }
    else if(birdData.habitat == "freshwater"){
        $('#bird-habitat').html('<div class = "info-item"> <span class = "info-icon"><img src= "' + freshwaterIconUrl + '"></span> <span class = "info-text">Freshwater</span></div>');
        $('#bird-icon').html('<img class="image-icon" src= "' + freshwaterIconUrl + '"></img>');
    }
    else if(birdData.habitat == "open-areas"){
        $('#bird-habitat').html('<div class = "info-item"> <span class = "info-icon"><img src= "' + openareaIconUrl + '"></span><span class = "info-text">Open Area</span></div>');
        $('#bird-icon').html('<img class="image-icon" src= "' + openareaIconUrl + '"></img>');
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

    console.log(birdData.season)

    if(birdData.season == "Spring"){
        $('#bird-season').html('<div class = "info-item"> <span class = "info-icon"><img src= "' + springIconUrl + '"></span> <span class = "info-text"> Spring </span></div>');
        $('#bird-icon2').html('<img class="image-icon" src= "' + springIconUrl + '"></img>');
    }
    else if((birdData.season == "All year round" )||(birdData.season == "All year long" ) ){
        $('#bird-season').html('<div class = "info-item"> <span class = "info-icon"><img class="image-icon" src= "' + allyearIconUrl + '"> </span> <span class = "info-text"> All year long </span></div');
        $('#bird-icon2').html('<img class="image-icon" src= "' + allyearIconUrl + '"></img>');
    }
    else if(birdData.season == "Spring and Fall"){
        $('#bird-season').html('<div class = "info-item"> <span class = "info-icon"><img class="image-icon" src= "' + springIconUrl + '"></img><img class="image-icon" src= "' + fallIconUrl + '"></span> <span class = "info-text"> Spring and Fall </span></div');
        $('#bird-icon2').html('<img class="image-icon" src= "' + springIconUrl + '"></img><img class="image-icon" src= "' + fallIconUrl + '"></img>');
    }
    else{
        $('#bird-season').text(birdData.season);
    }
}