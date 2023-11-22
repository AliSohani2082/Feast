from fastapi import APIRouter
from src.api.Router.Queries import *
from src.api.model.models import *

router = APIRouter()
@router.get('/')
async def all_user():
    return All_user()

# this function register user if the username does not exist return the message if the operation was successful .
@router.post('/register_user')
async def register_user(item: Userinformation):
    return Register_user(item.F,item.E,item.P,item.U,item.PI,item.PN)

# this function edits the user profile and return the message
@router.post('/upadatah_profile/{ID}')
async def edit_profile(item: Userinformation,ID):
    return Edit_profile(ID,item.F,item.E,item.P,item.U,item.PI,item.PN)

# this function return the spcesific user if
@router.post('/specific_user/{username}')
async def specific_user(username):
    return Specific_user(username)

# this function return all posts
@router.post('/all_posts')
async def all_post():
    return All_post()
@router.post('/all_user_posts/{username}')
async def all_user_posts(username):
    return All_user_post(username)

# this function return the specific post
@router.post('/specific_post/{uid}/{pid}')
async def specific_post(uid,pid):
    return Specific_post(uid,pid)

# this function add the post
@router.post('/post/{uid}/{pid}/{iid}')
async def add_post(uid,pid,iid,item: Postdetails):
    return Add_post(uid,pid,item.title,item.description,item.image,item.like_count,item.amoutn,iid)


@router.post('/delete_post/{UID}/{PID}')
async def delete_post(UID,PID):
    return Delete_post(UID,PID)

# @router.post('')


# @router.post('/ingredient')
# async def add_ingredient():