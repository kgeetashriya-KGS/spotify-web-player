import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPlaylist } from '../../actions/playlistActions';
import styles from './create-playlist-modal.module.css';

function CreatePlaylistModal({ isOpen, onClose, auth, createPlaylist }) {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();

    if (!playlistName.trim()) {
      setError('Playlist name cannot be empty');
      return;
    }

    if (playlistName.trim().length < 3) {
      setError('Playlist name must be at least 3 characters');
      return;
    }

    if (playlistName.trim().length > 50) {
      setError('Playlist name cannot exceed 50 characters');
      return;
    }

    const newPlaylist = {
      userId: auth.user.id,
      name: playlistName.trim(),
      description: description.trim(),
      isPublic: isPublic,
    };

    createPlaylist(newPlaylist);

    setPlaylistName('');
    setDescription('');
    setIsPublic(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.CloseBtn} onClick={onClose}>
          ✕
        </button>

        <h2>Create New Playlist</h2>

        <form onSubmit={handleCreate} className={styles.Form}>
          <div className={styles.FormGroup}>
            <label htmlFor="playlistName">Playlist Name *</label>
            <input
              id="playlistName"
              type="text"
              placeholder="My Awesome Playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              maxLength="50"
              required
            />
            <span className={styles.CharCount}>
              {playlistName.length}/50
            </span>
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add an optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="200"
              rows="3"
            />
            <span className={styles.CharCount}>
              {description.length}/200
            </span>
          </div>

          <div className={styles.FormGroup}>
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <span>Make playlist public</span>
            </label>
            <p className={styles.InfoText}>
              {isPublic
                ? '🔓 This playlist is visible to everyone'
                : '🔒 Only you can see this playlist'}
            </p>
          </div>

          {error && <p className={styles.Error}>{error}</p>}

          <div className={styles.ButtonGroup}>
            <button
              type="button"
              className={styles.CancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.CreateBtn}>
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createPlaylist })(CreatePlaylistModal);