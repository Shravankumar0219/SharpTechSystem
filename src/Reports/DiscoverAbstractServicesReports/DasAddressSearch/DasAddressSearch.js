import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DasAddressSearch.css'; // Ensure you have the CSS file for styling

const loadCSS = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS file: ${href}`));
    document.head.appendChild(link);
  });
};

function DasAddressSearch() {
  const [partialAddress, setPartialAddress] = useState(''); // Ensure it's always initialized as a string
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Font Awesome CSS
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css')
      .then(() => console.log('Font Awesome CSS loaded successfully'))
      .catch((error) => console.error('Error loading Font Awesome CSS:', error));
    
    const fetchSuggestions = async () => {
      if (typeof partialAddress === 'string' && partialAddress.length > 2) { // Add guard clause
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/search/${partialAddress}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [partialAddress]);

  const handleAddressChange = (event) => {
    setPartialAddress(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (selectedAddress) {
      navigate(`/DasDisplay/${selectedAddress.orderNumber}`);
    } else {
      alert('Please select an address');
    }
  };

  return (
    <div className="address-search-container">
      <h1 className="address-search-heading">Address Search</h1>
      <form className="address-search-form" onSubmit={handleSubmit}>
        <div className="address-search-input-wrapper">
          <i className="fas fa-search address-search-icon"></i>
          <input
            className="address-search-input"
            type="text"
            placeholder="Search Address"
            value={partialAddress}
            onChange={handleAddressChange}
          />
          {suggestions.length > 0 && (
            <div className="address-search-suggestions">
              {suggestions.map((address, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSelectedAddress(address);
                    setPartialAddress(address.address);
                    setSuggestions([]);
                  }}
                >
                  {address.address} (Order Number: {address.orderNumber})
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="address-search-submit-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default DasAddressSearch;
