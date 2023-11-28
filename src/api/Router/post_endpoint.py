from fastapi import APIRouter
from src.api.Queries.post_Query import *
from src.api.model.models import *

router = APIRouter()

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