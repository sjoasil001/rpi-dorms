import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Contact from './components/Contact'; 

function Home() {
  return (
    <>
      <Hero />
      <Carousel />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> {/* path from contact to page*/}
      </Routes>
    </>
  );
}

export default App;
