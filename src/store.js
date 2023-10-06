import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postReducer from "./redux/postReducer";

// Create the Redux store with Thunk middleware
const store = createStore(postReducer, applyMiddleware(thunk));

export default store;
