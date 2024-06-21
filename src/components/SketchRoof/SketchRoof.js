
import React from 'react'
import sketcheroof_img_1 from '../../assets/Pro-3.jpg';
import sketcheroof_img_2 from '../../assets/Pro-2.jpg';
 import sketcheroof_img_3 from '../../assets/Pro-4.jpg';
import sketcheroof_img_4 from '../../assets/Roof-1.PNG';
 import sketcheroof_img_5 from '../../assets/New-2.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './SketchRoof.css';
import ServiceNavbar from '../ServicesNavbar/ServicesNavbar';

const SketchRoof = ({ setPlayState }) => {
    return (
        <div>
           
        <div>
       <ServiceNavbar/>
            <div className='about'>
                <div className="about-right">
                    <h2>Xactimate Roof Sketches</h2>
                    <p>Leveraging the robust capabilities of
                        Xactimate, we create detailed roof
                        sketches that adhere to industry standards.
                        Whether you need measurements for slopes, dimensions,
                        or surface areas, our Xactimate specialists ensure</p>

                </div>
                <div className="about-left">
                    <img src={sketcheroof_img_1} alt="" className='about-img' />
                </div>
            </div>

            <div className='about'>
                <div className="about-left">
                    <img src={sketcheroof_img_2} alt="" className='about-img' />
                </div>
                <div className="about-right">
                    <h2>Symbility Roof Sketches</h2>
                    <p>Our experts are proficient in utilizing Symbility's
                        intuitive platform to generate comprehensive roof
                        sketches. With Symbility, we provide customized
                        diagrams with precise measurements and annotations,
                        tailored to your specific project requirements.</p>

                </div>
            </div>

            <div className='about'>
                <div className="about-right">
                    <h2>Applicad Roof Sketches</h2>
                    <p>Applicad offers powerful tools for roof
                        modeling and measurement, and our team maximizes its capabilities
                        to deliver accurate and detailed sketches.
                        From basic outlines to complex diagrams,
                        our Applicad specialists create sketches
                        that meet your exact specifications.</p>

                </div>
                <div className="about-left">
                    <img src={sketcheroof_img_3} alt="" className='about-img' />
                </div>
            </div>

            <div className='about'>
                <div className="about-left">
                    <img src={sketcheroof_img_4} alt="" className='about-img' />
                </div>
                <div className="about-right">
                    <h2>Customized Solutions</h2>
                    <p>We understand that every project is unique,
                        which is why we offer customized solutions to meet your specific needs.
                        Whether you require a basic roof outline or a
                        detailed diagram with annotations, we tailor
                        our sketches to fit your project requirements seamlessly.</p>

                </div>
            </div>

            <div className='about'>
                <div className="about-right">
                    <h2>Professional Support</h2>
                    <p> Our dedicated team provides professional support 
                        throughout the process. Whether you have questions 
                        about the software platforms, need assistance with 
                        a specific project, or require guidance on interpreting 
                        the sketches, we're here to help every step of the way.</p>

                </div>
                <div className="about-left">
                    <img src={sketcheroof_img_5} alt="" className='about-img' />
                </div>
            </div>
         <p> Our Roof Sketch Services, where we bring together 
            the power of industry-leading software platforms – Xactimate, Symbility, and Applicad – 
            to provide you with precise, detailed, and customized roof sketches. 
            Our team specializes in utilizing these advanced tools to deliver 
            accurate measurements and comprehensive diagrams for contractors, insurance professionals, and homeowners.</p> <br/>
          <p>The Nature of work is to calculate pitch of a particular aerial
            image with pitch scale or using an option available in application,
             using Top view and 360-degree view will construct the roof as per the client requirement. We have used line
             types like Rake, Eave, Hip, Valley, Ridge, Step flashing etc.
              We have worked on both 2D and 3D drawings with the help of 
              appropriate software in similar manner.</p>
              <br/>

     


            <Footer />
        </div>
      
        </div>
    )
}

export default SketchRoof;
