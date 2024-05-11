import { useState } from "react";

export default function SearchBar({ onSubmit, setQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from submitting normally
    setQuery(inputValue); // Update the query state in App component
    onSubmit(); // Trigger the search
  };

  return (
   <header>
    <form onSubmit={handleSubmit} className="search-box">
        <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleInputChange}
        />
        <button type="submit">🔍</button> 
    </form>
</header>
  );
}
