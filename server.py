import random

from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


species_data = [
    {
        "id": "1", 
        "name": "Mallard",
        "habitat": "freshwater",
        "scientific_name": "Anas platyrhynchos",
        "image": "https://dariuszzdziebk.wpenginepowered.com/wp-content/uploads/2021/07/BOTW-Homepage-Thumbnail_Mallard_Robert-Adami-Shutterstock-768x498.jpg",
        "sound": "/static/media/audio/mallard.mp3",
        "tone": "Nasal",
        "tone_description": "The quintessential duck’s quack is the sound of the female mallard. Females often give this call in a series of 2–10 quacks that begin loudly and get softer. When courting, she may give a paired form of this quack. The male does not quack; instead he gives a quieter, rasping, one- or two-noted call. ",
        "video": "https://www.youtube.com/embed/FqDXIjDuFhw?si=gkh-BfliaL18fvea",
        "description": "Mallards are large ducks with hefty bodies, rounded heads, and wide, flat bills. The basic loud quack associated with ducks, is the call of the female mallard. The male on the other hand, utters soft raspy notes or short whistles.",
        "fun_fact": "Mallards have regional accents, and they are said to have better vision than humans!",
        "season": "All year long"
    },
    {
        "id": "2",
        "name": "Red-Winged Blackbird",
        "habitat": "freshwater",
        "scientific_name": "Agelaius phoeniceus",
        "image": "https://indianaaudubon.org/wp-content/uploads/2016/04/RedWingedBlackbird2.jpg",
        "sound": "/static/media/audio/red_winged_blackbird.mp3",
        "tone": "Chrip",
        "tone_description": "The typical call of a Red-winged Blackbird is a distinctive, matter-of-fact check that’s fairly easy to recognize. Males and females make these calls all year round, in flight and while feeding, when confronting rivals and to raise an alarm. They also give a more intense alarm call, a fast, scolding chak chak chak.",
        "video": "https://www.youtube.com/embed/q3QicOAiBXk?si=xrzbbmC0OFjP9-c-",
        "description": "Glossy-black males have scarlet-and-yellow shoulder patches they can puff up or hide depending on how confident they feel. Females are a subdued, streaky brown, almost like a large, dark sparrow. Their early and tumbling song are happy indications of the return of spring.",
        "fun_fact": "Red-winged Blackbirds are one of the most polygamous of all bird species. They have been observed to have as many as 15 females nesting in the territory of a single male.",
        "season": "Spring"
    },
    {
        "id": "3",
        "name": "Northern Cardinal",
        "habitat": "Woodlands",
        "scientific_name": "Cardinalis cardinalis",
        "image": "https://media.audubon.org/nas_birdapi/a1_4524_2_northern-cardinal_diane_wurzer_kk_adult-male.jpg?height=944&auto=webp&quality=90&fit=bounds&disable=upscale",
        "sound": "/static/media/audio/northern_cardinal.mp3",
        "tone": "Whistle",
        "tone_description": "The song is a loud string of clear down-slurred or two-parted whistles, often speeding up and ending in a slow trill. The songs typically last 2 to 3 seconds. Syllables can sound like the bird is singing cheer, cheer, cheer or birdie, birdie, birdie. Males in particular may sing throughout the year, though the peak of singing is in spring and early summer.",
        "video": "https://www.youtube.com/embed/J-hOualMPl0?si=9SJ2_x_XfQCgjU3t",
        "description": "The male Northern Cardinal is perhaps responsible for getting more people to open up a field guide than any other bird. They’re a perfect combination of familiarity, conspicuousness, and style: a shade of red you can’t take your eyes off. Even the brown females sport a sharp crest and warm red accents.",
        "fun_fact": "A perennial favorite among people, the Northern Cardinal is the state bird of seven states.",
        "season": "All year round"
    },
    {
        "id": "4",
        "name": "Magnolia Warbler",
        "habitat": "Woodlands",
        "scientific_name": "Setophaga magnolia",
        "image": "https://dariuszzdziebk.wpenginepowered.com/wp-content/uploads/2022/05/BOTW-Homepage-Thumbnail_Magnolia-Warbler-1024x663.jpg",
        "sound": "/static/media/audio/magnolia_warbler.mp3",
        "tone": "Nasal/Buzz",
        "tone_description": "Males and females call with a nasal zic or zeep. During nocturnal migration they give a buzzy zeet.",
        "video": "https://www.youtube.com/embed/2Vth2XSAAxM?si=-RV_vy3ah5ui3Mmo",
        "description": "Many male warblers are black and yellow, but Magnolia Warblers take it up a notch, sporting a bold black necklace complete with long tassels, a black mask, and a standout white wing patch. The female lacks the male's bold accoutrements, instead wearing an elegant white eyering on her gray head, 2 thin white wingbars, and yellow underparts with moderate streaking. ",
        "fun_fact": " They frequently join foraging flocks of chickadees during their migration. The “chickadee-dee-dee” call is a possible marker for the presence of the magnolia warbler.",
        "season": "Spring and Fall"
    },
    {
        "id": "5",
        "name": "Mourning Dove",
        "habitat": "open-areas",
        "scientific_name": "Zenaida macroura",
        "image": "https://cdn.shopify.com/s/files/1/0156/3796/files/mourning-dove-3591135_1920.jpg?v=1580151321",
        "sound": "/static/media/audio/mourning_dove.mp3",
        "tone": "Coo",
        "tone_description": "You can often hear paired males give the three-parted “nest call” while nest-building: a coo-OO-oo, highest in the middle. Females sometimes call ohr ohr while sitting on the nest.",
        "video": "https://www.youtube.com/embed/7oNljd7R1f8?si=XNdl-iQb_zUgN6_T",
        "description": "A graceful, slender-tailed, small-headed dove that’s common across the continent. Mourning Doves perch on telephone wires and forage for seeds on the ground; their flight is fast and bullet straight. Their soft, drawn-out calls sound like laments. When taking off, their wings make a sharp whistling or whinnying. Mourning Doves are the most frequently hunted species in North America.",
        "fun_fact": "Mourning Doves eat roughly 12 to 20 percent of their body weight per day, or 71 calories on average.",
        "season": "All year round"
    },
    {
        "id": "6",
        "name": "American Crow",
        "habitat" :"open-areas",
        "scientific_name": "Corvus brachyrhynchos",
        "image": "https://bloximages.newyork1.vip.townnews.com/estesparknews.com/content/tncms/assets/v3/editorial/4/31/4319f150-13d9-11eb-b5c8-1bffaa79a22f/5f909584240d3.image.jpg?resize=1476%2C982",
        "sound": "/static/media/audio/american_crow.mp3",
        "tone": "Harsh",
        "tone_description": "Crows have more than 20 calls. The most common, a harsh caw, has several qualities and lengths that may serve different purposes. Immature begging young American Crows give a higher-pitched, nasal call that can sound like a Fish Crow. You may also hear a variety of calls and alert calls given to rally others to mob predators.",
        "video": "https://www.youtube.com/embed/JnDRHDoOsEw?si=YjtRuzH95HzyGk8J",
        "description": "American Crows are familiar over much of the continent: large, intelligent, all-black birds with hoarse, cawing voices. They are common sights in treetops, fields, and roadsides, and in habitats ranging from open woods and empty beaches to town centers. They usually feed on the ground and eat almost anything—typically earthworms, insects and other small animals, seeds, and fruit; also garbage, carrion, and chicks they rob from nests.",
        "fun_fact": "Crows sometimes make and use tools. Examples include a captive crow using a cup to carry water over to a bowl of dry mash; shaping a piece of wood and then sticking it into a hole in a fence post in search of food; and breaking off pieces of pine cone to drop on tree climbers near a nest.",
        "season": "All year round"
    }
]

