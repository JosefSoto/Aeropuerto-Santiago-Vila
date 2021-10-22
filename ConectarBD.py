from flask import Flask, jsonify, request
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '12345678'
app.config['MYSQL_DATABASE_DB'] = 'santiagovila_bd'
app.config['MYSQL_DATABASE_Host'] = 'localhost'
#mysql.init_app(app)


def mostrar(sentencia, valor):
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute(sentencia, valor)
    data = cursor.fetchall()
    jsonData = jsonify(data)
    print(jsonData)
    return jsonData


def nuevo(sentencia, valor):
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute(sentencia, valor)
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>datos guardados</h1>"


def eliminar(sentencia, valor):
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute(sentencia, valor)
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>dato eliminado</h1>"


def actualizar(sentencia, valor):
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute(sentencia, valor)
    cursor.connection.commit()
    cursor.fetchall()    
    return "<h1>dato actualizado</h1>"
