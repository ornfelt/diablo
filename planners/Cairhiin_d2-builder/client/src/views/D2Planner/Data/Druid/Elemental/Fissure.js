const Fissure = {
  id: "t3r3c1",
  name: "Fissure",
  description: "Attacks an area by opening a hole in the earth and damaging anything near it",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * Fissure.dependencies[0].value +
          dlvl[1] * Fissure.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 6*slvl + 9;
      let max = 6*slvl + 19;
      if (slvl > 28)  { min = 22*slvl - 259; max = 23*slvl - 271; }
      if (slvl > 22)  { min = 18*slvl - 147; max = 19*slvl - 159; }
      if (slvl > 16)  { min = 16*slvl - 103; max = 16*slvl - 93; }
      if (slvl > 8) { min = 12*slvl - 39; max = 12*slvl - 29; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 15
  },
  dependencies: [
      {
        id: "t3r1c1",
        name: "Firestorm",
        description: "+{V}% Fire Damage per level",
        value: 12
      },
      {
        id: "t3r5c1",
        name: "Volano",
        description: "+{V}% Fire Damage per level",
        value: 12
      }
    ]
};

export default Fissure;
