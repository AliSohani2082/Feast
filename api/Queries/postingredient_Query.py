import psycopg2

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_ingredient(PID):
    cursor.execute(f"SELECT * FROM \"Post_ingredient\" WHERE \"postid\" = {PID}")
    return {"status_code": 202, "content":cursor.fetchall()}


def Add_ingredient(item):
    postid = item.postid
    for i in item.ingredient:
        cursor.execute(f"INSERT INTO \"Post_ingredient\"(postid,ingredientid,amount) VALUES({postid},{i.ingredientid},'{i.amount}')")

    conn.commit()
    return {"status_code":202 ,"content":"ingredient added successfully"}


def Edit_ingredient(item):
    postid = item.postid
    for i in item.ingredient:
        cursor.execute(f"UPDATE \"Post_ingredient\" SET \"amount\" = '{i.amount}' , \"ingredientid\" = {i.ingredientid}")

    conn.commit()
    return {"status_code":202 , "content":"ingredients updated successfully"}

def Delete_ingredient(item):
    postid = i.postid
    for i in item.ingredient:
        cursor.execute(f"DELETE FROM \"Post_ingredient\" WHERE \"postid\" = {postid} AND \"ingredient\" = {i.ingredientid}")

    conn.commit()
    return {"status_code":202, "content":"ingredient deleted successfully"}