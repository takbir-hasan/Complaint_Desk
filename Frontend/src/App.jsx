import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Check from './pages/Check';
import Write from './pages/Write';
import Home from './pages/Home';
import Complaint from './pages/Complaint';
import Donation from './pages/Donation';
import Signup from './pages/signup';
import Login from './pages/login';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback';
import FeedbackSuccess from './pages/FeedbackSuccess';
import TeacherProfile from './pages/TeacherProfile';
import CommitteDashboard from './pages/CommitteDashboard';
import ChairmanDashboard from './pages/ChairmanDashboard';
import DonationDone from './pages/DonationDone.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Verification from './pages/Verification.jsx';
import Reset from './pages/Reset.jsx';
import Forget from './pages/Forget.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import StudentRegister from './pages/StudentRegister.jsx';
import StudentVerification from './pages/StudentVerification.jsx';
import StudentForgotPass from './pages/StudentForgotPass.jsx';
import StudentResetPass from './pages/StudentResetPass.jsx';
import StudentProfile from './pages/StudentProfile.jsx';
import StudentList from './pages/StudentList.jsx';
import Team from './pages/ContactUs.jsx';


function App() {
  const isLoggedIn = localStorage.getItem('email') ? true : false;
  const status = localStorage.getItem('status') ? true : false;
  const token = localStorage.getItem('complaintToken') ? true : false;
  const isAuthentic = localStorage.getItem('name') ? true : false;
  const isAssigned = localStorage.getItem('assignedPosition') ;
  const chairman = isAssigned === "Chairman" ? true : false;
  const committee = isAssigned === "Committee" ? true : false;
  const login  = localStorage.getItem('login') ? true : false;

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
        <Route path="/write" element={login ? <Write />: <Navigate to="/" replace />} />
        <Route path="/complaint" element={token ? <Complaint /> : <Navigate to="/write" replace />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedbackSuccess" element={<FeedbackSuccess />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={ !status ? <Login/> : <Navigate to="/TeacherProfile" replace />} />  
        <Route path="/AdminLogin" element={ !isLoggedIn ? <AdminLogin/> : <Navigate to="/AdminDashboard" replace />} />
        <Route path="/AdminProfile" element={isLoggedIn ? <AdminProfile/> : <Navigate to="/AdminLogin" replace />} />
        <Route path="/AdminDashboard" element={isLoggedIn ? <AdminDashboard/> : <Navigate to="/AdminLogin" replace />} />
        <Route path="/TeacherProfile" element={status ? <TeacherProfile/> :  <Navigate to="/Login" replace />} />
        <Route path="/CommitteDashboard" element={committee ? <CommitteDashboard/> :  <Navigate to="/Login" replace />} />
        <Route path="/ChairmanDashboard" element={chairman || committee ? <ChairmanDashboard/> :  <Navigate to="/Login" replace />} />
        <Route path="/done/:condition" element={<DonationDone/>} />
        <Route path="/fail/:transactionId" element={<DonationDone/>} />
        <Route path="/forgetpassword" element={ <ForgetPassword/> } />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/verification" element={isAuthentic ? <Verification/> : <Navigate to="/Login" replace />} />
        <Route path="/resetPass/:token" element={<Reset/>} />
        <Route path="/forget" element={<Forget/>} />
        <Route path="/TeacherPage" element={chairman ? <TeacherPage/> :  <Navigate to="/Login" replace />} />
        <Route path="/slogin" element={!login ? <StudentLogin/>:  <Navigate to="/StudentProfile" replace />} />
        <Route path="/ssignup" element={<StudentRegister/>} />
        <Route path="/sverification"  element={isAuthentic ? <StudentVerification/> : <Navigate to="/slogin" replace />} />
        <Route path="/sforgotpass" element={ <StudentForgotPass/> } />
        <Route path="/sresetPass/:token" element={<StudentResetPass/>} />
        <Route path="/StudentProfile" element={login ? <StudentProfile/> : <Navigate to="/slogin" replace />} />
        <Route path="/StudentList" element={chairman ? <StudentList/> :  <Navigate to="/Login" replace />} />
        <Route path="/contact" element={<Team/>} />

     

        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App