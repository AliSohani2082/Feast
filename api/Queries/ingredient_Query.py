import psycopg2
from starlette.responses import JSONResponse
import re

from src.api.functional_function.function import ingredient_to_json


conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()


def All_ingredient():
    cursor.execute("SELECT * FROM \"ingredient\"")
    return {"status_code":202 , "content":cursor.fetchall()}

def Specific_ingredient(name):
    cursor.execute(f" SELECT * FROM \"ingredient\" WHERE \"name\" = '{name}'")
    return {"status_code":202 , "content": cursor.fetchall()}


def Add_ingredient(name ,type ,price_per_unit ,image ,unit_type):
    cursor.execute(f"SELECT * FROM \"ingredient\" WHERE \"name\"='{name}'")
    result = cursor.fetchall()
    if result:
        return {"status_code":500 ,"content":"this ingredient already exist"}
    else:
        cursor.execute(f"INSERT INTO \"ingredient\"(name,type,price_per_unit,image,unit_type) VALUES('{name}','{type}','{price_per_unit}','{image}','{unit_type}')")
        conn.commit()
        return {"status_code":202 ,"content":"added"}

def Add_ingredient(item):

    message = {}
    message['content'] = {}
    k = 0
    for j in item:
        i = ingredient_to_json(j)
        if not re.fullmatch("^[a-zA-Z\s]+", i["name"]):
            message['content'][str(k)] = i["name"]+" is not valid"
            k += 1
            continue
        elif not re.fullmatch("^[a-zA-Z]+", i["type"]):
            message['content'][str(k)] = i["type"] + " is not valid"
            k += 1
            continue
        elif not re.fullmatch("^[0-9]+\.[0-9]+", i["price_per_unit"]):
            message['content'][str(k)] = i["price_per_unit"] + " is not valid"
            k += 1
            continue
        elif not re.fullmatch("[a-zA-Z]+", i["unit_type"]):
            message['content'][str(k)] = i["unit_type"] + " is not valid"
            k += 1
            continue
        else:
            name = i["name"]
            type = i["type"]
            price_per_unit = i["price_per_unit"]
            image = i["image"]
            unit_type = i["unit_type"]

            cursor.execute(f"SELECT * FROM \"ingredient\" WHERE \"name\"='{name}'")
            result = cursor.fetchall()
            if result:
                message['content'][str(k)] = i["name"] + " already exist"
                k += 1
                continue
            else:
                cursor.execute(f"INSERT INTO \"ingredient\"(name,type,price_per_unit,image,unit_type) VALUES('{name}','{type}','{price_per_unit}','{image}','{unit_type}')")
                conn.commit()
                k += 1
                message['content'][str(k)] = i["name"] + " added"
    k = 0
    message['status_code'] = 501
    return message

def Delete_ingredient(name):
    cursor.execute(f"SELECT name FROM \"ingredient\" WHERE \"name\"='{name}'")

    if cursor.fetchall():
        cursor.execute(f"DELETE FROM \"ingredient\" WHERE \"name\" = '{name}'")
        conn.commit()
        return {"status_code":202 ,"content":"ingredient successfully removed"}
    else:
        return {"status_code":500 , "content":"Not Found"}