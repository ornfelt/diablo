import React from 'react';
import { Button } from "@chakra-ui/react";

const D2PlannerNavButton = ({ children, isActive, onClick }) => {
  return (
    <Button bg="#1F0403" size="md" m="0 0.5em 1em 0.5em"
      isActive = { isActive }
      _hover={{ bg: "red.700", color: "black" }}
      _active={{ bg: "red.700", color: "black", boxShadow: "none" }}
      color="white"
      onClick={onClick}
    >
      { children }
    </Button>
  );
};

export default D2PlannerNavButton;
