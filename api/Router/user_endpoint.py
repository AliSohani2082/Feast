import json
import re
from fastapi import APIRouter , Response
from starlette.responses import JSONResponse

from api.Queries.user_Query import *
from api.model.models import *

from api.functional_function import function

router = APIRouter()

# http://localhost:8000/register_user
# This function sends all users to the client
@router.get('/user')
async def all_user():
    result = All_user()
    # table()
    return JSONResponse(status_code=202 ,content=result["content"])


# This function receives user information for registration
@router.post('/register_user')
async def register_user(item: Userinformation ,response: Response):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        return JSONResponse(status_code=403 ,content="Username is not valid")
    elif not re.fullmatch("^[a-zA-Z0-9][a-zA-Z0-9\.]*@[a-zA-Z]+\.com", item.email):
        return JSONResponse(status_code=403 ,content="email is not valid")
    elif not re.fullmatch("[a-zA-Z]+\s[a-zA-Z]*", item.full_name):
        return JSONResponse(status_code=403 ,content="your name is not valid")
    else:
        result = Register_user(item.full_name,item.email,item.password,item.username,item.profile_image,item.phone_number)
        return JSONResponse(status_code=result["status_code"] , content=result["content"])


# This function gets the new specification to update
@router.patch('/edit_user')
async def edit_profile(item: Userinformationforedit):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        return JSONResponse(status_code=403 ,content="Username is not valid")
    elif not re.fullmatch("^[a-zA-Z0-9][a-zA-Z0-9\.]*@[a-zA-Z]+\.com", item.email):
        return JSONResponse(status_code=403 ,content="email is not valid")
    elif not re.fullmatch("[a-zA-Z]+\s[a-zA-Z]*", item.full_name):
        return JSONResponse(status_code=403 ,content="your name is not valid")
    else:
        result = Edit_profile(item.ID,item.full_name,item.email,item.username,item.profile_image,item.phone_number)
        return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives the username and sends the profile of a specific user to the client
@router.get('/specific_user/{username}')
async def specific_user(username):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+",username):
        return JSONResponse(status_code=403 ,content="Username is not valid")
    else:
        result = Specific_user(username)
        return JSONResponse(status_code=result["status_code"], content=result["content"])


# this function get new and pre password to chang
@router.patch('/change_password')
async def change_password(item: Password):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        return JSONResponse(status_code=403 , content="Username os not valid")
    else:
        result = Change_password(item.username , item.prepassword , item.newpassword)
        return JSONResponse(status_code=result["status_code"] , content=result["content"])