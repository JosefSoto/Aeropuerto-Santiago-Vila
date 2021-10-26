from flask import Flask, request, session, jsonify, render_template, redirect, url_for, flash
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "kshso24k2309dfjsldfu98w37998"
mysql = MySQL(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '12345678'
app.config['MYSQL_DATABASE_DB'] = 'SANTIAGOVILA_BD'
app.config['MYSQL_DATABASE_Host'] = 'localhost'
    
#============================== Login ================================
@app.route('/')
@app.route('/dashboard')
@app.route('/dashboardUser')
def permisos():
    if 'nombreUsuario' in session:
        if session['tipoUsuario'] == 'administrador':
            return render_template('dashboard.html')
        elif session['tipoUsuario'] == 'usuario':
            return render_template('dashboardUser.html')
    else: 
        return render_template('login.html')

@app.route('/logout')
def logout():
    print('************Estoy en el metodo logout***********')
    session.clear()
    return redirect(url_for('permisos')) 

def crear_clave(clave):
    return generate_password_hash(clave)

def verificar_clave(clave, ingresada):
    return check_password_hash(clave, ingresada)

def comprobarUsuario(usuario, clave):
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT Nombre, Correo, Contrasenia, Tipo FROM usuarios WHERE Correo = %s LIMIT 1 ",(usuario))
    data = cursor.fetchone()
    if data is not None and verificar_clave( data[2], clave):
        session['nombreUsuario'] = data[0]
        session['tipoUsuario'] = data[3]
        return True
    else:
        return False

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['correo']
        clave = request.form['clave']
        print(usuario)
        print(clave)
        if comprobarUsuario(usuario, clave):
            return redirect(url_for('permisos'))
        else:
            flash('Información errada verifique y vuelta a intentarlo.')
            return render_template('login.html')
        
@app.route('/new/registro', methods=['GET','POST'])
def newUser():
    print(request.form.get('tipo_usuario'))
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO usuarios (Nombre, Correo, Contrasenia, Tipo, Documento, Telefono, Foto)
                    VALUES (%s,%s,%s,%s,%s,%s,%s)""",(
                        request.form.get('nombre'),
                        request.form.get('correo'),
                        crear_clave(request.form.get('clave')),
                        request.form.get('tipo_usuario'),
                        request.form.get('documento'),
                        request.form.get('telefono'),
                        request.form.get('foto')
                        ))
    cursor.connection.commit()
    cursor.fetchall()    
    return render_template('dashboard.html')

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

@app.route('/new/vuelo',methods=['GET', 'POST'])
def nuevoVuelo():
    print(request.form.get('vuelo'))
    print(request.form.get('aerolinea'))
    print(request.form.get('destino'))
    print(request.form.get('dia'))
    print(request.form.get('hora'))
    print(request.form.get('avion')) 
    peticion = """INSERT INTO vuelos (codigo, Aerolinea, Origen, Destino, Dia, Hora, Avion, Estado, Sillas) 
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""   
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute( peticion,(
        request.form.get('vuelo'),
        request.form.get('aerolinea'),
        'Barranquilla',
        request.form.get('destino'),
        request.form.get('dia'),
        request.form.get('hora'),
        request.form.get('avion'),
        request.form.get('estado'),
        16
        ))
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>datos guardados</h1>"

@app.route('/show/vuelo')
def mostrarVuelos():
    print('Dentro del link vuelos')
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT * FROM vuelos")
    data = cursor.fetchall()
    #print(data)
    listaDatos = []
    for elementData in data:
       listElement =  list(elementData)
       listElement[4] = str(listElement[4])
       listElement[5] = str(listElement[5])
       listaDatos.append(listElement)
        

    print(listaDatos[0][4])
    print(listaDatos[0][5])
    print(listaDatos)
    #return listaDatos
    return jsonify(listaDatos)

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

@app.route('/new/aerolinea',methods=['GET', 'POST'])
def nuevoAerolinea():
    
    peticion = """INSERT INTO aerolineas (nombre, codigo, aviones) 
                    VALUES (%s,%s,%s)"""   
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute( peticion,
                    (request.form.get('nombre'),
                    request.form.get('codigo'),                    
                    request.form.get('aviones')))
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>datos guardados</h1>"

@app.route('/show/aerolinea')
def mostrarAerolinea():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT * FROM aerolineas")
    data = cursor.fetchall()
    return jsonify(data)

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

@app.route('/new/piloto',methods=['GET', 'POST'])
def nuevoPiloto():    
    peticion = """INSERT INTO pilotos (Nombre, Apellido, Documento, Telefono, Aerolinea) 
                    VALUES (%s,%s,%s,%s,%s)"""   
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute( peticion, (
        request.form.get('nombre'),
        request.form.get('apellido'),
        request.form.get('documento'),        
        request.form.get('telefono'),
        request.form.get('aerolinea')
        ))
    cursor.connection.commit()
    cursor.fetchall()
    return "<h1>datos guardados</h1>"

@app.route('/show/piloto')
def mostrarpiloto():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT * FROM pilotos")
    data = cursor.fetchall()
    return jsonify(data)

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

@app.route('/new/avion',methods=['GET', 'POST'])
def nuevoAvion():
    print(request.form.get('avion'))
    print(request.form.get('aerolinea'))
    print(request.form.get('fabricante'))        
    print(request.form.get('modelo'))
    print(request.form.get('sillas'))    
    peticion = """INSERT INTO aviones (Codigo, Aerolinea, Fabricante, Modelo, Sillas) 
                    VALUES (%s,%s,%s,%s,%s)"""   
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute( peticion, (
        request.form.get('avion'),
        request.form.get('aerolinea'),
        request.form.get('fabricante'),        
        request.form.get('modelo'),
        request.form.get('sillas')
        ))
    cursor.connection.commit()
    cursor.fetchall()
    return "<h1>datos guardados</h1>"

@app.route('/show/aviones')
def mostrarAviones():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT * FROM aviones")
    data = cursor.fetchall()
    return jsonify(data)

#=========================Peticiones SQL==========================  

@app.route('/ss',methods=['GET'])
def ss():
    return jsonify({'nombre' : 'jose'})

@app.route('/show')
def mostrar():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT * FROM datos")
    data = cursor.fetchall()
    return jsonify(data)
    
@app.route('/new',methods=['GET', 'POST'])
def nuevo(): 
    peticion = """INSERT INTO pruebas (Nombre, Codigo, Logo, Fecha, Hora) 
                    VALUES (%s, %s, %s,%s,%s)"""   
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute( peticion,
                    (request.form.get('vuelo'), 
                    request.form.get('destino'),
                    request.form.get('aerolinea'),
                    request.form.get('dia'),
                    request.form.get('hora')))
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>datos guardados</h1>"

@app.route('/show/selector')
def mostrarSelector():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT nombre FROM aerolineas")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/show/selector/avion')
def mostrarSelectorAvion():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("SELECT Codigo FROM aviones")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/delete',methods=['GET','DELETE'])
def eliminar():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("""DELETE FROM datos WHERE nombre = 'value1'""")
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>dato eliminado</h1>"

@app.route('/update',methods=['GET','PUT'])
def actualizar():
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute("""UPDATE datos SET 
        nombre='{0}', 
        email='{1}' where id = '{2}' """
        .format('PEDRO','PEDRO@PEREZ',15))
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>dato actualizado</h1>"

if __name__ == "__main__":
    app.run(debug=True, port=5000)