easy_quiz = [
    {
        "id": "1",
        "type": "multiple-choice",
        "question": "Which of the following birds can be found in freshwater?",
        "media_type": "img",
        "media": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/locations/_2475x1151_crop_center-center_none/turtle-pond.JPG",
        "choice1": "American Crow",
        "choice2": "Northern Cardinal",
        "choice3": "Mourning Dove",
        "choice4": "Mallard",
        "answer": "choice4"
    },
    {
        "id": "2",
        "type": "multiple-choice",
        "question": "Which sound term best matches the following audio?",
        "media_type": "audio",
        "media": "/static/media/audio/mallard.mp3",
        "choice1": "Chirp",
        "choice2": "Quack",
        "choice3": "Trill",
        "choice4": "Warble",
        "answer": "choice2"
    },
    {
        "id": "3",
        "type": "multiple-choice",
        "question": "Which audio is NOT a bird tone term?",
        "media_type": "img",
        "media": "https://media.cntraveler.com/photos/611fc78d9282cc5de31e9d87/16:9/w_2240,c_limit/Central%20Park,%20Manhattan,%20New%20York_GettyImages-528180834.jpg",
        "choice1": "Quack",
        "choice2": "Liquid",
        "choice3": "Trill",
        "choice4": "Warble",
        "answer": "choice1"
    },
    {
        "id": "4",
        "type": "multiple-choice",
        "question": "Match the bird to the audio?",
        "media_type": "audio",
        "media": "/static/media/audio/american_crow.mp3",
        "choice1": "Mallard",
        "choice2": "Mourning Dove",
        "choice3": "American Crow",
        "choice4": "Northern Cardinal",
        "answer": "choice3"
    },
    {
        "id": "5",
        "type": "multiple-choice",
        "question": "This unidentified sound best matches which bird call term?",
        "media_type": "audio",
        "media": "/static/media/audio/pine_warbler.mp3",
        "choice1": "Buzz",
        "choice2": "Trill",
        "choice3": "Quack",
        "choice4": "Chirp",
        "answer": "choice2"
    },
    {
        "id": "6",
        "type": "drag_and_drop",
        "question": "Drag the bird onto the location on the map",
        "drag_bird": "https://nestwatch.org/wp-content/uploads/2012/04/MODO_Debbie-McKenzie-728x494.jpg",
        "bird_sound": "audio",
        "media": "/static/media/audio/mourning_dove.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "Turtle Pond",
        "media2": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/de/17/a5/photo1jpg.jpg?w=1200&h=-1&s=1",
        "choice3": "North Woods",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "answer": "choice1"
    },
    {
        "id": "7",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg/1200px-Anas_platyrhynchos_male_female_quadrat.jpg",
        "bird_sound": "audio",
        "media": "/static/media/audio/mallard.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "Reservoir",
        "media2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jacqueline_Kennedy_Onassis_Reservoir.jpg/1200px-Jacqueline_Kennedy_Onassis_Reservoir.jpg",
        "choice3": "North Woods",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "answer": "choice2"
    },
    {
        "id": "8",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.allaboutbirds.org/guide/assets/photo/64798651-480px.jpg",
        "bird_sound": "audio",
        "media": "/static/media/audio/magnolia_warbler.mp3",
        "choice1": "Ramble",
        "media1": "https://i.ytimg.com/vi/LpE2RpfRVys/maxresdefault.jpg",
        "choice2": "Harlem Meer",
        "media2": "https://www.centralpark.com/downloads/10627/download/Harlem-Meer.jpg?cb=9cf66c41ef3d395efaa7b5c6e6758536",
        "choice3": "Great Lawns",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Sheep-Meadow-May-2018_71_2021-04-02-175219.jpg",
        "answer": "choice1"
    },
    {
        "id": "9",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.allaboutbirds.org/guide/assets/photo/297087301-480px.jpg",
        "bird_sound": "audio",
        "media": "/static/media/audio/northern_cardinal.mp3",
        "choice1": "North Woods",
        "media1": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "choice2": "Reservoir",
        "media2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jacqueline_Kennedy_Onassis_Reservoir.jpg/1200px-Jacqueline_Kennedy_Onassis_Reservoir.jpg",
        "choice3": "Great Lawns",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Sheep-Meadow-May-2018_71_2021-04-02-175219.jpg",
        "answer": "choice1"
    },
    {
        "id": "10",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://indianaaudubon.org/wp-content/uploads/2016/04/RedWingedBlackbird2-1200x1005.jpg",
        "bird_sound": "audio",
        "media": "/static/media/audio/red_winged_blackbird.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "North Woods",
        "media2": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "choice3": "Harlem Meer",
        "media3": "https://www.centralpark.com/downloads/10627/download/Harlem-Meer.jpg?cb=9cf66c41ef3d395efaa7b5c6e6758536",
        "answer": "choice3"
    }
]

