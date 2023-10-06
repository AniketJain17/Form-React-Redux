
// apiActions.js
import axios from "axios";

// Action Types
export const FETCH_API_DATA_REQUEST = "FETCH_API_DATA_REQUEST";
export const FETCH_API_DATA_SUCCESS = "FETCH_API_DATA_SUCCESS";
export const FETCH_API_DATA_FAILURE = "FETCH_API_DATA_FAILURE";

// Action Creators

// Action to indicate that API data fetching has started
export const fetchApiDataRequest = () => {
  return {
    type: FETCH_API_DATA_REQUEST,
  };
};

// Action to update the state with the fetched API data
export const fetchApiDataSuccess = (data) => {
  return {
    type: FETCH_API_DATA_SUCCESS,
    payload: data,
  };
};

// Action to handle API data fetching failure
export const fetchApiDataFailure = (error) => {
  return {
    type: FETCH_API_DATA_FAILURE,
    payload: error,
  };
};

// Async Action to fetch data from the API
export const fetchApiData = () => {
  return async (dispatch) => {
    dispatch(fetchApiDataRequest()); // Indicate that data fetching has started

    try {
        // Replace the URL with your API endpoint
        const response = await axios.get("https://my-json-server.typicode.com/shubham21155102/demo/datas");
        const apiData = response.data;

        response.data.map((e) => {
          localStorage.setItem(e.id, JSON.stringify(e));
        })


      dispatch(fetchApiDataSuccess(apiData));
      }catch (error) {
      // Handle any API request errors and dispatch failure action
      dispatch(fetchApiDataFailure(error));
    }
  };
};
