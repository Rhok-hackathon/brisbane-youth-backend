from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'test'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route("/")
def querry(querry_to_search):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(str(querry_to_search))
    rv = cursor.fetchall()
    return(str(rv))

if __name__ == "__main__":
   print(querry('select * from testing'))