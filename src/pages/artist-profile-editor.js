import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateArtistDashboardProfile } from '../actions/artistDashboardActions';
import styles from '../style/artist-profile-editor.module.css';

function ArtistProfileEditor({ artistDashboard, updateArtistDashboardProfile }) {

  const [isEditing, setIsEditing] = useState(false);
  const [artistName, setArtistName] = useState(artistDashboard.profile.artistName || '');
  const [bio, setBio] = useState(artistDashboard.profile.bio || '');

  const handleSave = () => {
    updateArtistDashboardProfile({
      artistName,
      bio
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.profilePic}>🎤</div>
        <div>
          <p className={styles.type}>Artist</p>
          <h1>{artistDashboard.profile.artistName || "Your Artist Name"}</h1>
          <p className={styles.followers}>
            {artistDashboard.profile.followerCount} followers
          </p>
        </div>
      </div>

      <div className={styles.content}>
        {!isEditing ? (
          <>
            <h2>About</h2>
            <p>{artistDashboard.profile.bio || "No bio yet."}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <input
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Artist Name"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your bio"
            />
            <button onClick={handleSave}>Save</button>
          </>
        )}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  artistDashboard: state.artistDashboard
});

export default connect(mapStateToProps, { updateArtistDashboardProfile })(ArtistProfileEditor);