from fastapi import APIRouter
from src.api.Queries.post_Query import *
from src.api.model.models import *
import re

router = APIRouter()

# This function sends all posts to the client
@router.get('/all_posts')
async def all_post():
    return All_post()


# This function sends all the posts of a specific user to the client
@router.get('/all_user_posts/{username}')
async def all_user_posts(username):
    if not re.fullmatch("^@[a-zA-Z0-9._]+", username):
        return JSONResponse(status_code=403, content="Username is not valid")
    return All_user_post(username)


# This function sends a specific post to the client
@router.get('/specific_post/{uid}/{pid}')
async def specific_post(uid,pid):
    return Specific_post(uid,pid)


# This function gets the information for a new post
@router.post('/post/{uid}/{pid}/{iid}')
async def add_post(uid,pid,iid,item: Postdetails):
    return Add_post(uid,pid,item.title,item.description,item.image,item.like_count,item.amoutn,item.B)


# This function gets the information for a new post
@router.delete('/delete_post/{UID}/{PID}')
async def delete_post(UID,PID):
    return Delete_post(UID,PID)


# This function receives new information to update a post
@router.patch('/edit_post/{PID}/{UID}')
async def adit_post(PID,UID,item : Postdetails):
    return Edit_post(PID,UID,item.title,item.description,item.image,item.like_count,item.amoutn)


# This function adds the user who liked a particular post to the table
@router.post('/like_post/{PID}/{UID}')
async def like_post(PID,UID):
    return Reaction(PID,UID,mode='like')


# This function removes the user who did not like a particular post from the table
@router.post('/dislike_post/{PID}/{UID}')
async def dislike_post(PID,UID):
    return Reaction(PID,UID,mode='dislike')


