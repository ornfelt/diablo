const ShadowWarrior = {
  id: "t2r4c2",
  name: "Shadow Warrior",
  description: "Summons a 'shadow' of the Assassin to fight along side her",
  data: {
    "Life": slvl => 376 + (15*slvl) - 15,
    "Mana Cost": slvl => (0.5*slvl) + 26.5
  },
  dependencies: []
};

export default ShadowWarrior;
