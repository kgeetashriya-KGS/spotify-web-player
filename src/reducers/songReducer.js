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

// --- Dummy Songs ---
const dummySongs = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', coverart: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', coverart: 'https://via.placeholder.com/150/0000FF/808080' },
  { id: '3', title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', coverart: 'https://via.placeholder.com/150/FF0000/FFFFFF' }
];

const initialState = {
  songs: dummySongs,
  searchResults: dummySongs,
  likedSongs: [],              // Stores IDs
  currentSongDetails: null,    // For modal
  isLoading: false,
  error: null,
  searchQuery: ''
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_SONG_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_SONG_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case CLEAR_SONG_ERROR:
      return {
        ...state,
        error: null
      };

    case FETCH_SONGS:
      return {
        ...state,
        songs: action.payload,
        searchResults: action.payload,
        isLoading: false
      };

    case SEARCH_SONGS: {
      const query = action.payload;
      const lowerQuery = query.toLowerCase();

      const filtered = state.songs.filter(song =>
        song.title?.toLowerCase().includes(lowerQuery) ||
        song.artist?.toLowerCase().includes(lowerQuery)
      );

      return {
        ...state,
        searchQuery: query,
        searchResults: filtered
      };
    }

    case LIKE_SONG:
      if (!state.likedSongs.includes(action.payload)) {
        return {
          ...state,
          likedSongs: [...state.likedSongs, action.payload]
        };
      }
      return state;

    case UNLIKE_SONG:
      return {
        ...state,
        likedSongs: state.likedSongs.filter(id => id !== action.payload)
      };

    case SET_SONG_DETAILS:
      return {
        ...state,
        currentSongDetails: action.payload
      };

    default:
      return state;
  }
};

export default songReducer;