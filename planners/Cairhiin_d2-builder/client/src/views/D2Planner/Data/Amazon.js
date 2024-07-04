import BowSkills from './Amazon/Bow';
import JavelinSkills from './Amazon/Javelin';
import PassiveSkills from './Amazon/Passive';

const AMAZON_SKILLS = [
  ...JavelinSkills,
  ...PassiveSkills,
  ...BowSkills
];

const AMAZON_SKILL_TREE_NAMES = [
    { short: "bow", name: "Bow and Crossbow"},
    { short: "passive", name: "Passive and Magic"},
    { short: "javelin", name: "Javelin and Spear"}
]

const JAVELIN = [
  [1, 0, 0],
  [0,"t3r1c1", 1],
  ["t3r1c1", 0, "t3r2c3"],
  [0, "t3r2c2.t3r2c3", "t3r3c3"],
  ["t3r3c1", 0, 0],
  [0, "t3r4c2", "t3r4c3"]
];

const PASSIVE = [
  [1, 0, 1],
  [0, 1, 0],
  ["t2r1c1", "t2r2c2", 0],
  [0, 0, "t2r1c3.t2r2c2"],
  ["t2r3c1", "t2r3c2", 0],
  ["t2r5c1.t2r5c2", 0, "t2r4c3"]
];

const BOW = [
  [0, 1, 1],
  [1, "t1r1c2", 0],
  [0, 0, "t1r1c3"],
  ["t1r2c1", "t1r2c1.t1r2c2", 0],
  [0, "t1r4c2", "t1r3c3"],
  ["t1r4c1", 0, 0]
];

const AMAZON_SKILL_TREES = [BOW, PASSIVE, JAVELIN];

export {
    AMAZON_SKILLS,
    AMAZON_SKILL_TREES,
    AMAZON_SKILL_TREE_NAMES
};
