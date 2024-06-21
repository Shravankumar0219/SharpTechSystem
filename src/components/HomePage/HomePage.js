import React from 'react';
import Title from '../Title/Title';
import About from '../About/About';
import Carousel from "../Carousel/Carousel";
import Programs from '../Programs/Programs';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { countries } from "../Carousel/Data";
import Navbar from '../Navbar/Navbar';
import "./HomePage.css"


function HomePage({ playState, setPlayState }) {
  return (

    <div className='home-home'>

      <Navbar />
      <div className="moving-title">
        <h2 className="animate-left">SHARP</h2>
        <h2 className="animate-up">&nbsp;TECH</h2>
        <h2 className="animate-right"> &nbsp;SYSTEMS</h2>
      </div>

      <Carousel images={countries} />
      <br />
      <br />
      <About setPlayState={setPlayState} />
      <br />
      <br />
      <Title title='Our Services ' />
      <br />
      <Programs />
      <br />
      <br />
      <Title title='Sample Reports' subTitle='' />
      <br />
      <Testimonials />
      <br />
      <Title title='Contact Us' />
      <Contact />
      <Footer />
      <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </div>

  );
}

export default HomePage;
