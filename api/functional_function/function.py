import psycopg2


def ingredient_to_json(ingredient):
    return {
        "name": ingredient.name,
        "type": ingredient.type,
        "price_per_unit": ingredient.price_per_unit,
        "image": ingredient.image,
        "unit_type": ingredient.unit_type
    }

conn = psycopg2.connect(database="Feast",
                        host="localhost",
                        user="postgres",
                        password="0322262",
                        port="5432")

cursor = conn.cursor()