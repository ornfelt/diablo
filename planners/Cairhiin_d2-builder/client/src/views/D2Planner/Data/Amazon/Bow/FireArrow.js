const FireArrow = {
  id: "t1r1c3",
  name: "Fire Arrow",
  description: "Enchants an arrow with fire, allowing it to deal additional magic damage",
  data: {
    "Converts": slvl => `${Math.min(1 + (2*slvl), 100)}% of Physical Damage to Fire Damage`,
    "Attack Rating": slvl => `${1 + (9*slvl)}%`,
    "Fire Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * FireArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 2*slvl - 1;
      let max = 2*slvl + 2;
      if (slvl > 28)  { min = 24*slvl - 525; max = 27*slvl - 588; }
      if (slvl > 22)  { min = 12*slvl - 189; max = 14*slvl - 224; }
      if (slvl > 16)  { min = 6*slvl - 57; max = 7*slvl - 70; }
      if (slvl > 8) { min = 3*slvl - 9; max = 3*slvl - 6; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 2.875 + (0.125*slvl),

  },
  dependencies: [
    {
      id: "t1r3c3",
      name: "Exploding Arrow",
      description: "+{V}% Fire Damage per level",
      value: 12
    }
  ]
};

export default FireArrow;
