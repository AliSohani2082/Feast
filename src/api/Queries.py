import psycopg2

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

# this function return all users
def select():
    cursor.execute('SELECT * FROM "User"')
    return cursor.fetchall()

# this function register user if the username does not exist
def Register_user(F, E, P, U, PI, PN):
    for i in select():
        if i[4] == U:
            return "username in available, please Change it"

    cursor.execute(f"INSERT INTO \"User\"(full_name,email,password,username,profile_image,phone_number) VALUES ('{F}','{E}','{P}','{U}','{PI}','{PN}')")
    conn.commit()
    return "Signed up successfully"

# this function edits the user profile
def Edit_profile(ID,F, E, P, U, PI, PN):
    cursor.execute(f"UPDATE \"User\" SET \"full_name\" = '{F}' , \"email\" = '{E}' , \"password\" = '{P}' , \"username\" = '{U}' , \"profile_image\" = '{PI}' , \"phone_number\" = '{PN}' WHERE \"ID\" = {int(ID)}")
    conn.commit()
    return "information successfully updated"

# this function return the specific user
def Specific_user(U):
    cursor.execute(f"SELECT * FROM \"User\" WHERE \"username\" = '{U}'")
    return cursor.fetchall()

# this function return all posts
def All_post():
    cursor.execute("SELECT * FROM \"Post\"")
    return cursor.fetchall()

# this function return the specific post
def Specific_post(UID,PID):
    cursor.execute(f"SELECT * FROM \"Post\" WHERE  \"userid\" = {int(UID)} AND \"ID\" = {int(PID)}")
    return cursor.fetchall()

# this function add the post
def Add_post(UID, PID, TITLE, DESCRIPTION, IMAGE, LIKE_COUTN,AMOUNT,INGREDIENTID):
    cursor.execute(f"INSERT INTO \"Post\"(userid,title,description,image,like_count) VALUES({int(UID)},'{TITLE}','{DESCRIPTION}','{IMAGE}',{int(LIKE_COUTN)});"
                   f"INSERT INTO \"Post_ingredient\"(postid,amount,ingredientid) VALUES({int(PID)},{int(AMOUNT)},{INGREDIENTID})")
    conn.commit()
    return "The post was published successfully"

# def Add_ingredient():
#     cursor.execute(f"INSERT INTO \"ingredient\"(name,type,price_per_unit,image,unit_type) VALUES()")
#     conn.commit()

