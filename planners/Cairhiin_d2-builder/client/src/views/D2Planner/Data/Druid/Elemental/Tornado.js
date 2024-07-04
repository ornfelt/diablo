const Tornado = {
  id: "t3r5c2",
  name: "Tornado",
  description: "Casts a larger whirlwind to damage your foes",
  data: {
    "Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Tornado.dependencies[0].value +
          dlvl[1] * Tornado.dependencies[1].value +
          dlvl[2] * Tornado.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (8*slvl) + 17;
      let max = (8*slvl) + 27;
      if (slvl > 28)  { min = (28*slvl) - 327; max = (29*slvl) - 325; }
      if (slvl > 22)  { min = (24*slvl) - 215; max = (25*slvl) - 213; }
      if (slvl > 16)  { min = (20*slvl) - 127; max =  (21*slvl) - 125; }
      if (slvl > 8) { min =  (14*slvl) - 31; max =  (15*slvl) - 29; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 10
  },
  dependencies: [
      {
        id: "t3r3c3",
        name: "Cyclone Armor",
        description: "+{V}% Damage per level",
        value: 9
      },
      {
        id: "t3r4c2",
        name: "Twister",
        description: "+{V}% Damage per level",
        value: 9
      },
      {
        id: "t3r6c2",
        name: "Hurricane",
        description: "+{V}% Damage per level",
        value: 9
      }
    ]
};

export default Tornado;
