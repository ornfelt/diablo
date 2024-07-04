import React from 'react';
import { CHAR_DATA } from './Data/';
import D2Planner from './';

const D2PlannerCharView = ({ charClass="amazon", skillPoints=[] }) => {
  return (
    <div>
      <D2Planner
        skillTrees={CHAR_DATA[charClass][0]}
        charClass={charClass}
        skillTreeNames={CHAR_DATA[charClass][1]}
        skillPoints={skillPoints}
      />
    </div>
  );
};

export default D2PlannerCharView;
