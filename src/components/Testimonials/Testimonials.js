import React from 'react';
import './Testimonials.css';
import C_1 from '../../assets/Capture-1.PNG';
import C_2 from '../../assets/Capture-2.PNG';
import C_3 from '../../assets/Capture-3.PNG';
import C_4 from '../../assets/Capture-4.PNG';
import Title from '../Title/Title';
const Testimonials = () => {
    return (
        <div>
            <p className='programs-container-text' >Welcome to our Roof Sketch Services, where we
                bring together the power of industry-leading software platforms – Xactimate,
                Symbility, and Applicad – to provide you with precise, detailed, and customized roof sketches.
                Our team specializes in utilizing these advanced tools to deliver
                accurate measurements and comprehensive diagrams for contractors,
                insurance professionals, and homeowners. </p>

            <div className='testimonials'>
                <div className="test-column">
                    <div className="test-container">
                        <h3 className="heading-rapid">RAPID SQUARE</h3>
                        <p>Up to 20 Squares</p><br />
                        <div className="user-info">
                            <img src={C_1} alt="" />
                        </div>

                        <h3>Residential and Commercial</h3>

                        <div className='test-container-content'>
                            <p>2 Page Report</p>
                            <p>PDF 11x8.5</p>
                        </div>

                        <div className='test-container-content-a'>
                            <p>Regular orders: 12 hours</p>
                            <p>Rush orders: 3-4 hours</p>
                        </div>


                    </div>

                    <div className="test-container">
                        <h3 className="heading-rapid">SMALL</h3>
                        <p>Up to 30 Squares</p><br />
                        <div className="user-info">
                            <img src={C_2} alt="" />

                        </div>
                        <h3>Residential and Commercial</h3>
                        <div className='test-container-content'>
                            <p>5 Page Report</p>
                            <p>PDF 11x8.5</p>
                        </div>
                        <div className='test-container-content-a'>
                            <p>Regular orders: 12 hours</p>
                            <p>Rush orders: 3-4 hours</p>
                        </div>
                    </div>
                </div>
                <div className="test-column">
                    <div className="test-container">
                        <h3 className="heading-rapid">MEDIUM</h3>
                        <p>Up to 50 Squares</p><br />
                        <div className="user-info">
                            <img src={C_3} alt="" />
                        </div>
                        <h3>Residential and Commercial</h3>
                        <div className='test-container-content'>
                            <p>5 Page Report</p>
                            <p>PDF 11x8.5</p>
                        </div>
                        <div className='test-container-content-a'>
                            <p>Regular orders: 12 hours</p>
                            <p>Rush orders: 3-4 hours</p>
                        </div>

                    </div>
                    <div className="test-container">
                        <h3 className="heading-rapid">LARGE</h3>
                        <p>Up to 60 Squares</p><br />
                        <div className="user-info">
                            <img src={C_4} alt="" />

                        </div>
                        <h3>Residential and Commercial</h3>
                        <div className='test-container-content'>
                            <p>5 Page Report</p>
                            <p>PDF 11x8.5</p>
                        </div>
                        <div className='test-container-content-a'>
                            <p>Regular orders: 12 hours</p>
                            <p>Rush orders: 3-4 hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;
