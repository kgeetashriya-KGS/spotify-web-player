import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArtists } from "../actions/artistActions";
import styles from "./artists.module.css";

function Artists({ artists, fetchArtists }) {

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <div className={styles.page}>
      <h1>Artists</h1>

      <div className={styles.grid}>
        {artists.map(artist => (
          <Link
            to={`/artist/${artist.id}`}
            key={artist.id}
            className={styles.card}
          >
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
            <p>{artist.genre}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  artists: state.artist.artists
});

export default connect(mapStateToProps, { fetchArtists })(Artists);