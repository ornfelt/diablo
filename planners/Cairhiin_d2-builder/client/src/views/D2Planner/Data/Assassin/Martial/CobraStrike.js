const CobraStrike = {
  id: "t3r3c2",
  name: "Cobra Strike",
  description: "An attack that drains life and mana from the victim",
  data: {
    "Attack Rating": slvl => `+${(7*slvl) + 8}%`,
    "Charge 1 - Life stolen per hit": slvl => `${35 + (5*slvl)}%`,
    "Charge 2 - Life and Mana stolen per hit": slvl => `${35 + (5*slvl)}%`,
    "Charge 3 - Life and Mana stolen per hit": slvl => `${70 + (10*slvl)}%`,
    "Mana Cost": () => 2
  },
  dependencies: []
};

export default CobraStrike;
