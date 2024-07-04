const FireClaws = {
  id: "t2r4c2",
  name: "Fire Claws",
  description: "Augments your paws with fire damage",
  data: {
    "Attack Rating": slvl => `${15*slvl + 35}%`,
    "Fire Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * FireClaws.dependencies[0].value +
      dlvl[1] * FireClaws.dependencies[1].value +
      dlvl[2] * FireClaws.dependencies[2].value +
      dlvl[3] * FireClaws.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 8*slvl + 7;
      let max = 8*slvl + 12;
      if (slvl > 28)  { min = 30*slvl - 409; max = 34*slvl - 492; }
      if (slvl > 22)  { min = 24*slvl - 241; max = 26*slvl - 268; }
      if (slvl > 16)  { min = 20*slvl - 153; max = 22*slvl - 180; }
      if (slvl > 8) { min = 12*slvl - 25; max = 12*slvl - 20; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 4
  },
  dependencies: [
      {
        id: "t3r1c1",
        name: "Firestorm",
        description: "+{V}% Fire Damage per level",
        value: 22
      },
      {
        id: "t3r2c1",
        name: "Molten Boulder",
        description: "+{V}% Fire Damage per level",
        value: 22
      },
      {
        id: "t3r3c1",
        name: "Fissure",
        description: "+{V}% Fire Damage per level",
        value: 22
      },
      {
        id: "t3r5c1",
        name: "Volcano",
        description: "+{V}% Fire Damage per level",
        value: 22
      }
    ]
};

export default FireClaws;
