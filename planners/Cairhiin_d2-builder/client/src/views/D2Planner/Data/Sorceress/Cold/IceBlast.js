const IceBlast = {
  id: "t3r2c2",
  name: "Ice Blast",
  description: "Creates a bolt of ice that completely freezes a target",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * IceBlast.dependencies[0].value +
        dlvl[1] * IceBlast.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 7*slvl + 1;
      let max = Math.floor(7.5*slvl + 4.5);
      if (slvl > 28)  { min = 35*slvl - 517; max = Math.floor(35.5*slvl - 513.5); }
      if (slvl > 22)  { min = 28*slvl - 321; max = Math.floor(28.5*slvl - 317.5); }
      if (slvl > 16)  { min = 21*slvl - 167; max = Math.floor(21.5*slvl - 163.5); }
      if (slvl > 8) { min = 14*slvl - 55; max = Math.floor(14.5*slvl - 51.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Freeze Duration": slvl => `${(70 + (5*slvl)) / 25} seconds`,
    "Mana Cost": slvl => 5.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t3r5c1",
        name: "Blizzard",
        description: "+{V}% Cold Damage per level",
        value: 10
      },
      {
        id: "t3r6c1",
        name: "Frozen Orb",
        description: "+{V}% Cold Damage per level",
        value: 10
      },
    ]
};

export default IceBlast;
