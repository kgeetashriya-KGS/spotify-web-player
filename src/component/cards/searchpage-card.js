import React from 'react';
import { connect } from 'react-redux';
import { likeSong, unlikeSong } from '../../actions/songActions';
import * as Icons from '../icons';
import styles from './searchpage-card.module.css';

function SearchpageCard({ cardData, likedSongs, likeSong, unlikeSong }) {
    const isLiked = likedSongs.includes(cardData.id);

    const toggleLike = (e) => {
        e.stopPropagation();
        isLiked ? unlikeSong(cardData.id) : likeSong(cardData.id);
    };

    return (
        <div className={styles.card}>
            <img src={cardData.coverart} alt={cardData.title} />
            <div className={styles.details}>
                <p>{cardData.title}</p>
                <span>{cardData.artist}</span>
            </div>
            <button onClick={toggleLike} className={styles.likeBtn}>
                {isLiked ? <Icons.LikeActive /> : <Icons.Like />}
            </button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    likedSongs: state.songs.likedSongs
});

export default connect(mapStateToProps, { likeSong, unlikeSong })(SearchpageCard);