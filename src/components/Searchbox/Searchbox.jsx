export default function Searchbox({ searchQuery, setSearchQuery }) {
 const handleChange = (event) => {
    setSearchQuery(event.target.value);
 };

 return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
 );
}
