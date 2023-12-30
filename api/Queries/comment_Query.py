import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_post_comment(PID):
    cursor.execute(f"SELECT \"Comment\".* , \"User\".\"username\" FROM \"Commnet\" INNER JOIN  ON \"User\".\"ID\" = \"Comment\".\"userid\" WHERE \"postid\" = {PID}")
    return {"status_code":202, "content":cursor.fetchall()}


# def Specific_comment(PID,UID):
#     return {"status_code": , "content":}


def Add_comment(PID,UID,content):
    cursor.execute(f"INSERT INTO \"Comment\"(postid,userid,content) VALUES({PID},{UID},'{content} RETURNING \"ID\"')")
    id = cursor.fetchall()
    conn.commit()
    return {"status_cod         e":202, "content":id}


def Edit_comment(ID,content):
    cursor.execute(f"UPDATE \"Commnet\" SET \"content\" = '{content}' WHERE \"ID\" = {ID}")
    conn.commit()
    return {"status_code":202, "content":"content comment Updated successfully"}

def Delete_comment(ID):
    cursor.execute(f"DELETE FROM \"Commnet\" WHERE \"ID\" = {ID}")
    conn.commit()
    return {"status_code":202, "content":"comment deleted successfully"}

def Reaction(ID,mode):
    if mode == 'like':
        cursor.execute(f"UPDATE \"Comment\" SET \"count_like\" = \"count_like\" + 1 WHERE \"ID\" = {ID}")
        conn.commit()
        return {"status_code":202, "content":"liked"}
    elif mode == 'dislike':
        cursor.execute(f"UPDATE \"Comment\" SET \"count_like\" = \"count_like\" - 1  WHERE \"ID\" = {ID}")
        conn.commit()
        return {"status_code":202, "content":"disliked"}
    else:
        return {"status_code":403, "content":"error"}
        # raise "the request is not possible"
