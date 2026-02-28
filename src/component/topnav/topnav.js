import React from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import PrevPageBtn from '../buttons/prev-page-button';
import NextPageBtn from '../buttons/next-page-button';
import SearchBox from './search-box';
import styles from './topnav.module.css';

function Topnav() {
    const location = useLocation();
    const auth = useSelector(state => state.auth);

    const handleNavigation = (path) => {
        window.location.href = path;
    };

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
                {/* Regular User Buttons */}
                {auth.isAuthenticated && auth.userType === 'user' && (
                    <>
                        <button 
                            className={styles.playlistsBtn}
                            onClick={() => handleNavigation('/my-playlists')}
                        >
                            🎵 My Playlists
                        </button>
                        <button 
                            className={styles.discoverBtn}
                            onClick={() => handleNavigation('/discover-playlists')}
                        >
                            🔍 Discover
                        </button>
                    </>
                )}

                {/* Artist Buttons */}
                {auth.isAuthenticated && auth.userType === 'artist' && (
                    <>
                        <button 
                            className={styles.artistBtn}
                            onClick={() => handleNavigation('/artist/profile')}
                        >
                            🎤 My Profile
                        </button>
                        <button 
                            className={styles.dashboardBtn}
                            onClick={() => handleNavigation('/artist/dashboard')}
                        >
                            📊 Dashboard
                        </button>
                    </>
                )}

                {/* Profile Button (for everyone authenticated) */}
                {auth.isAuthenticated && (
                    <button 
                        className={styles.profileBtn}
                        onClick={() => handleNavigation('/profile')}
                    >
                        👤 Profile
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Topnav;