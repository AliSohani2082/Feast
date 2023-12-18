import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_ingredient(postid,amount,ingredient):
    return ""

def Add_ingredient(postid,amount,ingredient):
    return ""

def Edit_ingredient(postid,amount,ingredientid):
    return ""

def Delete_ingredient(PID,IID):
    return ""