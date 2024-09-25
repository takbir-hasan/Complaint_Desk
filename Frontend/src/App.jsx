import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
        <Route path="/write" element={<Write />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedbackSuccess" element={<FeedbackSuccess />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/AdminProfile" element={<AdminProfile/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/TeacherProfile" element={<TeacherProfile/>} />
        <Route path="/CommitteDashboard" element={<CommitteDashboard/>} />
        <Route path="/ChairmanDashboard" element={<ChairmanDashboard/>} />
        <Route path="/done/:condition" element={<DonationDone/>} />
        <Route path="/fail/:transactionId" element={<DonationDone/>} />
        <Route path="/adminforgetpassword" element={<ForgetPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
     

        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App