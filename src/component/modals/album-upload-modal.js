import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAlbum } from '../../actions/artistDashboardActions';
import styles from './album-upload-modal.module.css';

function AlbumUploadModal({ isOpen, onClose, createAlbum, artistDashboard }) {
  const [albumTitle, setAlbumTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [albumArt, setAlbumArt] = useState(null);
  const [artPreview, setArtPreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAlbumArt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!albumTitle.trim()) {
      setError('Album title cannot be empty');
      return;
    }

    if (albumTitle.trim().length < 3) {
      setError('Album title must be at least 3 characters');
      return;
    }

    if (!releaseDate) {
      setError('Please select a release date');
      return;
    }

    // Check if release date is in the future
    if (new Date(releaseDate) > new Date()) {
      setError('Release date cannot be in the future');
      return;
    }

    const albumData = {
      title: albumTitle.trim(),
      releaseDate: releaseDate,
      description: description.trim(),
      albumArt: artPreview,
    };

    createAlbum(albumData);

    // Reset form
    setAlbumTitle('');
    setReleaseDate('');
    setDescription('');
    setAlbumArt(null);
    setArtPreview(null);
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

        <h2>Create New Album</h2>

        <form onSubmit={handleSubmit} className={styles.Form}>
          <div className={styles.FormGroup}>
            <label htmlFor="albumTitle">Album Title *</label>
            <input
              id="albumTitle"
              type="text"
              placeholder="My Album Name"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              maxLength="100"
              required
            />
            <span className={styles.CharCount}>
              {albumTitle.length}/100
            </span>
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="releaseDate">Release Date *</label>
            <input
              id="releaseDate"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add album description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="500"
              rows="4"
            />
            <span className={styles.CharCount}>
              {description.length}/500
            </span>
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="albumArt">Album Art</label>
            <div className={styles.ImagePreview}>
              {artPreview ? (
                <img src={artPreview} alt="Album Art Preview" />
              ) : (
                <div className={styles.NoImage}>🎵</div>
              )}
            </div>
            <input
              id="albumArt"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.FileInput}
            />
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
              Create Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  artistDashboard: state.artistDashboard,
});

export default connect(mapStateToProps, { createAlbum })(AlbumUploadModal);