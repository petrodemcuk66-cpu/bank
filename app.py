from flask import Flask, render_template
from data import APP_CONTENT
app = Flask(__name__, static_folder='static', static_url_path='/static')
@app.route('/')
def index():
    return render_template('index.html', content=APP_CONTENT)
if __name__ == '__main__':
    app.run(debug=True)
