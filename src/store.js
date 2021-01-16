import React, { createContext, useReducer } from "react";

const initialState = {
  isFetching: false,
  stats: [],
  sortField: "cpr",
}

const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_STATS_START":
      return {...state, isFetching: true}
    case "FETCH_STATS_BAD_YEAR":
      return {...state, isFetching: false}
    case "FETCH_STATS_SUCCESS":
      return {...state, isFetching: false, stats: action.payload}
    case "FETCH_STATS_FAILURE":
      console.log("Error fetching from API:");
      console.log(action.payload.message);
      return {...state, isFetching: false}
    case "SET_SORT_FIELD":
      return {...state, sortField: action.payload}
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
