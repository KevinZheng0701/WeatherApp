import React, { useState } from "react";
import "./Searchbar.css";
const HEREAPIKEY = import.meta.env.VITE_HERE_API_KEY;

const Searchbar = ({ updateSearch }) => {
  // Search input
  const [input, setInput] = useState("");

  // Updates the input when there is change
  const handleInput = (e) => {
    setInput(e.target.value);
    autosuggest();
  };

  // Handle the search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim().length === 0) {
      return;
    }
    // Use here geocoding to covert location to coordinates
    try {
      const response = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?q=${input}&apiKey=${HEREAPIKEY}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const { lat, lng } = data.items[0].position;
        // Callback function to update the search query
        updateSearch(lat, lng);
      } else {
        console.log("No results were found.");
      }
      setInput("");
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          id="search-input"
          value={input}
          placeholder="Search location"
          onChange={handleInput}
          required
        />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
