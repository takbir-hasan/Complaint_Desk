import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Check from './pages/Check';
import Write from './pages/Write';
import Home from './pages/Home';
import Complaint from './pages/Complaint';
<<<<<<< HEAD
import Donation from './pages/Donation';
=======
import Signup from './pages/signup';
import Login from './pages/login';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import AdminDashboard from './pages/AdminDashboard';
>>>>>>> 4a15689c99c0ee24bd528ff6bd25301ef735daf1

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
<<<<<<< HEAD
        <Route path="/donation" element={<Donation />} />
=======
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/AdminProfile" element={<AdminProfile/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />

>>>>>>> 4a15689c99c0ee24bd528ff6bd25301ef735daf1
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App