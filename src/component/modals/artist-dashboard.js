import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteAlbum,
  deleteSong,
  setArtistAnalytics,
} from '../../actions/artistDashboardActions';

import Topnav from '../topnav/topnav';
import TitleL from '../text/title-l';
import AlbumUploadModal from './album-upload-modal';
import SongUploadModal from './song-upload-modal';

import styles from '../../style/artist-dashboard.module.css';

function ArtistDashboard({
  artistDashboard,
  deleteAlbum,
  deleteSong,
  setArtistAnalytics,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showSongModal, setShowSongModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteConfirmType, setDeleteConfirmType] = useState(null);

  // Simulate analytics update
  useEffect(() => {
    const mockAnalytics = {
      totalStreams: Math.floor(Math.random() * 100000) + 10000,
      totalLikes: Math.floor(Math.random() * 5000) + 500,
      totalFollowers: artistDashboard.profile.followerCount,
      monthlyStreams: [
        { month: 'Jan', streams: 1200 },
        { month: 'Feb', streams: 1900 },
        { month: 'Mar', streams: 2400 },
        { month: 'Apr', streams: 2210 },
        { month: 'May', streams: 2290 },
        { month: 'Jun', streams: 2000 },
      ],
      topSongs: artistDashboard.songs
        .slice(0, 5)
        .map((song) => ({
          title: song.title,
          plays: Math.floor(Math.random() * 50000) + 1000,
          likes: Math.floor(Math.random() * 5000) + 100,
        })),
    };
    setArtistAnalytics(mockAnalytics);
  }, [artistDashboard.songs, setArtistAnalytics]);

  const handleDeleteAlbum = (albumId) => {
    deleteAlbum(albumId);
    setDeleteConfirmId(null);
    setDeleteConfirmType(null);
  };

  const handleDeleteSong = (songId) => {
    deleteSong(songId);
    setDeleteConfirmId(null);
    setDeleteConfirmType(null);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className={styles.ArtistDashboard}>
      <div className={styles.HoverBg}></div>
      <div className={styles.Bg}></div>

      <Topnav />

      <div className={styles.Content}>
        <div className={styles.DashboardHeader}>
          <TitleL>Artist Dashboard</TitleL>
        </div>

        <div className={styles.TabsNavigation}>
          <button
            className={`${styles.Tab} ${activeTab === 'overview' ? styles.Active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`${styles.Tab} ${activeTab === 'albums' ? styles.Active : ''}`}
            onClick={() => setActiveTab('albums')}
          >
            💿 Albums ({artistDashboard.albums.length})
          </button>
          <button
            className={`${styles.Tab} ${activeTab === 'songs' ? styles.Active : ''}`}
            onClick={() => setActiveTab('songs')}
          >
            🎵 Songs ({artistDashboard.songs.length})
          </button>
          <button
            className={`${styles.Tab} ${activeTab === 'analytics' ? styles.Active : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className={styles.TabContent}>
            <div className={styles.StatsGrid}>
              <div className={styles.StatCard}>
                <div className={styles.StatIcon}>👥</div>
                <div className={styles.StatInfo}>
                  <p className={styles.StatLabel}>Followers</p>
                  <p className={styles.StatValue}>
                    {formatNumber(artistDashboard.analytics.totalFollowers)}
                  </p>
                </div>
              </div>

              <div className={styles.StatCard}>
                <div className={styles.StatIcon}>▶️</div>
                <div className={styles.StatInfo}>
                  <p className={styles.StatLabel}>Total Streams</p>
                  <p className={styles.StatValue}>
                    {formatNumber(artistDashboard.analytics.totalStreams)}
                  </p>
                </div>
              </div>

              <div className={styles.StatCard}>
                <div className={styles.StatIcon}>❤️</div>
                <div className={styles.StatInfo}>
                  <p className={styles.StatLabel}>Total Likes</p>
                  <p className={styles.StatValue}>
                    {formatNumber(artistDashboard.analytics.totalLikes)}
                  </p>
                </div>
              </div>

              <div className={styles.StatCard}>
                <div className={styles.StatIcon}>💿</div>
                <div className={styles.StatInfo}>
                  <p className={styles.StatLabel}>Albums</p>
                  <p className={styles.StatValue}>
                    {artistDashboard.albums.length}
                  </p>
                </div>
              </div>

              <div className={styles.StatCard}>
                <div className={styles.StatIcon}>🎵</div>
                <div className={styles.StatInfo}>
                  <p className={styles.StatLabel}>Songs</p>
                  <p className={styles.StatValue}>
                    {artistDashboard.songs.length}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.QuickActionsSection}>
              <h3>Quick Actions</h3>
              <div className={styles.QuickActions}>
                <button
                  className={styles.ActionBtn}
                  onClick={() => setShowAlbumModal(true)}
                >
                  ➕ Create Album
                </button>
                <button
                  className={styles.ActionBtn}
                  onClick={() => setShowSongModal(true)}
                >
                  ➕ Upload Song
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ALBUMS TAB */}
        {activeTab === 'albums' && (
          <div className={styles.TabContent}>
            <div className={styles.TabHeader}>
              <h3>Your Albums</h3>
              <button
                className={styles.AddBtn}
                onClick={() => setShowAlbumModal(true)}
              >
                ➕ New Album
              </button>
            </div>

            {artistDashboard.albums.length === 0 ? (
              <div className={styles.EmptyState}>
                <p>No albums yet</p>
                <button onClick={() => setShowAlbumModal(true)}>
                  Create your first album
                </button>
              </div>
            ) : (
              <div className={styles.AlbumsGrid}>
                {artistDashboard.albums.map((album) => (
                  <div key={album.id} className={styles.AlbumCard}>
                    <div className={styles.AlbumImage}>
                      {album.albumArt ? (
                        <img src={album.albumArt} alt={album.title} />
                      ) : (
                        <div className={styles.NoImage}>💿</div>
                      )}
                    </div>
                    <h4>{album.title}</h4>
                    <p className={styles.AlbumMeta}>
                      {album.songs.length} song{album.songs.length !== 1 ? 's' : ''}
                    </p>
                    <p className={styles.AlbumDate}>
                      {new Date(album.releaseDate).toLocaleDateString()}
                    </p>
                    <button
                      className={styles.DeleteBtn}
                      onClick={() => {
                        setDeleteConfirmId(album.id);
                        setDeleteConfirmType('album');
                      }}
                    >
                      🗑️ Delete
                    </button>

                    {deleteConfirmId === album.id &&
                      deleteConfirmType === 'album' && (
                        <div className={styles.ConfirmDelete}>
                          <p>Delete album?</p>
                          <div className={styles.ConfirmButtons}>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className={styles.CancelBtn}
                            >
                              No
                            </button>
                            <button
                              onClick={() => handleDeleteAlbum(album.id)}
                              className={styles.ConfirmBtn}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SONGS TAB */}
        {activeTab === 'songs' && (
          <div className={styles.TabContent}>
            <div className={styles.TabHeader}>
              <h3>Your Songs</h3>
              <button
                className={styles.AddBtn}
                onClick={() => setShowSongModal(true)}
              >
                ➕ Upload Song
              </button>
            </div>

            {artistDashboard.songs.length === 0 ? (
              <div className={styles.EmptyState}>
                <p>No songs yet</p>
                <button onClick={() => setShowSongModal(true)}>
                  Upload your first song
                </button>
              </div>
            ) : (
              <div className={styles.SongsTable}>
                <div className={styles.TableHeader}>
                  <div className={styles.ColTitle}>Title</div>
                  <div className={styles.ColDuration}>Duration</div>
                  <div className={styles.ColAlbum}>Album</div>
                  <div className={styles.ColDate}>Release Date</div>
                  <div className={styles.ColActions}>Actions</div>
                </div>

                {artistDashboard.songs.map((song) => {
                  const album = artistDashboard.albums.find(
                    (a) => a.id === song.albumId
                  );
                  return (
                    <div key={song.id} className={styles.TableRow}>
                      <div className={styles.ColTitle}>
                        <div className={styles.SongImage}>
                          {song.songArt ? (
                            <img src={song.songArt} alt={song.title} />
                          ) : (
                            <div>🎵</div>
                          )}
                        </div>
                        <span>{song.title}</span>
                      </div>
                      <div className={styles.ColDuration}>
                        {Math.floor(song.duration / 60)}:
                        {String(song.duration % 60).padStart(2, '0')}
                      </div>
                      <div className={styles.ColAlbum}>
                        {album ? album.title : 'Single'}
                      </div>
                      <div className={styles.ColDate}>
                        {new Date(song.releaseDate).toLocaleDateString()}
                      </div>
                      <div className={styles.ColActions}>
                        <button
                          className={styles.DeleteBtn}
                          onClick={() => {
                            setDeleteConfirmId(song.id);
                            setDeleteConfirmType('song');
                          }}
                        >
                          🗑️
                        </button>

                        {deleteConfirmId === song.id &&
                          deleteConfirmType === 'song' && (
                            <div className={styles.ConfirmDelete}>
                              <p>Delete song?</p>
                              <div className={styles.ConfirmButtons}>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className={styles.CancelBtn}
                                >
                                  No
                                </button>
                                <button
                                  onClick={() => handleDeleteSong(song.id)}
                                  className={styles.ConfirmBtn}
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className={styles.TabContent}>
            <h3>Monthly Streams</h3>
            <div className={styles.ChartContainer}>
              <div className={styles.Chart}>
                {artistDashboard.analytics.monthlyStreams.map((data) => (
                  <div key={data.month} className={styles.BarGroup}>
                    <div className={styles.Bar}>
                      <div
                        className={styles.BarFill}
                        style={{
                          height: `${(data.streams / 2400) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.BarLabel}>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ marginTop: '40px' }}>Top 5 Songs</h3>
            {artistDashboard.analytics.topSongs.length > 0 ? (
              <div className={styles.TopSongsTable}>
                <div className={styles.TableHeader}>
                  <div className={styles.Col}>Rank</div>
                  <div className={styles.Col}>Song</div>
                  <div className={styles.Col}>Plays</div>
                  <div className={styles.Col}>Likes</div>
                </div>
                {artistDashboard.analytics.topSongs.map((song, index) => (
                  <div key={index} className={styles.TableRow}>
                    <div className={styles.Col}>#{index + 1}</div>
                    <div className={styles.Col}>{song.title}</div>
                    <div className={styles.Col}>
                      {formatNumber(song.plays)}
                    </div>
                    <div className={styles.Col}>
                      {formatNumber(song.likes)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.NoData}>No songs to analyze yet</p>
            )}
          </div>
        )}
      </div>

      <AlbumUploadModal
        isOpen={showAlbumModal}
        onClose={() => setShowAlbumModal(false)}
      />

      <SongUploadModal
        isOpen={showSongModal}
        onClose={() => setShowSongModal(false)}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  artistDashboard: state.artistDashboard,
});

export default connect(mapStateToProps, {
  deleteAlbum,
  deleteSong,
  setArtistAnalytics,
})(ArtistDashboard);