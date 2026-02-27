import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSongDetails } from '../actions/songActions';
import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import SearchPageCard from '../component/cards/searchpage-card';
import SongCardS from '../component/cards/song-card-s';
import SongDetailsModal from '../component/modals/song-details-modal';
import { SEARCHCARDS } from '../data/index';

import styles from "./search.module.css";

function Search(props){
    const [modalOpen, setModalOpen] = useState(false);

    const handleSongSelect = (song) => {
        props.setSongDetails(song);
        setModalOpen(true);
    };

    const hasSearchResults = props.searchResults && props.searchResults.length > 0;

    return (
        <div className={styles.SearchPage}>
            <Topnav search={true}/>

            {!hasSearchResults ? (
                <div className={styles.Search}>
                    <TitleM>Hepsine göz at</TitleM>
                    <div className={styles.SearchCardGrid}>
                        {SEARCHCARDS.map((card) => {
                            return (
                                <SearchPageCard 
                                    key={card.title}
                                    cardData={{
                                        bgcolor: card.bgcolor,
                                        title: card.title,
                                        imgurl: card.imgurl,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={styles.SongSearchResults}>
                    <TitleM>Şarkı Sonuçları ({props.searchResults.length})</TitleM>
                    <div className={styles.SongsGrid}>
                        {props.searchResults.map((song) => (
                            <div key={song.index} onClick={() => handleSongSelect(song)}>
                                <SongCardS data={song} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
        searchResults: state.songs.searchResults,
        currentSongDetails: state.songs.currentSongDetails,
    };
};

export default connect(mapStateToProps, { setSongDetails })(Search);