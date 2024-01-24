from functional_function.function import conn, cursor


def All_post_comment(PID):
    cursor.execute(
        f"SELECT \"Comment\".* , \"User\".\"username\" FROM \"Comment\" INNER JOIN \"User\" ON \"User\".\"ID\" = \"Comment\".\"userid\" WHERE \"Comment\".\"postid\" = {PID}")
    return {"status_code": 202, "content": cursor.fetchall()}


# def Specific_comment(PID,UID):
#     return {"status_code": , "content":}


def Add_comment(PID, UID, content):
    cursor.execute(
        f"INSERT INTO \"Comment\"(postid,userid,content,like_count) VALUES({PID},{UID},'{content}',0) RETURNING \"ID\"")
    id = cursor.fetchall()
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
