import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure to import AOS CSS
import './HeroSection.css'; // Path to your CSS file

const HeroSection = () => {
  useEffect(() => {
    AOS.init(); // Initializes AOS
  }, []);

  return (
    <div className="hero-container">
      <h1 data-aos="fade-down" data-aos-duration="1000">Welcome to Our Coffee Shop</h1>
      <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">Discover your taste</p>
      <button data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="1000">Shop Now</button>
    </div>
  );
};

export default HeroSection;
