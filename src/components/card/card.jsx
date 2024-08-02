// Card.jsx
import React from 'react';

const Card = ({ image, title, description, onClick, isExpanded }) => {
  const cardClass = `card ${isExpanded ? 'expanded' : ''}`;

  return (
    <div className={cardClass} onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      {isExpanded && (
        <div className="card-details">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
