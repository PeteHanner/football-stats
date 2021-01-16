import React, { createContext, useReducer } from "react";

const initialState = {
  isFetching: false,
  stats: [],
  sortField: "cpr",
  sortDirection: "desc",
  errorMsg: ""
}

const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_STATS_START":
      return {
        ...state,
        isFetching: true,
      }
    case "FETCH_STATS_BAD_YEAR":
      return {
        ...state,
        isFetching: false,
      }
    case "FETCH_STATS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        stats: action.payload,
      }
    case "FETCH_STATS_FAILURE":
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.message
      }
    case "SET_SORT_FIELD":
      return {
        ...state,
        sortField: action.payload.field,
        sortDirection: action.payload.direction,
      }
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
