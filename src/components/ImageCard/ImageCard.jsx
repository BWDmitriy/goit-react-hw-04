export default function ImageCard({ imageUrl, altText, onClick }) {
  return (
    <li>
      <div>
        <img src={imageUrl} alt={altText} onClick={onClick} />
      </div>
    </li>
  );
}