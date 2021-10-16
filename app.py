from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def saludo():
    return render_template('dashboard.html')


@app.route('/login/')
def login(nombre, clave):
    if nombre == 'admin' and clave == 123456:
        return True
    else:
        return False

#============================Vuelos===============================
@app.route('/vuelos')
def vuelos():
    dic_vuelos = []
    for i in range(11):
        dic_vuelos.append({
            'vuelo': 'AV 8575',
            'aerolinea': 'Latam',
            'origen': 'Pasto',
            'dia': '17 mayo',
            'hora': '13:11',
            'avion': 9776,
            'estado': 'Aterrizó',
            'sillas': 16
        })
    return jsonify(dic_vuelos)
#===========================Aerolineas============================
@app.route('/aerolineas')
def aerolineas():
    dic_aerolineas = []
    for i in range(11):
        dic_aerolineas.append({
            'aerolinea': 'Avianca',
            'codigo': 'A3V8C2',            
            'aviones': 17,
            'logo':'lOGO Avianca',
        })
    return jsonify(dic_aerolineas)
#===========================Pilotos===============================
@app.route('/pilotos')
def pilotos():
    dic_pilotos = []
    for i in range(11):
        dic_pilotos.append({
            'documento': '12345678',
            'nombre': 'Fulanito Pérez Gonzales',
            'aerolinea': 'Aerolinea',
            'telefono': '3013045822',
            'hora': '13:11'
        })
    return jsonify(dic_pilotos)
#===========================Aviones===============================
@app.route('/aviones')
def aviones():
    dic_pilotos = []
    for i in range(11):
        dic_pilotos.append({
            'avion': 'CA30B986',
            'modelo': 'Boeing 737',
            'aerolinea': 'Aerolinea',
            'sillas': '17'
        })
    return jsonify(dic_pilotos)
    

#=========================Peticiones SQL==========================  

@app.route('/ss',methods=['GET'])
def ss():
    return jsonify({'nombre' : 'jose'})


@app.route('/nuevo')
def nuevo(peticion):
    return peticion
    
@app.route('/eliminar')
def eliminar(peticion):
    return peticion

@app.route('/actualizar')
def actualizar(peticion):
    return peticion


if __name__ == "__main__":
    app.run(debug=True, port=5000)