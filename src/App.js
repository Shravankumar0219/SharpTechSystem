import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // Import Navigate
import HomePage from './components/HomePage/HomePage';
import Forms from './components/Forms/Forms';
import EmployeeSearch from "./implements/EmployeeSearch/EmployeeSearch";
import DisplayLogin from './implements/DisplayLogin/DisplayLogin';
import Login from './implements/Login/Login';
// import Signup from "./implements/Signup/Signup";
import Register from "./implements/Register/Register"
// import About from './components/About/About';
import "./App.css";
import Programs from './components/Programs/Programs';
import TitleSearch from './components/TitleSearch/TitleSearch';
import SketchRoof from './components/SketchRoof/SketchRoof';
import SoftwareServices from './components/SoftwareServices/SoftwareServices';
import DisplayAll from './implements/DisplayAll/DisplayAll';
import { AuthProvider } from './implements/AuthContext/AuthContext';
// import UserService from './implements/UserService/UserService';
import UpdateUser from './implements/UpdateUser/UpdateUser';

import EtServices from './Reports/EtServicesReports/EtServices/EtServices';
import EtSearchAddress from './Reports/EtServicesReports/EtSearchAddress/EtSearchAddress';
import EtServiceDisplay from './Reports/EtServicesReports/EtServiceDisplay/EtServiceDisplay';
import EtOrderSearch from './Reports/EtServicesReports/EtOrderSearch/EtOrderSearch';
import DasAddressSearch from './Reports/DiscoverAbstractServicesReports/DasAddressSearch/DasAddressSearch';
import DasDisplay from './Reports/DiscoverAbstractServicesReports/DasDisplay/DasDisplay';
import DasOrderSearch from './Reports/DiscoverAbstractServicesReports/DasOrderSearch/DasOrderSearch';
import DasReport from './Reports/DiscoverAbstractServicesReports/DasReport/DasReport';
import ForgetPassword from './implements/ForgetPassowrd/ForgetPassword';
import ResetPassword from './implements/ResetPassword/ResetPassword';
import Pagination from './implements/Pagination/Pagination';
import EmployeeDetail from './implements/EmployeeDetail/EmployeeDetail';
import ProtectedRoute from './implements/Logic/ProtectedRoute';
import PublicRoute from './implements/Logic/PublicRoute';
import VerifyLogin from './implements/Login/VerifyLogin';


function App() {
  const [playState, setPlayState] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="container">


            {/* Workin fine */}
            {/* reddy dfdfdf */}

            {/* These are the routes are public route any one can access directly */}
            <Routes>
              <Route path="/" element={<HomePage playState={playState} setPlayState={setPlayState} />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/SketchRoof" element={<SketchRoof />} />
              <Route path="/TitleSearch" element={<TitleSearch />} />
              <Route path="/Programs" element={<Programs />} />
             
        
              <Route path="/ForgetPassword" element={<ForgetPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
              <Route path="/SoftwareServices" element={<SoftwareServices />} />
              <Route path="/AuthProvider" element={<AuthProvider />} />

              <Route path="/VerifyLogin" element={<VerifyLogin />} />



              
              {/* This route will access by only admin  with the help of ProtectedRoute in Logic folder  */}
              <Route element={<ProtectedRoute role="ADMIN" redirectTo="/" />}>
                <Route path="/Register" element={<Register />} />
                <Route path="/DisplayALL" element={<DisplayAll />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/Pagination" element={<Pagination />} />
                <Route path="/EmployeeSearch" element={<EmployeeSearch />} />
                <Route path="/EmployeeDetail" element={<EmployeeDetail />} />
              </Route>

               {/* This route will access only with the unauthitcatid only with help of PublicRoute in Logic folder  */}
              <Route element={<PublicRoute redirectTo="/" />}>
                <Route path="/Login" element={<Login />} />
              </Route>

              {/* This route will access with both admin and Employee with the help of ProtectedRoute in Loginc folder  */}
              <Route element={<ProtectedRoute redirectTo="/" />}>
                <Route path="/EtServices" element={<EtServices />} />
                <Route path="/EtSearchAddress" element={<EtSearchAddress />} />
                <Route path="/EtServiceDisplay/:orderNumber" element={<EtServiceDisplay />} />
                <Route path="/EtOrderSearch" element={<EtOrderSearch />} />
                <Route path="/DisplayLogin" element={<DisplayLogin />} />
                <Route path="/DasAddressSearch" element={<DasAddressSearch />} />
                <Route path="/DasDisplay/:orderNumber" element={<DasDisplay />} />
                <Route path="/DasOrderSearch" element={<DasOrderSearch />} />
                <Route path="/DasReport" element={<DasReport />} />
              </Route>
              

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
