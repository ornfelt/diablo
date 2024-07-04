const Stun = {
  id: "t1r3c2",
  name: "Stun",
  description: "Strike an enemy, temporarily stunning them",
  data: {
    "Attack Rating": (slvl, dlvl=[0, 0, 0]) => `${10 + (5*slvl) + dlvl[1] * Stun.dependencies[1].value}%`,
    "Damage": (slvl, dlvl=[0, 0, 0]) => `+${dlvl[0] * Stun.dependencies[0].value}%`,
    "Stun Duration": function(slvl, dlvl=[0, 0, 0]) {
      let stunMultiplier = dlvl[0] * Stun.dependencies[0].value;
      stunMultiplier = Math.round((stunMultiplier / 100 + 1)*100) / 100;
      let stun = 1 + (0.2*slvl);
      if (slvl > 16)  stun = Math.round((Math.min(2.92 + (0.08*slvl), 10)) * 10) / 10;
      return `${stun * stunMultiplier} seconds`;
    },
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Bash",
      description: "+{V}% Damage per level",
      value: 8
    },
    {
      id: "t1r4c2",
      name: "Concentrate",
      description: "+{V}% Attack Rating per level",
      value: 5
    },
    {
      id: "t3r6c1",
      name: "War Cry",
      description: "+{V}% Stun Duration per level",
      value: 5
    }
  ]
};

export default Stun;
