import React from 'react';
import { connect } from 'react-redux';
import { likeSong, unlikeSong, setSongDetails } from '../../actions/songActions';
import * as Icons from '../icons';
import styles from './song-card-m.module.css';

function SongCardM({ cardData, likedSongs, likeSong, unlikeSong, setSongDetails }) {
    
    const isLiked = likedSongs.includes(cardData.id);

    const handleLikeToggle = (e) => {
        e.stopPropagation();
        if (isLiked) {
            unlikeSong(cardData.id);
        } else {
            likeSong(cardData.id);
        }
    };

    const handleOpenModal = () => {
        setSongDetails(cardData);
    };

    return (
        <div className={styles.SongCardMBox}>
            <div className={styles.SongCardM} onClick={handleOpenModal}>
                <div className={styles.ImgBox}>
                    <img src={cardData.coverart} alt={cardData.title} />
                </div>

                <div className={styles.Title}>
                    <p>{cardData.title}</p>
                    <p>{cardData.artist}</p>
                </div>
            </div>

            <button 
                className={`${styles.LikeBtn} ${isLiked ? styles.Liked : ''}`}
                onClick={handleLikeToggle}
            >
                {isLiked ? <Icons.LikeActive /> : <Icons.Like />}
            </button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    likedSongs: state.songs.likedSongs
});

export default connect(mapStateToProps, { likeSong, unlikeSong, setSongDetails })(SongCardM);