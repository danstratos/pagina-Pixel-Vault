import React, { useState } from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-bar__container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar juegos por nombre, descripción o categoría..."
          className="search-bar__input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="search-bar__clear"
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-bar__btn">
          BUSCAR
        </button>
      </div>
    </form>
  );
}
