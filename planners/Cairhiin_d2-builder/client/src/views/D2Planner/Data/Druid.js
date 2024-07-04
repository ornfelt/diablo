import ElementalSkills from './Druid/Elemental';
import ShapeShifting from './Druid/ShapeShifting';
import Summoning from './Druid/Summoning';

const DRUID_SKILLS = [
  ...Summoning,
  ...ShapeShifting,
  ...ElementalSkills,
];

const DRUID_SKILL_TREE_NAMES = [
    { short: "summoning", name: "Summoning Skills"},
    { short: "shapeshifting", name: "Shapeshifting Skills"},
    { short: "elemental", name: "Elemental Skills"}
]

const ELEMENTAL = [
  [1, 0, 0],
  ["t3r1c1", 0, 1],
  ["t3r2c1", 0, "t3r2c3"],
  [0, "t3r3c3", 0],
  ["t3r3c1", "t3r4c2", 0],
  ["t3r5c1.t3r6c2", "t3r5c2", 0]
];

const SHAPESHIFTING = [
  [1, "t2r1c1", 0],
  [0, 0, 1],
  ["t2r1c1", 0, "t2r2c3"],
  ["t2r3c1", "t2r3c1.t2r3c3", 0],
  [0, "t2r4c2", "t2r3c3"],
  ["t2r4c1", 0, 0]
];

const SUMMONING = [
  [0, 1, 1],
  [1, "t1r1c2", 0],
  [0, 0, "t1r1c3"],
  ["t1r2c1", "t1r2c1.t1r2c2", 0],
  [0, 0, "t1r3c3"],
  ["t1r4c1", "t1r4c2", 0]
];

const DRUID_SKILL_TREES = [SUMMONING, SHAPESHIFTING, ELEMENTAL];

export {
    DRUID_SKILLS,
    DRUID_SKILL_TREES,
    DRUID_SKILL_TREE_NAMES
};
