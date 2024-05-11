import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ articles }) {
  return (
    <ul>
      {articles.map((article) => (
        <ImageCard
          key={article.id}
          imageUrl={article.urls.small}
          altText={article.description || 'Image description not available'}
        />
      ))}
    </ul>
  );
}



