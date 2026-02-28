import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import TitleM from '../component/text/title-m';
import Topnav from '../component/topnav/topnav';
import PlaylistCardM from '../component/cards/playlist-card-m';
import styles from "./library.module.css";

function Library({ artistDashboard }) {

    const artistAlbums = artistDashboard.albums;
    const artistSongs = artistDashboard.songs;

    return (
        <div className={styles.LibPage}>
            <Topnav tabButtons={true} />

            <div className={styles.Library}>
                <Route exact path="/library">
                    <div>
                        <TitleM>Your Albums</TitleM>
                        <div className={styles.Grid}>
                            {artistAlbums.map(album => (
                                <PlaylistCardM
                                    key={album.id}
                                    data={{
                                        title: album.title,
                                        coverart: album.albumArt,
                                        type: "album"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Route>

                <Route path="/library/albums">
                    <div>
                        <TitleM>Your Albums</TitleM>
                        <div className={styles.Grid}>
                            {artistAlbums.map(album => (
                                <PlaylistCardM
                                    key={album.id}
                                    data={{
                                        title: album.title,
                                        coverart: album.albumArt,
                                        type: "album"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Route>

                <Route path="/library/artists">
                    <div>
                        <TitleM>Your Songs</TitleM>
                        <div className={styles.Grid}>
                            {artistSongs.map(song => (
                                <PlaylistCardM
                                    key={song.id}
                                    data={{
                                        title: song.title,
                                        coverart: song.songArt,
                                        type: "song"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Route>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    artistDashboard: state.artistDashboard
});

export default connect(mapStateToProps)(Library);