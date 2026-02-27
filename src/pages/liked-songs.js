import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSongDetails, fetchLikedSongs } from '../actions/songActions';
import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import SongCardM from '../component/cards/song-card-m';
import SongDetailsModal from '../component/modals/song-details-modal';
import { SONGS } from '../data/songs';

import styles from "./liked-songs.module.css";

function LikedSongs(props) {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Get all songs user has liked
        const likedSongsList = SONGS.filter(song => props.likedSongIds.has(song.index));
        props.fetchLikedSongs(likedSongsList);
    }, [props.likedSongIds]);

    const handleSongSelect = (song) => {
        props.setSongDetails(song);
        setModalOpen(true);
    };

    return (
        <div className={styles.LikedSongsPage}>
            <Topnav />
            
            <div className={styles.Content}>
                <div className={styles.Header}>
                    <TitleL>❤️ Beğenilen Şarkılar</TitleL>
                </div>

                {props.likedSongs.length === 0 ? (
                    <div className={styles.EmptyState}>
                        <p>Henüz beğendiğin şarkı yok.</p>
                        <p>Şarkıları keşfet ve beğenmeye başla!</p>
                    </div>
                ) : (
                    <div className={styles.SongsList}>
                        {props.likedSongs.map((song) => (
                            <div 
                                key={song.index} 
                                className={styles.SongItem}
                                onClick={() => handleSongSelect(song)}
                            >
                                <SongCardM data={song} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <SongDetailsModal 
                song={props.currentSongDetails}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        likedSongs: state.songs.likedSongs,
        likedSongIds: state.songs.likedSongIds,
        currentSongDetails: state.songs.currentSongDetails,
    };
};

export default connect(mapStateToProps, { setSongDetails, fetchLikedSongs })(LikedSongs);