
import React, { useEffect, useRef } from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-brand">
          <h2>Qamaria Yemeni Coffee Co.</h2>
          <p>Discover Coffee's Origin</p>
          <div className="social-links">
            {/* Icons assumed to be SVGs or font icons */}
            <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-about">
          <p>Qamaria Coffee 2024</p>
          <p>Copyright. All Rights Reserved.</p>
          <p>designed by BluPrint Studio</p>
        </div>
      </div>

      <div className="footer-row">
        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="/coffee">Coffee</a></li>
            <li><a href="/qishr">Qishr</a></li>
            <li><a href="/wholesale">Wholesale</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li><a href="/team">Our Team</a></li>
            <li><a href="/history">History</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li><a href="/contact">Reach Us</a></li>
            <li><a href="/wholesale">Wholesale</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-row">
        <div className="footer-subscribe">
          <h3>Subscribe</h3>
          <p>Sign up with your email address to receive news and updates.</p>
          <form>
            <input type="email" placeholder="Email Address" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
