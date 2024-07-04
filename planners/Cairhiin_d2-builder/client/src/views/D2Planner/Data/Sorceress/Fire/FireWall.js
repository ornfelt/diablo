const FireWall = {
  id: "t1r4c1",
  name: "Fire Wall",
  description: "Creates a wall of fire",
  data: {
    "Average Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * FireWall.dependencies[0].value + dlvl[1] * FireWall.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 144*slvl + 96;
      let max = 144*slvl + 176;
      if (slvl > 16) { min = 336*slvl - 2336; max = 336*slvl - 2256; }
      if (slvl > 8) { min = 224*slvl - 544; max = 224*slvl - 464; }
      return { min: dmgMultiplier*min * 3 * 25/256, max: dmgMultiplier*max * 3 * 25/256 };
    },
    "Mana Cost": slvl => 21 + slvl,
    "Radius": slvl => (7 + 2 * Math.ceil(9*slvl/8)) * 2/3,
    "Duration": () => Math.round(89 / 25)
  },
  dependencies: [
      {
        id: "t1r1c3",
        name: "Warmth",
        description: "+{V}% Fire Damage per level",
        value: 4
      },
      {
        id: "t1r2c1",
        name: "Inferno",
        description: "+{V}% Fire Damage per level",
        value: 1
      }
    ]
};

export default FireWall;
