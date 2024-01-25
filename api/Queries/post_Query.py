from api.functional_function.function import conn,cursor

import json

# this function return all posts
def All_post():
    cursor.execute("SELECT \"ID\",\"userid\",\"title\",\"description\",\"image\",\"like_count\" FROM \"Post\"")
    # cursor.execute("SELECT * FROM \"Post\"")

    return {"status_code":202, "content":json.dumps(cursor.fetchall())}


#this function return all user post
def All_user_post(UN):
    cursor.execute(f"SELECT \"Post\".\"ID\",\"Post\".\"userid\",\"Post\".\"title\",\"Post\".\"description\",\"Post\".\"image\",\"Post\".\"like_count\" FROM \"Post\" INNER JOIN \"User\" ON \"Post\".\"userid\" = \"User\".\"ID\" WHERE \"username\" = '{UN}'")

    return {"status_code": 202, "content": json.dumps(cursor.fetchall())}


# this function return the specific post
def Specific_post(PID):
    cursor.execute(f"SELECT \"ID\",\"userid\",\"title\",\"description\",\"image\",\"like_count\" FROM \"Post\" WHERE \"ID\" = {int(PID)}")
    post = cursor.fetchall()
    cursor.execute(f"SELECT \"instruction\",\"step_number\" FROM \"Step\" WHERE \"postid\"={PID}")
    step = cursor.fetchall()
    cursor.execute(f"SELECT \"ingredient\".\"name\",\"Post_ingredient\".\"amount\" FROM \"Post_ingredient\" INNER JOIN \"ingredient\" ON \"Post_ingredient\".\"ingredientid\" =  \"ingredient\".\"ID\" WHERE \"Post_ingredient\".\"postid\"={int(PID)}")
    ingredient = cursor.fetchall()
    temp = {}
    temp["post"] = post
    temp["step"] = step
    temp["ingredient"] = ingredient
    return {"status_code":202, "content":json.dumps(temp)}



# this function add the post
def Add_post(userid,TITLE, DESCRIPTION, IMAGE,INGREDIENT,STEPS):
    cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count,time) VALUES({int(userid)},'{TITLE}','{DESCRIPTION}','{IMAGE}',0,CURRENT_DATE) RETURNING \"ID\";")

    # this line,return the postid that was created
    id = cursor.fetchone()

    step_number = 0
    for i in STEPS:
        cursor.execute(f"INSERT INTO \"Step\"(postid,instruction,step_number) VALUES({int(id[0])},'{i.instruction}','{step_number}')")
        step_number += 1

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
def Edit_post(PID,title,description,image,steps,ingredients):
    cursor.execute(
        f"UPDATE \"Post\" SET \"title\" = '{title}', \"description\" = '{description}',\"image\" = '{image}',\"time\" = CURRENT_DATE  WHERE \"ID\" = '{PID}'")


    step_number = 0
    for i in steps:
        cursor.execute(
            f"UPDATE \"Step\" SET \"instruction\" = '{i.instruction}' WHERE \"postid\" = {PID} AND \"step_number\" = '{i.step_number}'")
        step_number += 1

    for i in ingredients:
        cursor.execute(
            f"UPDATE \"Post_ingredient\" SET ,\"amount\" = '{i.amount}'WHERE \"ingredientid\" = {i.ingredientid}")

    conn.commit()


# this function like and  dislike the post with regards to mode parameter .
def Reaction(PID,UID,mode):
    if mode == 'like':
        cursor.execute(f"UPDATE \"Post\" set \"like_count\" = \"like_count\ + 1")
        conn.commit()
        return {"status_code":202, "content":"The post was liked"}
    elif mode == 'dislike':
        cursor.execute(f"UPDATE \"Post\" set \"like_count\" = \"like_count\ - 1 WHERE \"like_count\" <> 0")
        conn.commit()
        return {"status_code":202, "content":"The post was disliked"}
    else:
        return {"status_code":203, "content":"the request is not possible"}
        # raise "the request is not possible"



def Add_posts(item):
     re = ""
     for i in item:
         cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count,time) VALUES({int(i.userid)},'{i.title}','{i.description}','{i.image}',0,CURRENT_DATE) RETURNING \"ID\";")

         # this line,return the postid that was created
         id = cursor.fetchone()

         for j in i.step:
             cursor.execute(
                 f"INSERT INTO \"Step\"(postid,amount,instruction,step_number) VALUES({int(id[0])},'{j.amount}','{j.instruction}','{j.step_number}')")

         for j in i.ingredient:
             cursor.execute(
                 f"INSERT INTO \"Post_ingredient\"(postid,amount,ingredientid) VALUES({int(id[0])},'{j.amount}','{j.ingredientid}')")

         conn.commit()
         re += i.title + "The post was published successfully\n"

     return {"status_code": 202, "content": re}




