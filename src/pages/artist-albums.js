import React from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./artist-subpage.module.css";

function ArtistAlbums({ artistDashboard }) {
  const { id } = useParams();

  // Only show albums for logged-in artist
  if (artistDashboard.profile.id !== id) {
    return <div className={styles.loading}>Artist not found.</div>;
  }

  return (
    <div className={styles.page}>
      <h1>{artistDashboard.profile.artistName} — Albums</h1>

      <ul className={styles.list}>
        {artistDashboard.albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>
              {album.title}
            </Link>
          </li>
        ))}
      </ul>

      <Link to={`/artist/${id}`} className={styles.back}>
        ← Back to Profile
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  artistDashboard: state.artistDashboard
});

export default connect(mapStateToProps)(ArtistAlbums);