from fastapi import FastAPI
from Queries import *
from pydantic import BaseModel

app = FastAPI()

class Userinformation(BaseModel):
    F : str
    E : str
    P : str
    U : str
    PI : str
    PN : str
class Postdetails(BaseModel):
    title : str
    description : str
    like_count : str
    image : str
    like_count : int
    amount : int
class Ingredient(BaseModel):
    name : str
    type : str
    price_per_unit : str
    image : str
    unit_type : str

# this function return all of users
@app.post('/')
async def all_user():
    return select()

# this function register user if the username does not exist
@app.post('/register_user')
async def register_user(item: Userinformation):
    return Register_user(item.F,item.E,item.P,item.U,item.PI,item.PN)

# this function edits the user profile
@app.post('/upadatah_profile/{ID}')
async def edit_profile(item: Userinformation,ID):
    return Edit_profile(ID,item.F,item.E,item.P,item.U,item.PI,item.PN)

# this function return the spcesific user
@app.post('/specific_user/{username}')
async def specific_user(username):
    return Specific_user(username)

# this function return all posts
@app.post('/all_posts')
async def all_post():
    return All_post()

# this function return the specific post
@app.post('/specific_post/{uid}/{pid}')
async def specific_post(uid,pid):
    return Specific_post(uid,pid)

# this function add the post
@app.post('/post/{uid}/{pid}/{iid}')
async def add_post(uid,pid,iid,item: Postdetails):
    return Add_post(uid,pid,item.title,item.description,item.image,item.like_count,item.amoutn,iid)

# @app.post('/ingredient')
# async def add_ingredient():
