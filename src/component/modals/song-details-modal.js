import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { likeSong, unlikeSong } from '../../actions/songActions';

import styles from './song-details-modal.module.css';

function SongDetailsModal(props) {
  const [isLiked, setIsLiked] = useState(false);

  const { song, isOpen, onClose } = props;

  useEffect(() => {
    if (song) {
      setIsLiked(props.likedSongIds.has(song.index));
    }
  }, [song, props.likedSongIds]);

  if (!isOpen || !song) return null;

  const handleLike = () => {
    if (isLiked) {
      props.unlikeSong(song.index);
    } else {
      props.likeSong(song.index);
    }
  };

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.CloseBtn} onClick={onClose}>✕</button>

        <div className={styles.ModalBody}>
          <div className={styles.ImgSection}>
            <img src={song.songimg} alt={song.songName} />
          </div>

          <div className={styles.InfoSection}>
            <h2>{song.songName}</h2>
            <p className={styles.Artist}>{song.songArtist}</p>
            
            <div className={styles.Details}>
              <div className={styles.DetailItem}>
                <span className={styles.Label}>Album:</span>
                <span className={styles.Value}>{song.albumTitle}</span>
              </div>
              <div className={styles.DetailItem}>
                <span className={styles.Label}>Duration:</span>
                <span className={styles.Value}>{formatTime(song.duration)}</span>
              </div>
              <div className={styles.DetailItem}>
                <span className={styles.Label}>Release Date:</span>
                <span className={styles.Value}>{new Date(song.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className={styles.DetailItem}>
                <span className={styles.Label}>Genre:</span>
                <span className={styles.Value}>{song.genre}</span>
              </div>
            </div>

            <button
              onClick={handleLike}
              className={`${styles.LikeBtn} ${isLiked ? styles.Liked : ''}`}
            >
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const mapStateToProps = (state) => {
  return {
    likedSongIds: state.songs.likedSongIds,
  };
};

export default connect(mapStateToProps, { likeSong, unlikeSong })(SongDetailsModal);