import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import 'primereact/resources/themes/saga-blue/theme.css';  // Or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from 'primereact/button';
import "./DasOrderSearch.css";


function DasOrderSearch() {

  const [orderNumber, setOrderNumber] = useState("");
  const [etservice, setEtService] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading spinner
  let navigate = useNavigate();

  const handleChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(`http://localhost:8080/fetch/${orderNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEtService(result.data);
      window.alert("Data Fetch Sucessfully")
      navigate(`/DasDisplay/${orderNumber}`);
      setError(null); // Clear previous error if any
    } catch (error) {
      setEtService(null); // Clear user data
      setError("Error fetching user data"); // Set error message
      console.error("Error fetching user data:", error);
    }finally {
            setLoading(false);
        }
  };
  return (

    <div>
      <Navbar/>
      <div className="das-order-search-container">
        <form className='das-order-search-form' onSubmit={handleSubmit}>
          <h2>Search By OrderNumber</h2>
          <div>
            <label  className='das-order-search-label'>OrderNumber:</label>
            <input className='et-service-order-search-label-input' type="orderNumber" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required />
          </div>
          {/* <button type="submit">Login</button> */}
          <Button className="das-order-search-button" label="Submit&nbsp;" icon="pi pi-check" loading={loading} type="&nbsp;submit" />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default DasOrderSearch;