import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()


def All_ingredient():
    cursor.execute("SELECT * FROM \"ingredient\"")
    return {"status_code":202 , "body":cursor.fetchall()}

def Specific_ingredient(name):
    cursor.execute(f" SELECT * FROM \"ingredient\" WHERE \"name\" = '{name}'")
    return {"status_code":202 , "content": cursor.fetchall()}

def Add_ingredient(name ,type ,price_per_unit ,image ,unit_type):
    cursor.execute(f"SELECT * FROM \"ingredient\" WHERE \"name\"='{name}'")
    result = cursor.fetchall()
    if result:
        return {"status_code":500 ,"body":"this ingredient already exist"}
    else:
        cursor.execute(f"INSERT INTO \"ingredient\"(name,type,price_per_unit,image,unit_type) VALUES('{name}','{type}','{price_per_unit}','{image}','{unit_type}')")
        conn.commit()
        return {"status_code":202 ,"body":"added"}

def Delete_ingredient(name):
    cursor.execute(f"SELECT name FROM \"ingredient\" WHERE \"name\"='{name}'")

    if cursor.fetchall():
        cursor.execute(f"DELETE FROM \"ingredient\" WHERE \"name\" = '{name}'")
        conn.commit()
        return {"status_code":202 ,"body":"ingredient successfully removed"}
    else:
        return {"status_code":500 , "body":"Not Found"}