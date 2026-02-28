import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addSongToPlaylist, createPlaylist } from '../../actions/playlistActions';
import styles from './add-to-playlist-modal.module.css';

function AddToPlaylistModal({ isOpen, onClose, song, auth, myPlaylists, addSongToPlaylist, createPlaylist }) {
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [message, setMessage] = useState('');

  const handleAddToExisting = (playlistId) => {
    if (!song) return;

    const songToAdd = {
      id: song.id || song.songName,
      songName: song.songName,
      songArtist: song.songArtist,
      songimg: song.songimg,
      trackTime: song.trackTime,
      link: song.link,
    };

    addSongToPlaylist(playlistId, songToAdd);
    setMessage(`Added to playlist!`);

    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1500);
  };

  const handleCreateAndAdd = (e) => {
    e.preventDefault();

    if (!newPlaylistName.trim()) {
      setMessage('Playlist name cannot be empty');
      return;
    }

    const newPlaylist = {
      userId: auth.user.id,
      name: newPlaylistName.trim(),
      description: '',
      isPublic: false,
    };

    createPlaylist(newPlaylist);

    setMessage('Playlist created!');
    setTimeout(() => {
      setMessage('');
      setShowCreateNew(false);
      setNewPlaylistName('');
      onClose();
    }, 1500);
  };

  if (!isOpen || !song) return null;

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.CloseBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.SongInfo}>
          <img src={song.songimg} alt={song.songName} />
          <div>
            <h3>{song.songName}</h3>
            <p>{song.songArtist}</p>
          </div>
        </div>

        <h2>Add to Playlist</h2>

        {!showCreateNew ? (
          <>
            {myPlaylists.length > 0 ? (
              <div className={styles.PlaylistList}>
                {myPlaylists.map((playlist) => (
                  <button
                    key={playlist.id}
                    className={styles.PlaylistItem}
                    onClick={() => handleAddToExisting(playlist.id)}
                  >
                    <span className={styles.PlaylistName}>{playlist.name}</span>
                    <span className={styles.SongCount}>
                      {playlist.songs.length} songs
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.NoPlaylists}>
                No playlists yet. Create one first!
              </p>
            )}

            <button
              className={styles.CreateNewBtn}
              onClick={() => setShowCreateNew(true)}
            >
              ➕ Create New Playlist
            </button>
          </>
        ) : (
          <form onSubmit={handleCreateAndAdd} className={styles.CreateForm}>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
            />
            <div className={styles.ButtonGroup}>
              <button
                type="button"
                onClick={() => {
                  setShowCreateNew(false);
                  setNewPlaylistName('');
                }}
                className={styles.CancelBtn}
              >
                Back
              </button>
              <button type="submit" className={styles.CreateBtn}>
                Create & Add
              </button>
            </div>
          </form>
        )}

        {message && (
          <p
            className={
              message.includes('Added')
                ? styles.SuccessMsg
                : styles.ErrorMsg
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  myPlaylists: state.playlist.myPlaylists,
});

export default connect(mapStateToProps, { addSongToPlaylist, createPlaylist })(
  AddToPlaylistModal
);