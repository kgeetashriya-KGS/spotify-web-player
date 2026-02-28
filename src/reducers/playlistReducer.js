import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST_VISIBILITY,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  SET_PLAYLISTS,
  SET_PUBLIC_PLAYLISTS,
  SET_PLAYLIST_LOADING,
  SET_PLAYLIST_ERROR,
  CLEAR_PLAYLIST_ERROR,
} from "../actions/playlistActions";

const INITIAL_PLAYLIST_STATE = {
  myPlaylists: [],
  publicPlaylists: [],
  isLoading: false,
  error: null,
};

export const playlistReducer = (state = INITIAL_PLAYLIST_STATE, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST: {
      const newPlaylist = {
        id: Date.now(),
        userId: action.payload.userId,
        name: action.payload.name,
        description: action.payload.description || "",
        isPublic: action.payload.isPublic || false,
        songs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        myPlaylists: [...state.myPlaylists, newPlaylist],
        error: null,
      };
    }

    case DELETE_PLAYLIST:
      return {
        ...state,
        myPlaylists: state.myPlaylists.filter(
          (playlist) => playlist.id !== action.payload
        ),
        error: null,
      };

    case UPDATE_PLAYLIST_VISIBILITY: {
      const updatedPlaylists = state.myPlaylists.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          return {
            ...playlist,
            isPublic: action.payload.isPublic,
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      });
      return {
        ...state,
        myPlaylists: updatedPlaylists,
        error: null,
      };
    }

    case ADD_SONG_TO_PLAYLIST: {
      const updatedPlaylists = state.myPlaylists.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          const songExists = playlist.songs.some(
            (song) => song.id === action.payload.song.id
          );
          if (songExists) {
            return playlist;
          }
          return {
            ...playlist,
            songs: [...playlist.songs, action.payload.song],
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      });
      return {
        ...state,
        myPlaylists: updatedPlaylists,
        error: null,
      };
    }

    case REMOVE_SONG_FROM_PLAYLIST: {
      const updatedPlaylists = state.myPlaylists.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter(
              (song) => song.id !== action.payload.songId
            ),
            updatedAt: new Date().toISOString(),
          };
        }
        return playlist;
      });
      return {
        ...state,
        myPlaylists: updatedPlaylists,
        error: null,
      };
    }

    case SET_PLAYLISTS:
      return {
        ...state,
        myPlaylists: action.payload,
        isLoading: false,
        error: null,
      };

    case SET_PUBLIC_PLAYLISTS:
      return {
        ...state,
        publicPlaylists: action.payload,
        isLoading: false,
        error: null,
      };

    case SET_PLAYLIST_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_PLAYLIST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_PLAYLIST_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};