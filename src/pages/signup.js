import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser, setAuthError, clearAuthError } from '../actions/authActions';
import styles from '../style/login.module.css';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    props.clearAuthError();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      props.setAuthError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      props.setAuthError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      props.setAuthError('Password must be at least 6 characters');
      return;
    }

    // Dispatch Redux action with user data
    props.signupUser({
      user: {
        id: Date.now(), // Temporary ID - will come from backend later
        email: email,
        username: email.split('@')[0], // Extract username from email
        userType: 'user' // Type: user or artist
      },
      token: 'temp-token-' + Date.now(), // Temporary token - will come from backend
      userType: 'user'
    });

    // Save to localStorage as backup
    localStorage.setItem('user', JSON.stringify({ 
      email, 
      password,
      timestamp: new Date().toISOString()
    }));

    // Redirect to home after short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Spotify</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          {props.auth.error && <p style={{ color: 'red', fontSize: '12px' }}>{props.auth.error}</p>}
          <button type="submit" disabled={props.auth.isLoading}>
            {props.auth.isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signupUser, setAuthError, clearAuthError })(Signup);