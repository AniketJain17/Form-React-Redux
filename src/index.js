import React from "react";
import ReactDOM from "react-dom";
import "../src/styles.css";
import App from "./App";

import { createStore, applyMiddleware } from "redux"; // Import applyMiddleware
import { Provider } from "react-redux";
import thunk from "redux-thunk"; // Import Redux Thunk middleware

import postReducer from "./redux/postReducer";

// Create the Redux store with Thunk middleware
const store = createStore(postReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
