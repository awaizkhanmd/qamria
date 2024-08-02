import React, { useState, useEffect, useRef } from 'react';
import Card from './card'; // Ensure the path to the Card component is correct
import './LayoutGrid.css'; // Ensure this CSS file exists and has the required styles
import cardData from './cardData'; 

const LayoutGrid = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const cardRefs = useRef(new Array(cardData.length).fill(null)); // Initialize the refs array based on the number of cards

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Ensure there's a 'visible' class defined in your CSS
          } else {
            entry.target.classList.remove('visible'); // Optionally remove the class if not intersecting
          }
        });
      },
      {
        root: null, // Defaults to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Only observe elements that are not null
    cardRefs.current.forEach((card) => card && observer.observe(card));

    // Cleanup: Unobserve elements when the component is unmounted or if dependencies change
    return () => {
      cardRefs.current.forEach((card) => card && observer.unobserve(card));
    };
  }, []); // Empty dependency array to run once on mount

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="layout-grid">
      {cardData.map((card, index) => (
        <div 
          ref={(el) => (cardRefs.current[index] = el)} // Assign ref to the corresponding array element
          key={card.id}
          className="card" // Apply 'card' class for styling
          onClick={() => handleCardClick(card.id)}
        >
          <Card
            image={card.thumbnail}
            title={card.title}
            description={card.description}
            isExpanded={expandedCard === card.id}
          />
        </div>
      ))}
    </div>
  );
};

export default LayoutGrid;