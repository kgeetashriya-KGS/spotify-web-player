import React from 'react';
import { connect } from 'react-redux';
import { setSongDetails } from '../../actions/songActions';
import * as Icons from '../icons';
import styles from './song-details-modal.module.css'; // Assuming this CSS file exists

function SongDetailsModal({ currentSongDetails, setSongDetails }) {
    // If there is no song selected in Redux, don't render the modal at all
    if (!currentSongDetails) return null;

    const handleClose = () => {
        setSongDetails(null); // Clears the state, closing the modal
    };

    return (
        <div className={styles.ModalOverlay} onClick={handleClose}>
            <div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.CloseBtn} onClick={handleClose}>
                    X
                </button>
                <div className={styles.ModalHeader}>
                    <img src={currentSongDetails.coverart} alt="Cover" className={styles.CoverArt} />
                    <div className={styles.TextInfo}>
                        <h2>{currentSongDetails.title}</h2>
                        <p>{currentSongDetails.artist}</p>
                        <p className={styles.AlbumText}>{currentSongDetails.album}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentSongDetails: state.songs.currentSongDetails
});

export default connect(mapStateToProps, { setSongDetails })(SongDetailsModal);