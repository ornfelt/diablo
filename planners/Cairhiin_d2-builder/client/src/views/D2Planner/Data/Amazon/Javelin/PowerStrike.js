const PowerStrike = {
  id: "t3r2c2",
  name: "Power Strike",
  description: "Adds lightning damage and increases the weapon damage of thrusting attacks",
  data: {
    "Attack Rating": slvl => `${8 + (12*slvl)}%`,
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * PowerStrike.dependencies[0].value +
        dlvl[1] * PowerStrike.dependencies[1].value +
        dlvl[2] * PowerStrike.dependencies[2].value +
        dlvl[3] * PowerStrike.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 18*slvl - 2;
      if (slvl > 28)  { max = 90*slvl - 1334; }
      if (slvl > 22)  { max = 72*slvl - 830; }
      if (slvl > 16)  { max = 54*slvl - 434; }
      if (slvl > 8) { max = 36*slvl - 146; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 	1.75 + (0.25*slvl),
  },
  dependencies: [
    {
      id: "t3r3c3",
      name: "Lightning Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
    {
      id: "t3r4c2",
      name: "Charged Strike",
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

export default PowerStrike;
