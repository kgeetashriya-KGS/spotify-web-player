import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchSongs, fetchSongs } from '../../actions/songActions';
import { SONGS } from '../../data/songs';
import * as Icons from '../icons';
import styles from './search-box.module.css';

function SearchBox(props) {
    const history = useHistory();
    const [inputValue, setInputValue] = useState('');

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setInputValue(query);

        if (query.trim().length > 0) {
            props.searchSongs(query);
            history.push('/search');
        }
    };

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <div className={styles.SeachBox}>
            <Icons.Search />
            <input 
                placeholder="Sanatçılar, şarkılar veya podcast'ler" 
                maxLength="80"
                value={inputValue}
                onChange={handleSearchChange}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.songs.searchResults,
    };
};

export default connect(mapStateToProps, { searchSongs, fetchSongs })(SearchBox);