hard_quiz = [
    {
        "id": "1",
        "type": "multiple-choice",
        "question": "Which of the follow birds can be found in the turtle pond?",
        "media_type": "img",
        "media": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/locations/_2475x1151_crop_center-center_none/turtle-pond.JPG",
        "choice1": "American Crow",
        "choice2": "Northern Cardinal",
        "choice3": "Mourning Dove",
        "choice4": "Mallard",
        "answer": "choice4"
    },
    {
        "id": "2",
        "type": "multiple-choice",
        "question": "This unidentified sound best matches which bird call term?",
        "media_type": "audio",
        "media": "/static/media/audio/pine_warbler.mp3",
        "choice1": "Buzz",
        "choice2": "Trill",
        "choice3": "Quack",
        "choice4": "Chirp",
        "answer": "choice2"
    },
    {
        "id": "3",
        "type": "multiple-choice",
        "question": "Which of the following birds can be found in freshwater?",
        "media_type": "img",
        "media": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/locations/_2475x1151_crop_center-center_none/turtle-pond.JPG",
        "choice1": "American Crow",
        "choice2": "Northern Cardinal",
        "choice3": "Mourning Dove",
        "choice4": "Mallard",
        "answer": "choice4"
    },
    {
        "id": "4",
        "type": "multiple-choice",
        "question": "Which sound term best matches the following audio?",
        "media_type": "audio",
        "media": "/static/media/audio/mallard.mp3",
        "choice1": "Chirp",
        "choice2": "Quack",
        "choice3": "Trill",
        "choice4": "Warble",
        "answer": "choice2"
    },
    {
        "id": "5",
        "type": "multiple-choice",
        "question": "Which sound term best matches the following audio?",
        "media_type": "audio",
        "media": "/static/media/audio/northern_cardinal.mp3",
        "choice1": "Whistle",
        "choice2": "Mneumonics",
        "choice3": "Flute",
        "choice4": "Honk",
        "answer": "choice1"
    },
    {
        "id": "6",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.pngitem.com/pimgs/m/527-5273123_bird-question-hd-png-download.png",
        "bird_sound": "audio",
        "media": "/static/media/audio/mourning_dove.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "Turtle Pond",
        "media2": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/de/17/a5/photo1jpg.jpg?w=1200&h=-1&s=1",
        "choice3": "North Woods",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "answer": "choice1"
    },
    {
        "id": "7",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.pngitem.com/pimgs/m/527-5273123_bird-question-hd-png-download.png",        "bird_sound": "audio",
        "media": "/static/media/audio/mallard.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "Reservoir",
        "media2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jacqueline_Kennedy_Onassis_Reservoir.jpg/1200px-Jacqueline_Kennedy_Onassis_Reservoir.jpg",
        "choice3": "North Woods",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "answer": "choice2"
    },
    {
        "id": "8",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.pngitem.com/pimgs/m/527-5273123_bird-question-hd-png-download.png",        "bird_sound": "audio",
        "media": "/static/media/audio/magnolia_warbler.mp3",
        "choice1": "Ramble",
        "media1": "https://i.ytimg.com/vi/LpE2RpfRVys/maxresdefault.jpg",
        "choice2": "Harlem Meer",
        "media2": "https://www.centralpark.com/downloads/10627/download/Harlem-Meer.jpg?cb=9cf66c41ef3d395efaa7b5c6e6758536",
        "choice3": "Great Lawns",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Sheep-Meadow-May-2018_71_2021-04-02-175219.jpg",
        "answer": "choice1"
    },
    {
        "id": "9",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.pngitem.com/pimgs/m/527-5273123_bird-question-hd-png-download.png",        "bird_sound": "audio",
        "media": "/static/media/audio/northern_cardinal.mp3",
        "choice1": "North Woods",
        "media1": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "choice2": "Reservoir",
        "media2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jacqueline_Kennedy_Onassis_Reservoir.jpg/1200px-Jacqueline_Kennedy_Onassis_Reservoir.jpg",
        "choice3": "Great Lawns",
        "media3": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x767_crop_center-center_none/Sheep-Meadow-May-2018_71_2021-04-02-175219.jpg",
        "answer": "choice1"
    },
    {
        "id": "10",
        "type": "drag_and_drop",
        "question": "Listen to the audio, and drag the bird onto the location on the map",
        "drag_bird": "https://www.pngitem.com/pimgs/m/527-5273123_bird-question-hd-png-download.png",        "bird_sound": "audio",
        "media": "/static/media/audio/red_winged_blackbird.mp3",
        "choice1": "Shakespeare Garden",
        "media1": "https://www.centralpark.com/downloads/3841/download/shakespeare-gardens.jpe?cb=7a9536f8578043bcee7d644b03068290&w=1200",
        "choice2": "North Woods",
        "media2": "https://s3.amazonaws.com/assets.centralparknyc.org/media/images/_1650x1238_crop_center-center_none/North-Woods-0278-1.jpg",
        "choice3": "Harlem Meer",
        "media3": "https://www.centralpark.com/downloads/10627/download/Harlem-Meer.jpg?cb=9cf66c41ef3d395efaa7b5c6e6758536",
        "answer": "choice3"
    }
]

