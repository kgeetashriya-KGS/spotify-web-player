import {
  FETCH_SONGS,
  SEARCH_SONGS,
  SET_SONG_LOADING,
  SET_SONG_ERROR,
  CLEAR_SONG_ERROR,
  LIKE_SONG,
  UNLIKE_SONG,
  SET_SONG_DETAILS
} from '../actions/songActions';

import { CREATE_SONG } from '../actions/artistDashboardActions';

const initialState = {
  songs: [],
  searchResults: [],
  likedSongs: [],
  currentSongDetails: null,
  isLoading: false,
  error: null,
  searchQuery: ''
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_SONG: {
      const newSong = {
        id: action.payload.id || Date.now().toString(),
        title: action.payload.title,
        artist: "You",
        album: action.payload.albumId ? "Album" : "Single",
        coverart: action.payload.songArt || "https://via.placeholder.com/150",
        duration: action.payload.duration
      };

      return {
        ...state,
        songs: [...state.songs, newSong],
        searchResults: [...state.searchResults, newSong]
      };
    }

    case SET_SONG_DETAILS:
      return {
        ...state,
        currentSongDetails: action.payload
      };

    case LIKE_SONG:
      return {
        ...state,
        likedSongs: [...state.likedSongs, action.payload]
      };

    case UNLIKE_SONG:
      return {
        ...state,
        likedSongs: state.likedSongs.filter(id => id !== action.payload)
      };

    case SEARCH_SONGS:
      const filtered = state.songs.filter(song =>
        song.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchResults: filtered
      };

    case SET_SONG_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_SONG_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_SONG_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default songReducer;