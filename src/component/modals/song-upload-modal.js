import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSong } from '../../actions/artistDashboardActions';
import styles from './song-upload-modal.module.css';

function SongUploadModal({ isOpen, onClose, createSong, artistDashboard }) {
  const [songTitle, setSongTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [songArt, setSongArt] = useState(null);
  const [artPreview, setArtPreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSongArt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setAudioFileName(file.name);
      } else {
        setError('Please upload a valid audio file');
      }
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setDuration(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!songTitle.trim()) {
      setError('Song title cannot be empty');
      return;
    }

    if (songTitle.trim().length < 3) {
      setError('Song title must be at least 3 characters');
      return;
    }

    if (!duration) {
      setError('Please enter song duration');
      return;
    }

    if (parseInt(duration) < 30) {
      setError('Song duration must be at least 30 seconds');
      return;
    }

    if (!releaseDate) {
      setError('Please select a release date');
      return;
    }

    if (new Date(releaseDate) > new Date()) {
      setError('Release date cannot be in the future');
      return;
    }

    if (!audioFile) {
      setError('Please upload an audio file');
      return;
    }

    const songData = {
      title: songTitle.trim(),
      duration: parseInt(duration),
      releaseDate: releaseDate,
      description: description.trim(),
      songArt: artPreview,
      audioFile: audioFile,
      albumId: selectedAlbum || null,
    };

    createSong(songData);

    // Reset form
    setSongTitle('');
    setDuration('');
    setReleaseDate('');
    setDescription('');
    setSelectedAlbum('');
    setSongArt(null);
    setArtPreview(null);
    setAudioFile(null);
    setAudioFileName('');
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

        <h2>Upload New Song</h2>

        <form onSubmit={handleSubmit} className={styles.Form}>
          <div className={styles.FormGroup}>
            <label htmlFor="songTitle">Song Title *</label>
            <input
              id="songTitle"
              type="text"
              placeholder="My Song Title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              maxLength="100"
              required
            />
            <span className={styles.CharCount}>
              {songTitle.length}/100
            </span>
          </div>

          <div className={styles.TwoColumn}>
            <div className={styles.FormGroup}>
              <label htmlFor="duration">Duration (seconds) *</label>
              <input
                id="duration"
                type="text"
                placeholder="180"
                value={duration}
                onChange={handleDurationChange}
                required
              />
              <small>Minimum 30 seconds</small>
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
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="album">Album (Optional)</label>
            <select
              id="album"
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
            >
              <option value="">No Album</option>
              {artistDashboard.albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add song description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="300"
              rows="3"
            />
            <span className={styles.CharCount}>
              {description.length}/300
            </span>
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="songArt">Song Art</label>
            <div className={styles.ImagePreview}>
              {artPreview ? (
                <img src={artPreview} alt="Song Art Preview" />
              ) : (
                <div className={styles.NoImage}>🎵</div>
              )}
            </div>
            <input
              id="songArt"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.FileInput}
            />
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="audioFile">Audio File *</label>
            <div className={styles.AudioUpload}>
              <input
                id="audioFile"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className={styles.FileInput}
                required
              />
              <label htmlFor="audioFile" className={styles.FileLabel}>
                {audioFileName || '🎵 Choose Audio File'}
              </label>
            </div>
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
            <button type="submit" className={styles.UploadBtn}>
              Upload Song
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

export default connect(mapStateToProps, { createSong })(SongUploadModal);