#TO-ADD: Nasal, Trill, Warble, Whistle, Mneumonics
bird_terminology = [
   {
      "id": "1",
      "type" : "Tone",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg/800px-Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg", 
      "example": "Crow", 
      "title" : "Harsh",
      "sound" : "/static/media/audio/american_crow.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "2",
      "type" : "Tone",
      "image": "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/64972021/900", 
      "example": "Chipping Sparrow",
      "title" : "Trill",
      "sound" : "/static/media/audio/trill.mp3",
      "info" :  "Trills are composed of quick, consecutive notes that seamlessly connect to create a continuous, vibrating sound. These calls are often sustained and can vary greatly in pitch and speed, typically reflecting the emotional or territorial state of the bird. Trills are mostly utilized during mating rituals or when establishing territory boundaries. The rapid sequence of sounds can sometimes blur into a near mechanical noise, especially in species like the Chipping Sparrow."
   },
   {
      "id": "3",
      "type" : "Tone",
      "image": "https://www.allaboutbirds.org/guide/assets/photo/64893871-480px.jpg", 
      "example": "Pine Warbler",
      "title" : "Warble",
      "sound" : "/static/media/audio/pine_warbler.mp3",
      "info" :  "Warbles consist of a melodious sequence of notes that modulate in pitch and length, creating a complex and harmonious sound. This type of birdsong is particularly expressive, used frequently during the breeding season as a display of vocal prowess to attract mates and deter rivals. Warbles can incorporate elements of other calls, blending trills, and whistles into elaborate songs that vary from moment to moment. Birds like the Song Thrush are renowned for their rich, warbling vocalizations."
   },
   {
      "id": "4",
      "type" : "Tone",
      "title" : "Whistle",
      "image": "https://inaturalist-open-data.s3.amazonaws.com/photos/248246349/medium.jpg",
      "example": "Northern Cardinal", 
      "sound" : "/static/media/audio/northern_cardinal.mp3",
      "info" :  "Whistles are characterized by their simplicity and clarity, producing single or repeated pure-toned notes. These sounds are often loud and penetrating, designed to carry over long distances and through dense habitats, making them common among forest and grassland birds. Whistles are typically used for basic communication, such as signaling danger or maintaining flock cohesion. Species such as the Black-capped Chickadee emit distinctive, clear whistles that serve as effective identifiers."
   },
   {
      "id": "5",
      "type" : "Tone",
      "title" : "Nasal",
      "image": "https://i.natgeofe.com/k/327b01e8-be2e-4694-9ae9-ae7837bd8aea/mallard-male-swimming_2x1.jpg",
      "example": "Mallard", 
      "sound" : "/static/media/audio/mallard.mp3",
      "info" :  "Nasal calls emit a resonant, often less melodious sound, as if produced through the nose, with a buzzy or reedy quality. These sounds can serve various purposes, including alerting other birds to potential threats or facilitating group movements among flocks. Nasal tones are less musical but very distinctive, making them important for species recognition in dense vegetation where visibility is low. Birds like the Common Grackle are known for their nasal calls."   
      },
   {
      "id": "6",
      "type" : "Tone",
      "title" : "Mneumonics",
      "image": "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTzup7sAdI-Xcd3MFmsKHwHrYGiGcKBIsa3hTmmLIApMtqHPURJzw1gUDQWroI0HJML75tRvnIcf2nlNKA", 
      "example": "Eastern Towhee", 
      "sound" : "/static/media/audio/mneumonic.mp3",
      "info" :  "Mnemonics in birdsong are memorable sequences that resemble short phrases or rhythmic patterns, aiding in the identification of specific species. These calls are often designed to mimic human words or sounds, making them particularly useful for bird watchers. Mnemonic calls can vary significantly between species, reflecting unique adaptations to their environments. The Eastern Towhee, for instance, is famous for its drink-your-tea song that serves as a mnemonic."   
   },
   {
      "id": "7",
      "type" : "Tone",
      "title" : "Liquid/Flute-like",
      "image": "https://www.allaboutbirds.org/guide/assets/photo/170865181-480px.jpg", 
      "example": "Wood Thrush", 
      "sound" : "/static/media/audio/liquid_flute-like.mp3",
      "info" :  "Liquid or flutelike tones are smooth, flowing, and exceptionally melodious, similar to the sound of a flute. These calls are continuous, with a clear, musical quality that is both soothing and alluring. They are often used in calm, serene environments where their melodious nature helps in attracting mates or soothing young. The Wood Thrush, known for its beautiful flute-like songs, utilizes this tone to enchant listeners during the early summer evenings."   
   }
]

