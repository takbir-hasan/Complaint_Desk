import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Check from './pages/Check';
import Write from './pages/Write';
import Home from './pages/Home';
import Complaint from './pages/Complaint';
import Donation from './pages/Donation';

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
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App