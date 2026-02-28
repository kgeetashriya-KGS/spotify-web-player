import {
  FETCH_ARTISTS,
  SELECT_ARTIST,
  FOLLOW_ARTIST,
  UNFOLLOW_ARTIST
} from "../actions/artistActions";

const loadFollowed = () => {
  return JSON.parse(localStorage.getItem("followedArtists")) || [];
};

const initialState = {
  artists: [],
  selectedArtist: null,
  followedArtists: loadFollowed(),
};

const saveFollowed = (data) => {
  localStorage.setItem("followedArtists", JSON.stringify(data));
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ARTISTS:
      return { ...state, artists: action.payload };

    case SELECT_ARTIST:
      return { ...state, selectedArtist: action.payload };

    case FOLLOW_ARTIST: {
      if (state.followedArtists.includes(action.payload)) return state;

      const updated = [...state.followedArtists, action.payload];
      saveFollowed(updated);

      return {
        ...state,
        followedArtists: updated,
        artists: state.artists.map(a =>
          a.id === action.payload
            ? { ...a, followers: a.followers + 1 }
            : a
        )
      };
    }

    case UNFOLLOW_ARTIST: {
      const updated = state.followedArtists.filter(
        id => id !== action.payload
      );

      saveFollowed(updated);

      return {
        ...state,
        followedArtists: updated,
        artists: state.artists.map(a =>
          a.id === action.payload
            ? { ...a, followers: a.followers - 1 }
            : a
        )
      };
    }

    default:
      return state;
  }
};

export default artistReducer;