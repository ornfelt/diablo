const FreezingArrow = {
  id: "t1r6c1",
  name: "Freezing Arrow",
  description: "Enchants an arrow to deliver cold damage that freezes any monsters near the point of impact",
  data: {
    "Attack Rating": slvl => `${31 + (9*slvl)}%`,
    "Cold Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * FreezingArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 30 + 10*slvl;
      let max = 40 + 10*slvl;
      if (slvl > 28)  { min = 24*slvl - 190; max = 24*slvl - 180; }
      if (slvl > 22)  { min = 22*slvl - 134; max = 22*slvl - 124; }
      if (slvl > 16)  { min = 22*slvl - 134; max = 20*slvl - 80; }
      if (slvl > 8) { min = 15*slvl - 10; max = 15*slvl; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Freeze Duration": function(slvl, dlvl=[0, 0]) {
      let durationMultiplier = dlvl[2] * FreezingArrow.dependencies[1].value;
      durationMultiplier = Math.round((durationMultiplier / 100 + 1)*100) / 100;
      return `${durationMultiplier * 2} seconds`
    },
    "Mana Cost": slvl => 8.5 + 0.5*slvl
  },
  dependencies: [
    {
      id: "t1r2c1",
      name: "Cold Arrow",
      description: "+{V}% Cold Damage per level",
      value: 12
    },
    {
      id: "t1r4c1",
      name: "Ice Arrow",
      description: "+{V}% Freeze Duration per level",
      value: 5
    }
  ]
};

export default FreezingArrow;
