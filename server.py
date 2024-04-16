from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# ROUTES
@app.route('/')
def load_homepage():
   return render_template('homepage.html')

@app.route('/quiz')
def load_quiz():
   return render_template('quiz.html')

# AJAX FUNCTIONS

if __name__ == '__main__':
   app.run(debug = True)
