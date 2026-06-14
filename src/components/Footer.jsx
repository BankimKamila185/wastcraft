import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="WasteCraft Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">
              Transforming the world's plastic waste into the durable construction materials of tomorrow.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="Instagram">IG</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/solutions">Our Solutions</Link>
          </div>
          
          <div className="footer-links">
            <h3>Products</h3>
            <Link to="/product/roof-tile">Recycled Roof Tile</Link>
            <a href="#">Eco-Bricks (Coming Soon)</a>
            <a href="#">Road Materials (Coming Soon)</a>
          </div>
          
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>hello@wastecraft.in</p>
            <p>+91 80 4567 8901</p>
            <p>Bengaluru, India</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} WasteCraft. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
