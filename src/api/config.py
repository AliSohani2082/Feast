from fastapi import FastAPI
from Router import endpoints

app = FastAPI()
app.include_router(endpoints.router)