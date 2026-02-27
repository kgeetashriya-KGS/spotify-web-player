import React from 'react';
import { useLocation } from 'react-router-dom';
import PrevPageBtn from '../buttons/prev-page-button';
import NextPageBtn from '../buttons/next-page-button';
import SearchBox from './search-box';
import styles from './topnav.module.css';

function Topnav() {
    const location = useLocation();

    return (
        <nav className={styles.Topnav}>
            <div className={styles.navigation}>
                <PrevPageBtn />
                <NextPageBtn />
            </div>
            
            {/* Show SearchBox ONLY if the URL is /search */}
            {location.pathname === '/search' && (
                <div className={styles.search}>
                    <SearchBox />
                </div>
            )}

            <div className={styles.authButtons}>
                {/* Your friend's existing profile/logout buttons */}
                <button className={styles.profileBtn}>User Profile</button>
            </div>
        </nav>
    );
}

export default Topnav;