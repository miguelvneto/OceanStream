from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Alerta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quando = db.Column(db.String(100), nullable=False)
    onde = db.Column(db.String(100), nullable=False)
    resumo = db.Column(db.String(200), nullable=False)
    detalhes = db.Column(db.Text, nullable=False)