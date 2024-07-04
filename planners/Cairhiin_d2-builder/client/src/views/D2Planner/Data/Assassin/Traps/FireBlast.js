const FireBlast = {
  id: "t1r1c2",
  name: "Fire Blast",
  description: "Creates a small bomb the Assassin can throw",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0, 0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * FireBlast.dependencies[0].value +
        dlvl[1] * FireBlast.dependencies[1].value +
        dlvl[2] * FireBlast.dependencies[2].value +
        dlvl[3] * FireBlast.dependencies[3].value +
        dlvl[4] * FireBlast.dependencies[4].value +
        dlvl[5] * FireBlast.dependencies[5].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(1.5*slvl + 1.5);
      let max = Math.floor(2.5*slvl + 1.5);
      if (slvl > 28)  { min = Math.floor(29*slvl - 592.5); max = Math.floor(33*slvl - 654.5); }
      if (slvl > 22)  { min = Math.floor(19*slvl - 312.5); max = Math.floor(22*slvl - 346.5); }
      if (slvl > 16)  { min = Math.floor(10*slvl - 114.5); max = Math.floor(12*slvl - 126.5); }
      if (slvl > 8) { min = Math.floor(4*slvl - 18.5); max = Math.floor(5.5*slvl - 22.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 2.875 + (0.125*slvl)
  },
  dependencies: [
    {
      id: "t1r2c1",
      name: "Shock Web",
      description: "+{V}% Fire Damage per level",
      value: 9
    },
    {
      id: "t1r3c1",
      name: "Charged Bolt Sentry",
      description: "+{V}% Fire Damage per level",
      value: 9
    },
    {
      id: "t1r3c2",
      name: "Wake of Fire",
      description: "+{V}% Fire Damage per level",
      value: 9
    },
    {
      id: "t1r5c1",
      name: "Lightning Sentry",
      description: "+{V}% Fire Damage per level",
      value: 9
    },
    {
      id: "t1r5c2",
      name: "Wake of Inferno",
      description: "+{V}% Fire Damage per level",
      value: 9
    },
    {
      id: "t1r6c1",
      name: "Death Sentry",
      description: "+{V}% Fire Damage per level",
      value: 9
    }
  ]
};

export default FireBlast;
