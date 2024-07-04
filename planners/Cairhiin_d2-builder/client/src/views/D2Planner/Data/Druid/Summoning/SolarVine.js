const SolarVine = {
  id: "t1r5c3",
  name: "Solar Creeper",
  description: "Summons a vine that consumes corpses and grants the Druid mana",
  data: {
    "Life": slvl =>	Math.floor(((138*(80+(20*slvl))/100)+(192*(80+(20*slvl))/100))/2),
    "Mana Return": slvl => `+${Math.min(1+Math.floor((7*((110*slvl)/(slvl+6))/100)), 8)}%`,
    "Mana": slvl => 13+slvl
  },
  dependencies: []
};

export default SolarVine;
