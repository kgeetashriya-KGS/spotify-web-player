import React from 'react';
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import IconButton from '../buttons/icon-button';
import * as Icons from '../icons';
import styles from './play-button.module.css';

function PlayButton({ isPlaying, isthisplay, changePlay }) {
  return (
    <div
      className={styles.playBtn}
      onClick={() => changePlay(!isPlaying)}
    >
      {isPlaying && isthisplay
        ? <IconButton icon={<Icons.Pause />} />
        : <IconButton icon={<Icons.Play />} />
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying
});

export default connect(mapStateToProps, { changePlay })(PlayButton);