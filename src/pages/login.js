import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, setAuthError, clearAuthError } from '../actions/authActions';
import styles from '../style/login.module.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    props.clearAuthError();

    // Basic validation
    if (!email || !password) {
      props.setAuthError('Please fill in all fields');
      return;
    }

    // Dispatch Redux action with user data
    props.loginUser({
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
        <form onSubmit={handleLogin}>
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
          {props.auth.error && <p style={{ color: 'red', fontSize: '12px' }}>{props.auth.error}</p>}
          <button type="submit" disabled={props.auth.isLoading}>
            {props.auth.isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loginUser, setAuthError, clearAuthError })(Login);