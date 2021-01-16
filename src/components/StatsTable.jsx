import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../store"
import axios from "axios"
import { Table, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const StatsTable = () => {
  const [state, dispatch] = useContext(Context);
  const { stats, isFetching, sortField, sortDirection } = state;

  const fetchStats = useCallback((season) => {
    dispatch({ type: "FETCH_STATS_START" })
    axios.get(`https://pete-hanner-football-stats-api.herokuapp.com/seasons/${season}`)
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

  const setSortField = (field) => {
    let direction = sortDirection
    if (sortField === field && direction === "asc") {
      direction = "desc"
    } else if (sortField === field && direction === "desc") {
      direction = "asc"
    }

    dispatch({
      type: "SET_SORT_FIELD",
      payload: {
        field: field,
        direction: direction,
      },
    })
  }

  const sortStats = (array) => {
    const sortedArr = array.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === "desc" ? 1 : -1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "desc" ? -1 : 1;
      }
      return 0;
    })

    dispatch({
      type: "FETCH_STATS_SUCCESS",
      payload: sortedArr,
    })
  }

  const buildStatsTable = () => {
    if (stats.length > 1) {
      return(stats.map((team, idx) => {
        return(
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
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
    } else if (state.errorMsg) {
      return(
        <Center>
          <Tr key="0">Something's gone wrong. Please wait a moment and refresh.</Tr>
        </Center>
      )
    } else {
      return(
        <Center>
          <Tr key="0">Loading team data...</Tr>
        </Center>
      )
    }
  }

  const sortIcon = (fieldName) => {
    if (sortField === fieldName) {
      return sortDirection === "asc" ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" />
    }
    return ""
  }

  return(
    <>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th />
            <Th onClick={() => setSortField("name")}>Team {sortIcon("name")}</Th>
            <Th onClick={() => setSortField("cpr")}>CPR {sortIcon("cpr")}</Th>
            <Th onClick={() => setSortField("games_played")}>Games Played {sortIcon("games_played")}</Th>
            <Th onClick={() => setSortField("apop")}>APOP {sortIcon("apop")}</Th>
            <Th onClick={() => setSortField("apdp")}>APDP {sortIcon("apdp")}</Th>
            <Th onClick={() => setSortField("appd")}>APPD {sortIcon("appd")}</Th>
            <Th onClick={() => setSortField("aopr")}>AOPR {sortIcon("aopr")}</Th>
            <Th onClick={() => setSortField("adpr")}>ADPR {sortIcon("adpr")}</Th>
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