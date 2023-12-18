from fastapi import APIRouter , Response
from src.api.Queries.user_Query import *
from src.api.model.models import *
import re

router = APIRouter()


# This function sends all users to the client
@router.get('/')
async def all_user(response: Response):
    result = All_user()
    # response.status_code = result["status_code"]
    # response.body = result["body"]
    return JSONResponse(status_code=202 ,content=result["body"])


# This function receives user information for registration
@router.post('/register_user')
async def register_user(item: Userinformation ,response: Response):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        response.status_code = 403
        response.body = "Username is not valid"
    elif not re.fullmatch("^[a-zA-Z0-9][a-zA-Z0-9\.]*@[a-zA-Z]+\.com", item.email):
        response.status_code = 403
        response.body = "email is not valid"
    elif not re.fullmatch("[a-zA-Z]+\s[a-zA-Z]*", item.full_name):
        response.status_code = 403
        response.body = "your name is not valid"
    else:
        result = Register_user(item.full_name,item.email,item.password,item.username,item.profile_image,item.phone_number)
        response.status_code = result["status_code"]
        response.body = result["body"]

# This function gets the new specification to update
@router.patch('/edit_profile/{ID}')
async def edit_profile(response: Response ,item: Userinformation,ID):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        response.status_code = 403
        response.body = "Username in not valid"
    elif not re.fullmatch("^[a-zA-Z0-9][a-zA-Z0-9\.]*@[a-zA-Z]+\.com", item.email):
        response.status_code = 403
        response.body = "email in not valid"
    elif not re.fullmatch("[a-zA-Z]+\s[a-zA-Z]*", item.full_name):
        response.status_code = 403
        response.body = "your name in not valid"
    else:
        result = Edit_profile(ID,item.full_name,item.email,item.username,item.profile_image,item.phone_number)
        response.status_code = result["status_code"]
        response.body = result["body"]

# This function receives the username and sends the profile of a specific user to the client
@router.get('/specific_user/{username}')
async def specific_user(username ,response: Response):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+",username):
        response.status_code = 403
        response.body = "Username is not valid"
    result =  Specific_user(username)
    response.status_code = result["status_code"]
    response.body = result["body"]



@router.patch('/change_password')
async def change_password(item: Password , response: Response):
    if not re.fullmatch("^@[a-zA-Z0-9\._]+", item.username):
        response.status_code = 403
        response.body = "Username os not valid"
    else:
        result =  Change_password(item.username , item.prepassword , item.newpassword)
        response.status_code = result["status_code"]
        response.body = result["body"]