import React from 'react';
import { connect } from 'react-redux';
import Topnav from '../component/topnav/topnav';
import SearchpageCard from '../component/cards/searchpage-card';
import TitleM from '../component/text/title-m';
import styles from './search.module.css';

function Search({ searchResults, searchQuery }) {
    return (
        <div className={styles.SearchPage}>
            <Topnav />
            <div className={styles.content}>
                <TitleM>{searchQuery ? `Results for "${searchQuery}"` : "Browse All"}</TitleM>
                <div className={styles.grid}>
                    {searchResults.map(song => (
                        <SearchpageCard key={song.id} cardData={song} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    searchResults: state.songs.searchResults,
    searchQuery: state.songs.searchQuery
});

export default connect(mapStateToProps)(Search);