import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateArtistDashboardProfile } from '../actions/artistDashboardActions';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import styles from '../style/artist-profile-editor.module.css';

function ArtistProfileEditor({ artistDashboard, updateArtistDashboardProfile, auth }) {
  const [artistName, setArtistName] = useState(artistDashboard.profile.artistName || '');
  const [bio, setBio] = useState(artistDashboard.profile.bio || '');
  const [profileImage, setProfileImage] = useState(artistDashboard.profile.profileImage || null);
  const [imagePreview, setImagePreview] = useState(artistDashboard.profile.profileImage || null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!artistName.trim()) {
      setMessage('Artist name cannot be empty');
      return;
    }

    if (artistName.trim().length < 3) {
      setMessage('Artist name must be at least 3 characters');
      return;
    }

    if (artistName.trim().length > 50) {
      setMessage('Artist name cannot exceed 50 characters');
      return;
    }

    const profileData = {
      artistName: artistName.trim(),
      bio: bio.trim(),
      profileImage: imagePreview,
      updatedAt: new Date().toISOString(),
    };

    updateArtistDashboardProfile(profileData);
    setMessage('Profile updated successfully! ✓');
    setIsEditing(false);

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.ArtistProfileEditor}>
      <div className={styles.HoverBg}></div>
      <div className={styles.Bg}></div>

      <Topnav />

      <div className={styles.Content}>
        <TitleL>Artist Profile</TitleL>

        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileBox}>
            <div className={styles.ProfileImage}>
              {imagePreview ? (
                <img src={imagePreview} alt="Artist Profile" />
              ) : (
                <div className={styles.NoImage}>🎤</div>
              )}
            </div>

            <div className={styles.ProfileInfo}>
              <p className={styles.Label}>Email:</p>
              <p className={styles.Value}>{artistDashboard.profile.email || auth.user?.email}</p>

              <p className={styles.Label}>Followers:</p>
              <p className={styles.Value}>{artistDashboard.profile.followerCount}</p>

              <p className={styles.Label}>Member Since:</p>
              <p className={styles.Value}>
                {artistDashboard.profile.createdAt 
                  ? new Date(artistDashboard.profile.createdAt).toLocaleDateString()
                  : 'Recently'}
              </p>

              <p className={styles.Label}>Status:</p>
              <p className={`${styles.Value} ${styles.Status}`}>
                {artistDashboard.profile.isActive ? '✓ Active' : '✗ Inactive'}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <div className={styles.ViewMode}>
              <div className={styles.InfoSection}>
                <h3>Artist Name</h3>
                <p>{artistDashboard.profile.artistName || 'Not set'}</p>
              </div>

              <div className={styles.InfoSection}>
                <h3>Bio</h3>
                <p>{artistDashboard.profile.bio || 'No bio added yet'}</p>
              </div>

              <button
                className={styles.EditBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.EditForm}>
              <div className={styles.FormGroup}>
                <label>Artist Name *</label>
                <input
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  maxLength="50"
                  required
                />
                <span className={styles.CharCount}>
                  {artistName.length}/50
                </span>
              </div>

              <div className={styles.FormGroup}>
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength="500"
                  rows="4"
                  placeholder="Tell fans about yourself..."
                />
                <span className={styles.CharCount}>
                  {bio.length}/500
                </span>
              </div>

              <div className={styles.FormGroup}>
                <label>Profile Picture</label>
                <div className={styles.FileInput}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="profileImage"
                  />
                  <label htmlFor="profileImage" className={styles.FileLabel}>
                    {imagePreview ? '📷 Change Image' : '📷 Upload Image'}
                  </label>
                </div>
              </div>

              {message && (
                <p className={message.includes('successfully') ? styles.Success : styles.Error}>
                  {message}
                </p>
              )}

              <div className={styles.ButtonGroup}>
                <button
                  type="button"
                  className={styles.CancelBtn}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.SaveBtn}>
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  artistDashboard: state.artistDashboard,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateArtistDashboardProfile })(
  ArtistProfileEditor
);