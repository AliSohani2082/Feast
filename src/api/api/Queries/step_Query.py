import psycopg2
from starlette.responses import JSONResponse
import re

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="#Alireza@tampo7",
                        port="5432")

cursor = conn.cursor()

def All_post_steps(PID):
    return ""

def Specific_step(PID,SN):
    return ""

def Add_step(PID,amount,instruction,step_number):
    return ""

def Edit_step(PID,SN,amount,instruction,step_number):
    return ""

def Delete_step(PID,SN):
    return ""
