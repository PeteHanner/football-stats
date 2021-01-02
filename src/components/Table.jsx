import React, { useContext, useEffect } from "react";
import { Context } from "../store"
import axios from "axios"

const Table = () => {
  const [state, dispatch] = useContext(Context)

  const fetchStats = (season) => {
    dispatch({ type: "FETCH_STATS_START" })
    axios.get(`https://pete-hanner-football-stats-api.herokuapp.com/seasons/${season}`)
      .then(response => {
        const rspArr = response.data
        if (rspArr.length === 1) {
          dispatch({ type: "FETCH_STATS_BAD_YEAR" })
          // Push correct year to history
        } else {
          dispatch({
            type: "FETCH_STATS_SUCCESS",
            payload: rspArr
          })
        }
      })
      .catch(error => {
        dispatch({
          type: "FETCH_STATS_FAILURE",
          payload: error
        })
      })
  }

  useEffect(() => {
    fetchStats(2020);
  }, []);

  return(
    <p>Table goes here</p>
  )
}

export default Table;