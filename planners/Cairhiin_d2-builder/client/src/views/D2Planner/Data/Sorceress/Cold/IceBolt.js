const IceBolt = {
  id: "t3r1c2",
  name: "Ice Bolt",
  description: "Shoots a bolt of ice that damages and slows your victim",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * IceBolt.dependencies[0].value +
        dlvl[1] * IceBolt.dependencies[1].value +
        dlvl[2] * IceBolt.dependencies[2].value +
        dlvl[3] * IceBolt.dependencies[3].value +
        dlvl[4] * IceBolt.dependencies[4].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = slvl + 2;
      let max = Math.floor(1.5*slvl + 3.5);
      if (slvl > 28)  { min = 5*slvl - 72; max = 5*slvl - 72; }
      if (slvl > 22)  { min = 4*slvl - 44; max = 4*slvl - 44; }
      if (slvl > 16)  { min = 3*slvl - 22; max = Math.floor(3.5*slvl - 20.5); }
      if (slvl > 8) { min = 2*slvl - 6; max = Math.floor(2.5*slvl - 4.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Cold Duration": slvl => `${(35*slvl + 115) / 25} seconds`,
    "Mana Cost": () => 3
  },
  dependencies: [
      {
        id: "t3r2c1",
        name: "Frost Nova",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r2c2",
        name: "Ice Blast",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r4c2",
        name: "Glacial Spike",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r5c1",
        name: "Blizzard",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r6c1",
        name: "Frozen Orb",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
    ]
};

export default IceBolt;
