import Summoning from './Necromancer/Summoning';
import PoisonAndBonesSpells from './Necromancer/PoisonAndBonesSpells';
import Curses from './Necromancer/Curses';

const NECROMANCER_SKILLS = [
  ...Curses,
  ...PoisonAndBonesSpells,
  ...Summoning
];

const NECROMANCER_SKILL_TREE_NAMES = [
    { short: "curses", name: "Curses"},
    { short: "poison", name: "Poison and Bone Spells"},
    { short: "summoning", name: "Summoning Spells"}
]

const SUMMONING = [
  ["t3r1c3", 0, 1],
  [0, 1, 0],
  ["t3r2c2", 0, "t3r1c3"],
  [0, "t3r2c2", 0],
  ["t3r3c1", "t3r4c2", 0],
  [0, "t3r5c2", "t3r5c2.t3r3c3"]
];

const POISON = [
  [0, 1, 1],
  [1, "t2r1c2", 0],
  [0, 0, "t2r1c3"],
  ["t2r2c1.t2r2c2", "t2r2c2", 0],
  [0, 0, "t2r3c3"],
  ["t2r4c1", "t2r4c2", 0]
];

const CURSES = [
  [0, 1, 0],
  [1, 0, 1],
  [0, "t1r1c2", "t1r2c3"],
  ["t1r2c1", "t1r3c2", 0],
  ["t1r4c1", 0, "t1r3c3"],
  [0, "t1r4c2.t1r5c3", 0]
];

const NECROMANCER_SKILL_TREES = [CURSES, POISON, SUMMONING];

export {
    NECROMANCER_SKILLS,
    NECROMANCER_SKILL_TREES,
    NECROMANCER_SKILL_TREE_NAMES
};
