import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../store"
import axios from "axios"
import { Table, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react"

const StatsTable = () => {
  const [state, dispatch] = useContext(Context);
  const { stats, isFetching } = state;

  const fetchStats = useCallback((season) => {
    dispatch({ type: "FETCH_STATS_START" })
    axios.get(`https://pete-hanner-football-stats-api.herokuapp.com/seasons/${season}`)
    .then(response => {
      const rspArr = response.data
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

  const sortByField = (field) => {
    console.log(field);
  }

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
    } else if (isFetching) {
      return(
        <Center>
          <Tr key="0">Loading team data...</Tr>
        </Center>
      )
    } else {
      return(
        <Center>
          <Tr key="0">Something's gone wrong. Please wait a moment and refresh.</Tr>
        </Center>
      )
    }
  }

  return(
    <>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th onClick={() => sortByField("team")}>Team</Th>
            <Th onClick={() => sortByField("cpr")}>CPR</Th>
            <Th onClick={() => sortByField("games")}>Games Played</Th>
            <Th onClick={() => sortByField("apop")}>APOP</Th>
            <Th onClick={() => sortByField("apdp")}>APDP</Th>
            <Th onClick={() => sortByField("appd")}>APPD</Th>
            <Th onClick={() => sortByField("aopr")}>AOPR</Th>
            <Th onClick={() => sortByField("adpr")}>ADPR</Th>
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