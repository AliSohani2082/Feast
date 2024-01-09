from api.functional_function.function import conn,cursor


def All_ingredient(PID):
    cursor.execute(f"SELECT \"Post_ingredient\".*,\"ingredient\".\"name\" FROM \"Post_ingredient\" INNER JOIN  \"ingredient\" ON \"Post_ingredient\".\"ingredientid\" = \"ingredient\".\"ID\" WHERE \"postid\" = {PID}")
    return {"status_code": 202, "content":cursor.fetchall()}


def Add_ingredient(item):
    postid = item.postid
    for i in item.ingredient:
        cursor.execute(f"INSERT INTO \"Post_ingredient\"(postid,ingredientid,amount) VALUES({postid},{i.ingredientid},'{i.amount}')")

    conn.commit()
    return {"status_code":202 ,"content":"ingredient added successfully"}


# def Edit_ingredient(item):
#     postid = item.postid
#     for i in item.ingredient:
#         cursor.execute(f"UPDATE \"Post_ingredient\" SET \"amount\" = '{i.amount}' WHERE \"postid\"")
#
#     conn.commit()
    return {"status_code":202 , "content":"ingredients updated successfully"}

def Delete_ingredient(PID,IID):

    cursor.execute(f"DELETE FROM \"Post_ingredient\" WHERE \"postid\" = {PID} AND \"ingredientid\" = {IID}")

    conn.commit()
    return {"status_code":202, "content":"ingredient deleted successfully"}