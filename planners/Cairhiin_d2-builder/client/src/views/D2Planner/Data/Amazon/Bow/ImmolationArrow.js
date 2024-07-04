const ImmolationArrow = {
  id: "t1r5c3",
  name: "Immolation Arrow",
  description: "Enchants an arrow with fire that explodes on contact leaving a patch of fire",
  data: {
    "Attack Rating": slvl => `${21 + (9*slvl)}%`,
    "Fire Explosion Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * ImmolationArrow.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 12*slvl;
      let max = 11 + 12*slvl;
      if (slvl > 28)  { min = 38*slvl - 364; max = 38*slvl - 353; }
      if (slvl > 22)  { min = 36*slvl - 308	; max = 36*slvl - 297; }
      if (slvl > 16)  { min = 34*slvl - 264; max = 34*slvl - 253; }
      if (slvl > 8) { min = 23*slvl - 88	; max = 23*slvl - 77; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Average Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * ImmolationArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return { min: dmgMultiplier*(8 + (20*slvl))*75/256, max: dmgMultiplier*(16 + (20*slvl))*75/256 };
    },
    "Mana Cost": slvl => 5.5 + (0.5*slvl)
  },
  dependencies: [
    {
      id: "t1r1c3",
      name: "Fire Arrow",
      description: "+{V}% Average Fire Damage per second per level",
      value: 5
    },
    {
      id: "t1r3c3",
      name: "Exploding Arrow",
      description: "+{V}% Average Fire Damage per level",
      value: 10
    }
  ]
};

export default ImmolationArrow;
