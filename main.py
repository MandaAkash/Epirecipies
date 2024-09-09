

import json
# Load the original JSON data
with open('recipes.json', 'r') as f:
    recipes = json.load(f)
# Open a new file to write the bulk data
with open('bulk_recipes.json', 'w') as f:
    for i, recipe in enumerate(recipes):
        # Write the metadata line
        f.write(json.dumps({ "index": { "_index": "recipes", "_id": str(i+1) } }) + "\n")
        # Write the actual recipe data
        f.write(json.dumps(recipe) + "\n")


