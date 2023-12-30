import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def Add_account(userid,type,provider,refresh_token,expire_at,id_token,access_token,token_type):
    return ""

def Delete_account(userid,type):
    return ""