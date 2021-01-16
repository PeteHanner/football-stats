import React from "react";
import { Heading, Center, Text, Link } from "@chakra-ui/react"

const Header = () => {
  return(
    <>
    <Center textAlign="center" m="2rem">
      <Heading as='h1'>College Football Performance Ratio Stats</Heading>
    </Center>
    <Center>
      <Text fontSize="sm">by <Link color="#6286a2" href="https://github.com/PeteHanner/football-stats-api" isExternal>Pete Hanner</Link></Text>
    </Center>
    <br />
    </>
    )
  }

  export default Header;