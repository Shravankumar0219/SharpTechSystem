
import React from 'react'
import SoftwareServices_img_1 from '../../assets/New-3.jpg';
import SoftwareServices_img_2 from '../../assets/Soft-1.png';
import SoftwareServices_img_3 from '../../assets/New-1.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './SoftwareServices.css';
import ServiceNavbar from '../ServicesNavbar/ServicesNavbar';

const SoftwareServices = ({ setPlayState }) => {
    return (
        <div>

            <div>
                <ServiceNavbar />
                <div className='about'>
                    <div className="about-right">
                        <h3>Technology Service Provider for Product Development </h3>
                        <p>Sharp Tech Systems Pvt Ltd is an innovative
                            leader with more than 15 years of expertise,
                            specializing in the development of bespoke
                            software applications tailored to meet our
                            clients' specific requirements. Our dedicated
                            team is committed to providing continuous monitoring
                            of developed applications and regularly updating them
                            with new features. We ensure seamless communication with
                            our clients by notifying them of releases
                            via email and actively soliciting their
                            input to incorporate the latest developments into the software.</p>
                        <p>  <strong> • One-Stop Destination:</strong> We pride ourselves on being a one-stop destination for all your software development needs.</p>
                        <p><strong>• Solutions Tailored:</strong>  We offer a comprehensive range of solutions tailored to meet every aspect of your project requirements</p>
                        <p><strong>• Professional Team:</strong>  Our team of experienced professionals excels in delivering high-quality, customized solutions that address your unique challenges and goals.</p>
                        <p><strong>• Conceptualization to Execution:</strong> From conceptualization to execution, we work closely with our clients to ensure that every aspect of the project is handled with precision and expertise</p>


                    </div>
                    <div className="about-left">
                        <img src={SoftwareServices_img_1} alt="" className='about-img' />
                    </div>
                </div>

                <div className='about'>
                    <div className="about-left">
                        <img src={SoftwareServices_img_2} alt="" className='about-img' />
                    </div>
                    <div className="about-right">
                        <h3>Individual student Project Completion Support</h3>
                        <p>As one the major requirement for engineering
                            student is to complete the given projects
                            in timely manner before completing the semester
                            . A good project would help them to understand the
                            concept of software application like (Java, ReactJS
                            , Angular, Databases, SAP Projects, Python etc ).
                            As a software development company, we would assist students
                            with projects through a method focused on learning and understanding. </p>
                        <p> <strong>•	Project Assistance:</strong> With our comprehensive range of services and expertise stop solution to address every aspect of your project journey.</p>
                        <p><strong>•	Support:</strong> Need of guidance with project planning, execution, or completion, we've got you covered.</p>



                    </div>
                </div>

                <div className='about'>
                    <div className="about-right">
                        <h3> Software Training and Development</h3>
                        <p>Sharp Tech Systems has well trained Technical
                            and Non-Technical trainers who would help and
                            support students and corporate employees to develop
                            their skills both technically and groom themselves
                            with various personality development training programs.
                            We provide both online and offline training programs</p>
                         <p> <strong> •	Training Provided:</strong> We are experts in providing training in programming languages and software development methodologies to communication skills and leadership development</p>
<p><strong>•	Support for Professional and New comers :</strong> Whether you're a seasoned professional looking to upskill in a specific technology or a newcomer to the workforce seeking to enhance your communication abilities, we're here to support you every step of the way.</p>


                    </div>
                    <div className="about-left">
                        <img src={SoftwareServices_img_3} alt="" className='about-img' />
                    </div>
                </div>


                <Footer />
            </div>

        </div>
    )
}

export default SoftwareServices;
