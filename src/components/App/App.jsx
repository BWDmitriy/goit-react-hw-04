import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Modal from 'react-modal';

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); // State to keep track of the current page
  const [loaderClass, setLoaderClass] = useState("visually-hidden");
  const [errorMsgClass, setErrorMsgClass] = useState("visually-hidden");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
   
  const fetchArticles = useCallback(async (page = 1) => {
    if (query) {
      try {
        setLoaderClass("");
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=WWP0ZkMHW4a1CGgA-GBI0FrCCywjnB3L6d04IFuYIlk&query=${query}&page=${page}`
        );
        if (response.data && response.data.results) {
          setArticles(prevArticles => [...prevArticles,...response.data.results]);
          setLoaderClass("visually-hidden");
          setErrorMsgClass("visually-hidden");
        } else {
          console.error('API response does not contain results data');
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setErrorMsgClass("");
      }
    }
  }, [query]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetchArticles(page + 1);
  };
const handleImageClick = (image) => {
  setSelectedImage(image);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
   };
   

  return (
    <div>
      <SearchBar onSubmit={fetchArticles} setQuery={setQuery} />
      {articles.length > 0 && <ImageGallery articles={articles} onImageClick={handleImageClick} />}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          selectedImage={selectedImage}
          onRequestClose={closeModal}
        />
      )}
      {articles.length > 0 && <LoadMoreBtn loadMore={loadMore} />}
      <ErrorMessage errorMsgClass={errorMsgClass} />
      <Loader loaderClass={loaderClass} />
    </div>
  );
}

export default App;
