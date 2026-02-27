import React from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./artist-subpage.module.css";

function ArtistSongs({ artists }) {
  const { id } = useParams();

  const artist = artists.find(a => a.id === id);

  if (!artist) return <div className={styles.loading}>Artist not found.</div>;

  return (
    <div className={styles.page}>
      <h1>{artist.name} — Songs</h1>

      <ul className={styles.list}>
        {artist.songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>

      <Link to={`/artist/${id}`} className={styles.back}>
        ← Back to Profile
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  artists: state.artist.artists
});

export default connect(mapStateToProps)(ArtistSongs);