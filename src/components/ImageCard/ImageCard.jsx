export default function ImageCard({ imageUrl, altText }) {
  return (
    <li>
      <div>
        <img src={imageUrl} alt={altText} />
      </div>
    </li>
  );
}
