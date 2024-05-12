import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';


function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); // State to keep track of the current page
  const [loaderClass, setLoaderClass] = useState("visually-hidden");
  const [errorMsgClass, setErrorMsgClass] = useState("visually-hidden");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
    
  const fetchImages = useCallback(async (page = 1) => {
    if (query) {
      try {
        setLoaderClass("");
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=WWP0ZkMHW4a1CGgA-GBI0FrCCywjnB3L6d04IFuYIlk&query=${query}&page=${page}`
        );
        if (response.data && response.data.results) {
          const newImages = response.data.results;
          if (page === 1) {
            setImages(newImages);
          } else {
            setImages(prevImages => {
              const existingIds = new Set(prevImages.map(img => img.id));
              const filteredNewImages = newImages.filter(img =>!existingIds.has(img.id));
              return [...prevImages,...filteredNewImages];
            });
          }
          setLoaderClass("visually-hidden");
          setErrorMsgClass("visually-hidden");
        } else {
          console.error('API response does not contain results data');
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]);
        setErrorMsgClass("");
      }
    }
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const loadMore = () => {
  setPage((prevPage) => {
    const newPage = prevPage + 1;
    fetchImages(newPage); 
    return newPage;
  });
};
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    
  const resetImages = () => {
    setImages([]);
    setPage(1); // Reset the page number as well
  };
  
  // Update this function to handle the new inputValue from SearchBar
  const handleSearchSubmit = (inputValue) => {
    setQuery(inputValue);
    resetImages(); // Reset images and page before fetching new images
    fetchImages(1); // Fetch images for the new query
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          selectedImage={selectedImage}
          onRequestClose={closeModal}
        />
      )}
      {images.length > 0 && <LoadMoreBtn loadMore={loadMore} />}
      <ErrorMessage errorMsgClass={errorMsgClass} />
      <Loader loaderClass={loaderClass} />
    </div>
  );
}

export default App;