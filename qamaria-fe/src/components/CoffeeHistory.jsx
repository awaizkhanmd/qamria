import React, { useState, useEffect, useRef } from 'react';
import './CoffeeHistory.css';
import { ReactComponent as ArrowLeft } from '../assests/reshot-icon-button-arrow-left-3H2G5MRPSQ.svg';
import { ReactComponent as ArrowRight  } from '../assests/reshot-icon-button-arrow-right-W9BZ38CUD2.svg';
import image1 from '../assests/AdobeStock_192731803.jpeg'
import image2 from "../assests/_DSC0424.jpg"

const fullText = `Yemeni people have been enjoying what is arguably the best coffee on earth for
a really long time - over 500 years. Most historians trace the harvest of coffee
beans to surrounding countries of Yemen, but most agree that it was Yemenites
who first brewed it to drink, as it was viewed as a stimulant by Sufi monks. It’s
now enjoyed in cups around the world.`;

const images = [
  image1,image2
];

function CoffeeHistory() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const textIndex = useRef(0);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  // Function to handle the typing effect
  const typeText = () => {
    if (textIndex.current < fullText.length) {
      setText((prevText) => prevText + fullText.charAt(textIndex.current));
      textIndex.current++;
    } else {
      // Stop the typing effect once the full text has been displayed
      setIsTyping(false);
    }
  };

  // Start the typing effect when the component mounts
  useEffect(() => {
    setIsTyping(true);
    const typingInterval = setInterval(() => {
      if (isTyping) {
        typeText();
      }
    }, 10); // The speed of typing

    return () => clearInterval(typingInterval);
  }, [isTyping]);

  // Overlay effect when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.coffee-history-container');
      const scrolled = window.scrollY > element.offsetTop;

      if (scrolled) {
        element.classList.add('overlay');
      } else {
        element.classList.remove('overlay');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="coffee-history-container">
      <div className="coffee-image-slider">
        <ArrowLeft className="slider-arrow left-arrow" onClick={goToPrevious} />
        <img src={images[currentImageIndex]} alt="Yemeni Coffee History" />
        <ArrowRight className="slider-arrow right-arrow" onClick={goToNext} />
      </div>
      <div className="coffee-text">
        <h1>Yemeni Coffee History</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CoffeeHistory;
