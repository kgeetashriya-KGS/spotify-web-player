import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPublicPlaylists } from '../actions/playlistActions';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import styles from '../style/public-playlists.module.css';

function PublicPlaylistsPage({ myPlaylists, setPublicPlaylists }) {
  const [publicPlaylists, setLocalPublicPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);

  useEffect(() => {
    const publicOnly = myPlaylists.filter((playlist) => playlist.isPublic);
    setLocalPublicPlaylists(publicOnly);
    setPublicPlaylists(publicOnly);
  }, [myPlaylists, setPublicPlaylists]);

  const filteredPlaylists = publicPlaylists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.PublicPlaylistsPage}>
      <div className={styles.HoverBg}></div>
      <div className={styles.Bg}></div>

      <Topnav />

      <div className={styles.Content}>
        <div className={styles.Header}>
          <TitleL>Discover Playlists</TitleL>
        </div>

        <div className={styles.SearchBar}>
          <input
            type="text"
            placeholder="Search public playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.SearchInput}
          />
        </div>

        {filteredPlaylists.length === 0 ? (
          <div className={styles.EmptyState}>
            <p>
              {searchTerm
                ? 'No playlists found matching your search'
                : 'No public playlists available yet'}
            </p>
          </div>
        ) : (
          <div className={styles.PlaylistsContainer}>
            <p className={styles.ResultCount}>
              {filteredPlaylists.length} public playlist{filteredPlaylists.length !== 1 ? 's' : ''}
            </p>

            <div className={styles.PlaylistsList}>
              {filteredPlaylists.map((playlist) => (
                <div key={playlist.id} className={styles.PlaylistCard}>
                  <div className={styles.CardTop}>
                    <div className={styles.PlaylistInfo}>
                      <h3>{playlist.name}</h3>
                      <p className={styles.Creator}>By User</p>
                      {playlist.description && (
                        <p className={styles.Description}>
                          {playlist.description}
                        </p>
                      )}
                    </div>
                    <div className={styles.SongCount}>
                      🎵 {playlist.songs.length}
                    </div>
                  </div>

                  {playlist.songs.length > 0 && (
                    <>
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
                          : '▶ View Songs'}
                      </button>

                      {expandedPlaylistId === playlist.id && (
                        <div className={styles.SongsList}>
                          {playlist.songs.map((song, index) => (
                            <div key={song.id || index} className={styles.SongItem}>
                              <span className={styles.SongIndex}>
                                {index + 1}.
                              </span>
                              <img
                                src={song.songimg}
                                alt={song.songName}
                                className={styles.SongImg}
                              />
                              <span className={styles.SongInfo}>
                                <strong>{song.songName}</strong>
                                <small>{song.songArtist}</small>
                              </span>
                              <span className={styles.Duration}>
                                {song.trackTime}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  myPlaylists: state.playlist.myPlaylists,
});

export default connect(mapStateToProps, { setPublicPlaylists })(
  PublicPlaylistsPage
);