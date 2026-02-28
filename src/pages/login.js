import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, setAuthError } from '../actions/authActions';
import styles from '../style/login.module.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const savedAuth = JSON.parse(localStorage.getItem('authState'));

    if (!savedAuth) {
      props.setAuthError('No account found. Please sign up.');
      return;
    }

    if (savedAuth.user.email !== email) {
      props.setAuthError('Invalid email');
      return;
    }

    props.loginUser({
      user: savedAuth.user,
      userType: savedAuth.userType,
      token: savedAuth.token
    });

    window.location.href =
      savedAuth.userType === 'artist'
        ? '/artist/dashboard'
        : '/';
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
          {props.auth.error && (
            <p style={{ color: 'red', fontSize: '12px' }}>
              {props.auth.error}
            </p>
          )}
          <button type="submit">Log In</button>
        </form><p style={{ marginTop: "10px" }}>
  Don't have an account? <a href="/signup">Sign Up</a>
</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser, setAuthError })(Login);