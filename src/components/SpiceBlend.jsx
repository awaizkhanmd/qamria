import React, { useState, useEffect } from 'react';
import './SpiceBlend.css';
import RightArrowSVG from '../assests/reshot-icon-button-arrow-left-3H2G5MRPSQ.svg'; // Update path as needed
import LeftArrowSVG from '../assests/reshot-icon-button-arrow-right-W9BZ38CUD2.svg'; // Update path as needed
// Import images
import coffeeBeansImage from '../assests/spices/AdobeStock_192203376-2-01.jpg';
import qishrImage from '../assests/spices/AdobeStock_192731803.jpeg';
import cardamomImage from '../assests/spices/AdobeStock_68592144.jpeg';
import cinnamonImage from '../assests/spices/AdobeStock_92142686.jpeg';
import cloveImage from '../assests/spices/Qamaria+coffee-756-1.jpg';

const spices = [
    {
      name: 'Coffee',
      description: 'Traditionally an even light roast.',
      image: coffeeBeansImage
    },
    {
      name: 'Qishr',
      description: 'A Yemeni favorite.',
      image: qishrImage
    },
    {
      name: 'Cardamom',
      description: 'Earthy tones to remember.',
      image: cardamomImage
    },
    {
      name: 'Cinnamon',
      description: 'The right touch of spice.',
      image: cinnamonImage
    },
    {
      name: 'Clove',
      description: 'A signature addition.',
      image: cloveImage
    },
  ];


  function SpiceBlend() {
    const [currentSpiceIndex, setCurrentSpiceIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  
    const getNextSpiceIndex = () => setCurrentSpiceIndex((current) => (current + 1) % spices.length);
    const getPrevSpiceIndex = () => setCurrentSpiceIndex((current) => (current - 1 + spices.length) % spices.length);
  
    // Adjust to listen for resize events
    return (
        <div className="spice-blend-container">
          <h1>The Yemeni Difference.</h1>
          <p>Yemeni coffee blends offer a unique combination of spices and herbs.</p>
          {/* Conditional rendering for mobile navigation arrows */}
          {isMobile && (
            <img src={LeftArrowSVG} alt="Previous" className="arrow left-arrow" onClick={getPrevSpiceIndex} />
          )}
          <div className="spice-items">
            {/* Conditionally render based on isMobile */}
            {isMobile ? (
              // For mobile, keep showing one item at a time
              <div className="spice-item active">
                <img src={spices[currentSpiceIndex].image} alt={spices[currentSpiceIndex].name} className="spice-image" />
                <h2>{spices[currentSpiceIndex].name}</h2>
                <p>{spices[currentSpiceIndex].description}</p>
              </div>
            ) : (
              // For desktop, map through all spices and display them
              spices.map((spice, index) => (
                <div key={index} className="spice-item">
                  <img src={spice.image} alt={spice.name} className="spice-image" />
                  <h2>{spice.name}</h2>
                  <p>{spice.description}</p>
                </div>
              ))
            )}
          </div>
          {isMobile && (
            <img src={RightArrowSVG} alt="Next" className="arrow right-arrow" onClick={getNextSpiceIndex} />
          )}
        </div>
      );
    }
    
    export default SpiceBlend;