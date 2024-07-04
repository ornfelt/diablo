const ExplodingArrow = {
  id: "t1r3c3",
  name: "Exploding Arrow",
  description: "Adds fire damage to normal arrows and explodes on impact",
  data: {
    "Attack Rating": slvl => `${11 + (9*slvl)}%`,
    "Fire Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * ExplodingArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 5*slvl - 3;
      let max = 5*slvl + 1;
      if (slvl > 28)  { min = 20*slvl - 341; max = 23*slvl - 389; }
      if (slvl > 22)  { min = 12*slvl - 117; max = 14*slvl - 137	; }
      if (slvl > 16)  { min = 9*slvl - 51; max = 11*slvl - 71; }
      if (slvl > 8) { min = 7*slvl - 19; max = 8*slvl - 23; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 4.5 + (0.5*slvl)
  },
  dependencies: [
    {
      id: "t1r1c3",
      name: "Fire Arrow",
      description: "+{V}% Fire Damage per level",
      value: 12
    }
  ]
};

export default ExplodingArrow;
