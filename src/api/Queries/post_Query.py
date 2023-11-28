import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()


# this function return all posts
def All_post():
    cursor.execute("SELECT * FROM \"Post\"")
    return cursor.fetchall()

# this function return the specific post
def Specific_post(UID,PID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE  \"userid\" = {int(UID)} AND \"ID\" = {int(PID)}")
    return cursor.fetchall()

#this function return all user post
def All_user_post(UID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"ID\" = {int(UID)}")
    return cursor.fetchall()

# this function add the post
def Add_post(UID, PID, TITLE, DESCRIPTION, IMAGE, LIKE_COUTN,AMOUNT,INGREDIENTID):
    cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count) VALUES({int(UID)},'{TITLE}','{DESCRIPTION}','{IMAGE}',{int(LIKE_COUTN)});"
                   f"INSERT INTO \"Post_ingredient\"(postid,amount,ingredientid) VALUES({int(PID)},{int(AMOUNT)},{INGREDIENTID})")
    conn.commit()
    return "The post was published successfully"

#this function delete specifice post
def Delete_post(UID,PID):
    cursor.execute(f"DELETE FROM \"Post\" WHERE \"userid\" = {int(UID)} AND \"ID\" = {int(UID)}")
    return "Post successfully removed"
