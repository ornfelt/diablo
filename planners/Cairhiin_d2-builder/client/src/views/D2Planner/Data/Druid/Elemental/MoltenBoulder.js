const MoltenBoulder = {
  id: "t3r2c1",
  name: "Molten Boulder",
  description: "Lunges a huge molten boulder at a group of foes",
  data: {
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * MoltenBoulder.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 4*slvl + 2;
      let max = 5*slvl + 7;
      if (slvl > 28)  { min = 16*slvl - 220; max = 17*slvl - 215; }
      if (slvl > 22)  { min = 13*slvl - 136; max = 14*slvl - 131; }
      if (slvl > 16)  { min = 10*slvl - 70; max = 11*slvl - 65; }
      if (slvl > 8) { min = 7*slvl - 22; max = 8*slvl - 17; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * MoltenBoulder.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 4*slvl + 2;
      let max = 5*slvl + 7;
      if (slvl > 28)  { min = 16*slvl - 220; max = 17*slvl - 215; }
      if (slvl > 22)  { min = 13*slvl - 136; max = 14*slvl - 131; }
      if (slvl > 16)  { min = 10*slvl - 70; max = 11*slvl - 65; }
      if (slvl > 8) { min = 7*slvl - 22; max = 8*slvl - 17; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Average Fire Damage": function(slvl) {
      let min = 24*slvl + 16;
      let max = 24*slvl + 32;
      if (slvl > 28)  { min = 40*slvl - 280; max = 40*slvl - 264; }
      if (slvl > 22)  { min = 36*slvl - 168; max = 36*slvl - 152; }
      if (slvl > 16)  { min = 32*slvl - 80; max = 32*slvl - 64; }
      if (slvl > 8) { min = 28*slvl - 16; max = 28*slvl; }
      return { min: min * (25/256)*3, max: max * (25/256)*3 };
    },
    "Mana Cost": slvl => 9.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t3r1c1",
        name: "Firestorm",
        description: "+{V}% Fire Damage per level",
        value: 8
      },
      {
        id: "t3r5c1",
        name: "Volcano",
        description: "+{V}% Damage per level",
        value: 10
      }
    ]
};

export default MoltenBoulder;
