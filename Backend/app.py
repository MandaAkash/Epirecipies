from flask import Flask, request, jsonify
from opensearchpy import OpenSearch
from flask_cors import CORS
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Configure OpenSearch client
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_compress=True
)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')  # Search term
    min_calories = request.args.get('min_calories', None)  # Min calories
    max_calories = request.args.get('max_calories', None)  # Max calories
    min_rating = request.args.get('min_rating', None)  # Min rating
    max_rating = request.args.get('max_rating', None)  # Max rating
    page = int(request.args.get('page', 1))  # Pagination page
    size = int(request.args.get('size', 10))  # Results per page

    # If no filters and no search query, return up to 1000 recipes
    if not query and not min_calories and not max_calories and not min_rating and not max_rating:
        search_query = {
            "from": (page - 1) * size,
            "size": size,
            "query": {
                "match_all": {}
            }
        }
    else:
        search_query = {
            "from": (page - 1) * size,
            "size": size,
            "query": {
                "bool": {
                    "must": [],
                    "filter": []
                }
            }
        }

        # Add search term if provided
        if query:
            search_query['query']['bool']['must'].append({"match": {"title": query}})

        # Add calorie filter if provided
        if min_calories or max_calories:
            search_query['query']['bool']['filter'].append({
                "range": {
                    "calories": {
                        "gte": int(min_calories or 0),
                        "lte": int(max_calories or 10000)
                    }
                }
            })

        # Add rating filter if provided
        if min_rating or max_rating:
            search_query['query']['bool']['filter'].append({
                "range": {
                    "rating": {
                        "gte": float(min_rating or 0),
                        "lte": float(max_rating or 5)
                    }
                }
            })

    # Execute the search query
    response = client.search(
        body=search_query,
        index="recipes"
    )

    return jsonify(response['hits']['hits'])  # Send results back to frontend

if __name__ == '__main__':
    app.run(debug=True)




