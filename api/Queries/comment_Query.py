
from functional_function.function import conn, cursor
import json
from Queries.user_Query import *


def All_post_comment(PID):
    cursor.execute(
        f"SELECT \"Comment\".* , \"User\".\"ID\" FROM \"Comment\" INNER JOIN \"User\" ON \"User\".\"ID\" = \"Comment\".\"userid\" WHERE \"Comment\".\"postid\" = {PID}")
    data = cursor.fetchall()
    temp = []
    for i in data:
        userInfo = Specific_user_byId(i[2])
        temp.append({
            "username": userInfo["content"][0][4],
            "profile_image": userInfo["content"][0][5],
            "content": i[3]
        })

    return {"status_code": 202, "content": json.dumps(temp)}


# def Specific_comment(PID,UID):
#     return {"status_code": , "content":}


def Add_comment(PID, UID, content):
    cursor.execute(
        f"INSERT INTO \"Comment\"(postid,userid,content,like_count) VALUES({PID},{UID},'{content}',0) RETURNING \"ID\"")
    id = cursor.fetchall()
    print(id)
    print("425435657689----------------")
    conn.commit()
    return {"status_code": 202, "content": id}


def Edit_comment(ID, content):
    cursor.execute(
        f"UPDATE \"Comment\" SET \"content\" = '{content}' WHERE \"ID\" = {int(ID)}")
    conn.commit()
    return {"status_code": 202, "content": "content comment Updated successfully"}


def Delete_comment(ID):
    cursor.execute(f"DELETE FROM \"Comment\" WHERE \"ID\" = {int(ID)}")
    conn.commit()
    return {"status_code": 202, "content": "comment deleted successfully"}


def Reaction(ID, mode):
    if mode == 'like':
        cursor.execute(
            f"UPDATE \"Comment\" SET \"like_count\" = \"like_count\" + 1 WHERE \"ID\" = {ID}")
        conn.commit()
        return {"status_code": 202, "content": "liked"}
    elif mode == 'dislike':
        cursor.execute(
            f"UPDATE \"Comment\" SET \"like_count\" = \"like_count\" - 1  WHERE \"ID\" = {ID}")
        conn.commit()
        return {"status_code": 202, "content": "disliked"}
    else:
        return {"status_code": 403, "content": "error"}
        # raise "the request is not possible"
