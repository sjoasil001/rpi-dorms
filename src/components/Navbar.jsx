import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/DORMS.svg"; // Import the logo image
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="RPI Dorms Logo" />
      </div>

      {/* Upload Button */}
      <div className="navbar-upload">
        <input type="file" id="fileUpload" className="hidden" />
        <label htmlFor="fileUpload" className="upload-button">
          Upload
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
