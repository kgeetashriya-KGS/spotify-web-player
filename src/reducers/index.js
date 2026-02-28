import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { playlistReducer } from './playlistReducer';
import { artistDashboardReducer } from './artistDashboardReducer';
import songReducer from './songReducer';
import artistReducer from './artistReducer';

import { PLAYLIST } from "../data/index";
import { PLAYPAUSE, CHANGETRACK } from "../actions/index";

const INITIAL_STATE = {
  trackData: {
    trackKey: [0, 0],
    track: `${PLAYLIST[0].playlistData[0].link}`,
    trackName: `${PLAYLIST[0].playlistData[0].songName}`,
    trackImg: `${PLAYLIST[0].playlistData[0].songimg}`,
    trackArtist: `${PLAYLIST[0].playlistData[0].songArtist}`
  },
  isPlaying: false
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYPAUSE:
      return { ...state, isPlaying: action.payload };
    case CHANGETRACK:
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${PLAYLIST[action.payload[0]].playlistData[action.payload[1]].link}`,
          trackName: `${PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songName}`,
          trackImg: `${PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songimg}`,
          trackArtist: `${PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songArtist}`
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
  artistDashboard: artistDashboardReducer,
  player: playerReducer,
  songs: songReducer,   // ✅ THIS FIXES LIKED SONGS
  artist: artistReducer
});

export default rootReducer;