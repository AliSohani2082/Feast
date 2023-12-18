from fastapi import APIRouter
from src.api.Queries.step_Query import *
from src.api.model.models import *
import re

router = APIRouter()


# this function sends all steps related to a post to the customer
@router.get('/post_step/{PID}')
async def all_post_steps(PID):
    return All_post_steps(PID)

# this function sends a specific step to the client
@router.get('/specific_step/{PId}/{SN}')
async def specific_step(PID,SN):
    return Specific_step(PID,SN)


# this function adds a step
@router.post('/add_step/{PId}')
async def add_step(PID ,item: Step):
    return Add_step(PID,item.amount,item.instruction,item.step_number)


# this function edits a step
@router.patch('/edit_step/{PID}/{SN}')
async def edit_step(PID ,SN ,item: Step):
    return Edit_step(PID,SN,item.amount,item.instruction,item.step_number)


# this function delete a specific step
@router.delete('/delete_post/{PID}/{SN}')
async def delete_step(PID,SN):
    return Delete_step(PID,SN)