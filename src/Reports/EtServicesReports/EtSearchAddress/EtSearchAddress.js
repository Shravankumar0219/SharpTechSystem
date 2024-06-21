import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner'; // Import ProgressSpinner from PrimeReact
import "./EtSearchAddress.css"
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';

function EtSearchAddress() {
    const [partialAddress, setPartialAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading spinner
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (partialAddress.length > 2) {
                try {
                    setLoading(true); // Set loading to true while fetching suggestions
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8080/partial/search/${partialAddress}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                } finally {
                    setLoading(false); // Set loading to false after fetching suggestions
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

    const handleSuggestionClick = (address) => {
        setSelectedAddress(address);
        setPartialAddress(address.address); // Update input with full address
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        setLoading(true); // Set loading to true while submitting form
        try {
            if (selectedAddress) {
                navigate(`/EtServiceDisplay/${selectedAddress.orderNumber}`);
            } else {
                alert('Please select an address');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } 
        
        finally {
            setLoading(false); // Set loading to false after form submission
        }


    };

    return (
        <div>
            <Navbar/>
        <div className="et-address-search-container">
            <form className='et-address-search-form' onSubmit={handleSubmit}>
                <h2>ET Report Address Search </h2>
                <input
                    className="et-address-search-input-field"
                    type="text"
                    placeholder="Search Address"
                    value={partialAddress}
                    onChange={handleAddressChange}
                />
                {suggestions.length > 0 && (
                    <div className="et-address-suggestions-dropdown">
                        <select className="et-address-suggestions-suggestions" onChange={(e) => handleSuggestionClick(JSON.parse(e.target.value))}>
                            <option value="">Select Address</option>
                            {suggestions.map((address, index) => (
                                <option key={address.address} value={JSON.stringify(address)}>
                                    {address.address} (Order Number: {address.orderNumber})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="et-address-search-submit-button" type="submit" disabled={loading}>
                    {loading ? <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4" /> : 'Submit'}
                </button>
            </form>
        </div>
        <Footer/>
        </div>
    );
}

export default EtSearchAddress;
