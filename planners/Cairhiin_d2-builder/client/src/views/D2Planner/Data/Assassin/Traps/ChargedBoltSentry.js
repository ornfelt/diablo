const ChargedBoltSentry = {
  id: "t1r3c1",
  name: "Charged Bolt Sentry",
  description: "Medium Assassin trap that fires Charged Bolt attacks",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * ChargedBoltSentry.dependencies[0].value +
        dlvl[2] * ChargedBoltSentry.dependencies[2].value +
        dlvl[4] * ChargedBoltSentry.dependencies[4].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = (3*slvl)+4;
      if (slvl > 28)  { max = (8*slvl)-86; }
      if (slvl > 22)  { max = (7*slvl)-58; }
      if (slvl > 16)  { max = (6*slvl)-36; }
      if (slvl > 8) { max = (4*slvl)-4; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Shots": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return 5 + Math.floor((dlvl[3] * ChargedBoltSentry.dependencies[3].value) / 4);
    },
    "Bolts": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `${5 + Math.floor((dlvl[1] * ChargedBoltSentry.dependencies[1].value) / 3)} per shot`;
    },
    "Mana Cost": () => 13
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V}% Lightning Damage per level",
      value: 6
    },
    {
      id: "t1r2c1",
      name: "Shock Web",
      description: "+{V} Bolt per 3 levels",
      value: 1
    },
    {
      id: "t1r5c1",
      name: "Lightning Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 6
    },
    {
      id: "t1r5c1",
      name: "Lightning Sentry",
      description: "+{V} Shot per 4 levels",
      value: 1
    },
    {
      id: "t1r6c1",
      name: "Death Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 6
    }
  ]
};

export default ChargedBoltSentry;
