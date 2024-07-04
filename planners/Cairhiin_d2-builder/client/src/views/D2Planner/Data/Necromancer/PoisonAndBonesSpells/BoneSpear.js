const BoneSpear = {
  id: "t2r4c2",
  name: "Bone Spear",
  description: "Summons a bone missile that can damage and pass through multiple enemies",
  data: {
    "Magic Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * BoneSpear.dependencies[0].value +
        dlvl[1] * BoneSpear.dependencies[1].value +
        dlvl[2] * BoneSpear.dependencies[2].value +
        dlvl[3] * BoneSpear.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 8 + (8*slvl);
      let max = 16 + (8*slvl);
      if (slvl > 28) { min = (24*slvl) - 348; max = (25*slvl) - 356; }
      if (slvl > 22) { min = (18*slvl) - 180; max = (19*slvl) - 188; }
      if (slvl > 16) { min = (12*slvl) - 48; max = (13*slvl) - 56; }
      if (slvl > 8) { min = 9*slvl; max = 9*slvl + 8; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 6.75 + (0.25*slvl)
  },
  dependencies: [
      {
        id: "t2r1c2",
        name: "Teeth",
        description: "+{V}% Magic Damage per level",
        value: 7
      },
      {
        id: "t2r3c3",
        name: "Bone Wall",
        description: "+{V}% Magic Damage per level",
        value: 7
      },
      {
        id: "t2r5c3",
        name: "Bone Prison",
        description: "+{V}% Magic Damage per level",
        value: 7
      },
      {
        id: "t2r6c2",
        name: "Bone Spirit",
        description: "+{V}% Magic Damage per level",
        value: 7
      }
    ]
};

export default BoneSpear;
