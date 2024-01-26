from fastapi import FastAPI
from Router import post_endpoint, user_endpoint, ingredient_endpoint, step_endpoint, comment_endpoint, Account_endpoint, postingredient_endpoint
# from fastmiddleware.cors import CORSMiddleware

app = FastAPI()

# origins = [
#     "http://localhost:3000",
#     "https://localhost:3000"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.include_router(user_endpoint.router)
app.include_router(post_endpoint.router)
app.include_router(step_endpoint.router)
app.include_router(ingredient_endpoint.router)
app.include_router(comment_endpoint.router)
app.include_router(Account_endpoint.router)
app.include_router(postingredient_endpoint.router)
