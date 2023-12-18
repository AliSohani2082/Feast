from fastapi import APIRouter
from src.api.Queries.postingredient_Query import *
from src.api.model.models import *
import re

router = APIRouter()


# This function sends all the materials of a post to the client
@router.get('/postI')
async def all_ingredient(item: Post_Ingredient):
    return All_ingredient(item.postid,item.amount,item.ingredientid)


# This function receives the new material of a post
@router.post('/add_postI')
async def add_ingredient(item: Post_Ingredient):
    return Add_ingredient(item.postid,item.amount,item.ingredientid)


# This function receives the new information of a material
@router.patch('/edit_postI')
async def edit_ingredient(item: Post_Ingredient):
    return Edit_ingredient(item.postid,item.amount,item.ingredientid)


# This function removes a material from a post
@router.delete('/delete_postI/{PID}/{IID}')
async def delete_ingredient(PID,IID):
    return Delete_ingredient(PID,IID)

