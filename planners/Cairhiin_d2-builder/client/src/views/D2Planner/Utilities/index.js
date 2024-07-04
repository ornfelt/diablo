export const calcCoordinates = (r, c) => {
    const x1 = 8 + c * 70;
    const y1 = 8 + r * 70;
    const x2 = x1 + 50;
    const y2 = y1 + 50;
    return `${x1}, ${y1}, ${x2}, ${y2}`;
}

/*
  Boolean function to check if a skill has all its required prerequisites.
  Returns true if it has all prerequisites assigned, otherwise false.
*/
export const checkPrerequisites = (state, skillTree, r, c) => {
  const prereqs = skillTree[r-1][c-1] === 1 ? 0 : skillTree[r-1][c-1].split(".");
  let hasAllprereqs = true;
  if (prereqs !== 0) {
    for (let i=0; i<prereqs.length; i++) {
      if (state[prereqs[i]] === 0) {
        hasAllprereqs = false;
        break;
      }
      hasAllprereqs = true;
    }
  }

  return hasAllprereqs;
}

/*
  Boolean function to check if a skill is a prerequisite for Skills
  further down the skill tree that has assigned skill points. Returns true if such
  skills are found, otherwise false.
*/
export const checkDownTreePoints = (state, skillTree, cell) => {
  let hasDownTreePoints = false;
  for (let row=0; row<skillTree.length; row++) {
    for (let column=0; column<skillTree[row].length; column++) {
      if (typeof skillTree[row][column] === 'string'
          && skillTree[row][column].includes(cell)) {
        const cellTree = cell.slice(0, 2);
        const cellToCheck = `${cellTree}r${row+1}c${column+1}`;
        if (state[cellToCheck] > 0) {
          hasDownTreePoints = true;
        }
      }
    }
  }

  return hasDownTreePoints;
}

/*
  Function that returns a skill object based on the class and the skill id
*/
export const getSkillInfo = (charClassData, id) =>  {
  const skillData = charClassData.filter(skill => skill.id === id);
  return typeof skillData !== undefined && skillData.length !== 0 ? skillData : [{name: "Default", id: "t0r0c0"}];
}

/*
  Function that accepts a string, a chunk value, and an array,
  and returns an array of string chunks
*/
export const chunkStr = (str, n=1, acc=[]) => {
    if (str.length === 0) {
        return acc
    } else {
        acc.push(str.substring(0, n));
        return chunkStr(str.substring(n), n, acc);
    }
}
