import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSongDetails } from '../../actions/songActions';
import AddToPlaylistModal from './add-to-playlist-modal';
import styles from './song-details-modal.module.css';

function SongDetailsModal({ currentSongDetails, setSongDetails }) {
  const [showAddModal, setShowAddModal] = useState(false);

  if (!currentSongDetails) return null;

  const handleClose = () => {
    setSongDetails(null);
  };

  const songForPlaylist = {
    id: currentSongDetails.id || currentSongDetails.title,
    songName: currentSongDetails.title,
    songArtist: currentSongDetails.artist,
    songimg: currentSongDetails.coverart,
    trackTime: currentSongDetails.duration || "",
    link: currentSongDetails.link || "",
  };

  return (
    <>
      <div className={styles.ModalOverlay} onClick={handleClose}>
        <div
          className={styles.ModalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.CloseBtn} onClick={handleClose}>
            ✕
          </button>

          <div className={styles.ModalBody}>
            
            {/* IMAGE SECTION */}
            <div className={styles.ImgSection}>
              <img
                src={currentSongDetails.coverart}
                alt={currentSongDetails.title}
              />
            </div>

            {/* INFO SECTION */}
            <div className={styles.InfoSection}>
              <h2>{currentSongDetails.title}</h2>
              <p className={styles.Artist}>
                {currentSongDetails.artist}
              </p>

              <div className={styles.Details}>
                <div className={styles.DetailItem}>
                  <span className={styles.Label}>Album</span>
                  <span className={styles.Value}>
                    {currentSongDetails.album}
                  </span>
                </div>

                <div className={styles.DetailItem}>
                  <span className={styles.Label}>Duration</span>
                  <span className={styles.Value}>
                    {currentSongDetails.duration}
                  </span>
                </div>
              </div>

              <button
                className={styles.LikeBtn}
                onClick={() => setShowAddModal(true)}
              >
                ➕ Add to Playlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddToPlaylistModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        song={songForPlaylist}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  currentSongDetails: state.songs.currentSongDetails,
});

export default connect(mapStateToProps, { setSongDetails })(
  SongDetailsModal
);