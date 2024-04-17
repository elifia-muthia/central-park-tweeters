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
        "title": "Northern Cardinal",
        "habitat": "Woodlands",
        "scientific_name": "Cardinalis cardinalis",
        "image": "https://media.audubon.org/nas_birdapi/a1_4524_2_northern-cardinal_diane_wurzer_kk_adult-male.jpg?height=944&auto=webp&quality=90&fit=bounds&disable=upscale",
        "sound": "/static/media/audio/northern_cardinal.mp3",
        "tone": "Whistle",
        "tone_description": "The song is a loud string of clear down-slurred or two-parted whistles, often speeding up and ending in a slow trill. The songs typically last 2 to 3 seconds. Syllables can sound like the bird is singing cheer, cheer, cheer or birdie, birdie, birdie. Males in particular may sing throughout the year, though the peak of singing is in spring and early summer.",
        "video": "https://youtu.be/J-hOualMPl0?si=oJRqyF4jKkk2vh9q",
        "description": "The male Northern Cardinal is perhaps responsible for getting more people to open up a field guide than any other bird. They’re a perfect combination of familiarity, conspicuousness, and style: a shade of red you can’t take your eyes off. Even the brown females sport a sharp crest and warm red accents.",
        "fun_fact": "A perennial favorite among people, the Northern Cardinal is the state bird of seven states.",
        "season": "All year round"
    },
    {
        "id": "4",
        "title": "Magnolia Warbler",
        "habitat": "Woodlands",
        "scientific_name": "Setophaga magnolia",
        "image": "https://dariuszzdziebk.wpenginepowered.com/wp-content/uploads/2022/05/BOTW-Homepage-Thumbnail_Magnolia-Warbler-1024x663.jpg",
        "sound": "/static/media/audio/magnolia_warbler.mp3",
        "tone": "Nasal/Buzz",
        "tone_description": "Males and females call with a nasal zic or zeep. During nocturnal migration they give a buzzy zeet.",
        "video": "https://youtu.be/2Vth2XSAAxM?si=dBKiJnTGFmBxJhXR",
        "description": "Many male warblers are black and yellow, but Magnolia Warblers take it up a notch, sporting a bold black necklace complete with long tassels, a black mask, and a standout white wing patch. The female lacks the male's bold accoutrements, instead wearing an elegant white eyering on her gray head, 2 thin white wingbars, and yellow underparts with moderate streaking. ",
        "fun_fact": " They frequently join foraging flocks of chickadees during their migration. The “chickadee-dee-dee” call is a possible marker for the presence of the magnolia warbler.",
        "season": "Spring and Fall"
    },
    {
        "id": "5",
        "title": "Mourning Dove",
        "habitat": "open-areas",
        "scientific_name": "Zenaida macroura",
        "image": "https://cdn.shopify.com/s/files/1/0156/3796/files/mourning-dove-3591135_1920.jpg?v=1580151321",
        "sound": "/static/media/audio/mourning_dove.mp3",
        "tone": "Coo",
        "tone_description": "You can often hear paired males give the three-parted “nest call” while nest-building: a coo-OO-oo, highest in the middle. Females sometimes call ohr ohr while sitting on the nest.",
        "video": "https://youtu.be/7oNljd7R1f8?si=clIUbn510qkBAtob",
        "description": "A graceful, slender-tailed, small-headed dove that’s common across the continent. Mourning Doves perch on telephone wires and forage for seeds on the ground; their flight is fast and bullet straight. Their soft, drawn-out calls sound like laments. When taking off, their wings make a sharp whistling or whinnying. Mourning Doves are the most frequently hunted species in North America.",
        "fun_fact": "Mourning Doves eat roughly 12 to 20 percent of their body weight per day, or 71 calories on average.",
        "season": "All year round"
    },
    {
        "id": "6",
        "title": "American Crow",
        "habitat" :"open-areas",
        "scientific_name": "Corvus brachyrhynchos",
        "image": "https://bloximages.newyork1.vip.townnews.com/estesparknews.com/content/tncms/assets/v3/editorial/4/31/4319f150-13d9-11eb-b5c8-1bffaa79a22f/5f909584240d3.image.jpg?resize=1476%2C982",
        "sound": "/static/media/audio/american_crow.mp3",
        "tone": "Harsh",
        "tone_description": "Crows have more than 20 calls. The most common, a harsh caw, has several qualities and lengths that may serve different purposes. Immature begging young American Crows give a higher-pitched, nasal call that can sound like a Fish Crow. You may also hear a variety of calls and alert calls given to rally others to mob predators.",
        "video": "https://youtu.be/JnDRHDoOsEw?si=joH2lFmRBTacjrmw",
        "description": "American Crows are familiar over much of the continent: large, intelligent, all-black birds with hoarse, cawing voices. They are common sights in treetops, fields, and roadsides, and in habitats ranging from open woods and empty beaches to town centers. They usually feed on the ground and eat almost anything—typically earthworms, insects and other small animals, seeds, and fruit; also garbage, carrion, and chicks they rob from nests.",
        "fun_fact": "Crows sometimes make and use tools. Examples include a captive crow using a cup to carry water over to a bowl of dry mash; shaping a piece of wood and then sticking it into a hole in a fence post in search of food; and breaking off pieces of pine cone to drop on tree climbers near a nest.",
        "season": "All year round"
    }
]

