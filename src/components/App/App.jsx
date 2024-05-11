import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
   const [loaderClass, setLoaderClass] = useState("visually-hidden");

const fetchArticles = useCallback(async () => {
  if (query) {
     try {
        setLoaderClass("");
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=WWP0ZkMHW4a1CGgA-GBI0FrCCywjnB3L6d04IFuYIlk&query=${query}`
      );
      // Directly use response.data.results for the array of photos
      if (response.data && response.data.results) {
        setArticles(response.data.results);
        setLoaderClass("visually-hidden")
      } else {
        console.error('API response does not contain results data');
        setArticles([]); // Set to an empty array if results data is not available
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]); // Set to an empty array in case of an error
    }
  }
}, [query]); // Include query in the dependency array


  useEffect(() => {
    // Call fetchArticles when the component mounts or query changes
    fetchArticles();
  }, [fetchArticles]); // Include fetchArticles in the dependency array

  return (
    <div>
        <SearchBar onSubmit={fetchArticles} setQuery={setQuery} />
        {articles.length > 0 && <ImageGallery articles={articles} />}
        <Loader loaderClass={loaderClass} />
    </div>
  );
}

export default App;
