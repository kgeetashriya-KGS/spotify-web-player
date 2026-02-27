import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import App from './App';

import './style/index.css';

const savedAuth = localStorage.getItem('authState');
const initialAuthState = savedAuth ? JSON.parse(savedAuth) : undefined;

const store = createStore(
  rootReducer,
  { auth: initialAuthState },
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);