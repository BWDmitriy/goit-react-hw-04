export default function ImageCard({ imageUrl, altText, onClick }) {
  return (
    <li onClick={onClick}>
      <div>
        <img src={imageUrl} alt={altText} />
      </div>
    </li>
  );
}