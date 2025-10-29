<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import Insights from './components/Insights';
import Dorms from './components/Dorms';
import UploadPage from './components/UploadPage'; 

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/dorms" element={<Dorms />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  );
}

export default App;
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import Insights from './components/Insights';
import Dorms from './components/Dorms';
import UploadPage from './components/UploadPage'; 
import Footer from './components/Footer';

function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <Footer/>
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/dorms" element={<Dorms />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  );
}

export default App;
>>>>>>> 5a630bccd0bf2f8901c0b3b4c16f6b76d2df010b
