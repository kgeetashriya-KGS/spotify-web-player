// Auth Action Types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const SET_AUTH_LOADING = "SET_AUTH_LOADING";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

// Action Creators
export const loginUser = (userData) => {
  return { type: LOGIN_USER, payload: userData };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const signupUser = (userData) => {
  return { type: SIGNUP_USER, payload: userData };
};

export const setAuthLoading = (isLoading) => {
  return { type: SET_AUTH_LOADING, payload: isLoading };
};

export const setAuthError = (error) => {
  return { type: SET_AUTH_ERROR, payload: error };
};

export const clearAuthError = () => {
  return { type: CLEAR_AUTH_ERROR };
};