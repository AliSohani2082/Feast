from fastapi import APIRouter
from starlette.responses import JSONResponse

from Queries.step_Query import *
from model.models import *
import re

router = APIRouter()


# this function sends all steps related to a post to the customer
@router.get('/post_step/{PID}')
async def all_post_steps(PID):
    result = All_post_steps(PID)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# this function sends a specific step to the client
# @router.get('/specific_step/{PId}/{SN}')
# async def specific_step(PID,SN):
#     return Specific_step(PID,SN)


# this function adds a step
@router.post('/add_step')
async def add_step(item: Step_list):
    result = Add_step(item)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# this function edits a step
@router.patch('/edit_step')
async def edit_step(item: Step_list):
    result = Edit_step(item)
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# this function delete a specific step
@router.delete('/delete_step/{PID}/{SN}')
async def delete_step(PID, SN):
    result = Delete_step(PID, SN)
    return JSONResponse(status_code=result["status_code"], content=result["content"])
