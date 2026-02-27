import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchArtists,
  followArtist,
  unfollowArtist
} from "../actions/artistActions";
import styles from "./artist-profile.module.css";

function ArtistProfile({
  artists,
  followedArtists,
  isLoading,
  fetchArtists,
  followArtist,
  unfollowArtist
}) {
  const { id } = useParams();

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const artist = artists.find(a => a.id === id);

  if (isLoading) {
    return <div className={styles.loading}>Loading artist...</div>;
  }

  if (!artist) {
    return <div className={styles.loading}>Artist not found.</div>;
  }

  const isFollowing = followedArtists.includes(id);

  return (
    <div className={styles.page}>
      
      {/* 🎤 HERO SECTION */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${artist.image})` }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.name}>{artist.name}</h1>
          <p className={styles.genre}>{artist.genre}</p>

          <button
            className={styles.followBtn}
            onClick={() =>
              isFollowing
                ? unfollowArtist(id)
                : followArtist(id)
            }
          >
            {isFollowing ? "Following" : "Follow"}
          </button>

          {/* 🔗 NAVIGATION LINKS */}
          <div className={styles.navLinks}>
            <Link to={`/artist/${id}/songs`} className={styles.linkBtn}>
              View All Songs
            </Link>

            <Link to={`/artist/${id}/albums`} className={styles.linkBtn}>
              View All Albums
            </Link>

            <Link to="/followed-artists" className={styles.linkBtn}>
              Followed Artists
            </Link>
          </div>
        </div>
      </div>

      {/* 🎵 PREVIEW CONTENT */}
      <div className={styles.content}>
        <section>
          <h2>Popular Songs</h2>
          <ul className={styles.list}>
            {artist.songs.slice(0, 5).map(song => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Albums</h2>
          <ul className={styles.list}>
            {artist.albums.slice(0, 5).map(album => (
              <li key={album.id}>{album.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  artists: state.artist.artists,
  followedArtists: state.artist.followedArtists,
  isLoading: state.artist.isLoading
});

export default connect(mapStateToProps, {
  fetchArtists,
  followArtist,
  unfollowArtist
})(ArtistProfile);