import React from "react";
import { connect } from "react-redux";

import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m';
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';

import styles from "./home.module.css";

function Home({ artistDashboard }) {

    const artistAlbums = artistDashboard.albums || [];
    const artistSongs = artistDashboard.songs || [];

    return (
        <div className={styles.Home}>
            <div className={styles.HoverBg}></div>
            <div className={styles.Bg}></div>

            <Topnav />

            <div className={styles.Content}>

                {/* SECTION 1 — Artist Albums */}
                <section>
                    <div className={styles.SectionTitle}>
                        <TitleL>Your Albums</TitleL>
                    </div>

                    <div className={styles.SectionCards}>
                        {artistAlbums.length === 0 ? (
                            <p style={{ opacity: 0.6 }}>No albums yet</p>
                        ) : (
                            artistAlbums.map((album, i) => (
    <PlaylistCardS
        key={album.id}
        data={{
            title: album.title,
            imgUrl: album.albumArt || "https://via.placeholder.com/150",
            link: album.id,
            index: i
        }}
    />
))
                        )}
                    </div>
                </section>

                {/* SECTION 2 — Artist Songs */}
                <section>
                    <div className={styles.SectionTitle}>
                        <TitleM>Your Songs</TitleM>
                    </div>

                    <div className={styles.SectionCardsMedium}>
                        {artistSongs.length === 0 ? (
                            <p style={{ opacity: 0.6 }}>No songs uploaded</p>
                        ) : (
                            artistSongs.map((song, i) => (
    <PlaylistCardM
        key={song.id}
        data={{
            title: song.title,
            imgUrl: song.songArt || "https://via.placeholder.com/150",
            artist: "You",
            link: song.id,
            index: i
        }}
    />
))
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    artistDashboard: state.artistDashboard
});

export default connect(mapStateToProps)(Home);