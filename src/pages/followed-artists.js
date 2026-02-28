import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArtists } from "../actions/artistActions";
import styles from "./artist-subpage.module.css";

function FollowedArtists({ artists, followedArtists, fetchArtists }) {

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const followed = artists.filter(a =>
    followedArtists.includes(a.id)
  );

  return (
    <div className={styles.page}>
      <h1>Followed Artists</h1>

      {followed.length === 0 && (
        <p>You are not following any artists yet.</p>
      )}

      <ul className={styles.list}>
        {followed.map(artist => (
          <li key={artist.id}>
            <Link to={`/artist/${artist.id}`}>
              {artist.name} ({artist.followers})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  artists: state.artist.artists,
  followedArtists: state.artist.followedArtists
});

export default connect(mapStateToProps, { fetchArtists })(FollowedArtists);