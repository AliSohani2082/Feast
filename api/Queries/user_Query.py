import hashlib
from functional_function.function import conn, cursor
import json


# this function return all users
def All_user():

    cursor.execute('SELECT * FROM \"User\" ORDER BY \"ID\"')
    return {"status_code": 202, "content": json.dumps(cursor.fetchall())}


def Login_user(U, P):
    user = Specific_user(U)
    print(user)
    if user["content"] == "Not Found":
        return {"status_code": 500, "content": "User Not Found"}
    elif user["content"][0][3] == hashlib.md5(P.encode('utf-8') + b"$15-*").hexdigest():
        return {"status_code": 202, "content": user}
    else:
        return {"status_code": 500, "content": "Wrong Password"}

# this function register user if the username does not exist return the message if the operation was successful .


def Register_user(F, E, P, U, PI, PN):
    for i in All_user()["content"]:
        if i[4] == U:
            return {"status_code": 500, "content": "this Username already exist"}

    # the password is hashed
    hash = hashlib.md5(P.encode('utf-8') + b"$15-*").hexdigest()
    cursor.execute(
        f"INSERT INTO \"User\"(full_name,email,password,username,profile_image,phone_number) VALUES ('{F}','{E}','{hash}','{U}','{PI}','{PN}')")
    conn.commit()

    cursor.execute(f"SELECT * FROM \"User\" WHERE \"username\" = '{U}'")

    return {"status_code": 201, "content": json.dumps(cursor.fetchall())}


# this function edits the user profile
def Edit_profile(ID, F, E, U, PI, PN):
    cursor.execute(
        f"SELECT username FROM \"User\" WHERE \"username\" = '{U}' AND \"ID\" <> '{ID}'")

    if cursor.fetchall():
        return {"status_code": 500, "content": "this Username already exists"}
    else:
        cursor.execute(
            f"UPDATE \"User\" SET \"full_name\" = '{F}' , \"email\" = '{E}' , \"username\" = '{U}' , \"profile_image\" = '{PI}' , \"phone_number\" = '{PN}' WHERE \"ID\" = {int(ID)}")
        conn.commit()
        return {"status_code": 202, "content": "Accepted"}


# this function return the specific user
def Specific_user(U):
    cursor.execute(f"SELECT * FROM \"User\" WHERE \"username\"= '{U}'")
    result = cursor.fetchall()
    print("dfadsfsa")
    print(result)
    if len(result) == 0:
        return {"status_code": 404, "content": "Not Found"}
    else:
        return {"status_code": 202, "content": result}


# this function changes the password
def Change_password(u, pre, new):
    prep = hashlib.md5(pre.encode('utf-8') + b"$15-*").hexdigest()
    print(prep)
    newp = hashlib.md5(new.encode('utf-8') + b"$15-*").hexdigest()
    cursor.execute(
        f"SELECT * FROM \"User\" WHERE \"password\" = '{prep}' and \"username\" = '{u}'")
    result = cursor.fetchall()

    if result:
        cursor.execute(
            f"UPDATE \"User\" SET \"password\" = '{newp}' WHERE \"username\" = '{u}'")
        conn.commit()
        return {"status_code": 202, "content": "Password changed successfully."}
    else:
        return {"status_code": 406, "content": "Not Acceptable"}


def Delete_user(id):
    cursor.execute(f"DELETE FROM \"User\" WHERE \"ID\" = {id}")
    return {"status_code": 202, "content": "user has successfully deleted"}
