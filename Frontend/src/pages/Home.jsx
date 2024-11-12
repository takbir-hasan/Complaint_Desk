import React from 'react';
import Navbar from '../components/navbar';
import Body from '../components/body';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
    <div className="flex flex-col h-screen overflow-x-hidden text-black">
        <Navbar />
        <Body/>
        <Footer/>
      </div>
    </>
  )
}

export default Home