import Combat from './Paladin/Combat';
import Offensive from './Paladin/Offensive';
import Defensive from './Paladin/Defensive';

const PALADIN_SKILLS = [
  ...Combat,
  ...Offensive,
  ...Defensive
];

const PALADIN_SKILL_TREE_NAMES = [
    { short: "combat", name: "Combat Skills"},
    { short: "offensive", name: "Offensive Auras"},
    { short: "defensive", name: "Defensive Auras"}
]

const DEFENSIVE = [
  [1, 0, 1],
  [0, 1, 1],
  ["t3r1c1", 0, 1],
  [0, "t3r3c1.t3r2c2", 0],
  ["t3r3c1", 0, 0],
  [0, "t3r4c2", 1]
];

const OFFENSIVE = [
  [1, 0, 0],
  [0, "t2r1c1", 1],
  ["t2r1c1", 0, 0],
  ["t2r3c1", "t2r2c2", 0],
  [0, "t2r4c2", "t2r4c2.t2r2c3"],
  ["t2t4c1", 0, "t2r5c3"]
];

const COMBAT = [
  [1, 0, 1],
  [0, 1, 0],
  ["t1r1c1", 0, "t11r1c3"],
  ["t1r3c1", "t1r2c2", 0],
  ["t1r4c1", 0, "t1r4c2.t1r3c3"],
  [0, "t1r5c1.t1r4c2", 0]
];

const PALADIN_SKILL_TREES = [COMBAT, OFFENSIVE, DEFENSIVE];

export {
    PALADIN_SKILLS,
    PALADIN_SKILL_TREES,
    PALADIN_SKILL_TREE_NAMES
};
