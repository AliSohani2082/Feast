from pydantic import BaseModel

class Userinformation(BaseModel):
    full_name : str
    email : str
    password : str
    username: str
    profile_image : str
    phone_number : str

class Postdetails(BaseModel):
    username : str
    title : str
    description : str
    image : str
    like_count : int
    ingredient_amount : list

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
    ID: int
    postid: int
    userid: int
    content: str
    like_count: int

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