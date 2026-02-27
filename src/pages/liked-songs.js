import React from 'react';
import { connect } from 'react-redux';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import SongCardM from '../component/cards/song-card-m';
import styles from './liked-songs.module.css'; // Assuming this CSS file exists

function LikedSongs({ songs, likedSongsIds }) {
    // Filter the main song list to ONLY include songs whose IDs are in the likedSongs array
    const likedSongsData = songs.filter(song => likedSongsIds.includes(song.id));

    return (
        <div className={styles.LikedSongsPage}>
            <Topnav />
            <div className={styles.Content}>
                <TitleL>Liked Songs</TitleL>
                
                <div className={styles.CardsGrid}>
                    {likedSongsData.length > 0 ? (
                        likedSongsData.map(song => (
                            <SongCardM key={song.id} cardData={song} />
                        ))
                    ) : (
                        <p className={styles.EmptyMessage}>You haven't liked any songs yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    songs: state.songs.songs || [],
    likedSongsIds: state.songs.likedSongs || []
});

export default connect(mapStateToProps)(LikedSongs);