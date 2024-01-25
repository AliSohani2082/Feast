import re
import json

from api.functional_function.function import *



def All_ingredient():
    cursor.execute("SELECT * FROM \"ingredient\"")
    return {"status_code":202 , "content":json.dumps(cursor.fetchall())}

def Specific_ingredient(name):
    cursor.execute(f" SELECT * FROM \"ingredient\" WHERE \"name\" = '{name}'")
    return {"status_code":202 , "content": json.dumps(cursor.fetchall())}


def Add_ingredient(item):
    re = ""
    print(item)
    for i in item:
        print(i)
        cursor.execute(f"SELECT * FROM \"ingredient\" WHERE \"name\"='{i.name}'")
        result = cursor.fetchall()
        if result:
            re += "this ingredient already exist\n"
        else:
            print(i.name)
            cursor.execute(f"INSERT INTO \"ingredient\"(name,type,price_per_unit,image,unit_type) VALUES('{i.name}','{i.type}','{i.price_per_unit}','{i.image}','{i.unit_type}')")
            conn.commit()

            re += i.name+" added\n"
    print(re)
    return {"status_code":202, "content":re}

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