quiz_history = []
 
navigated_pages = []

current_quiz_id = len(quiz_history)

# ROUTES
@app.route('/')
def load_homepage():
    navigated_pages.append('/')
    return render_template('homepage.html')

@app.route('/sound')
def load_sound():
    navigated_pages.append('/sound')
    return render_template('bird_sounds.html', results=bird_terminology)

@app.route('/birds')
@app.route('/birds/<location>')
def load_birds(location=None):
    if location is None:
        navigated_pages.append('/birds')
        return render_template('list_birds.html', results=species_data, location=location, studied=navigated_pages)
    
    navigated_pages.append('/birds/' + location)
    results = [bird for bird in species_data if bird["habitat"] == location]
    return render_template('list_birds.html', results=results, location=location, studied=navigated_pages)

@app.route('/map')
def load_map():
    navigated_pages.append('/map')
    return render_template('map_birds.html')

@app.route('/centralpark')
def load_centralpark(): 
    navigated_pages.append('/centralpark')
    return render_template('centralpark_map.html')

@app.route('/quiz')
def load_quiz():
    navigated_pages.append('/quiz')
    return render_template('quiz.html', navigated=navigated_pages)

@app.route('/view/<id>')
def view_bird(id=None):
    navigated_pages.append('/view/' + id)
    return render_template('view_bird.html', id=id)

