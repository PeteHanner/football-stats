import React, { useContext } from "react";
import { Context } from '../../store';
import { Thead, Tr, Th } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const TableHeader = () => {
  const [state, dispatch] = useContext(Context);
  const { sortField, sortDirection } = state;

  const setSortField = (field) => {
    let direction = sortDirection
    if (sortField === field && direction === "asc") {
      direction = "desc"
    } else if (sortField === field && direction === "desc") {
      direction = "asc"
    } else {
      direction = "desc"
    }

    dispatch({
      type: "SET_SORT_FIELD",
      payload: {
        field: field,
        direction: direction,
      },
    })
  }

  const sortIcon = (fieldName) => {
    if (sortField === fieldName) {
      return sortDirection === "desc" ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" />
    }
    return ""
  }

  return(
    <Thead>
      <Tr>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
        />
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("name")}
        >
          Team {sortIcon("name")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("cpr")}
        >
          CPR {sortIcon("cpr")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("games_played")}
        >
          Games Played {sortIcon("games_played")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("apop")}
        >
          APOP {sortIcon("apop")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("apdp")}
        >
          APDP {sortIcon("apdp")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("appd")}
        >
          APPD {sortIcon("appd")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("aopr")}
        >
          AOPR {sortIcon("aopr")}
        </Th>
        <Th
          pos="sticky"
          top="0"
          bg="#A0AEC0"
          color="#1A202C"
          cursor="pointer"
          onClick={() => setSortField("adpr")}
        >
          ADPR {sortIcon("adpr")}
        </Th>
      </Tr>
    </Thead>
  )
}

export default TableHeader
