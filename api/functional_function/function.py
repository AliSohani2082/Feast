import psycopg2
import pandas as pn


conn = psycopg2.connect(
    host='ep-sweet-darkness-58939442.il-central-1.aws.neon.tech',
    dbname='Feast',
    user='rezatahmasbi1381',
    password='oiNqd5ELuH7p',
    sslmode='require',
    port ='5432'
)
cursor = conn.cursor()

def ingredient_to_json(ingredient):
    return {
        "name": ingredient.name,
        "type": ingredient.type,
        "price_per_unit": ingredient.price_per_unit,
        "image": ingredient.image,
        "unit_type": ingredient.unit_type
    }


# def table():
#     cursor.exequte(f"SELECT * FROM \"Post_Like\"")
#     PL = cursor.fetchall()
#     cursor.exequte(f"SELECT * FROM \"Post\"")
#     P = cursor.fetchall()
#     cursor.exequte(f"SELECT * FROM \"User\"")
#     U = cursor.fetchall()
#
#     print(P)
#     # data = {}
#     # for i in P[0]:
#     #     data[i]