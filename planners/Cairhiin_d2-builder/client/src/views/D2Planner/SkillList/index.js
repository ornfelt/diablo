import React from 'react';
import Skill from '../Skill';
import { calcCoordinates } from '../Utilities';

const SkillList = ({
  skillTreeId,
  skillTree,
  className,
  handleMouseEnter,
  handleMouseLeave
}) => {
  const TREE_JSX = [];
  let r, c;
  for (r = 0; r < skillTree.length; r++) {
    for (c = 0; c < skillTree[r].length; c++) {
      if (skillTree[r][c] !== 0) {
        let id = "t" + skillTreeId + "r" + (r+1) + "c" + (c+1);
        TREE_JSX.push(
          <Skill
            key={id}
            coords={ calcCoordinates(r, c) }
            id={id}
            handleMouseEnter={(e) => handleMouseEnter(e, id, className)}
            handleMouseLeave={() => handleMouseLeave()}
          />
        );
      }
    }
  }
  return (
      <div>{ TREE_JSX }</div>
  );
};

export default SkillList;
