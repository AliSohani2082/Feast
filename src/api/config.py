from fastapi import FastAPI
from Router import post_endpoint, user_endpoint
app = FastAPI()
app.include_router(user_endpoint.router)
app.include_router(post_endpoint.router)