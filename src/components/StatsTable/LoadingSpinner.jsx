import React from "react";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";

const LoadingSpinner = () => {
  return(
    <Center>
      <Spinner
        size="xl"
        speed="0.7s"
        thickness="4px"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Center>
  )
}

export default LoadingSpinner;
