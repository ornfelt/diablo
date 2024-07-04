const LightningSentry = {
  id: "t1r5c1",
  name: "Lightning Sentry",
  description: "Drops a trap that shoots lightning at nearby foes",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * LightningSentry.dependencies[0].value +
        dlvl[1] * LightningSentry.dependencies[1].value +
        dlvl[2] * LightningSentry.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = (10*slvl) + 10;
      if (slvl > 28)  { max = (16*slvl) - 38; }
      if (slvl > 22)  { max = (24*slvl) - 166; }
      if (slvl > 16)  { max = (34*slvl) - 386; }
      if (slvl > 8) { max = (44*slvl) - 666; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Shots": () => 10,
    "Mana Cost": () => 20
  },
  dependencies: [
    {
      id: "t1r2c1",
      name: "Shock Web",
      description: "+{V}% Lightning Damage per level",
      value: 12
    },
    {
      id: "t1r3c1",
      name: "Charged Bolt Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 12
    },
    {
      id: "t1r6c1",
      name: "Death Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 12
    }
  ]
};

export default LightningSentry;
