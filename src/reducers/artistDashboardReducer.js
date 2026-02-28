import {
  SET_ARTIST_DASHBOARD,
  UPDATE_ARTIST_DASHBOARD_PROFILE,
  CREATE_ALBUM,
  UPDATE_ALBUM,
  DELETE_ALBUM,
  CREATE_SONG,
  UPDATE_SONG,
  DELETE_SONG,
  SET_ARTIST_ANALYTICS,
  SET_DASHBOARD_LOADING,
  SET_DASHBOARD_ERROR,
  CLEAR_DASHBOARD_ERROR,
} from "../actions/artistDashboardActions";

const INITIAL_DASHBOARD_STATE = {
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
  isLoading: false,
  error: null,
};

export const artistDashboardReducer = (state = INITIAL_DASHBOARD_STATE, action) => {
  switch (action.type) {
    case SET_ARTIST_DASHBOARD:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
      };

    case UPDATE_ARTIST_DASHBOARD_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
        isLoading: false,
        error: null,
      };

    case CREATE_ALBUM: {
      const newAlbum = {
        id: Date.now(),
        artistId: state.profile.id,
        title: action.payload.title,
        releaseDate: action.payload.releaseDate,
        description: action.payload.description || "",
        albumArt: action.payload.albumArt || null,
        songs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        albums: [...state.albums, newAlbum],
        error: null,
      };
    }

    case UPDATE_ALBUM:
      return {
        ...state,
        albums: state.albums.map((album) => {
          if (album.id === action.payload.albumId) {
            return {
              ...album,
              ...action.payload.albumData,
              updatedAt: new Date().toISOString(),
            };
          }
          return album;
        }),
        error: null,
      };

    case DELETE_ALBUM:
      return {
        ...state,
        albums: state.albums.filter(
          (album) => album.id !== action.payload
        ),
        songs: state.songs.filter(
          (song) => song.albumId !== action.payload
        ),
        error: null,
      };

    case CREATE_SONG: {
      const newSong = {
        id: Date.now(),
        artistId: state.profile.id,
        albumId: action.payload.albumId || null,
        title: action.payload.title,
        duration: action.payload.duration,
        songArt: action.payload.songArt || null,
        audioFile: action.payload.audioFile || null,
        releaseDate: action.payload.releaseDate,
        description: action.payload.description || "",
        likes: 0,
        plays: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        songs: [...state.songs, newSong],
        albums: state.albums.map((album) => {
          if (album.id === action.payload.albumId) {
            return {
              ...album,
              songs: [...album.songs, newSong.id],
            };
          }
          return album;
        }),
        error: null,
      };
    }

    case UPDATE_SONG:
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.id === action.payload.songId) {
            return {
              ...song,
              ...action.payload.songData,
              updatedAt: new Date().toISOString(),
            };
          }
          return song;
        }),
        error: null,
      };

    case DELETE_SONG:
      return {
        ...state,
        songs: state.songs.filter(
          (song) => song.id !== action.payload
        ),
        albums: state.albums.map((album) => ({
          ...album,
          songs: album.songs.filter((songId) => songId !== action.payload),
        })),
        error: null,
      };

    case SET_ARTIST_ANALYTICS:
      return {
        ...state,
        analytics: action.payload,
        isLoading: false,
        error: null,
      };

    case SET_DASHBOARD_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_DASHBOARD_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};