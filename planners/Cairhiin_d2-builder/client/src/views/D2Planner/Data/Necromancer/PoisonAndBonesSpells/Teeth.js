const Teeth = {
  id: "t2r1c2",
  name: "Teeth",
  description: "Summons multiple projectiles that damage enemies",
  data: {
    "Teeth": slvl => Math.min(1+slvl, 24),
    "Magic Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Teeth.dependencies[0].value +
        dlvl[1] * Teeth.dependencies[1].value +
        dlvl[2] * Teeth.dependencies[2].value +
        dlvl[3] * Teeth.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 1+slvl;
      let max = 3+slvl;
      if (slvl > 28) { min = Math.floor(2.5*slvl - 32); max = (3*slvl) - 34; }
      if (slvl > 22) { min = (2*slvl) - 18; max = Math.floor(2.5*slvl - 20); }
      if (slvl > 16) { min = Math.floor(1.5*slvl - 7); max = (2*slvl) - 9; }
      if (slvl > 8) { max = Math.floor(1.5*slvl - 1); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 	2.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t2r3c3",
        name: "Bone Wall",
        description: "+{V}% Magic Damage per level",
        value: 15
      },
      {
        id: "t2r4c2",
        name: "Bone Spear",
        description: "+{V}% Magic Damage per level",
        value: 15
      },
      {
        id: "t2r5c3",
        name: "Bone Prison",
        description: "+{V}% Magic Damage per level",
        value: 15
      },
      {
        id: "t2r6c2",
        name: "Bone Spirit",
        description: "+{V}% Magic Damage per level",
        value: 15
      }
    ]
};

export default Teeth;
