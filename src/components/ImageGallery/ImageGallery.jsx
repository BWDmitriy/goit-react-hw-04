import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
export default function ImageGallery({ articles, onImageClick }) {
  return (
    <ul className={styles.imageGallery}>        
      {articles.map((article) => (
        <ImageCard
          key={article.id}
          imageUrl={article.urls.small}
          altText={article.description || 'Image description not available'}
          onClick={() => onImageClick(article)}
        />
      ))}
    </ul>
  );
}


