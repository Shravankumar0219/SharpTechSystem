

import React from 'react'
import './Programs.css'
import pro_1 from '../../assets/Pro-1.jpg'
import pro_2 from '../../assets/Pro-2.jpg'
import pro_4 from '../../assets/Pro-4.jpg'
// import program_icon_1 from '../../assets/program-icon-1.png'
// import program_icon_2 from '../../assets/program-icon-2.png'
// import program_icon_3 from '../../assets/program-icon-3.png'
import { Link } from 'react-router-dom'

const Programs = () => {
  return (
    <div>
      <p className='programs-container-text'><li><i className="fa fa-check"></i>Specializing in development of software front-end
        applications and back-end applications, providing assistance
        in completing the assigned projects. We have well trained and
        experience Technical Trainers who supports and provides training
        and provide assistance in building project. </li>  </p>
        <br/>
      <p className='programs-container-text'><li><i className="fa fa-check"></i>Meticulous examination of property ownership history
        and legal documents for clear and accurate reports. </li>  </p>
      <br/>
      <p className='programs-container-text'><li><i className="fa fa-check"></i>Precise measurements and detailed drawings
        for effective planning and visualization. </li>  </p>
        <br/>
      <div className='programs'>
        <div className="program"><br />
          <Link to='/SoftwareServices' className='program-link'>
            <p><strong className=' program-headings'>Software Development</strong></p><br />
            <img src={pro_1} alt="" />
            <div className="caption">
              {/* <img src={program_icon_1} alt="" /> */}
              <p>	click here to know more  </p>
            </div>
          </Link>
        </div>

        <div className="program"><br />
          <Link to='/TitleSearch' className='program-link'>

            <p className='program-headings' ><strong>Title Search</strong></p><br />
            <img src={pro_4} alt="" />

            <div className="caption">

              {/*  <img src={program_icon_2} alt="" />*/}
              <p>	click here to know more  </p>
            </div>
          </Link>
        </div>
        <div className="program"><br />
          <Link to='/SketchRoof' className='program-link'>

            <p><strong>Roof Sketches</strong></p><br />
            <img src={pro_2} alt="" />
            <div className="caption">
              {/*<img src={program_icon_3} alt="" />*/}
              <p>	click here to know more  </p>

            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Programs