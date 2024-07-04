const BoneSpirit = {
  id: "t2r6c2",
  name: "Bone Spirit",
  description: "Summons a spirit to track and damage a target",
  data: {
    "Magic Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * BoneSpirit.dependencies[0].value +
        dlvl[1] * BoneSpirit.dependencies[1].value +
        dlvl[2] * BoneSpirit.dependencies[2].value +
        dlvl[3] * BoneSpirit.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 4 + (16*slvl);
      let max = 13 + (17*slvl);
      if (slvl > 28) { min = (20*slvl) - 70; max = (21*slvl) - 61; }
      if (slvl > 22) { min = (19*slvl) - 42; max = (20*slvl) - 33; }
      if (slvl > 16) { min = (18*slvl) - 20; max = (19*slvl) - 11; }
      if (slvl > 8) { min = (17*slvl) - 4; max = (18*slvl) + 5; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 11.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t2r1c2",
        name: "Teeth",
        description: "+{V}% Magic Damage per level",
        value: 6
      },
      {
        id: "t2r3c3",
        name: "Bone Wall",
        description: "+{V}% Magic Damage per level",
        value: 6
      },
      {
        id: "t2r5c3",
        name: "Bone Prison",
        description: "+{V}% Magic Damage per level",
        value: 6
      },
      {
        id: "t2r4c2",
        name: "Bone Spear",
        description: "+{V}% Magic Damage per level",
        value: 6
      }
    ]
};

export default BoneSpirit;
