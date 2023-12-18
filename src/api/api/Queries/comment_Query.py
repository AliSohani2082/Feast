import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_post_comment(PID):
    return ""

def Specific_comment(PID,UID):
    return ""

def Add_comment(PID,UID,content,like_count):
    return

def Edit_comment(ID ,postid ,userid ,content,like_count):
    return ""

def Delete_comment(ID,PID,UID):
    return ""

def Reaction(ID,mode):
    if mode == 'like':
        return ""
    elif mode == 'dislike':
        return ""
    else:
        raise "the request is not possible"
