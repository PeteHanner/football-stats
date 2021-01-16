import React from "react";
import { Heading, Center, Text, Link } from "@chakra-ui/react"

const Header = () => {
  return(
    <>
    <Center textAlign="center" m="2rem">
      <Heading as='h1'>College Football Performance Ratio Stats</Heading>
    </Center>
    <Center>
      <Text fontSize="med"><Link color="#6286a2" href="https://github.com/PeteHanner/football-stats/blob/main/README.md" isExternal>What do all these acronyms mean?</Link></Text>
    </Center>
    <br/>
    <Center>
      <Text fontSize="sm">by <Link color="#6286a2" href="https://github.com/PeteHanner/football-stats-api" isExternal>Pete Hanner</Link>, drive data courtesy of the <Link color="#6286a2" href="https://api.collegefootballdata.com/api/docs/?url=/api-docs.json" isExternal>College Football Stats API</Link></Text>
    </Center>
    <Center>
      <Text fontSize="xs">(NOTE: This is a prototype version with only stats for the 2020 season.)</Text>
    </Center>
    <br />
    <br />
    </>
    )
  }

  export default Header;