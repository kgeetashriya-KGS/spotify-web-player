import {
  FETCH_ARTISTS,
  SELECT_ARTIST,
  FOLLOW_ARTIST,
  UNFOLLOW_ARTIST,
  SET_ARTIST_LOADING,
  SET_ARTIST_ERROR,
  CLEAR_ARTIST_ERROR
} from "../actions/artistActions";

const initialState = {
  artists: [],
  selectedArtist: null,
  followedArtists: JSON.parse(localStorage.getItem("followedArtists")) || [],
  isLoading: false,
  error: null
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ARTIST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case FETCH_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        isLoading: false
      };

    case SELECT_ARTIST:
      return {
        ...state,
        selectedArtist: action.payload
      };

    case FOLLOW_ARTIST:
      if (!state.followedArtists.includes(action.payload)) {
        return {
          ...state,
          followedArtists: [...state.followedArtists, action.payload]
        };
      }
      return state;

    case UNFOLLOW_ARTIST:
      return {
        ...state,
        followedArtists: state.followedArtists.filter(
          id => id !== action.payload
        )
      };

    case SET_ARTIST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case CLEAR_ARTIST_ERROR:
      return {
        ...state,
        error: null
      };
      case FOLLOW_ARTIST:
  const updatedFollow = [...state.followedArtists, action.payload];
  localStorage.setItem("followedArtists", JSON.stringify(updatedFollow));
  return {
    ...state,
    followedArtists: updatedFollow
  };

case UNFOLLOW_ARTIST:
  const filtered = state.followedArtists.filter(
    id => id !== action.payload
  );
  localStorage.setItem("followedArtists", JSON.stringify(filtered));
  return {
    ...state,
    followedArtists: filtered
  };

    default:
      return state;
  }
};

export default artistReducer;