// Playlist Action Types
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const UPDATE_PLAYLIST_VISIBILITY = "UPDATE_PLAYLIST_VISIBILITY";
export const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";
export const REMOVE_SONG_FROM_PLAYLIST = "REMOVE_SONG_FROM_PLAYLIST";
export const SET_PLAYLISTS = "SET_PLAYLISTS";
export const SET_PUBLIC_PLAYLISTS = "SET_PUBLIC_PLAYLISTS";
export const SET_PLAYLIST_LOADING = "SET_PLAYLIST_LOADING";
export const SET_PLAYLIST_ERROR = "SET_PLAYLIST_ERROR";
export const CLEAR_PLAYLIST_ERROR = "CLEAR_PLAYLIST_ERROR";

// Action Creators
export const createPlaylist = (playlistData) => {
  return { type: CREATE_PLAYLIST, payload: playlistData };
};

export const deletePlaylist = (payload) => ({
  type: DELETE_PLAYLIST,
  payload
});

export const updatePlaylistVisibility = (playlistId, isPublic) => {
  return { type: UPDATE_PLAYLIST_VISIBILITY, payload: { playlistId, isPublic } };
};

export const addSongToPlaylist = (payload) => ({
  type: ADD_SONG_TO_PLAYLIST,
  payload
});

export const removeSongFromPlaylist = (playlistId, songId) => {
  return { type: REMOVE_SONG_FROM_PLAYLIST, payload: { playlistId, songId } };
};

export const setPlaylists = (playlists) => {
  return { type: SET_PLAYLISTS, payload: playlists };
};

export const setPublicPlaylists = (playlists) => {
  return { type: SET_PUBLIC_PLAYLISTS, payload: playlists };
};

export const setPlaylistLoading = (isLoading) => {
  return { type: SET_PLAYLIST_LOADING, payload: isLoading };
};

export const setPlaylistError = (error) => {
  return { type: SET_PLAYLIST_ERROR, payload: error };
};

export const clearPlaylistError = () => {
  return { type: CLEAR_PLAYLIST_ERROR };
};