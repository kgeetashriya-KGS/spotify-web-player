import React from "react";
import { connect } from "react-redux";
import { addSongToPlaylist } from "../../actions/playlistActions";
import styles from "./add-to-playlist-modal.module.css";

function AddToPlaylistModal({
  isOpen,
  onClose,
  song,
  playlists,
  userId,
  addSongToPlaylist
}) {
  if (!isOpen) return null;

  const handleAdd = (playlistId) => {
    addSongToPlaylist({
      userId,
      playlistId,
      song
    });

    alert("Song added to playlist ✅");
    onClose();
  };

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div
        className={styles.ModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.CloseBtn} onClick={onClose}>
          ✕
        </button>

        <h2>Add to Playlist</h2>

        {playlists.length === 0 ? (
          <p className={styles.EmptyText}>
            You don’t have any playlists yet.
          </p>
        ) : (
          playlists.map((playlist) => (
            <button
              key={playlist.id}
              className={styles.PlaylistBtn}
              onClick={() => handleAdd(playlist.id)}
            >
              {playlist.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const userId = state.auth?.user?.id;

  return {
    userId,
    playlists: state.playlist?.playlistsByUser?.[userId] || []
  };
};

export default connect(mapStateToProps, {
  addSongToPlaylist
})(AddToPlaylistModal);