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
        "sound": "/media/audio/mallard.mp3",
        "tone": "Nasal",
        "video": "https://youtu.be/FqDXIjDuFhw?si=DZ3HVARFghfitr6X",
        "description": "Mallards are large ducks with hefty bodies, rounded heads, and wide, flat bills. The basic loud quack associated with ducks, is the call of the female mallard. The male on the other hand, utters soft raspy notes or short whistles.",
        "fun_fact": "Mallards have regional accents, and they are said to have better vision than humans!",
        "season": "All year long"
    },
    {
        "id": "2",
        "title": "Red-Winged Blackbird",
        "habitat": "freshwater",
        "scientific_name": "Agelaius phoeniceus",
        "image": "https://indianaaudubon.org/wp-content/uploads/2016/04/RedWingedBlackbird2.jpg",
        "sound": "/media/audio/red_winged_blackbird.mp3",
        "tone": "Chrip",
        "video": "https://youtu.be/q3QicOAiBXk?si=q4oAqUGJGQv3EKyL",
        "description": "Glossy-black males have scarlet-and-yellow shoulder patches they can puff up or hide depending on how confident they feel. Females are a subdued, streaky brown, almost like a large, dark sparrow. Their early and tumbling song are happy indications of the return of spring.",
        "fun_fact": "Red-winged Blackbirds are one of the most polygamous of all bird species. They have been observed to have as many as 15 females nesting in the territory of a single male.",
        "season": "Spring"
    }#,
   #  {
   #      "id": "3",
   #      "title": "Northern Cardinal",
   #      "habitat": "Woodlands",
   #      "scientific_name": "",
   #      "image": "",
   #      "sound": "/media/audio/.mp3",
   #      "tone": "",
   #      "video": "",
   #      "description": "",
   #      "fun_fact": "",
   #      "season": ""
   #  },
   #  {
   #      "id": "4",
   #      "title": "Magnolia Warbler",
   #      "habitat": "Woodlands",
   #      "scientific_name": "",
   #      "image": "",
   #      "sound": "/media/audio/.mp3",
   #      "tone": "",
   #      "video": "",
   #      "description": "",
   #      "fun_fact": "",
   #      "season": ""

   #  },
   #  {
   #      "id": "5",
   #      "title": "Mourning Dove",
   #      "habitat": "open-areas",
   #      "scientific_name": "",
   #      "image": "",
   #      "sound": "/media/audio/.mp3",
   #      "tone": "",
   #      "video": "",
   #      "description": "",
   #      "fun_fact": "",
   #      "season": ""
   #  },
   #  {
   #      "id": "6",
   #      "title": "American Crow",
   #      "habitat" :"open-areas":
   #      "scientific_name": "",
   #      "image": "",
   #      "sound": "/media/audio/.mp3",
   #      "tone": "",
   #      "video": "",
   #      "description": "",
   #      "fun_fact": "",
   #      "season": ""

   #  }
]

easy_quiz = [
    {
        "id": "1",
        "question:": "Which of the follow birds can be found in freshwater?",
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
        "question:": "Which sound term best matches the following audio?",
        "media_type": "audio",
        "media": "/media/audio/mallard.mp3",
        "choice1": "Chirp",
        "choice2": "Quack",
        "choice3": "Trill",
        "choice4": "Warble",
        "answer": "choice2"
    }
]

hard_quiz = [
    {
        "id": "1",
        "question:": "Which of the follow birds can be found in the turtle pond?",
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
        "question:": "This unidentified sound best matches which bird call term?",
        "media_type": "audio",
        "media": "media/audio/pine_warbler.mp3",
        "choice1": "Buzz",
        "choice2": "Trill",
        "choice3": "Quack",
        "choice4": "Chirp",
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
   }#,
   # {
   #    "id": "2",
   #    "type" : "",
   #    "title" : "",
   #    "sound" : "/media/audio/",
   #    "info" : ""
   # }
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
   return render_template('bird_sounds.html')

@app.route('/birds')
def load_birds():
   return render_template('list_birds.html')

@app.route('/map')
def load_map():
   return render_template('map_birds.html')

@app.route('/centralpark')
def load_centralpark(): 
   return render_template('centralpark_map.html')

@app.route('/quiz')
def load_quiz():
   return render_template('quiz.html')

# AJAX FUNCTIONS

if __name__ == '__main__':
   app.run(debug = True)
