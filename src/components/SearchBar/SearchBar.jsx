import { useState } from "react";

export default function SearchBar({ onSubmit, setQuery, resetImages }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // SearchBar.jsx

const handleSubmit = (event) => {
  event.preventDefault();
  resetImages(); // Reset images before setting new query
  setQuery(inputValue);
  onSubmit(1); // Call fetchImages with page 1
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