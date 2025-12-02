# app.py
from flask import Flask, render_template

# Імпорт контенту з файлу data.py
from data import APP_CONTENT

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    """
    Основний маршрут, який рендерить index.html та передає йому дані.
    """
    # Передача словника APP_CONTENT у шаблон index.html
    return render_template('index.html', content=APP_CONTENT)

# Примітка: Логіка обробки форми (наприклад, реєстрації) знаходиться у script.js
# і є імітацією, але ви можете розширити цей файл, додавши маршрут /api/register

if __name__ == '__main__':
    # Встановіть debug=True лише для розробки.
    app.run(debug=True)