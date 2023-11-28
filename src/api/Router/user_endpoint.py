from fastapi import APIRouter
from src.api.Queries.user_Query import *
from src.api.model.models import *

router = APIRouter()

@router.get('/')
async def all_user():
    return All_user()

# this function register user if the username does not exist return the message if the operation was successful .
@router.post('/register_user')
async def register_user(item: Userinformation):
    return Register_user(item.fullfamily,item.email,item.password,item.username,item.photo_image,item.phone_number)

# this function edits the user profile and return the message
@router.post('/upadatah_profile/{ID}')
async def edit_profile(item: Userinformation,ID):
    return Edit_profile(ID,item.fullfamily,item.email,item.password,item.username,item.photo_image,item.phone_number)

# this function return the spcesific user
@router.post('/specific_user/{username}')
async def specific_user(username):
    return Specific_user(username)
