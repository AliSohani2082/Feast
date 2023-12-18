from fastapi import APIRouter ,Response , status
import re
import json
from src.api.Queries.ingredient_Query import *
from src.api.model.models import *
from src.api.functional_function.function import ingredient_to_json

router = APIRouter()

# This function sends all available food items to the customer
@router.get('/ingredient')
async def all_ingredient(response : Response):
    result = All_ingredient()
    response.status_code = result["status_code"]
    response.body = result["body"]


# This function sends all posts to the client
@router.get('/ingredient/{name}')
async def specific_ingredient(name , response : Response):
    if not re.fullmatch("^[a-zA-Z\s]+", name):
        response.status_code = 403
        response.body = "name is not  valid"
    else:
        result = Specific_ingredient(name)
        response.status_code = result["status_code"]
        response.body = result["body"]


# This function receives a new food item from the client
@router.post('/add_ingredient')
async def add_ingredient(item: list[Ingredient] ,response: Response):
    response.status_code = status.HTTP_403_FORBIDDEN
    for j in item:
        i = ingredient_to_json(j)
        if not re.fullmatch("^[a-zA-Z\s]+",i["name"]):
            response.status_code = status.HTTP_403_FORBIDDEN
            response.body = "name is not valid"

        elif not re.fullmatch("^[a-zA-Z]+",i["type"]):
            response.status_code = status.HTTP_403_FORBIDDEN
            response.body = "type is not valid"

        elif not re.fullmatch("^[0-9]+\.[0-9]+",i["price_per_unit"]):
            response.status_code = status.HTTP_403_FORBIDDEN
            response.body = "price is not valid"

        elif not re.fullmatch("[a-zA-Z]+",i["unit_type"]):
            response.status_code = status.HTTP_403_FORBIDDEN
            response.body = ("unit is not valid")

        else:
            result = Add_ingredient(i["name"] ,i["type"] ,i["price_per_unit"] ,i["image"] ,i["unit_type"])
            response.status_code = result["status_code"]
            response.body = result["body"]



# This function deletes an item
@router.delete('/delete_ingredient/{name}')
async def delete_ingredient(name ,response: Response):
    if not re.fullmatch("^[a-zA-Z\s]+",name):
        response.status_code = 403
        response.body = "name in not valid"
        response.headers['Content-Type'] = 'application/json'
    else:
        result = Delete_ingredient(name)
        response.status_code = result["status_code"]
        response.body = result["body"]
        response.headers['Content-Type'] = 'application/json'
