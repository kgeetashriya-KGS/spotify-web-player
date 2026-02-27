// ACTION TYPES
export const FETCH_ARTISTS = "FETCH_ARTISTS";
export const SELECT_ARTIST = "SELECT_ARTIST";
export const FOLLOW_ARTIST = "FOLLOW_ARTIST";
export const UNFOLLOW_ARTIST = "UNFOLLOW_ARTIST";
export const SET_ARTIST_LOADING = "SET_ARTIST_LOADING";
export const SET_ARTIST_ERROR = "SET_ARTIST_ERROR";
export const CLEAR_ARTIST_ERROR = "CLEAR_ARTIST_ERROR";

// Dummy Artist Data (Structured Cleanly)
const dummyArtists = [
  {
    id: "a1",
    name: "Queen",
    genre: "Rock",
    image: "https://via.placeholder.com/200",
    followers: 1200000,
    songs: [
      { id: "1", title: "Bohemian Rhapsody" },
      { id: "4", title: "Another One Bites the Dust" }
    ],
    albums: [
      { id: "al1", title: "A Night at the Opera" }
    ]
  },
  {
    id: "a2",
    name: "Ed Sheeran",
    genre: "Pop",
    image: "https://via.placeholder.com/200",
    followers: 980000,
    songs: [
      { id: "3", title: "Shape of You" }
    ],
    albums: [
      { id: "al2", title: "Divide" }
    ]
  }
];

// ACTION CREATORS

export const fetchArtists = () => (dispatch) => {
  dispatch({ type: SET_ARTIST_LOADING, payload: true });

  // Simulate API delay
  setTimeout(() => {
    dispatch({ type: FETCH_ARTISTS, payload: dummyArtists });
  }, 500);
};

export const selectArtist = (artist) => ({
  type: SELECT_ARTIST,
  payload: artist
});

export const followArtist = (artistId) => ({
  type: FOLLOW_ARTIST,
  payload: artistId
});

export const unfollowArtist = (artistId) => ({
  type: UNFOLLOW_ARTIST,
  payload: artistId
});