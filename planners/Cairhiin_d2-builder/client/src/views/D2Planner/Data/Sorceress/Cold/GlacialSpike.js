const GlacialSpike = {
  id: "t3r4c2",
  name: "Glacial Spike",
  description: "A shard of ice that inflicts massive cold damage and explodes to freeze nearby enemies",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * GlacialSpike.dependencies[0].value +
        dlvl[1] * GlacialSpike.dependencies[1].value +
        dlvl[3] * GlacialSpike.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 7*slvl + 9;
      let max = Math.floor(7.5*slvl + 16.5);
      if (slvl > 28)  { min = 16*slvl - 105; max = Math.floor(16.5*slvl - 97.5); }
      if (slvl > 22)  { min = 15*slvl - 77; max = Math.floor(15.5*slvl - 69.5); }
      if (slvl > 16)  { min = 14*slvl - 55; max = Math.floor(14.5*slvl - 47.5); }
      if (slvl > 8) { min = 13*slvl - 39; max = Math.floor(13.5*slvl - 31.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Freeze Duration": function(slvl, dlvl=[0, 0, 0, 0]) {
      let durationMultiplier = dlvl[2] * GlacialSpike.dependencies[2].value;
      durationMultiplier = Math.round((durationMultiplier / 100 + 1)*100) / 100;
      return `${durationMultiplier * ((47 + 3*slvl) / 25)} seconds`
    },
    "Mana Cost": slvl => 9.5 + 0.5*slvl
  },
  dependencies: [
      {
        id: "t3r1c2",
        name: "Ice Bolt",
        description: "+{V}% Cold Damage per level",
        value: 5
      },
      {
        id: "t3r2c2",
        name: "Ice Blast",
        description: "+{V}% Cold Damage per level",
        value: 5
      },
      {
        id: "t3r5c1",
        name: "Blizzard",
        description: "+{V}% Cold duration per level",
        value: 3
      },
      {
        id: "t3r6c1",
        name: "Frozen Orb",
        description: "+{V}% Cold Damage per level",
        value: 5
      },
    ]
};

export default GlacialSpike;
