import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
} from "../actions/authActions";

const loadAuth = () => {
  const saved = localStorage.getItem("authState");
  return saved ? JSON.parse(saved) : null;
};

const INITIAL_AUTH_STATE =
  loadAuth() || {
    isAuthenticated: false,
    user: null,
    userType: null,
    token: null,
  };

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {

  switch (action.type) {

    case LOGIN_USER:
    case SIGNUP_USER: {
      const newState = {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType,
        token: action.payload.token,
      };
      localStorage.setItem("authState", JSON.stringify(newState));
      return newState;
    }

    case LOGOUT_USER:
      localStorage.removeItem("authState");
      return INITIAL_AUTH_STATE;

    default:
      return state;
  }
};