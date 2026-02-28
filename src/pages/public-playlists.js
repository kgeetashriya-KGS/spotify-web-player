import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import styles from '../style/public-playlists.module.css';

function PublicPlaylistsPage({ allPlaylists }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);

  const publicPlaylists = Object.values(allPlaylists || {})
    .flat()
    .filter((playlist) => playlist.isPublic);

  const filteredPlaylists = publicPlaylists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (playlist.description || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.PublicPlaylistsPage}>
      <Topnav />

      <div className={styles.Content}>
        <TitleL>Discover Playlists</TitleL>

        <input
          type="text"
          placeholder="Search public playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.SearchInput}
        />

        {filteredPlaylists.length === 0 ? (
          <p>No public playlists available.</p>
        ) : (
          filteredPlaylists.map((playlist) => (
            <div key={playlist.id} className={styles.PlaylistCard}>
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
              <p>🎵 {playlist.songs.length} songs</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allPlaylists: state.playlist.playlistsByUser
});

export default connect(mapStateToProps)(PublicPlaylistsPage);