const ChargedStrike = {
  id: "t3r4c2",
  name: "Charged Strike",
  description: "Upon striking an enemy, the Amazon's Javelin explodes with Charged Bolt",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * ChargedStrike.dependencies[0].value +
        dlvl[1] * ChargedStrike.dependencies[1].value +
        dlvl[2] * ChargedStrike.dependencies[2].value +
        dlvl[3] * ChargedStrike.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 18 + 12*slvl;
      if (slvl > 28)  { max = 28*slvl - 278; }
      if (slvl > 22)  { max = 24*slvl - 166; }
      if (slvl > 16)  { max = 20*slvl - 78; }
      if (slvl > 8) { max = 16*slvl - 14; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Bolts:": slvl => 3 + Math.floor(slvl/5),
    "Mana Cost": slvl => 3.75 + (0.25*slvl),

  },
  dependencies: [
    {
      id: "t3r3c3",
      name: "Lightning Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
    {
      id: "t3r2c2",
      name: "Power Strike",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
    {
      id: "t3r6c2",
      name: "Lightning Strike",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
    {
      id: "t3r6c3",
      name: "Lightning Fury",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
  ]
};

export default ChargedStrike;
