const Hunger = {
  id: "t2r5c2",
  name: "Hunger",
  description: "Attack an enemy, leeching both life and mana",
  data: {
    "Attack Rating": slvl => `+${40 + (10*slvl)}%`,
    "Damage": () =>	'-75%',
    "Life Steal": slvl =>	`${Math.min(50 + (150*Math.round((110*slvl)/(slvl+6) / 100)), 200)}%`,
    "Mana Steal": slvl =>	`${Math.min(50 + (150*Math.round((110*slvl)/(slvl+6) / 100)), 200)}%`,
    "Mana Cost": () => 3
  },
  dependencies: []
};

export default Hunger;
