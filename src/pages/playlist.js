import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack } from '../actions';
import { setSongDetails } from '../actions/songActions';

import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details';
import PlaylistTrack from '../component/playlist/playlist-track';
import * as Icons from '../component/icons';
import { PLAYLIST } from "../data/index";

import styles from './playlist.module.css';
import { useEffect } from 'react';

function PlaylistPage(props) {
  const { id } = useParams();

  const { artistDashboard, playlistsByUser, userId } = props;

  const staticPlaylist = PLAYLIST.find(item => item.link === id);

  const dynamicAlbum = artistDashboard.albums.find(
    album => String(album.id) === String(id)
  );

  const userPlaylist =
    playlistsByUser?.[userId]?.find(p => String(p.id) === String(id));

  let playlist;

  if (staticPlaylist) {
    playlist = staticPlaylist;
  } else if (dynamicAlbum) {
    playlist = {
      title: dynamicAlbum.title,
      playlistBg: dynamicAlbum.albumArt,
      playlistData: artistDashboard.songs
        .filter(song => song.albumId === dynamicAlbum.id)
        .map(song => ({
          songName: song.title,
          songArtist: artistDashboard.profile.artistName,
          songimg: song.songArt,
          trackTime: song.duration
        }))
    };
  } else if (userPlaylist) {
    playlist = {
      title: userPlaylist.name,
      playlistBg: "#181818",
      playlistData: userPlaylist.songs.map(song => ({
        songName: song.songName,
        songArtist: song.songArtist,
        songimg: song.songimg,
        trackTime: song.trackTime
      }))
    };
  }

  useEffect(() => {
    if (!playlist) return;

    document.documentElement.style.setProperty(
      '--hover-home-bg',
      playlist.playlistBg || "#181818"
    );
  }, [playlist]);

  if (!playlist) {
    return (
      <div style={{ color: "white", padding: "100px" }}>
        Playlist not found.
      </div>
    );
  }

  return (
    <div className={styles.PlaylistPage}>
      <div className={styles.gradientBg}></div>
      <div className={styles.gradientBgSoft}></div>
      <div className={styles.Bg}></div>

      <Topnav />

      <PlaylistDetails data={playlist} />

      <div className={styles.PlaylistIcons}>
        <PlayButton />
        <IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />} />
        <Icons.More className={styles.moreIcon} />
      </div>

      <div className={styles.ListHead}>
        <TextRegularM>#</TextRegularM>
        <TextRegularM>BAŞLIK</TextRegularM>
        <Icons.Time />
      </div>

      <div className={styles.PlaylistSongs}>
        {playlist.playlistData.map((song, index) => (
          <button
            key={index}
            onClick={() =>
              props.setSongDetails({
                id: song.songName,
                title: song.songName,
                artist: song.songArtist,
                album: playlist.title,
                coverart: song.songimg,
                duration: song.trackTime
              })
            }
            className={styles.SongBtn}
          >
            <PlaylistTrack
              data={{
                listType: "album",
                song: song,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  artistDashboard: state.artistDashboard,
  playlistsByUser: state.playlist.playlistsByUser,
  userId: state.auth?.user?.id
});

export default connect(
  mapStateToProps,
  { changeTrack, setSongDetails }
)(PlaylistPage);