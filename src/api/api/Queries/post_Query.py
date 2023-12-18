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


#this function return all user post
def All_user_post(UID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"ID\" = {int(UID)}")
    return cursor.fetchall()


# this function return the specific post
def Specific_post(UID,PID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE  \"userid\" = {int(UID)} AND \"ID\" = {int(PID)}")
    return cursor.fetchall()


#this function return all user post
def All_user_post(UID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"postid\" = {int(UID)}")
    return cursor.fetchall()


# this function add the post
def Add_post(UID, PID, TITLE, DESCRIPTION, IMAGE, LIKE_COUTN,AMOUNT,INGREDIENTID):
    cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count) VALUES({int(UID)},'{TITLE}','{DESCRIPTION}','{IMAGE}','{int(LIKE_COUTN)}');"
                   f"INSERT INTO \"Post_ingredient\"(postid,amount,ingredientid) VALUES({int(PID)},{int(AMOUNT)},{INGREDIENTID})")
    conn.commit()
    return "The post was published successfully"


#this function delete specifice post
def Delete_post(UID,PID):
    cursor.execute(f"DELETE FROM \"Post\" WHERE \"userid\" = {int(UID)} AND \"ID\" = {int(UID)}")
    return "Post successfully removed"


# this function edit the post information .just post information ,not step or postingredient
def Edit_post(PID,UId,title,description,image,like_count,amount):
    cursor.execute(f"UPDATE \"Post\" set \"title\" = {title} , \"description\" = {description} , \"image\" = {image} , \"like_count\" = {luike_count} , \"amount\" = {amount} where \"ID\" = {int(PID)} AND \"postid\" = {int(PID)}")
    cursor.commit()
    return JSONResponse(status_code=202 , content="Updated")

# this function like and  dislike the post with regards to mode parameter .
def Reaction(PID,UID,mode):
    if mode == 'like':
        cursor.execute(f"UPDATE \"Post\" set ")
        return""
    elif mode == 'dislike':
        return ""
    else:
        raise "the request is not possible"





