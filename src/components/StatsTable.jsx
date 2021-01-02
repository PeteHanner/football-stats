import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../store"
import axios from "axios"
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"

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

  useEffect(() => {
    fetchStats(2020);
  }, [fetchStats]);

  // useEffect(buildStatsTable, [stats])

  const buildStatsTable = () => {
    if (stats.length > 1) {
      return(stats.map((team, idx) => {
        return(
          <Tr key={idx}>
            <Td><strong>{team.name}</strong></Td>
            <Td><strong>{Math.round((team.cpr + Number.EPSILON) * 100) / 100}%</strong></Td>
            <Td>{team.games_played}</Td>
            <Td>{Math.round((team.apop + Number.EPSILON) * 100) / 100}</Td>
            <Td>{Math.round((team.apdp + Number.EPSILON) * 100) / 100}</Td>
            <Td>{Math.round((team.appd + Number.EPSILON) * 100) / 100}</Td>
            <Td>{Math.round((team.aopr + Number.EPSILON) * 100) / 100}%</Td>
            <Td>{Math.round((team.adpr + Number.EPSILON) * 100) / 100}%</Td>
          </Tr>
        )
      }))
    } else {
      console.log(":(")
    }
  }

  return(
    <>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th>CPR</Th>
            <Th>Games Played</Th>
            <Th>APOP</Th>
            <Th>APDP</Th>
            <Th>APPD</Th>
            <Th>AOPR</Th>
            <Th>ADPR</Th>
          </Tr>
        </Thead>
        <Tbody>
          {buildStatsTable()}
        </Tbody>
      </Table>
    </>
    )
  }

  export default StatsTable;