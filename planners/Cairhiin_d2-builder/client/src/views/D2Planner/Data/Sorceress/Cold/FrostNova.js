const FrostNova = {
  id: "t3r2c1",
  name: "Frost Nova",
  description: "Creates an expanding ring of ice and frost that damages and slows enemies",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * FrostNova.dependencies[0].value +
        dlvl[2] * FrostNova.dependencies[2].value +
        dlvl[3] * FrostNova.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = slvl + 2;
      let max = Math.floor(2.5*slvl + 1.5);
      if (slvl > 8) { min = 3*slvl - 8; max = Math.floor(3.5*slvl - 6.5); }
      if (slvl > 16) { min = 4*slvl - 24; max = Math.floor(4.5*slvl - 22.5); }
      if (slvl > 22) { min = 5*slvl - 46; max = Math.floor(5.5*slvl - 44.5); }
      if (slvl > 28) { min = 6*slvl - 74; max = Math.floor(6.5*slvl - 72.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Cold Duration": function(slvl, dlvl=[0, 0, 0, 0]) {
      let durationMultiplier = dlvl[1] * FrostNova.dependencies[1].value;
      durationMultiplier = Math.round((durationMultiplier / 100 + 1)*100) / 100;
      return `${durationMultiplier * ((175 + (25*slvl)) / 25)} seconds`;
    },
    "Mana Cost": slvl => 9 + (slvl - 1)
  },
  dependencies: [
      {
        id: "t3r2c2",
        name: "Ice Bolt",
        description: "+{V}% Cold Damage per level",
        value: 8
      },
      {
        id: "t3r4c2",
        name: "Glacial Spike",
        description: "+{V}% Cold duration per level",
        value: 10
      },
      {
        id: "t3r5c1",
        name: "Blizzard",
        description: "+{V}% Cold Damage per level",
        value: 8
      },
      {
        id: "t3r6c1",
        name: "Frozen Orb",
        description: "+{V}% Cold Damage per level",
        value: 8
      },
    ]
};

export default FrostNova;
