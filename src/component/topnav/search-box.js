import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchSongs } from '../../actions/songActions';
import * as Icons from '../icons';
import styles from './search-box.module.css';

function SearchBox({ searchSongs }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        searchSongs(value); // Dispatches to Redux immediately on type
    };

    return (
        <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
                <Icons.Search />
            </span>
            <input
                type="text"
                placeholder="Artists, songs, or podcasts"
                value={query}
                onChange={handleSearch}
                className={styles.input}
                maxLength="80"
            />
        </div>
    );
}

export default connect(null, { searchSongs })(SearchBox);