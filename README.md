# Epirecipes Project

## Project Description
Epirecipes is a comprehensive recipe search and filter application designed to handle large datasets of recipe information. Utilizing OpenSearch for efficient data ingestion and Flask for backend operations, the project allows users to search for recipes based on specific criteria such as calories, rating, and other parameters. The application also features pagination to manage large volumes of data and displays relevant recipes dynamically.

### Objectives
- Efficiently manage and display large recipe datasets.
- Provide search functionality for finding recipes by name or keywords.
- Enable users to filter recipes by:
  - Minimum and maximum calories.
  - Minimum and maximum ratings.
- Implement pagination to display a manageable number of recipes per page.

## Setup and Installation Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- Python 3.8+
- Flask
- OpenSearch
- A web browser (for accessing the frontend)

### Step-by-Step Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/epirecipes.git
   cd epirecipes
   ```

2. **Set up a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up OpenSearch:**
   - Install and configure OpenSearch on your local machine or server. You can find installation instructions [here](https://opensearch.org/docs/latest/opensearch/install/).
   - Ingest your recipe JSON data into OpenSearch. For example:
     ```bash
     curl -XPOST "http://localhost:9200/recipes/_bulk" -H "Content-Type: application/json" --data-binary @path-to-json-file.json
     ```

5. **Configure your Flask environment:**
   - Update the Flask environment variables in `config.py` (if needed).
   - Set up the connection to OpenSearch in your backend code.

6. **Run the Flask application:**
   ```bash
   flask run
   ```
   The app should now be accessible at `http://localhost:5000`.

### OpenSearch and Data Ingestion
- Ensure that the large dataset is properly indexed in OpenSearch for efficient querying.
- Use the `minCalories`, `maxCalories`, `minRating`, and `maxRating` fields for filtering within the dataset.

## Usage Guidelines

1. **Searching for Recipes:**
   - Enter keywords into the search bar to find recipes by name or description.
   
2. **Using Filters:**
   - Use the provided filters to narrow down search results based on calorie count and rating:
     - `minCalories`: Enter a minimum calorie value.
     - `maxCalories`: Enter a maximum calorie value.
     - `minRating`: Enter a minimum rating value.
     - `maxRating`: Enter a maximum rating value.

3. **Pagination:**
   - Navigate between pages using the pagination controls to browse through the recipe dataset.

## Technologies and Frameworks Used

- **Backend:**
  - Flask: For handling server-side operations.
  - OpenSearch: For indexing and searching large datasets efficiently.
  
- **Frontend:**
  - HTML/CSS: Basic structure and styling for the user interface.
  - JavaScript: Handles interactivity and AJAX calls to the Flask API for dynamic search and filter functionality.

## Demo

Check out the demo video on YouTube: https://www.youtube.com/watch?v=vrcpRKRphBY
