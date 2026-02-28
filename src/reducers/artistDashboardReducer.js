import {
  SET_ARTIST_DASHBOARD,
  UPDATE_ARTIST_DASHBOARD_PROFILE,
  CREATE_ALBUM,
  DELETE_ALBUM,
  CREATE_SONG,
  DELETE_SONG,
  SET_ARTIST_ANALYTICS
} from "../actions/artistDashboardActions";

const getSavedState = () => {
  const saved = localStorage.getItem("artistDashboard");
  return saved ? JSON.parse(saved) : null;
};

const INITIAL_STATE = getSavedState() || {
  profile: {
    id: null,
    artistName: "",
    bio: "",
    profileImage: null,
    email: "",
    createdAt: null,
    followerCount: 0,
    isActive: true,
  },
  albums: [],
  songs: [],
  analytics: {
    totalStreams: 0,
    totalLikes: 0,
    totalFollowers: 0,
    monthlyStreams: [],
    topSongs: [],
  },
};

const saveToStorage = (state) => {
  localStorage.setItem("artistDashboard", JSON.stringify(state));
};

export const artistDashboardReducer = (state = INITIAL_STATE, action) => {
  let newState;

  switch (action.type) {

    case CREATE_ALBUM: {
      const newAlbum = {
        id: Date.now(),
        ...action.payload,
        albumArt:
          action.payload.albumArt ||
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        songs: []
      };

      newState = {
        ...state,
        albums: [...state.albums, newAlbum]
      };

      saveToStorage(newState);
      return newState;
    }

    case CREATE_SONG: {
      const numericAlbumId = action.payload.albumId
        ? Number(action.payload.albumId)
        : null;

      const newSong = {
        id: Date.now(),
        ...action.payload,
        albumId: numericAlbumId
      };

      newState = {
        ...state,
        songs: [...state.songs, newSong],
        albums: state.albums.map(album =>
          album.id === numericAlbumId
            ? { ...album, songs: [...album.songs, newSong.id] }
            : album
        )
      };

      saveToStorage(newState);
      return newState;
    }

    case DELETE_SONG: {
      newState = {
        ...state,
        songs: state.songs.filter(s => s.id !== action.payload),
        albums: state.albums.map(album => ({
          ...album,
          songs: album.songs.filter(id => id !== action.payload)
        }))
      };

      saveToStorage(newState);
      return newState;
    }

    case DELETE_ALBUM: {
      newState = {
        ...state,
        albums: state.albums.filter(a => a.id !== action.payload)
      };

      saveToStorage(newState);
      return newState;
    }

    case SET_ARTIST_ANALYTICS:
      newState = { ...state, analytics: action.payload };
      saveToStorage(newState);
      return newState;

    default:
      return state;
  }
};