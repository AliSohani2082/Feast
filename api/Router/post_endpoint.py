from fastapi import APIRouter
import re

from starlette.responses import JSONResponse

from Queries.post_Query import *
from model.models import *


router = APIRouter()


# This function sends all posts to the client


@router.get('/all_posts')
async def all_post():
    result = All_post()
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function sends all the posts of a specific user to the client
@router.get('/user_posts/{username}')
async def all_user_posts(username):
    if not re.fullmatch("^@[a-zA-Z0-9._]+", username):
        return JSONResponse(status_code=403, content="Username is not valid")
    result = All_user_post(username)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function sends a specific post to the client
@router.get('/post/{pid}')
async def specific_post(pid):
    result = Specific_post(pid)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function gets the information for a new post
@router.post('/post')
async def add_post(item: Postdetails):

    result = Add_post(item.userid, item.name, item.description,
                      item.imageUrl, item.ingredients, item.steps)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function gets the information for a new post
@router.delete('/post/{PID}')
async def delete_post(PID):
    result = Delete_post(PID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives new information to update a post
@router.patch('/post')
async def edit_post(item: Postedit):
    result = Edit_post(item.postid, item.name, item.description,
                       item.imageUrl, item.steps, item.ingredients)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function adds the user who liked a particular post to the table
@router.post('/like_post/{PID}/{UID}')
async def like_post(PID, UID):
    result = Reaction(PID, UID, mode='like')
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function removes the user who did not like a particular post from the table
@router.post('/dislike_post/{PID}/{UID}')
async def dislike_post(PID, UID):
    result = Reaction(PID, UID, mode='dislike')
    return JSONResponse(status_code=result["status_code"], content=result["content"])


@router.post('/posts')
async def add_posts(item: list[Postdetails]):
    result = Add_posts(item)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


@router.get("/posts")
async def getPosts():
    result = n_rangdom_post()
    return JSONResponse(status_code=result["status_code"],
                        content=result["content"])
