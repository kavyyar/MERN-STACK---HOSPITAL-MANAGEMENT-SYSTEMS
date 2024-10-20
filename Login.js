import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Simple validation
    if (!email || !password) {
      setErrors({ server: "Email and password are required." });
      return;
    }

    try {
      const response = await fetch('http://localhost:1001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        navigate('/appointments');
      } else {
        setErrors({ server: data.error });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="https://drdeepika.com/wp-content/uploads/2021/07/100440442-stethoscope-with-clipboard-and-laptop-on-desk.jpg" alt="Doctor" className="login-image" />
      </div>
      <div className="login-right">
        <div className="auth-card">
          <h2>Sign In</h2>
          {errors.server && <p className="error-message">{errors.server}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
          <p className="bottom-text">
            Not registered yet? <a href="/register">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
