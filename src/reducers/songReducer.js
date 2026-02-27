import {
  FETCH_SONGS,
  SEARCH_SONGS,
  SET_SONG_LOADING,
  SET_SONG_ERROR,
  CLEAR_SONG_ERROR,
  LIKE_SONG,
  UNLIKE_SONG,
  FETCH_LIKED_SONGS,
  SET_SONG_DETAILS,
} from "../actions/songActions";

const INITIAL_SONG_STATE = {
  allSongs: [],
  searchResults: [],
  likedSongs: [],
  likedSongIds: new Set(),
  currentSongDetails: null,
  isLoading: false,
  error: null,
};

export const songReducer = (state = INITIAL_SONG_STATE, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        allSongs: action.payload,
        isLoading: false,
        error: null,
      };

    case SEARCH_SONGS:
      const query = action.payload.toLowerCase();
      const filtered = state.allSongs.filter(
        (song) =>
          song.songName.toLowerCase().includes(query) ||
          song.songArtist.toLowerCase().includes(query)
      );
      return {
        ...state,
        searchResults: filtered,
      };

    case SET_SONG_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_SONG_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_SONG_ERROR:
      return {
        ...state,
        error: null,
      };

    case LIKE_SONG:
      const newLikedIds = new Set(state.likedSongIds);
      newLikedIds.add(action.payload);
      return {
        ...state,
        likedSongIds: newLikedIds,
      };

    case UNLIKE_SONG:
      const updatedLikedIds = new Set(state.likedSongIds);
      updatedLikedIds.delete(action.payload);
      return {
        ...state,
        likedSongIds: updatedLikedIds,
      };

    case FETCH_LIKED_SONGS:
      const likedIds = new Set(action.payload.map((song) => song.index));
      return {
        ...state,
        likedSongs: action.payload,
        likedSongIds: likedIds,
      };

    case SET_SONG_DETAILS:
      return {
        ...state,
        currentSongDetails: action.payload,
      };

    default:
      return state;
  }
};