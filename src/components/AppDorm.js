import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DormSelector from './rpi_dorms_draft';
import NoPictures from './DormPictures';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DormSelector />} />
        <Route path="/dorm-pictures" element={<NoPictures />} />
      </Routes>
    </Router>
  );
}

export default App;
