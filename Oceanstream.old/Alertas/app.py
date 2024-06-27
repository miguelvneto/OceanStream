from flask import Flask, jsonify, render_template
from flask_cors import CORS

from tabela import Alerta, db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()
    # Criar dados de exemplo
    if Alerta.query.count() == 0:
        alerta1 = Alerta(quando="2024-06-01 12:00", onde="São Paulo", resumo="Incêndio", detalhes="Incêndio de grandes proporções no centro.")
        alerta2 = Alerta(quando="2024-06-02 14:30", onde="Rio de Janeiro", resumo="Alagamento", detalhes="Chuvas intensas causando alagamentos.")

        db.session.add(alerta1)
        db.session.add(alerta2)
        db.session.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/alertas', methods=['GET'])
def get_alertas():
    alertas = Alerta.query.all()

    return jsonify(
    [
      {
        'quando': alerta.quando,
        'onde': alerta.onde,
        'resumo': alerta.resumo,
        'detalhes': alerta.detalhes
      }
      for alerta in alertas
    ])

if __name__ == '__main__':
    app.run(debug=True)
