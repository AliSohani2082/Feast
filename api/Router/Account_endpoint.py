from fastapi import APIRouter
from src.api.Queries.Account_Query import *
from src.api.model.models import *
import re

router = APIRouter()


# This function adds an account for a user
@router.post('/add_account')
async def add_account(item: Account):
    return Add_account(item.item.userid,item.type,item.provider,item.refresh_token,item.expire_at,item.id_token,item.access_token,item.token_type)


# This function deletes an account from a user
@router.delete('/delete_account/{UId}/{type}')
async def delete_account(UID,type):
    return Delete_account(UID,type)
