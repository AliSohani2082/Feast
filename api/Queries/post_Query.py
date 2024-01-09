from api.functional_function.function import conn,cursor


# this function return all posts
def All_post():
    cursor.execute("SELECT \"ID\",\"userid\",\"title\",\"description\",\"image\",\"like_count\" FROM \"Post\"")
    return {"status_code":202, "content":cursor.fetchall()}


#this function return all user post
def All_user_post(UID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"ID\" = {int(UID)}")
    return {"status_code":202 , "content":cursor.fetchall()}


# this function return the specific post
def Specific_post(PID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"ID\" = {int(PID)}")
    return {"status_code":202, "content":cursor.fetchall()}


#this function return all user post
def All_user_post(UID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE \"postid\" = {int(UID)}")
    return cursor.fetchall()


# this function add the post
def Add_post(userid,TITLE, DESCRIPTION, IMAGE,INGREDIENT,STEPS):
    cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count,time) VALUES({int(userid)},'{TITLE}','{DESCRIPTION}','{IMAGE}',0,CURRENT_DATE) RETURNING \"ID\";")

    # this line,return the postid that was created
    id = cursor.fetchone()


    for i in STEPS:
        cursor.execute(f"INSERT INTO \"Step\"(postid,amount,instruction,step_number) VALUES({int(id[0])},'{i.amount}','{i.instruction}','{i.step_number}')")

    for i in INGREDIENT:
        cursor.execute(f"INSERT INTO \"Post_ingredient\"(postid,amount,ingredientid) VALUES({int(id[0])},'{i.amount}','{i.ingredientid}')")

    conn.commit()

    return {"status_code":202, "content":"The post was published successfully"}


# this function delete specific post
def Delete_post(PID):
    cursor.execute(f"DELETE FROM \"Post\" WHERE \"ID\" = {int(PID)}")
    conn.commit()
    return {"status_code":202, "content":"Post successfully removed"}


# this function edit the post information .just post information ,not step or postingredient
def Edit_post(PID,title,description,image,amount):
    cursor.execute(f"UPDATE \"Post\" set \"title\" = {title} , \"description\" = {description} , \"image\" = {image} , \"amount\" = {amount} where \"ID\" = {int(PID)}")
    cursor.commit()
    return {"status_code":202 , "content":"Updated"}


# this function like and  dislike the post with regards to mode parameter .
def Reaction(PID,UID,mode):
    if mode == 'like':
        cursor.execute(f"UPDATE \"Post\" set \"like_count\" = \"like_count\ + 1")
        conn.commit()
        return {"status_code":202, "content":"The post was liked"}
    elif mode == 'dislike':
        cursor.execute(f"UPDATE \"Post\" set \"like_count\" = \"like_count\ - 1")
        conn.commit()
        return {"status_code":202, "content":"The post was disliked"}
    else:
        return {"status_code":203, "content":"the request is not possible"}
        # raise "the request is not possible"





