from fastapi import APIRouter
from src.api.Queries.comment_Query import *
from src.api.model.models import *
import re

router = APIRouter()


# This function sends all the comments of a post to the user
@router.get('/comment/{PID}')
async def all_post_comment(PID):
    return All_post_comment(PID)


# This function sends a specific comment to the user
@router.get('/specific_comment/{PID}/{UID}')
async def specific_comment(PID,UID):
    return Specific_comment(PID,UID)


# This function receives a new comment
@router.post('/add_comment')
async def add_comment(item: Comment):
    return Add_comment(item.postid ,item.userid ,item.content ,item.like_count)


# This function receives new information to edit a comment
@router.patch('/edit_comment')
async def edit_comment(item: Comment):
    return Edit_comment(item.ID ,item.postid ,item.userid ,item.content ,item.like_count)


# This function deletes a comment
@router.delete('/delete_comment/{ID}/{PID}/{UID}')
async def delete_comment(ID,PID,UID):
    return Delete_comment(ID,PID,UID)


# I will add this function to the likes of a specific comment
@router.patch('/like_comment/{ID}')
async def like_comment(ID):
    return Reaction(ID,mode='like')


# I will add this function to the likes of a specific comment
@router.patch('dislike_comment/{ID}')
async def dislike_comment(ID):
    return Reaction(ID,mode='dislike')
