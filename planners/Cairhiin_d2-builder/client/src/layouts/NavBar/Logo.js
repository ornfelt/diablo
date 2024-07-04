import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Box {...props}  w="25%">
      <Text fontSize="lg" color="#111111" fontWeight="bold">
        D2 BUILDER
      </Text>
    </Box>
  )
};

export default Logo;
