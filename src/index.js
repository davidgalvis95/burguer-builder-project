import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";

import burguerBuilder from './store/reducers/burguerBuilder';
import order from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

//TODO remove the console.logs from the project
//here we need the basic setup because
//This environment variable that can be found in config/env.js is good because that we we can hide the redux state of the redux extension
//from the outer world, or the users, at least we are in dev environment, which is what that env variable means
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    burguerBuilder: burguerBuilder,
    order: order,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
