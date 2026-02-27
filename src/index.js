import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { playerReducer } from "./reducers/index";
import { authReducer } from "./reducers/authReducer";
import { songReducer } from "./reducers/songReducer";
import App from './App';

import './style/index.css';

// Restore auth state from localStorage on app load
const savedAuth = localStorage.getItem('authState');
const initialAuthState = savedAuth ? JSON.parse(savedAuth) : undefined;

// Combine all reducers
const rootReducer = combineReducers({
  player: playerReducer,
  auth: (state, action) => authReducer(state || initialAuthState, action),
  songs: songReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);