@app.route('/past_quiz/<id>')
def go_to_past_quiz(id=None):
    navigated_pages.append('/past_quiz/' + id)
    return render_template('quiz_history.html', id=id)

# AJAX FUNCTIONS
@app.route('/get_view_bird', methods=['POST'])
def get_view_bird():
    json_data = request.get_json()
    id = json_data["id"]

    result = next((bird for bird in species_data if bird["id"] == id), None)

    return jsonify(data=result)

@app.route('/get_past_quiz', methods=['POST'])
def get_past_quiz():
    json_data = request.get_json()
    id = json_data["id"]

    result = next((quiz for quiz in quiz_history if quiz["id"] == id), None)

    print(result)
    return jsonify(data=result)

@app.route('/get_quiz_questions', methods=['POST'])
def get_quiz_questions():
    json_data = request.get_json() 
    level = json_data["level"]

    if level == 'easy':
        result = random.sample(easy_quiz, 5)
    else:
        result = random.sample(hard_quiz, 5)

    print(result) 

    return jsonify(data=result)

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    global current_quiz_id

    json_data = request.get_json()
    quiz = json_data["quiz"]
    current_quiz_id += 1
    quiz['id'] = str(current_quiz_id)

    quiz_history.append(quiz)

    return jsonify(data=quiz_history)

@app.route('/get_back', methods=['POST'])
def get_back():
    back = navigated_pages[-1]
    return jsonify(data=back)


if __name__ == '__main__':
   app.run(debug = True)
