// Song Action Types
export const FETCH_SONGS = "FETCH_SONGS";
export const SEARCH_SONGS = "SEARCH_SONGS";
export const SET_SONG_LOADING = "SET_SONG_LOADING";
export const SET_SONG_ERROR = "SET_SONG_ERROR";
export const CLEAR_SONG_ERROR = "CLEAR_SONG_ERROR";
export const LIKE_SONG = "LIKE_SONG";
export const UNLIKE_SONG = "UNLIKE_SONG";
export const FETCH_LIKED_SONGS = "FETCH_LIKED_SONGS";
export const SET_SONG_DETAILS = "SET_SONG_DETAILS";

// Action Creators
export const fetchSongs = (songs) => {
  return { type: FETCH_SONGS, payload: songs };
};

export const searchSongs = (query) => {
  return { type: SEARCH_SONGS, payload: query };
};

export const setSongLoading = (isLoading) => {
  return { type: SET_SONG_LOADING, payload: isLoading };
};

export const setSongError = (error) => {
  return { type: SET_SONG_ERROR, payload: error };
};

export const clearSongError = () => {
  return { type: CLEAR_SONG_ERROR };
};

export const likeSong = (songId) => {
  return { type: LIKE_SONG, payload: songId };
};

export const unlikeSong = (songId) => {
  return { type: UNLIKE_SONG, payload: songId };
};

export const fetchLikedSongs = (songs) => {
  return { type: FETCH_LIKED_SONGS, payload: songs };
};

export const setSongDetails = (song) => {
  return { type: SET_SONG_DETAILS, payload: song };
};