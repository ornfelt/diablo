const Valkyrie = {
  id: "t2r6c1",
  name: "Valkyrie",
  description: "Summons a powerful Valkyrie warrior to fight by your side",
  data: {
    "Life": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return 400 * (80 + (20*(slvl + dlvl[4]))) / 100;
    },
    "Attack Rating": (slvl, dlvl=[0, 0, 0, 0, 0]) => `+${dlvl[3] * Valkyrie.dependencies[3].value}`,
    "Mana Cost": slvl => 24 + slvl
  },
  dependencies: [
    {
      id: "t2r1c3",
      name: "Critical Strike",
      description: "+{V}% Critical Strike chance",
      value: 0
    },
    {
      id: "t2r2c2",
      name: "Dodge",
      description: "+{V}% Chance to Dodge melee attack",
      value: 0
    },
    {
      id: "t2r3c2",
      name: "Avoid",
      description: "+{V}% Chance to Dodge missile attack",
      value: 0
    },
    {
      id: "t2r4c3",
      name: "Penetrate",
      description: "+{V} Attack Rating per level",
      value: 40
    },
    {
      id: "t2r5c1",
      name: "Decoy",
      description: "+{V}% Life per level",
      value: 20
    },
    {
      id: "t2r5c2",
      name: "Evade",
      description: "+{V}% Chance to Evade while moving",
      value: 0
    }
  ]
};

export default Valkyrie;
