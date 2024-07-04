import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import CharView from './D2Planner/D2PlannerCharView';
import ButtonGroup from './D2PlannerButtonGroup';
import { chunkStr } from './D2Planner/Utilities';

const D2PlannerView = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Box className="D2Planner">
        <Flex
          className="button-box"
          align="center"
          justify="center"
          wrap="wrap"
          w="100%"
        >
          <ButtonGroup url={url} />
        </Flex>
      </Box>
      <Switch>
        <Route exact path={path}>
          <CharClassView />
        </Route>
        <Route path={`${path}/:charClass`}>
          <CharClassView />
        </Route>
      </Switch>
    </div>
  );
};

function CharClassView() {
  let { charClass } = useParams();
  const query = useLocation().search.substring(1);
  let skillPoints = "";
  if (query.split('=')[0] === "skillPoints") skillPoints=query.split('=')[1];
  return (
    <CharView charClass={charClass} skillPoints={chunkStr(skillPoints, 2)} />
  );
}

export default D2PlannerView;
