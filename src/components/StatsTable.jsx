import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../store"
import axios from "axios"
import { Center, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"

const StatsTable = () => {
  const [state, dispatch] = useContext(Context);
  const { stats } = state;

  const fetchStats = useCallback((season) => {
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
  }, [dispatch]);

  const buildStatsTable = () => {
    if (stats.length > 1) {
      console.log("Building stats table");
    }
  }

  useEffect(() => {
    fetchStats(2020);
  }, [fetchStats]);

  useEffect(buildStatsTable, [stats])

  return(
    <>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th>Games Played</Th>
            <Th>CPR</Th>
            <Th>APOP</Th>
            <Th>APDP</Th>
            <Th>APPD</Th>
            <Th>AOPR</Th>
            <Th>ADPR</Th>
          </Tr>
        </Thead>
      </Table>
    </>
    )
  }

  export default StatsTable;