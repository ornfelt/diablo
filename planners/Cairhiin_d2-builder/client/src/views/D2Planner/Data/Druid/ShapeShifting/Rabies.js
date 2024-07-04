const Rabies = {
  id: "t2r4c1",
  name: "Rabies",
  description: "Toxifies your touch, poisoning anything that you attack",
  data: {
    "Attack Rating": slvl => `${43 + (7*slvl)}%`,
    "Average Poison Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * Rabies.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (32*slvl) + 16;
      let max = (32*slvl) + 80;
      if (slvl > 28)  { min = (128*slvl) - 2128; max = (128*slvl) - 2064; }
      if (slvl > 22)  { min = (88*slvl) - 1008; max = (88*slvl) - 944; }
      if (slvl > 16)  { min = (56*slvl) - 304; max = (56*slvl) - 240; }
      if (slvl > 8) { min = (40*slvl) - 48; max = (40*slvl) + 16; }
      return { min: Math.floor(dmgMultiplier*min*(25/256)), max: Math.floor(dmgMultiplier*max*(25/256)) };
    },
    "Duration": slvl => `${3.6 + (0.4*slvl)} seconds`,
    "Mana Cost": () => 10
  },
  dependencies: [
      {
        id: "t1r1c3",
        name: "Poison Creeper",
        description: "+{V}% Poison Damage per level",
        value: 18
      }
    ]
};

export default Rabies;
