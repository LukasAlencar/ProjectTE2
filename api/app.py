from flask import Flask, request, jsonify
from flask_cors import CORS
from calc import prevision
import json


app = Flask(__name__)
CORS(app)  # Configuração do CORS
CORS(app, resources={r"/values": {"origins": "http://localhost:5173"}})
# Dados iniciais
items = []

# Rota para obter a lista de itens
@app.route('/values', methods=['GET'])
def get_items():
    return jsonify({'items': items})

# Rota para adicionar um novo item
@app.route('/values', methods=['POST'])
def add_item():
    data = request.get_json()
    if data:
        date_parts = data["date"].split("-")
        year = int(date_parts[0])
        month = int(date_parts[1])
        day = int(date_parts[2])
        hour = data["hour"].split(":")
        hour = hour[0] + hour[1]
        hour = int(hour)
        area = int(data["area"])
        genre = int(data["genre"])
        age = int(data["age"])
        dados = [[hour, area, genre, age, day, month, year]]

        ax = int(prevision(dados)[0])

        res = {"res": ax, "day": day, "year": year, "month": month, "area": area, "genre": genre, "age": age, "hour": hour}
        res = json.dumps(res)
        print(res)
        return res
    else:
        return jsonify({'message': 'Erro: o corpo da solicitação deve incluir um item'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=3004)
