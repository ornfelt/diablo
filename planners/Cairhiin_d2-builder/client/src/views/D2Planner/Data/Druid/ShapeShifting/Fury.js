const Fury = {
  id: "t2r6c1",
  name: "Fury",
  description: "Viciously attack nearby enemies",
  data: {
    "Attack Rating": slvl => `+${43 + (7*slvl)}%`,
    "Damage": slvl =>	`+${83 + (17*slvl)}%`,
    "Attacks": slvl => Math.min(slvl+1, 5),
    "Mana Cost": () => 4
  },
  dependencies: []
};

export default Fury;
