import psycopg2
from starlette.responses import JSONResponse

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

# this function return all users
def All_user():
    cursor.execute('SELECT * FROM "User"')
    result = cursor.fetchall()
    if not result:
        return JSONResponse(status_code=204, content="No Content")
    else:
        return result

# this function register user if the username does not exist return the message if the operation was successful .
def Register_user(F, E, P, U, PI, PN):
    for i in All_user():
        if i[4] == U:
            return JSONResponse(status_code=500 , content="Internal server errore")

    cursor.execute(f"INSERT INTO \"User\"(full_name,email,password,username,profile_image,phone_number) VALUES ('{F}','{E}','{P}','{U}','{PI}','{PN}')")
    conn.commit()
    return JSONResponse(status_code=201, content="Created")

# this function edits the user profile
def Edit_profile(ID,F, E, P, U, PI, PN):
    cursor.execute(f"UPDATE \"User\" SET \"full_name\" = '{F}' , \"email\" = '{E}' , \"password\" = '{P}' , \"username\" = '{U}' , \"profile_image\" = '{PI}' , \"phone_number\" = '{PN}' WHERE \"ID\" = {int(ID)}")
    conn.commit()
    return JSONResponse(status_code=202, content="Accepted")

# this function return the specific user
def Specific_user(U):
    for i in All_user():
        if i[4] == U:
            cursor.execute(f"SELECT * FROM \"User\" WHERE \"username\" = '{U}'")
            return JSONResponse(status_code=202 , content=cursor.fetchall())
    return JSONResponse(status_code=404 , content="Not Found")
