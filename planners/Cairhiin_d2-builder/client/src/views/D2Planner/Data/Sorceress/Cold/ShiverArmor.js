const ShiverArmor = {
  id: "t3r3c3",
  name: "Shiver Armor",
  description: "The Sorceress enchants a Armor of cold, granting a defense bonus, as well as slowing and damaging any melee attackers",
  data: {
    "Bonus Defense": slvl => `+${39 + (6*slvl)}%`,
    "Duration": function(slvl, dlvl=[0, 0, 0, 0]) {
      return `${(120 + (slvl - 1) * 12)
        + dlvl[0] * ShiverArmor.dependencies[0].value
        + dlvl[2] * ShiverArmor.dependencies[2].value} seconds`;
    },
    "Cold Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * ShiverArmor.dependencies[1].value +
        dlvl[3] * ShiverArmor.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 2*slvl + 4;
      let max = Math.floor(2.5*slvl + 5.5);
      if (slvl > 28)  { min = 6*slvl - 70; max = Math.floor(6.5*slvl - 68.5); }
      if (slvl > 22)  { min = 5*slvl - 42; max = Math.floor(5.5*slvl - 40.5); }
      if (slvl > 16)  { min = 4*slvl - 20; max = Math.floor(4.5*slvl - 18.5); }
      if (slvl > 8) { min = 3*slvl - 4; max = Math.floor(3.5*slvl - 2.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Cold Duration": () => 4,
    "Mana Cost": () => 11
  },
  dependencies: [
      {
        id: "t3r1c3",
        name: "Frozen Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r1c3",
        name: "Frozen Armor",
        description: "+{V}% Cold Damage per level",
        value: 9
      },
      {
        id: "t3r5c3",
        name: "Chilling Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r5c3",
        name: "Chilling Armor",
        description: "+{V}% Cold Damage per level",
        value: 9
      }
    ]
};

export default ShiverArmor;
