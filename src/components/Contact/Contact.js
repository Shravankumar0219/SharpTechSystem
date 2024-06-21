import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'
import india_icon from "../../assets/India-1.png"
import usa_icon from "../../assets/Usa.jpg"

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // ------Enter your web3forms access key below-------

    formData.append("access_key", "53f557bb-f7a6-462a-9118-cae24804a900");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setResult(res.message);
      event.target.reset();
    } else {
      console.log("Error", res);
      setResult(res.message);
    }
  };


  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>

        <p className='contact-page-container'> One-Stop Solution for all your Software, Title and Roof Sketch services. </p>
        <br />
        <h2>Hours of Operation:</h2>
        <br />
        <p>Monday-Friday: 7:00 AM to 7:00 PM EST.</p>
        <p>Saturday and Sunday: 7:00 AM to 12:00 PM EST.</p>
        <ul>
          <li>
            <img src={mail_icon} alt=""  className='contact-mail-icon'/>info@sharptechsystems.in
          </li>
          <li>
            <h2>Head Office: USA</h2>
          </li>
          <li>
            <a href="https://www.google.com/maps/place/21189+Dana+Ct,+Ashburn,+VA+20148,+USA/@39.0304231,-77.5320008,17z/data=!3m1!4b1!4m6!3m5!1s0x89b63e4f20456d6f:0x93d26c2cb610021f!8m2!3d39.0304231!4d-77.5320008!16s%2Fg%2F11c4t8hl0d?entry=ttu" target="_blank">
              <img src={location_icon} className="contact-location-icon" alt="" />
            </a>
            21189 Dana CT, Ashburn, VA 20148. <br />
          </li>
          <li>
            <img src={phone_icon} alt="" className="contact-mobile-icon"/><img src={usa_icon} alt="" />
            <p>: +1 (703)-880-6311</p>
          </li>
          <li>
            <h2>Work Location: BANGALORE</h2>
          </li>
          <li>
            <a href="https://www.google.com/maps/place/Sharp+Tech+Systems+Pvt+Ltd/@12.9137608,77.5874708,17.21z/data=!3m1!5s0x3bae150292359c13:0x14f8669d8dc17b54!4m6!3m5!1s0x3bae150292359585:0x65e467c9bfa38425!8m2!3d12.9151673!4d77.5872784!16s%2Fg%2F11ckvg9b92?entry=ttu" target="_blank">
              <img src={location_icon} alt="" className="contact-location-icon" />
      
            </a>                       
            55, 21st A Main Rd, R.K Colony, Marenahalli, 2nd Phase, <br /> J. P. Nagar, Bangalore, Karnataka 560078.
          </li>

          <li>
            <img src={phone_icon} alt="" className="contact-mobile-icon"/><img src={india_icon} alt="" />
            <p>: +91 080-42122295</p>
          </li>
        </ul>

      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          {/* <label>Your name</label>
            <input type="text" name='name' placeholder='Enter your name' required/> */}
          <label>Name</label>
          <input type="text" name='name' placeholder='Enter your name' required />
          <label>Email</label>
          <input type="text" name='email' placeholder='Enter your email' required />


          <label>Subject</label>
          <input type="text" name='subject' placeholder='Enter your subject' required />

          <label>Write your messages here</label>
          <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>

          <button type='submit' className='btn dark-btn'>Submit now <img src={white_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact
