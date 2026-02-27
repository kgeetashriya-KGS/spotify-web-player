import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  SET_AUTH_LOADING,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from "../actions/authActions";

const INITIAL_AUTH_STATE = {
  isAuthenticated: false,
  user: null,
  userType: null,
  token: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {
  let newState;

  switch (action.type) {
    case LOGIN_USER:
      newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
      // Save to localStorage
      localStorage.setItem('authState', JSON.stringify(newState));
      return newState;

    case LOGOUT_USER:
      newState = {
        ...state,
        isAuthenticated: false,
        user: null,
        userType: null,
        token: null,
        error: null,
      };
      // Remove from localStorage
      localStorage.removeItem('authState');
      return newState;

    case SIGNUP_USER:
      newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
      // Save to localStorage
      localStorage.setItem('authState', JSON.stringify(newState));
      return newState;

    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      // Check localStorage on app load
      const savedAuth = localStorage.getItem('authState');
      if (savedAuth) {
        return JSON.parse(savedAuth);
      }
      return state;
  }
};