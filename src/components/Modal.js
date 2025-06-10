import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const modalRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validatePhone = (phone) => {
    return phone.length === 10;
  };

  const validateDOB = (dob) => {
    const selectedDate = new Date(dob);
    const currentDate = new Date();
    return selectedDate <= currentDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.phone || !formData.dob) {
      alert('Please fill out all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    if (!validateDOB(formData.dob)) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    // If all validations pass, close the modal
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2>Fill Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
