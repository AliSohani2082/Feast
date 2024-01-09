from fastapi import APIRouter
from starlette.responses import JSONResponse

from api.Queries.postingredient_Query import *
from api.model.models import *


router = APIRouter()


# This function sends all the materials of a post to the client
@router.get('/postI/{PID}')
async def all_ingredient(PID):
    result = All_ingredient(PID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives the new material of a post
@router.post('/add_postI')
async def add_ingredient(item: post_ingredient):
    result = Add_ingredient(item)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives the new information of a material
# @router.patch('/edit_postI/{}')
# async def edit_ingredient(item: Post_ingredient):
#     result = Edit_ingredient(item)
#     return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function removes a material from a post
@router.delete('/delete_postI/{PID}/{IID}')
async def delete_ingredient(PID,IID):
    result = Delete_ingredient(PID,IID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])

