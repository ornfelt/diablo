const Blizzard = {
  id: "t3r5c1",
  name: "Blizzard",
  description: "Summons an ice storm to rain cold death onto your enemies",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Blizzard.dependencies[0].value +
        dlvl[1] * Blizzard.dependencies[1].value +
        dlvl[2] * Blizzard.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 15*slvl + 30;
      let max = 16*slvl + 59;
      if (slvl > 28)  { min = 65*slvl - 830; max = 66*slvl - 801; }
      if (slvl > 22)  { min = 55*slvl - 550; max = 56*slvl - 521; }
      if (slvl > 16)  { min = 45*slvl - 330; max = 46*slvl - 301; }
      if (slvl > 8) { min = 30*slvl - 90; max = 31*slvl - 61; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Duration": () => 4,
    "Cold Duration": () => 4,
    "Mana Cost": slvl  => 23 + slvl - 1
  },
  dependencies: [
      {
        id: "t3r1c2",
        name: "Ice Bolt",
        description: "+{V}% Cold Damage per level",
        value: 5
      },
      {
        id: "t3r4c2",
        name: "Glacial Spike",
        description: "+{V}% Cold Damage per level",
        value: 5
      },
      {
        id: "t3r2c2",
        name: "Ice Blast",
        description: "+{V}% Cold Damage per level",
        value: 5
      }
    ]
};

export default Blizzard;
