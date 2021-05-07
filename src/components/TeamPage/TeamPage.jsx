import React, { useContext, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../../store';
import { Center } from '@chakra-ui/react';
import axios from 'axios';

const TeamPage = () => {
  const [state, dispatch] = useContext(Context)
  const { name } = useParams()

  const fetchTeam = useCallback((name) => {
    let fetchUrl;
    if (process.env.NODE_ENV === 'production') {
      fetchUrl = `https://pete-hanner-football-stats-api.herokuapp.com/teams/${name}`
    } else {
      fetchUrl = `http://localhost:3001/teams/${name}`
    }

    // dispatch({ type: "FETCH_TEAM_START" })
    axios.get(fetchUrl)
    .then(response => {
      debugger
    })
  }, [dispatch])

  useEffect(() => {
    fetchTeam(name)
  }, [fetchTeam, name])

  return(
    <Center>
      Team Page for {name}!
    </Center>
  )
}

export default TeamPage;
