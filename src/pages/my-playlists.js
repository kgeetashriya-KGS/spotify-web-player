import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  deletePlaylist,
  updatePlaylistVisibility,
  removeSongFromPlaylist,
} from '../actions/playlistActions';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import CreatePlaylistModal from '../component/modals/create-playlist-modal';
import styles from '../style/my-playlists.module.css';

function MyPlaylistsPage({
  myPlaylists,
  deletePlaylist,
  updatePlaylistVisibility,
  removeSongFromPlaylist,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDeletePlaylist = (playlistId) => {
    deletePlaylist(playlistId);
    setDeleteConfirmId(null);
  };

  const handleToggleVisibility = (playlistId, currentVisibility) => {
    updatePlaylistVisibility(playlistId, !currentVisibility);
  };

  const handleRemoveSong = (playlistId, songId) => {
    removeSongFromPlaylist(playlistId, songId);
  };

  return (
    <div className={styles.MyPlaylistsPage}>
      <div className={styles.HoverBg}></div>
      <div className={styles.Bg}></div>

      <Topnav />

      <div className={styles.Content}>
        <div className={styles.Header}>
          <TitleL>My Playlists</TitleL>
          <button
            className={styles.CreateBtn}
            onClick={() => setShowCreateModal(true)}
          >
            ➕ New Playlist
          </button>
        </div>

        {myPlaylists.length === 0 ? (
          <div className={styles.EmptyState}>
            <p>No playlists yet</p>
            <button onClick={() => setShowCreateModal(true)}>
              Create your first playlist
            </button>
          </div>
        ) : (
          <div className={styles.PlaylistsGrid}>
            {myPlaylists.map((playlist) => (
              <div key={playlist.id} className={styles.PlaylistCard}>
                <div className={styles.CardHeader}>
                  <h3>{playlist.name}</h3>
                  <div className={styles.CardActions}>
                    <button
                      className={styles.VisibilityBtn}
                      onClick={() =>
                        handleToggleVisibility(playlist.id, playlist.isPublic)
                      }
                      title={
                        playlist.isPublic
                          ? 'Make Private'
                          : 'Make Public'
                      }
                    >
                      {playlist.isPublic ? '🔓' : '🔒'}
                    </button>
                    <button
                      className={styles.DeleteBtn}
                      onClick={() => setDeleteConfirmId(playlist.id)}
                      title="Delete Playlist"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {playlist.description && (
                  <p className={styles.Description}>{playlist.description}</p>
                )}

                <p className={styles.SongCount}>
                  {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                </p>

                {playlist.songs.length > 0 && (
                  <button
                    className={styles.ExpandBtn}
                    onClick={() =>
                      setExpandedPlaylistId(
                        expandedPlaylistId === playlist.id ? null : playlist.id
                      )
                    }
                  >
                    {expandedPlaylistId === playlist.id
                      ? '▼ Hide Songs'
                      : '▶ Show Songs'}
                  </button>
                )}

                {expandedPlaylistId === playlist.id && playlist.songs.length > 0 && (
                  <div className={styles.SongsList}>
                    {playlist.songs.map((song, index) => (
                      <div key={song.id || index} className={styles.SongItem}>
                        <span className={styles.SongInfo}>
                          <strong>{song.songName}</strong>
                          <small>{song.songArtist}</small>
                        </span>
                        <button
                          className={styles.RemoveBtn}
                          onClick={() =>
                            handleRemoveSong(playlist.id, song.id)
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {deleteConfirmId === playlist.id && (
                  <div className={styles.ConfirmDelete}>
                    <p>Delete this playlist?</p>
                    <div className={styles.ConfirmButtons}>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className={styles.CancelBtn}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className={styles.ConfirmBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  myPlaylists: state.playlist.myPlaylists,
});

export default connect(mapStateToProps, {
  deletePlaylist,
  updatePlaylistVisibility,
  removeSongFromPlaylist,
})(MyPlaylistsPage);