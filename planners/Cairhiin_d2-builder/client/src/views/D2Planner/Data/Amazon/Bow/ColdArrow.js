const ColdArrow = {
  id: "t1r2c1",
  name: "Cold Arrow",
  description: "Enchants an arrow, adding cold damage and slowing your enemy",
  data: {
    "Converts": slvl => `${Math.min(1 + (2*slvl), 100)}% of Physical Damage to Cold Damage`,
    "Attack Rating": slvl => `${1 + (9*slvl)}%`,
    "Cold Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * ColdArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 2*slvl + 1;
      let max = 2*slvl + 2;
      if (slvl > 28)  { min = 21*slvl - 479; max = 22*slvl - 500; }
      if (slvl > 22)  { min = 8*slvl - 115	; max = Math.floor(8.5*slvl - 122); }
      if (slvl > 16)  { min = 4*slvl - 27; max = Math.floor(4.5*slvl - 34); }
      if (slvl > 8) { min = Math.floor(2.5*slvl - 3); max = Math.floor(2.5*slvl - 2); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Cold Duration": slvl => `${Math.floor((70 + (30*slvl)) / 25)} seconds`,
    "Mana Cost": slvl => 3.375 + (0.125*slvl),
  },
  dependencies: [
    {
      id: "t1r4c1",
      name: "Ice Arrow",
      description: "+{V}% Cold Damage per level",
      value: 12
    }
  ]
};

export default ColdArrow;
