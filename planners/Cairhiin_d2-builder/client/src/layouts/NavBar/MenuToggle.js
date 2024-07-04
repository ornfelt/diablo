import React from "react";
import { Box } from "@chakra-ui/react";
import { BsX, BsList } from "react-icons/bs";

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      { isOpen ? <BsX /> : <BsList /> }
    </Box>
  )
}

export default MenuToggle;
