import psycopg2
from starlette.responses import JSONResponse
import re

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_post_steps(PID):
    cursor.execute(f"SELECT * FROM \"Step\" WHERE \"postid\" = {int(PID)}")
    return {"status_code":202 , "content":cursor.fetchall()}

# def Specific_step(PID,SN):
#     return {"status_code": , "content":}

def Add_step(item):
    postid = item.postid

    for i in item.steps:
        cursor.execute(f"INSERT INTO \"Step\"(postid,amount,instraction,step_number) VALUES({postid},'{i.amount}','{i.instruction}','{i.step_number}')")

    conn.commit()
    return {"status_code":202, "content":"Steps added successfully"}

def Edit_step(item):
    postid = item.postid

    for i in item.steps:
        cursor.execute(f"UPDATE \"Step\" SET \"amount\" = '{i.amount}' , \"instruction\" = '{i.instruction}' , \"step_number\" = '{i.step_number}'")

    conn.commit()
    return {"status_code":202, "content":"Steps updated successfully"}


def Delete_step(PID,SN):
    cursor.execute(f"DELTET FROM \"Step\" WHERE \"postid\" = {PID} AND \"stem_nubmer\" = {SN}")
    conn.commit()
    return {"status_code":202, "content":"The step successfully deleted"}

