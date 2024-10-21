import { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if search is ongoing

  const fetchData = (value) => {
    setIsSearching(true); // Set searching state to true

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        setIsSearching(false); 
      })
      .catch(() => setIsSearching(false));
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSearchClick = () => {
    fetchData(input); 
  };

  const handleVoiceClick = () => {
    alert("Voice search activated!");
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="icon-wrapper">
        <button className="icon-button" onClick={handleSearchClick}>
          <FaSearch id="search-icon" />
        </button>
        <button className="icon-button" onClick={handleVoiceClick}>
          <FaMicrophone id="voice-icon" />
        </button>
      </div>
      {isSearching && <p className="searching-message">Finding...</p>} {/* Display message when searching */}
    </div>
  );
};
