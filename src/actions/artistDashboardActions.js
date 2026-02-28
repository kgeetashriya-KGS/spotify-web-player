// Artist Dashboard Action Types (for artist profile management)
export const SET_ARTIST_DASHBOARD = "SET_ARTIST_DASHBOARD";
export const UPDATE_ARTIST_DASHBOARD_PROFILE = "UPDATE_ARTIST_DASHBOARD_PROFILE";
export const CREATE_ALBUM = "CREATE_ALBUM";
export const UPDATE_ALBUM = "UPDATE_ALBUM";
export const DELETE_ALBUM = "DELETE_ALBUM";
export const CREATE_SONG = "CREATE_SONG";
export const UPDATE_SONG = "UPDATE_SONG";
export const DELETE_SONG = "DELETE_SONG";
export const SET_ARTIST_ANALYTICS = "SET_ARTIST_ANALYTICS";
export const SET_DASHBOARD_LOADING = "SET_DASHBOARD_LOADING";
export const SET_DASHBOARD_ERROR = "SET_DASHBOARD_ERROR";
export const CLEAR_DASHBOARD_ERROR = "CLEAR_DASHBOARD_ERROR";

// Action Creators
export const setArtistDashboard = (profileData) => {
  return { type: SET_ARTIST_DASHBOARD, payload: profileData };
};

export const updateArtistDashboardProfile = (profileData) => {
  return { type: UPDATE_ARTIST_DASHBOARD_PROFILE, payload: profileData };
};

export const createAlbum = (albumData) => {
  return { type: CREATE_ALBUM, payload: albumData };
};

export const updateAlbum = (albumId, albumData) => {
  return { type: UPDATE_ALBUM, payload: { albumId, albumData } };
};

export const deleteAlbum = (albumId) => {
  return { type: DELETE_ALBUM, payload: albumId };
};

export const createSong = (songData) => {
  return { type: CREATE_SONG, payload: songData };
};

export const updateSong = (songId, songData) => {
  return { type: UPDATE_SONG, payload: { songId, songData } };
};

export const deleteSong = (songId) => {
  return { type: DELETE_SONG, payload: songId };
};

export const setArtistAnalytics = (analyticsData) => {
  return { type: SET_ARTIST_ANALYTICS, payload: analyticsData };
};

export const setDashboardLoading = (isLoading) => {
  return { type: SET_DASHBOARD_LOADING, payload: isLoading };
};

export const setDashboardError = (error) => {
  return { type: SET_DASHBOARD_ERROR, payload: error };
};

export const clearDashboardError = () => {
  return { type: CLEAR_DASHBOARD_ERROR };
};