import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST_VISIBILITY,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  SET_PLAYLIST_LOADING,
  SET_PLAYLIST_ERROR,
  CLEAR_PLAYLIST_ERROR,
} from "../actions/playlistActions";

const loadPlaylists = () => {
  try {
    const saved = localStorage.getItem("userPlaylists");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const INITIAL_STATE = {
  playlistsByUser: loadPlaylists(), // 🔥 Object keyed by userId
  isLoading: false,
  error: null,
};

const saveToStorage = (data) => {
  localStorage.setItem("userPlaylists", JSON.stringify(data));
};

export const playlistReducer = (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {

    case CREATE_PLAYLIST: {
      const { userId } = action.payload;

      const newPlaylist = {
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description || "",
        isPublic: action.payload.isPublic || false,
        songs: [],
        createdAt: new Date().toISOString(),
      };

      const userPlaylists = state.playlistsByUser[userId] || [];

      const updated = {
        ...state.playlistsByUser,
        [userId]: [...userPlaylists, newPlaylist]
      };

      saveToStorage(updated);

      return { ...state, playlistsByUser: updated };
    }

    case DELETE_PLAYLIST: {
      const { userId, playlistId } = action.payload;

      const updated = {
        ...state.playlistsByUser,
        [userId]: state.playlistsByUser[userId].filter(
          p => p.id !== playlistId
        )
      };

      saveToStorage(updated);
      return { ...state, playlistsByUser: updated };
    }

    case ADD_SONG_TO_PLAYLIST: {
      const { userId, playlistId, song } = action.payload;

      const updated = {
        ...state.playlistsByUser,
        [userId]: state.playlistsByUser[userId].map(p =>
          p.id === playlistId
            ? { ...p, songs: [...p.songs, song] }
            : p
        )
      };

      saveToStorage(updated);
      return { ...state, playlistsByUser: updated };
    }

    case REMOVE_SONG_FROM_PLAYLIST: {
      const { userId, playlistId, songId } = action.payload;

      const updated = {
        ...state.playlistsByUser,
        [userId]: state.playlistsByUser[userId].map(p =>
          p.id === playlistId
            ? { ...p, songs: p.songs.filter(s => s.id !== songId) }
            : p
        )
      };

      saveToStorage(updated);
      return { ...state, playlistsByUser: updated };
    }

    case SET_PLAYLIST_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_PLAYLIST_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_PLAYLIST_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};