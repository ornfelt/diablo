const LightningStrike = {
  id: "t3r6c2",
  name: "Lightning Strike",
  description: "Strikes explode with chain lightning",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * LightningStrike.dependencies[0].value +
        dlvl[1] * LightningStrike.dependencies[1].value +
        dlvl[2] * LightningStrike.dependencies[2].value +
        dlvl[3] * LightningStrike.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 10*slvl + 15;
      if (slvl > 28)  { max = 30*slvl - 355; }
      if (slvl > 22)  { max = 25*slvl - 215	; }
      if (slvl > 16)  { max = 20*slvl - 105; }
      if (slvl > 8) { max = 15*slvl - 25; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Hits": slvl => 1 + slvl,
    "Mana Cost": () => 9,
  },
  dependencies: [
    {
      id: "t3r3c3",
      name: "Lightning Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
    {
      id: "t3r2c2",
      name: "Power Strike",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
    {
      id: "t3r4c2",
      name: "Charged Strike",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
    {
      id: "t3r6c3",
      name: "Lightning Fury",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
  ]
};

export default LightningStrike;
