const FireStorm = {
  id: "t3r1c1",
  name: "Firestorm",
  description: "Three weaving trails of fire that seek out enemies for a short distance",
  data: {
    "Average Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * FireStorm.dependencies[0].value +
          dlvl[1] * FireStorm.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 12*slvl;
      let max = 12*slvl	+ 12;
      if (slvl > 28)  { min = (84*slvl) - 1592; max = (92*slvl) - 1724; }
      if (slvl > 22)  { min = (56*slvl) - 808; max = (60*slvl) - 828; }
      if (slvl > 16)  { min = (28*slvl) - 192; max = (32*slvl) - 212; }
      if (slvl > 8) { min = (20*slvl) - 64; max = (24*slvl) - 84; }
      return { min: dmgMultiplier*min * (25/256)*3, max: dmgMultiplier*max * (25/256)*3 };
    },
    "Mana Cost": () => 4
  },
  dependencies: [
      {
        id: "t3r2c1",
        name: "Molten Boulder",
        description: "+{V}% Fire Damage per level",
        value: 23
      },
      {
        id: "t3r3c1",
        name: "Fissure",
        description: "+{V}% Fire Damage per level",
        value: 23
      }
    ]
};

export default FireStorm;
