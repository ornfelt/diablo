const LightningFury = {
  id: "t3r6c3",
  name: "Lightning Fury",
  description: "Creates a powerful lightning bolt that releases multiple lightning bolts from target",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * LightningFury.dependencies[0].value +
        dlvl[1] * LightningFury.dependencies[1].value +
        dlvl[2] * LightningFury.dependencies[2].value +
        dlvl[3] * LightningFury.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 20*slvl + 20;
      if (slvl > 22)  { max = 50*slvl - 440; }
      if (slvl > 16)  { max = 40*slvl - 220; }
      if (slvl > 8) { max = 30*slvl - 60; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Bolts": slvl => Math.min(1+slvl),
    "Mana Cost": slvl => 	9.5 + (0.5*slvl)
  },
  dependencies: [
    {
      id: "t3r2c2",
      name: "Power Strike",
      description: "+{V}% Lightning Damage per level",
      value: 1
    },
    {
      id: "t3r4c2",
      name: "Charged Strike",
      description: "+{V}% Lightning Damage per level",
      value: 1
    },
    {
      id: "t3r6c2",
      name: "Lightning Strike",
      description: "+{V}% Lightning Damage per level",
      value: 1
    },
    {
      id: "t3r3c3",
      name: "Lightning Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 1
    },
  ]
};

export default LightningFury;
