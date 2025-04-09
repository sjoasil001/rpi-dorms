// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import Insights from './components/Insights';
import Dorms from './components/Dorms';

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
        <Route path="/dorms" element={<Dorms />} /> {}
      </Routes>
    </>
  );
}

export default App;
