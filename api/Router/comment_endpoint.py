from fastapi import APIRouter
from starlette.responses import JSONResponse

from api.Queries.comment_Query import *
from api.model.models import *

router = APIRouter()


# This function sends all the comments of a post to the user
@router.get('/comment/{PID}')
async def all_post_comment(PID):
    result = All_post_comment(PID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function sends a specific comment to the user
# @router.get('/specific_comment/{PID}/{UID}')
# async def specific_comment(PID,UID):
#     return Specific_comment(PID,UID)


# This function receives a new comment
@router.post('/add_comment')
async def add_comment(item: Comment):
    result = Add_comment(item.postid ,item.userid ,item.content)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives new information to edit a comment
@router.patch('/edit_comment')
async def edit_comment(item: edit_comment):
    result = Edit_comment(item.ID ,item.content)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function deletes a comment
@router.delete('/delete_comment/{ID}')
async def delete_comment(ID):
    result = Delete_comment(ID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# I will add this function to the likes of a specific comment
@router.patch('/like_comment/{ID}')
async def like_comment(ID):
    result = Reaction(ID,mode='like')
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# I will add this function to the likes of a specific comment
@router.patch('/dislike_comment/{ID}')
async def dislike_comment(ID):
    result = Reaction(ID,mode='dislike')
    return JSONResponse(status_code=result["status_code"], content=result["content"])



