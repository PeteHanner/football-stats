import React, { useCallback, useContext, useEffect } from "react";
import axios from "axios"
import { Table } from "@chakra-ui/react"
import TableHeader from './TableHeader';
import TableBody from "./TableBody";
import { Context } from '../../store';
import ErrorMsg from "./ErrorMsg";
import LoadingSpinner from "./LoadingSpinner";

const StatsTable = () => {
  const [state, dispatch] = useContext(Context);
  const { stats, sortField, sortDirection } = state;

  const fetchStats = useCallback((season) => {
    let fetchUrl;
    if (process.env.NODE_ENV === 'production') {
      fetchUrl = `https://pete-hanner-football-stats-api.herokuapp.com/seasons/${season}`
    } else {
      fetchUrl = `http://localhost:3001/seasons/${season}`
    }

    dispatch({ type: "FETCH_STATS_START" })
    axios.get(fetchUrl)
    .then(response => {
      const rspArr = sortStats(response.data)
      if (rspArr.length <= 1) {
        dispatch({ type: "FETCH_STATS_BAD_YEAR" })
        // TODO: Push correct year to history
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
  }, [dispatch]);

  useEffect(() => {
    fetchStats(2020);
  }, [fetchStats]);

  useEffect(() => {
    sortStats(stats)
  }, [sortField, sortDirection])

  const sortStats = (array) => {
    const sortedArr = array.sort((a, b) => {
      const descSort = (sortDirection === "desc") && (sortField !== "name")
      if (a[sortField] < b[sortField]) {
        return descSort ? 1 : -1;
      }
      if (a[sortField] > b[sortField]) {
        return descSort ? -1 : 1;
      }
      return 0;
    })

    dispatch({
      type: "FETCH_STATS_SUCCESS",
      payload: sortedArr,
    })
  }

  if (stats.length > 1) {
    return(
      <Table variant="striped" size="sm">
        <TableHeader />
        <TableBody />
      </Table>
    )
  } else if (state.errorMsg) {
    return(
      <ErrorMsg />
    )
  } else {
    return(
      <LoadingSpinner />
    )
  }
}

export default StatsTable;
