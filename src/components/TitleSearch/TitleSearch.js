import React from 'react';
import './TitleSearch.css';
import titlesearch_img_1 from '../../assets/TitleImg-1.png';
import titlesearch_img_2 from '../../assets/ServicesImg.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ServiceNavbar from '../ServicesNavbar/ServicesNavbar';

const TitleSearch = ({ setPlayState }) => {
  return (
    <div>
     <ServiceNavbar/>
      <div className='about'>
        <div className="about-right">
          <h2>Title Search Services:</h2>
          <p>As an industry leader with expertise in performing 
            title search with close to 20+ years of experience
             and well educated experienced underwriters.
              Sharptech Systems supports Major clients 
              for performing Title Search services.
               Below are the services supported by  Sharptech Systems:</p>
          <ul>
     

            <li><i className="fa fa-check"></i> Legal and Vesting Deed/LOV Report</li>
            <li><i className="fa fa-check"></i> Owner and Encumbrance Report</li>
            <li><i className="fa fa-check"></i> Current Owner Search</li>
            <li><i className="fa fa-check"></i> Two Owner Search</li>
            <li><i className="fa fa-check"></i> Chain of Title Search</li>
            <li><i className="fa fa-check"></i> 10-20-30-60 Year Search</li>
            <li><i className="fa fa-check"></i> Purchase Money Mortgage Search</li>
            <li><i className="fa fa-check"></i> Full Search</li>
            <li><i className="fa fa-check"></i> Closing Update</li>
            <li><i className="fa fa-check"></i> Document Retrieval Services</li>
            <li><i className="fa fa-check"></i> Judgment and Lien Search</li>
          </ul>
        </div>
        <div className="about-left">
          <img src={titlesearch_img_1} alt="" className='about-img' />
        </div>
      </div>

      <div className='about'>
        <div className="about-left">
          <img src={titlesearch_img_2} alt="" className='about-img' />
        </div>
        <div className="about-right">
          <h2>Abstracting Services</h2>
          <p>At Sharp Tech Systems, our commitment to excellence shines through 
            in our unparalleled search reports, distinguished by their superior
            quality and swift delivery. Renowned for our unbeatable turnaround 
            times and competitive pricing, we prioritize client satisfaction by
             offering round-the-clock support via both email and voice channels, 
             ensuring a seamless and efficient experience.</p>
          <ul>
            <li><i className="fa fa-check"></i> Highest quality search reports</li>
            <li><i className="fa fa-check"></i> Unbeatable turnaround time</li>
            <li><i className="fa fa-check"></i> Lowest Cost</li>
            <li><i className="fa fa-check"></i> 24/7 Email and voice support</li>
          </ul>
        </div>
      </div>
     <p> Our title search services encompass a comprehensive approach, beginning with a thorough
       investigation into the property ownership history. We meticulously examine relevant legal
        documents, including deeds and mortgages, to ensure accuracy and completeness. Our process 
        includes a detailed eye view, verifying property encumbrances, liens, and easements, while
         also identifying potential title defects or discrepancies. With a steadfast commitment to 
         compliance with industry regulations and standards, 
      our dedicated team of professionals brings together expertise in 
      title research and analysis, ensuring a robust and reliable service tailored to meet our clients' needs.</p>
      <br/>
      <Footer/>
    </div>
  )
}

export default TitleSearch;
