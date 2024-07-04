const Armageddon = {
  id: "t3r6c1",
  name: "Armageddon",
  description: "Small meteors fall from the sky around the Druid",
  data: {
    "Damage": function(slvl) {
      let min = 4*slvl;
      let max = 4*slvl + 12;
      if (slvl > 28)  { min = 12*slvl - 148; max =  14*slvl - 166; }
      if (slvl > 22)  { min = 10*slvl - 92; max = 12*slvl - 110; }
      if (slvl > 16)  { min = 8*slvl - 48; max =  9*slvl - 44; }
      if (slvl > 8) { min =  6*slvl - 16; max =  7*slvl - 12; }
      return { min: min, max: max };
    },
    "Fire Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Armageddon.dependencies[0].value +
          dlvl[1] * Armageddon.dependencies[1].value +
          dlvl[3] * Armageddon.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 15*slvl + 10;
      let max = 16*slvl + 59;
      if (slvl > 28)  { min = 38*slvl - 438; max = 40*slvl - 264; }
      if (slvl > 22)  { min = 31*slvl - 242; max = 36*slvl - 152; }
      if (slvl > 16)  { min = 25*slvl - 110; max = 32*slvl - 64; }
      if (slvl > 8) { min = 28*slvl - 16; max = 28*slvl; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Average Fire Damage": function(slvl) {
      let min = 24*slvl + 16;
      let max = 24*slvl + 32;
      if (slvl > 28)  { min = 40*slvl - 280; max =  (13*slvl) - 224; }
      if (slvl > 22)  { min = 36*slvl - 168; max = (8*slvl) - 84; }
      if (slvl > 16)  { min = 32*slvl - 80; max =  (6*slvl) - 40; }
      if (slvl > 8) { min =  (4*slvl) - 10; max =  (4*slvl) - 8; }
      return { min: min * 25/256 * 3, max: max * 25/256 * 3 };
    },
    "Duration": (slvl, dlvl=[0, 0, 0]) =>
        `${10 + dlvl[0] * Armageddon.dependencies[0].value} seconds`,
    "Mana Cost": () => 35
  },
  dependencies: [
    {
      id: "t3r1c1",
      name: "Firestorm",
      description: "+{V}% Fire Damage per level",
      value: 14
    },
    {
      id: "t3r2c1",
      name: "Molten Boulder",
      description: "+{V}% Fire Damage per level",
      value: 14
    },
    {
      id: "t3r3c1",
      name: "Fissure",
      description: "+{V} seconds per level",
      value: 2
    },
    {
      id: "t3r5c1",
      name: "Volcano",
      description: "+{V}% Fire Damage per level",
      value: 14
    }
  ]
};

export default Armageddon;
