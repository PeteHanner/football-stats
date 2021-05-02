import React, { useContext } from "react";
import { Tbody, Tr, Td } from '@chakra-ui/react';
import { Context } from '../../store';

const TableBody = () => {
  const [state] = useContext(Context);
  const { stats } = state;

  const statsTableRows = () => {
    return stats.map((team, idx) => {
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
    })
  }

  return(
    <Tbody>
      {statsTableRows()}
    </Tbody>
  )
}

export default TableBody;
