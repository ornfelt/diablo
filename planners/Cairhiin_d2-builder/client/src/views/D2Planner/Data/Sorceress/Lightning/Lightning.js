const Lightning = {
  id: "t2r3c2",
  name: "Lightning",
  description: "Casts a bolt of lightning",
  data: {
    "Lightning Damage": function(slvl, dlvl = [0, 0, 0]) {
      let dmgMultiplier = dlvl[0] *Lightning.dependencies[0].value +
        dlvl[1] * Lightning.dependencies[1].value +
        dlvl[2] * Lightning.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 8*slvl + 32
      if (slvl > 28) { max = 36*slvl - 528; }
      if (slvl > 22) { max = 28*slvl - 304; }
      if (slvl > 16) { max = 20*slvl - 128; }
      if (slvl > 8) { max = 12*slvl; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 7.5 + 0.5*slvl
  },
  dependencies: [
    {
      id: "t2r1c2",
      name: "Charged Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 8
    },
    {
      id: "t2r3c1",
      name: "Nova",
      description: "+{V}% Lightning Damage per level",
      value: 8
    },
    {
      id: "t2r4c2",
      name: "Chain Lightning",
      description: "+{V}% Lightning Damage per level",
      value: 8
    }
  ]
};

export default Lightning;
