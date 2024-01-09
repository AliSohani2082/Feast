from fastapi import APIRouter ,Response
from starlette.responses import JSONResponse

from api.Queries.ingredient_Query import *
from api.model.models import *
# from Feast.api.functional_function.function import ingredient_to_json

router = APIRouter()

# This function sends all available food items to the customer
@router.get('/ingredient')
async def all_ingredient(response : Response):
    result = All_ingredient()
    return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function sends all posts to the client
@router.get('/ingredient/{name}')
async def specific_ingredient(name , response : Response):
    if not re.fullmatch("^[a-zA-Z\s]+", name):
        return JSONResponse(status_code=403, content="name is not valid")
    else:
        result = Specific_ingredient(name)
        return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function receives a new food item from the client
@router.post('/add_ingredient')
async def add_ingredient(item: list[Ingredient]):
    result = Add_ingredient(item)
    return JSONResponse(status_code=result['status_code'] ,content=result['content'])

    for j in item:
        i = ingredient_to_json(j)
        if not re.fullmatch("^[a-zA-Z\s]+",i["name"]):
            return JSONResponse(status_code=403, content="name is not valid")
        elif not re.fullmatch("^[a-zA-Z]+",i["type"]):
            return JSONResponse(status_code=403, content="type is not valid")
        elif not re.fullmatch("^[0-9]+\.[0-9]+",i["price_per_unit"]):
            return JSONResponse(status_code=403, content="price is not valid")
        elif not re.fullmatch("[a-zA-Z]+",i["unit_type"]):
            return JSONResponse(status_code=403, content="unit is not valid")
        else:
            # result = Add_ingredient(i["name"] ,i["type"] ,i["price_per_unit"] ,i["image"] ,i["unit_type"])
            result = Add_ingredient()
            return JSONResponse(status_code=result["status_code"], content=result["content"])


# This function deletes an item
@router.delete('/delete_ingredient/{name}')
async def delete_ingredient(name ,response: Response):
    if not re.fullmatch("^[a-zA-Z\s]+",name):
        return JSONResponse(status_code=403, content="name is not valid")
    else:
        result = Delete_ingredient(name)
        return JSONResponse(status_code=result['status_code'], content=result['content'])
