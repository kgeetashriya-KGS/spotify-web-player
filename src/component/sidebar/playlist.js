import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from '../icons';
import styles from './playlist.module.css';

function Playlist() {
    return (
        <div className={styles.Playlist}>
            <Link to="/liked-songs" className={styles.link}>
                <div className={styles.item}>
                    <div className={styles.iconBox}>
                        <Icons.LikeActive />
                    </div>
                    <span>Liked Songs</span>
                </div>
            </Link>
            {/* Other playlist items can go here */}
        </div>
    );
}

export default Playlist;