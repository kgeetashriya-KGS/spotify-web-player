import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser, setAuthError, clearAuthError } from '../actions/authActions';
import styles from '../style/login.module.css';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user'); // 🔥 NEW

  const handleSignup = (e) => {
    e.preventDefault();
    props.clearAuthError();

    if (!email || !password || !confirmPassword) {
      props.setAuthError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      props.setAuthError('Passwords do not match');
      return;
    }

    props.signupUser({
      user: {
        id: Date.now(),
        email,
        username: email.split('@')[0],
        userType
      },
      token: 'temp-token-' + Date.now(),
      userType
    });

    setTimeout(() => {
      window.location.href = userType === 'artist' 
        ? '/artist/dashboard' 
        : '/';
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

          {/* 🔥 ROLE SELECTOR */}
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="radio"
                value="user"
                checked={userType === 'user'}
                onChange={() => setUserType('user')}
              /> User
            </label>

            <label style={{ marginLeft: '20px' }}>
              <input
                type="radio"
                value="artist"
                checked={userType === 'artist'}
                onChange={() => setUserType('artist')}
              /> Artist
            </label>
          </div>

          {props.auth.error && (
            <p style={{ color: 'red', fontSize: '12px' }}>
              {props.auth.error}
            </p>
          )}

          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  signupUser,
  setAuthError,
  clearAuthError,
})(Signup);