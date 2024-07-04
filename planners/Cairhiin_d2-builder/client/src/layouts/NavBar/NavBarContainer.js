import React from 'react';
import { Flex } from "@chakra-ui/react";

const NavBarContainer = ({ isLoggedIn=false, handleLogin, children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={3}
      bg={["transparent", "transparent", "red.800", "red.800"]}
      color={["red.800", "red.800", "white", "white"]}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default NavBarContainer;
