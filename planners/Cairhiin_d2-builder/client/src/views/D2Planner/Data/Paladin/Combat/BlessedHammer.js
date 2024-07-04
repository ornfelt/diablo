const BlessedHammer = {
  id: "t1r4c2",
  name: "Blessed Hammer",
  description: "Summons a magic hammer that spirals outward, damaging enemies and dealing 50% additional damage against Demons and Undead",
  data: {
    "Magic Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * BlessedHammer.dependencies[0].value +
        dlvl[1] * BlessedHammer.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 8*slvl + 4;
      let max = 8*slvl + 8;
      if (slvl > 28) { min = 14*slvl - 94; max = 14*slvl - 90; }
      if (slvl > 22) { min = 13*slvl - 66; max = 13*slvl - 62; }
      if (slvl > 16) { min = 12*slvl - 44; max = 12*slvl - 40; }
      if (slvl > 8) { min = 10*slvl - 12; max = 10*slvl - 8; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 4.75 + 0.25*slvl
  },
  dependencies: [
      {
        id: "t3r1c1",
        name: "Blessed Aim",
        description: "+{V}% Magic Damage per level",
        value: 14
      },
      {
        id: "t1r4c2",
        name: "Vigor",
        description: "+{V}% Magic Damage per level",
        value: 14
      }
    ]
};

export default BlessedHammer;
