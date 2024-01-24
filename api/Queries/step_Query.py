from functional_function.function import conn, cursor


def All_post_steps(PID):
    cursor.execute(f"SELECT * FROM \"Step\" WHERE \"postid\" = {int(PID)}")
    return {"status_code": 202, "content": cursor.fetchall()}

# def Specific_step(PID,SN):
#     return {"status_code": , "content":}


def Add_step(item):
    postid = item.postid
    for i in item.steps:
        cursor.execute(
            f"INSERT INTO \"Step\"(postid,amount,instruction,step_number) VALUES({int(postid)},'{i.amount}','{i.instruction}','{i.step_number}')")

    conn.commit()
    return {"status_code": 202, "content": "Steps added successfully"}


def Edit_step(item):
    postid = item.postid

    for i in item.steps:
        cursor.execute(
            f"UPDATE \"Step\" SET \"amount\" = '{i.amount}' , \"instruction\" = '{i.instruction}'  WHERE \"step_number\" = '{i.step_number}'")

    conn.commit()
    return {"status_code": 202, "content": "Steps updated successfully"}


def Delete_step(PID, SN):
    cursor.execute(
        f"DELETE FROM \"Step\" WHERE \"postid\" = {PID} AND \"step_number\" = '{SN}'")
    conn.commit()
    return {"status_code": 202, "content": "The step successfully deleted"}
