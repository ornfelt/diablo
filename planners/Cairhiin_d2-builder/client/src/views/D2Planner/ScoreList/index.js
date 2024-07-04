import React from 'react';
import Score from '../Score';

const ScoreList = ({ values, skillTree, skillTreeId }) => {
  const SCORES_JSX = [];
  let r, c;
  for (r = 0; r < skillTree.length; r++) {
    for (c = 0; c < skillTree[r].length; c++) {
      if (skillTree[r][c] !== 0) {
        let id = "t" + skillTreeId + "r" + (r+1) + "c" + (c+1);
        SCORES_JSX.push(
          <Score
            key={id}
            id={id}
            value={values[id]}
            style={{top: `${78 + r*68}px`, left: `${55 + c*68}px`}}
          />
        );
      }
    }
  }
  return (
    <div>{ SCORES_JSX }</div>
  );
};

export default ScoreList;
