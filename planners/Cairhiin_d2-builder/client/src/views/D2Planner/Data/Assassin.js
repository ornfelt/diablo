import MartialSkills from './Assassin/Martial';
import ShadowSkills from './Assassin/Shadow';
import TrapSkills from './Assassin/Traps';

const ASSASSIN_SKILLS = [
  ...TrapSkills,
  ...ShadowSkills,
  ...MartialSkills
];

const ASSASSIN_SKILL_TREE_NAMES = [
  { short: "traps", name: "Traps"},
  { short: "shadow", name: "Shadow Disciplines"},
  { short: "martial", name: "Martial Arts"}
]

const MARTIAL = [
  [0, 1, 1],
  [1, 0, "t3r1c3"],
  [0, "t3r1c2", 0],
  ["t3r2c1", 0, "t3r2c3"],
  ["t3r4c1", 0, "t3r4c3"],
  [0, "t3r5c1.t3r3c2", 0]
];

const SHADOW = [
  [0, 1, 1],
  ["t2r1c2", 0, 0],
  [0, "t2r1c2", "t2r1c3"],
  ["t2r2c1", "t2r3c2", 0],
  [0, 0, "t2r3c3"],
  ["t2r4c1", "t2r4c2", 0]
];

const TRAPS = [
  [0, 1, 0],
  ["t1r1c2", 0, 1],
  ["t1r2c1", "t1r1c2", 0],
  [0, 0, "t1r2c3.t1r3c2"],
  ["t1r3c1", "t1r3c2", 0],
  ["t1r5c1", 0, "t1r4c3"]
];

const ASSASSIN_SKILL_TREES = [TRAPS, SHADOW, MARTIAL];

export {
    ASSASSIN_SKILLS,
    ASSASSIN_SKILL_TREES,
    ASSASSIN_SKILL_TREE_NAMES
};
