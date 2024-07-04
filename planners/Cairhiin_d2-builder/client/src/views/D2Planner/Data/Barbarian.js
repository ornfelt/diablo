import Warcries from './Barbarian/Warcries';
import Masteries from './Barbarian/Masteries';
import CombatSkills from './Barbarian/Combat';

const BARBARIAN_SKILLS = [
  ...CombatSkills,
  ...Masteries,
  ...Warcries
];

const BARBARIAN_SKILL_TREE_NAMES = [
  { short: "combat", name: "Combat Skills"},
  { short: "masteries", name: "Combat Masteries"},
  { short: "warcries", name: "Warcries"}
]

const WARCRIES = [
  [1, 0, 1],
  ["t3r1c1","t3r1c1", 0],
  [0, 0, "t3r1c3"],
  ["t3r2c1", 0, 0],
  [0, "t3r2c2", "t3r3c3"],
  ["t3r4c1.t3r5c2", "t3r5c2", 0]
];

const MASTERIES = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 0, 0],
  [0, 0, 1],
  ["t2r3c1", 0, 0],
  [0, 0, "t2r4c3"]
];

const COMBAT = [
  [0, 1, 0],
  [1, 0, "t1r1c2"],
  [0, "t1r1c2", "t1r2c3"],
  ["t1r2c1", "t1r3c2", 0],
  [0, 0, "t1r3c3"],
  ["t1r4c1.t1r4c2", "t1r4c2", 0]
];

const BARBARIAN_SKILL_TREES = [COMBAT, MASTERIES, WARCRIES];

export {
    BARBARIAN_SKILLS,
    BARBARIAN_SKILL_TREES,
    BARBARIAN_SKILL_TREE_NAMES
};
