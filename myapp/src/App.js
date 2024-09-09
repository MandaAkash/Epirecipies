import {useState,useEffect} from 'react'
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size of 10
  const [totalResults, setTotalResults] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState({
    calories: false,
    rating: false,
  });

  // Fetch data from the backend
  const fetchRecipes = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append('q', searchTerm);
    if (minCalories) queryParams.append('min_calories', minCalories);
    if (maxCalories) queryParams.append('max_calories', maxCalories);
    if (minRating) queryParams.append('min_rating', minRating);
    if (maxRating) queryParams.append('max_rating', maxRating);
    queryParams.append('page', page);
    queryParams.append('size', pageSize);

    try {
      const response = await fetch(`http://localhost:5000/search?${queryParams.toString()}`);
      const data = await response.json();
      setRecipes(data);
      setTotalResults(data.length); // Update totalResults to control pagination
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 when applying new search/filters
    fetchRecipes();
  };

  const handleNextPage = () => {
    if (totalResults >= pageSize) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar for Filters */}
      <div style={{ flex: '1', padding: '20px', borderRight: '2px solid #ddd', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Filters</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Calories Filter */}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              id="filterCalories"
              checked={filtersVisible.calories}
              onChange={() => setFiltersVisible({ ...filtersVisible, calories: !filtersVisible.calories })}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="filterCalories">Calories</label>
          </div>
          {filtersVisible.calories && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="minCalories">Min Calories:</label>
                <input
                  type="number"
                  id="minCalories"
                  value={minCalories}
                  onChange={(e) => setMinCalories(e.target.value)}
                  placeholder="0"
                  style={{ marginLeft: '10px', padding: '5px', width: '90%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="maxCalories">Max Calories:</label>
                <input
                  type="number"
                  id="maxCalories"
                  value={maxCalories}
                  onChange={(e) => setMaxCalories(e.target.value)}
                  placeholder="1000"
                  style={{ marginLeft: '10px', padding: '5px', width: '90%' }}
                />
              </div>
            </>
          )}
          {/* Rating Filter */}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              id="filterRating"
              checked={filtersVisible.rating}
              onChange={() => setFiltersVisible({ ...filtersVisible, rating: !filtersVisible.rating })}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="filterRating">Rating</label>
          </div>
          {filtersVisible.rating && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="minRating">Min Rating:</label>
                <input
                  type="number"
                  id="minRating"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  placeholder="0"
                  style={{ marginLeft: '10px', padding: '5px', width: '90%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="maxRating">Max Rating:</label>
                <input
                  type="number"
                  id="maxRating"
                  value={maxRating}
                  onChange={(e) => setMaxRating(e.target.value)}
                  placeholder="5"
                  style={{ marginLeft: '10px', padding: '5px', width: '90%' }}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: '3', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>EpiRecipes</h1>

        {/* Search bar in the center */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Recipes"
            style={{
              width: '300px',
              padding: '10px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          >
            Search
          </button>
        </form>

        {/* Display loading message */}
        {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading...</p>}

        {/* Display filtered recipes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h2 style={{ fontSize: '1rem', marginBottom: '10px' }}>{recipe._source.title}</h2>
                <p style={{"fontSize":"12px"}}>{recipe._source.directions}</p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Calories:</strong> {recipe._source.calories}
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Rating:</strong> {recipe._source.rating}
                </p>
              </div>
            ))
          ) : (
            !loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No recipes found. Try adjusting your filters.</p>
          )}
        </div>

        {/* Pagination buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              backgroundColor: page === 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              marginRight: '10px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={totalResults < pageSize}
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              backgroundColor: totalResults < pageSize ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              cursor: totalResults < pageSize ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;