import React, { createContext, useReducer } from "react";

const initialState = {
  isFetching: false,
  stats: []
}

const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_STATS_START":
      console.log("Fetching stats");
      return {...state, isFetching: true}
    case "FETCH_STATS_BAD_YEAR":
      console.log("Year provided not available in API");
      return {...state, isFetching: false}
    case "FETCH_STATS_SUCCESS":
      console.log("Successfully fetched stats");
      console.log(action.payload);
      return {...state, isFetching: false, stats: action.payload}
    case "FETCH_STATS_FAILURE":
      console.log("Error fetching from API:");
      console.log(action.payload.message);
      return {...state, isFetching: false}
    default:
      throw new Error();
  }
}

export const Context = createContext(initialState)

export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      { children }
    </Context.Provider>
  )
}
