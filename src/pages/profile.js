import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import styles from '../style/profile.module.css';
import Topnav from '../component/topnav/topnav';

function Profile(props) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    // Here you would call backend API to change password
    setMessage('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setShowChangePassword(false), 2000);
  };

  const handleLogout = () => {
    props.logoutUser();
    window.location.href = '/login';
  };

  return (
    <div className={styles.profilePage}>
      <Topnav />
      
      <div className={styles.profileContainer}>
        <div className={styles.profileBox}>
          <h1>My Profile</h1>
          
          {/* User Info Section */}
          <div className={styles.userInfoSection}>
            <div className={styles.infoItem}>
              <label>Email:</label>
              <p>{props.auth.user?.email}</p>
            </div>
            
            <div className={styles.infoItem}>
              <label>Username:</label>
              <p>{props.auth.user?.username}</p>
            </div>
            
            <div className={styles.infoItem}>
              <label>Account Type:</label>
              <p className={styles.userType}>
                {props.auth.userType === 'user' ? '🎵 Regular User' : '🎤 Artist'}
              </p>
            </div>
          </div>

          {/* Change Password Section */}
          <div className={styles.passwordSection}>
            <button 
              className={styles.toggleBtn}
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              {showChangePassword ? 'Cancel' : 'Change Password'}
            </button>

            {showChangePassword && (
              <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {message && (
                  <p className={message.includes('successfully') ? styles.success : styles.error}>
                    {message}
                  </p>
                )}
                <button type="submit" className={styles.submitBtn}>
                  Update Password
                </button>
              </form>
            )}
          </div>

          {/* Logout Button */}
          <div className={styles.logoutSection}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(Profile);