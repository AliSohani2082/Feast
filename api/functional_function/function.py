def ingredient_to_json(ingredient):
    return {
        "name": ingredient.name,
        "type": ingredient.type,
        "price_per_unit": ingredient.price_per_unit,
        "image": ingredient.image,
        "unit_type": ingredient.unit_type
    }
# def step_to_json(step):
#     return{
#         "amount":step.amount,
#         "instructin":step.instruction,
#         "step_number":step.number
#     }