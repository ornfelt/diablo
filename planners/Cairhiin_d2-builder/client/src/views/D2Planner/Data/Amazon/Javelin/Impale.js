const Impale = {
  id: "t3r3c1",
  name: "Impale",
  description: "Powerful attack that reduces weapon durability",
  data: {
    "Attack Rating": slvl => `${75 + (25*slvl)}%`,
    "Damage": slvl => `${275 + (25*slvl)}%`,
    "Chance to lose Durability": slvl => Math.max(50 - (30 * ((110*slvl) / (slvl+6)) / 100), 20),
    "Mana Cost": () => 3
  },
  dependencies: []
};

export default Impale;