easy_quiz = [
    {
        "id": "1",
        "question": "Which of the follow birds can be found in freshwater?",
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
        "question:": "Which audio is NOT a bird tone term?",
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
        "question:": "Match the bird to the audio?",
        "media_type": "audio",
        "media": "/media/audio/american_crow.mp3",
        "choice1": "Mallard",
        "choice2": "Mourning Dove",
        "choice3": "American Crow",
        "choice4": "Northern Cardinal",
        "answer": "choice3"
    },
    {
        "id": "5",
        "question": "This unidentified sound best matches which bird call term?",
        "media_type": "audio",
        "media": "/static/media/audio/pine_warbler.mp3",
        "choice1": "Buzz",
        "choice2": "Trill",
        "choice3": "Quack",
        "choice4": "Chirp",
        "answer": "choice2"
    }
]

hard_quiz = [
    {
        "id": "1",
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
        "question": "Which of the follow birds can be found in freshwater?",
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
        "question": "Which sound term best matches the following audio?",
        "media_type": "audio",
        "media": "/static/media/audio/mallard.mp3",
        "choice1": "Chirp",
        "choice2": "Quack",
        "choice3": "Trill",
        "choice4": "Warble",
        "answer": "choice2"
    }
]

#TO-ADD: Nasal, Trill, Warble, Whistle, Mneumonics
bird_terminology = [
   {
      "id": "1",
      "type" : "Tone",
      "title" : "Harsh",
      "sound" : "/media/audio/american_crow.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "2",
      "type" : "Tone",
      "title" : "Trill",
      "sound" : "/media/audio/trill.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "3",
      "type" : "Tone",
      "title" : "Warble",
      "sound" : "/media/audio/warble.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "4",
      "type" : "Tone",
      "title" : "Whistle",
      "sound" : "/media/audio/whistle.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "5",
      "type" : "Tone",
      "title" : "Nasal",
      "sound" : "/media/audio/nasal.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   },
   {
      "id": "6",
      "type" : "Tone",
      "title" : "Mneumonics",
      "sound" : "/media/audio/mneumonics.mp3",
      "info" : "Harsh bird calls are typically described as grating, raucous, or jarring sounds that can be quite loud and unpleasant to the ear. These calls often consist of rough, discordant noises that may sound like cawing, screeching, or squawking. They tend to carry over long distances and are typically used by birds to assert territory, scare off predators, or communicate distress. The tone is usually sharp and can be repetitive, making it very noticeable and sometimes even disruptive in a natural environment. Examples of birds known for their harsh calls include crows, ravens, and some species of gulls and jays."
   }
]

user_data = {
  "current_page": "home",
  "quiz_selection": "easy_quiz",
  "quiz_results": [
    {"question_id": 1, "selected_option": "choice4", "correct": True},
    {"question_id": 2, "selected_option": "choice3", "correct": False}
  ]
}




# ROUTES
@app.route('/')
def load_homepage():
   return render_template('homepage.html')

@app.route('/sound')
def load_sound():
   return render_template('bird_sounds.html', results=bird_terminology)

@app.route('/birds')
@app.route('/birds/<location>')
def load_birds(location=None):
    if location is None:
        return render_template('list_birds.html', results=species_data)
    
    results = [bird for bird in species_data if bird["habitat"] == "freshwater"]
    return render_template('list_birds.html', results=results)

@app.route('/map')
def load_map():
   return render_template('map_birds.html')

@app.route('/centralpark')
def load_centralpark(): 
   return render_template('centralpark_map.html')

@app.route('/quiz')
def load_quiz():
   return render_template('quiz.html')

@app.route('/view/<id>')
def view_bird(id=None):
    return render_template('view_bird.html', id=id)

# AJAX FUNCTIONS
@app.route('/get_view_bird', methods=['POST'])
def get_view_bird():
    json_data = request.get_json()
    id = json_data["id"]

    result = next((bird for bird in species_data if bird["id"] == id), None)

    return jsonify(data=result)

@app.route('/get_quiz_questions', methods=['POST'])
def get_quiz_questions():
    json_data = request.get_json()
    level = json_data["level"]

    if level == 'easy':
        result = random.sample(easy_quiz, 2)
    else:
        result = random.sample(hard_quiz, 2)

    print(result)

    return jsonify(data=result)

if __name__ == '__main__':
   app.run(debug = True)
