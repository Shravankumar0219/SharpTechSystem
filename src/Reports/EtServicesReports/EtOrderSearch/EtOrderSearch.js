import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./EtOrderSearch.css";
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';  // Or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';


function EtOrderSearch() {
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
            const result = await axios.get(`http://localhost:8080/display/${orderNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEtService(result.data);
            window.alert("Data Fetch Successfully");
            navigate(`/EtServiceDisplay/${orderNumber}`);
            setError(null); // Clear previous error if any
        } catch (error) {
            setEtService(null); // Clear user data
            setError("Error fetching user data"); // Set error message
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="et-service-order-search-container">
            <form className='et-service-order-search-form' onSubmit={handleSubmit}>
                <h2> ET Service Order Number</h2>
                <div>
                    <label className='et-service-order-search-label'>Order Number:</label>
                    <input className='et-service-order-search-label-input' type="text" value={orderNumber} onChange={handleChange} required />

                    {/* <FloatLabel>
                        <InputText className='et-service-order-search-label-input' id="username" value={orderNumber} onChange={handleChange} required />
                        <label  className='et-service-order-search-label'for="username">Order Number <br/> </label>
                        <br/>
                    </FloatLabel> */}
                </div>
                <Button className="et-service-order-search-button" label="Search&nbsp;" icon="pi pi-check" loading={loading} type="&nbsp;submit" />
                {error && <p>{error}</p>}
            </form>
        </div>
        <Footer/>
        </div>
    );
}

export default EtOrderSearch;
