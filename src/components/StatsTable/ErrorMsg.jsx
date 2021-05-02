import { Center, Text } from "@chakra-ui/layout";
import React from "react";

const ErrorMsg = () => {
  return(
    <Center>
      <Text fontSize="lg" fontWeight="bold">
        Unable to fetch stats at this time. Please wait a moment and refresh the page.
      </Text>
    </Center>
  )
}

export default ErrorMsg
