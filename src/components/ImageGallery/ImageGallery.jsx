// ImageGallery.jsx

import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image, index) => (  // Include the index here
        <ImageCard
          key={`${image.id}-${index}`}  // Use the index to ensure unique keys
          imageUrl={image.urls.small}
          altText={image.description || 'Image description not available'}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ul>
  );
}