const LightningBolt = {
  id: "t3r3c3",
  name: "Lightning Bolt",
  description: "Causes a thrown javelin to leave a trail of lighting, and deal lightning damage",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * LightningBolt.dependencies[0].value +
        dlvl[1] * LightningBolt.dependencies[1].value +
        dlvl[2] * LightningBolt.dependencies[2].value +
        dlvl[3] * LightningBolt.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 12*slvl + 28	;
      if (slvl > 28)  { max = 88*slvl - 1740; }
      if (slvl > 22)  { max = 48*slvl - 620; }
      if (slvl > 16)  { max = 28*slvl - 180; }
      if (slvl > 8) { max = 18*slvl - 20; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 	5.75 + (0.25*slvl)
  },
  dependencies: [
    {
      id: "t3r2c2",
      name: "Power Strike",
      description: "+{V}% Lightning Damage per level",
      value: 3
    },
    {
      id: "t3r4c2",
      name: "Charged Strike",
      description: "+{V}% Lightning Damage per level",
      value: 3
    },
    {
      id: "t3r6c2",
      name: "Lightning Strike",
      description: "+{V}% Lightning Damage per level",
      value: 3
    },
    {
      id: "t3r6c3",
      name: "Lightning Fury",
      description: "+{V}% Lightning Damage per level",
      value: 3
    },
  ]
};

export default LightningBolt;
