import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationPage.css';
import logo from '../../../assests/logo.png';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateAvailability, setDateAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const today = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock fetch date availability from backend
    const fetchDateAvailability = async () => {
      setIsLoading(true);
      // Simulate a backend call
      setTimeout(() => {
        const data = {
          '2024-08-01': 'available',
          '2024-08-02': 'pending',
          '2024-08-03': 'booked',
          '2024-08-04': 'available',
          '2024-08-05': 'available',
          // Add more dates as needed
        };
        setDateAvailability(data);
        setIsLoading(false);
      }, 1000);
    };

    fetchDateAvailability();
  }, []);

  const handleDateChange = (dates) => {
    if (dates) {
      const updatedDates = dates.filter(date => date && !isDateDisabled(date));
      setSelectedDates(updatedDates);
      setShowForm(updatedDates.length > 0);
    }
  };

  const getDateClassName = (date) => {
    if (!date) return '';
    const formattedDate = date.toISOString().split('T')[0];
    switch (dateAvailability[formattedDate]) {
      case 'available':
        return 'available-date';
      case 'pending':
        return 'pending-date';
      case 'booked':
        return 'booked-date';
      default:
        return '';
    }
  };

  const isDateDisabled = (date) => {
    if (!date) return false;
    const formattedDate = date.toISOString().split('T')[0];
    return (dateAvailability[formattedDate] === 'pending' || dateAvailability[formattedDate] === 'booked') && date > today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the modal
    setTimeout(() => {
      navigate('/team'); // Navigate to Teams page after 3 seconds
    }, 3000);
  };

  return (
    <div className="reservation-container">
      <h1>Select Dates for Table Reservation</h1>
      <div className={`date-picker-container ${isLoading ? 'loading' : ''}`}>
        {isLoading && (
          <div className="loading-overlay">
            <img src={logo} alt="Loading" className="logo" />
            <div className="spinner"></div>
          </div>
        )}

        <DatePicker
          selected={selectedDates[0]}
          onChange={handleDateChange}
          startDate={selectedDates[0]}
          endDate={selectedDates[selectedDates.length - 1]}
          selectsRange
          filterDate={(date) => !isDateDisabled(date)}
          dayClassName={(date) => getDateClassName(date)}
          minDate={today}
          inline
        />
        <div className="legend">
          <h2>Date Legend</h2>
          <div className="legend-item">
            <div className="color-box available-date"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="color-box pending-date"></div>
            <span>Pending for Approval</span>
          </div>
          <div className="legend-item">
            <div className="color-box booked-date"></div>
            <span>Already Booked</span>
          </div>
        </div>
      </div>
      {selectedDates.length > 0 && showForm && (
        <div className="details-form">
          <h2>Enter Details for Selected Dates</h2>
          <p>Selected Dates: {selectedDates.map(date => date.toDateString()).join(', ')}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" required />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="tel" name="phone" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Thank You!</h2>
            <p>Your reservation request has been submitted. We will get back to you soon.</p>
            <button onClick={() => navigate('/team')}>Return to Teams Page</button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
