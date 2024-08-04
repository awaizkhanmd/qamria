import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Team.css';
import logo from '../../assests/logo.png';

const Team = () => {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate('/reservation');
  };

  const handleCateringClick = () => {
    navigate('/catering');
  };

  return (
    <div className="page-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="welcome-title">Welcome </h1>
      </header>
      
      <div className="container-wrapper">
        <div className="container1">
          <div className="left">
            <button className="reservation-button" onClick={handleReservationClick}>Table Reservation</button>
          </div>
        </div>

        <div className="container2">
          <div className="right">
            <button className="catering-button" onClick={handleCateringClick}>Catering</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
