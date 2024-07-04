const ShadowMaster = {
  id: "t2r6c2",
  name: "Shadow Master",
  description: "Calls upon a spectral shadow of the Assassin to aid her in combat",
  data: {
    "Life": slvl => 376 + (15*slvl) - 15,
    "Mana Cost": slvl => 34.5 + (0.5*slvl)
  },
  dependencies: []
};

export default ShadowMaster;
