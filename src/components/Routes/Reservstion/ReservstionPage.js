import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationPage.css';
import logo from '../../../assests/logo.png';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [dateAvailability, setDateAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalDuration, setTotalDuration] = useState({ hours: 0 });
  const today = moment().startOf('day');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDateAvailability = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const data = {
          '2024-08-02': {
            times: {
              '9:00 AM': 'pending',
              '12:00 PM': 'booked',
              '1:00 PM': 'booked',
              '2:00 PM': 'booked',
              '5:00 PM': 'booked',
              '6:00 PM': 'booked'
            }
          },
          '2024-08-03': {
            times: {
              '1:00 PM': 'maintenance',
              '2:00 PM': 'booked',
              '5:00 PM': 'booked',
              '6:00 PM': 'booked',
              '7:00 PM': 'booked',
              '8:00 PM': 'booked'
            }
          },
          '2024-08-04': {
            times: {
              '9:00 AM': 'booked',
              '10:00 AM': 'booked',
              '11:00 AM': 'booked',
              '12:00 PM': 'booked',
              '1:00 PM': 'booked',
              '2:00 PM': 'booked',
              '3:00 PM': 'booked',
              '4:00 PM': 'booked',
              '5:00 PM': 'booked',
              '6:00 PM': 'booked',
              '7:00 PM': 'booked',
              '8:00 PM': 'booked'
            }
          }
        };
        setDateAvailability(data);
        setIsLoading(false);
      }, 1000);
    };

    fetchDateAvailability();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimes([]);
    setAvailableTimes([]);
    setTotalDuration({ hours: 0 });
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const availability = dateAvailability[formattedDate] || { times: {} };
      const currentTime = moment();

      const times = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
        '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
      ].map((time) => {
        const [hour, period] = time.split(' ');
        const hourInt = parseInt(hour, 10);
        const nextHour = hourInt === 12 ? 1 : hourInt + 1;
        const nextPeriod = hourInt === 11 ? (period === 'AM' ? 'PM' : 'AM') : period;

        const slotStartTime = moment(`${formattedDate} ${hour} ${period}`, 'YYYY-MM-DD hh A');
        const bookingAllowed = date > today.toDate() || (date.toDateString() === today.toDate().toDateString() && slotStartTime.isAfter(currentTime));

        return {
          start: `${hour} ${period}`,
          end: `${nextHour}:00 ${nextPeriod}`,
          key: `${hour} ${period}-${nextHour}:00 ${nextPeriod}`,
          status: bookingAllowed ? (availability.times[time] || 'available') : 'closed'
        };
      });

      setAvailableTimes(times);
    }
    setShowForm(true);
  };

  const handleTimeSelection = (time) => {
    if (time.status !== 'available') return;

    const existingIndex = selectedTimes.findIndex(t => t.key === time.key);

    if (existingIndex !== -1) {
      const newSelectedTimes = selectedTimes.slice(0, existingIndex);
      setSelectedTimes(newSelectedTimes);
    } else {
      if (selectedTimes.length === 0 || selectedTimes[selectedTimes.length - 1].key.split('-')[1] === time.key.split('-')[0]) {
        setSelectedTimes([...selectedTimes, time]);
      }
    }
  };

  useEffect(() => {
    if (selectedTimes.length > 0) {
      const first = selectedTimes[0];
      const last = selectedTimes[selectedTimes.length - 1];
      const startTime = moment(`2024-01-01 ${first.start}`, 'YYYY-MM-DD hh A');
      const endTime = moment(`2024-01-01 ${last.end}`, 'YYYY-MM-DD hh A');
      if (startTime.isValid() && endTime.isValid()) {
        const duration = moment.duration(endTime.diff(startTime));
        setTotalDuration({ hours: Math.floor(duration.asHours()) });
      } else {
        setTotalDuration({ hours: 0 });
      }
    } else {
      setTotalDuration({ hours: 0 });
    }
  }, [selectedTimes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      navigate('/team');
    }, 3000);
  };

  const getDayClassName = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const availability = dateAvailability[formattedDate];
    if (availability) {
      const times = Object.values(availability.times);
      const bookedCount = times.filter(status => status === 'booked').length;
      const totalCount = times.length;
      if (bookedCount >= 8) {
        return 'booked-day';
      } else if (bookedCount > 6) {
        return 'mostly-booked-day';
      } else if (times.some(status => status === 'pending')) {
        return 'pending-day';
      }
    }
    return 'available-day';
  };

  return (
    <div className="reservation-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to Quick Booking</h1>
      </div>
      <div className={`reservation-content ${isLoading ? 'loading' : ''}`}>
        {isLoading && (
          <div className="loading-overlay">
            <img src={logo} alt="Loading" className="loading-logo" />
            <div className="spinner"></div>
          </div>
        )}
        <div className="date-picker-section">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dayClassName={getDayClassName}
            filterDate={(date) => date >= today.toDate()}
            minDate={today.toDate()}
            inline
          />
        </div>
        <div className="legend">
          <h2>Slot </h2>
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
        
          <div className="legend-item">
            <div className="color-box closed-date"></div>
            <span>Maintenance/Closed</span>
          </div>
        </div>
        <div className="time-picker-section">
          <h2>Available Time Slots</h2>
          <div className="time-slots">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <button
                  key={time.key}
                  className={`time-slot ${time.status} ${selectedTimes.some(t => t.key === time.key) ? 'selected' : ''}`}
                  onClick={() => handleTimeSelection(time)}
                  disabled={time.status !== 'available'}
                >
                  {time.start} - {time.end}
                </button>
              ))
            ) : (
              <p>No available times</p>
            )}
          </div>
          {selectedTimes.length > 0 && (
            <p>Total Time: {selectedTimes[0].start} - {selectedTimes[selectedTimes.length - 1].end} ({totalDuration.hours} hours)</p>
          )}
        </div>
      </div>
      {selectedDate && selectedTimes.length > 0 && showForm && (
        <div className="details-form">
          <h2>Enter Details for Selected Date and Time</h2>
          <p>Selected Date: {selectedDate.toDateString()}</p>
          <p>Selected Time: {selectedTimes[0].start} - {selectedTimes[selectedTimes.length - 1].end}</p>
          <p>Total Duration: {totalDuration.hours} hours</p>
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
