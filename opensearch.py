from opensearchpy import OpenSearch

# Connect to OpenSearch
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}]
)

# Define index mappings
index_body = {
    "mappings": {
        "properties": {
            "title": { "type": "text" },
            "directions": { "type": "text" },
            "fat": { "type": "float" },
            "date": { "type": "date" },
            "categories": { "type": "keyword" },
            "calories": { "type": "float" },
            "protein": { "type": "float" }
        }
    }
}

# Create the 'recipes' index
response = client.indices.create(index="recipes", body=index_body)
print(response)
