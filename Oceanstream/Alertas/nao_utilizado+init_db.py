from app import db, Alerta

db.create_all()

alerta1 = Alerta(quando="2024-06-01 12:00", onde="São Paulo", resumo="Incêndio", detalhes="Incêndio de grandes proporções no centro.")
alerta2 = Alerta(quando="2024-06-02 14:30", onde="Rio de Janeiro", resumo="Alagamento", detalhes="Chuvas intensas causando alagamentos.")
db.session.add(alerta1)
db.session.add(alerta2)
db.session.commit()