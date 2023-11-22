from pydantic import BaseModel

class Userinformation(BaseModel):
    F : str
    E : str
    P : str
    U : str
    PI : str
    PN : str
class Postdetails(BaseModel):
    title : str
    description : str
    like_count : str
    image : str
    like_count : int
    amount : int
class Ingredient(BaseModel):
    name : str
    type : str
    price_per_unit : str
    image : str
    unit_type : str