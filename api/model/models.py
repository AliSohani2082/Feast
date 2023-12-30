from pydantic import BaseModel
from typing import Optional

class Userinformation(BaseModel):
    full_name : str
    email : str
    password : str
    username: str
    profile_image : str
    phone_number : str

class Userinformationforedit(BaseModel):
    full_name : str
    email : str
    password : str
    username: str
    profile_image : str
    phone_number : str
    ID: int

class Step(BaseModel):
    amount: str
    instruction: str
    step_number: str

class Step_list(BaseModel):
    postid: int
    steps:list[Step]

class Post_ingredient(BaseModel):
    amount:int
    ingredientid: int

class post_ingredient(BaseModel):
    postid: int
    ingredient: list[Post_ingredient]

class Postdetails(BaseModel):
    userid : int
    title : str
    description : str
    image : str
    ingredient: list[Post_ingredient]
    step: list[Step]

class Ingredient(BaseModel):
    name : str
    type : str
    price_per_unit : str
    image : str
    unit_type : str

class Step(BaseModel):
    amount: str
    instruction: str
    step_number: str

class Comment(BaseModel):
    postid: int
    userid: int
    content: str


class edit_comment(BaseModel):
    ID: int
    content: str

class Account(BaseModel):
    userid: int
    type: str
    provider: str
    refresh_token: str
    expire_at: str
    id_token: str
    access_token: str
    token_type: str

class Post_Ingredient(BaseModel):
    postid: int
    amount: int
    ingredientid: int

class Password(BaseModel):
    username: str
    prepassword: str
    newpassword: str