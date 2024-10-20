import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    let formErrors = {};

    if (password !== confirmPassword) {
      formErrors.password = "Passwords do not match";
    }

    if (!email.includes('@')) {
      formErrors.email = "Email is invalid";
    }

    return formErrors;
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      firstname,
      lastname,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:1001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);  // Set success message
        setTimeout(() => {
          navigate('/login');  // Redirect to login after 2 seconds
        }, 2000);
      } else {
        setErrors({ general: data.error });  // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src="https://img.freepik.com/free-photo/engineer-data-center-using-tablet-prevent-system-overload-close-up-employee-server-room-ensuring-there-is-enough-network-connectivity-smooth-operations-blurry-background_482257-72822.jpg?size=626&ext=jpg&ga=GA1.1.17622350.1729334668&semt=ais_hybrid" alt="Hospital" />
      </div>
      <div className="register-form-container">
        <h2>Register</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
