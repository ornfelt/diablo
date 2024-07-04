import React from 'react';
import { Box, Stack } from "@chakra-ui/react";
import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen, isLoggedIn }) => {
  console.log(isLoggedIn)
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        { !isLoggedIn && <MenuItem to="/auth/login">Login</MenuItem>}
        { !isLoggedIn && <MenuItem to="/auth/register">Register</MenuItem>}
        { isLoggedIn && <MenuItem to="/auth/logout">Logout</MenuItem>}
        <MenuItem to="/planner">Skill Planner</MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
