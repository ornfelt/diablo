import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./D2PlannerNavButton";

const PlannerLink = ({ url, isActive, onClick }) => {
  const className = url.split('/')[url.split('/').length-1];
  return (
    <Link to={url} onClick={ onClick }>
      <Button isActive={ isActive }>
        { className }
      </Button>
    </Link>
  )
}

const D2PlannerButtonGroup = ({ url }) => {
  const CLASSES = ['amazon', 'assassin', 'barbarian', 'druid', 'necromancer', 'paladin', 'sorceress'];
  const [active, setActive] = useState(0);
  return (
    <Box>
      {
        CLASSES.map((className, id) =>
          <PlannerLink
            key={id}
            url={`${url}/${className}`}
            onClick={ () => setActive(id+1) }
            isActive={ active === id+1 && true }
          />)
      }
    </Box>
  );
};

export default D2PlannerButtonGroup;
