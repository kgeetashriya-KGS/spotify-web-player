import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { likeSong, unlikeSong, setSongDetails } from '../../actions/songActions';
import TextBoldL from '../text/text-bold-l';
import TextRegularM from '../text/text-regular-m';

import styles from "./song-card-m.module.css";

function SongCardM(props) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(props.likedSongIds.has(props.data.index));
  }, [props.data.index, props.likedSongIds]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      props.unlikeSong(props.data.index);
    } else {
      props.likeSong(props.data.index);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.setSongDetails(props.data);
  };

  return (
    <div className={styles.SongCardMBox}>
      <div className={styles.SongCardM} onClick={handleClick}>
        <div className={styles.ImgBox}>
          <img src={props.data.songimg} alt={props.data.songName} />
        </div>
        <div className={styles.Title}>
          <TextBoldL>{props.data.songName}</TextBoldL>
          <TextRegularM>{props.data.songArtist}</TextRegularM>
        </div>
      </div>
      <button
        onClick={handleLike}
        className={`${styles.LikeBtn} ${isLiked ? styles.Liked : ''}`}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    likedSongIds: state.songs.likedSongIds,
  };
};

export default connect(mapStateToProps, { likeSong, unlikeSong, setSongDetails })(SongCardM);