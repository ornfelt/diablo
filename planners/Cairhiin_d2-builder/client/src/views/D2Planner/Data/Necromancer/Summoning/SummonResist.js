const SummonResist = {
  id: "t3r5c1",
  name: "Summon Resist",
  description: "Increases the Resists of your Summoned Minions",
  data: {
    "Resistances": slvl => `+${Math.min(20 + Math.round(55*((110*slvl)/(slvl+6))/100), 75)}%`,
  },
  dependencies: []
};

export default SummonResist;
