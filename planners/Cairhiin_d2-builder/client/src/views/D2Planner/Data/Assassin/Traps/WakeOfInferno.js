const WakeOfInferno = {
  id: "t1r5c2",
  name: "Wake of Inferno",
  description: "Drops a trap that shoots a large blast of fire",
  data: {
    "Average Fire Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * WakeOfInferno.dependencies[0].value +
        dlvl[2] * WakeOfInferno.dependencies[2].value +
        dlvl[3] * WakeOfInferno.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 272*slvl + 48;
      let max = 304*slvl + 496;
      if (slvl > 28)  { min = 624*slvl - 6992; max = 656*slvl - 6544; }
      if (slvl > 22)  { min = 512*slvl - 3856; max = 544*slvl - 3408; }
      if (slvl > 16)  { min = 416*slvl - 1744; max = 448*slvl - 1296; }
      if (slvl > 8) { min = 336*slvl - 464; max = 368*slvl - 16; }
      return { min: dmgMultiplier*min*25 / (3*256), max: dmgMultiplier*max*25 / (3*256) };
    },
    "Shots": () => 10,
    "Range": (slvl, dlvl=[0, 0, 0, 0]) => 7.5 +   dlvl[1] * WakeOfInferno.dependencies[1].value,
    "Mana Cost": () => 20
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V}% Fire Damage per level",
      value: 7
    },
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V} yards per level",
      value: 0.375
    },
    {
      id: "t1r5c2",
      name: "Wake of Inferno",
      description: "+{V}% Fire Damage per level",
      value: 10
    },
    {
      id: "t1r6c1",
      name: "Death Sentry",
      description: "+{V}% Fire Damage per level",
      value: 10
    }
  ]
};

export default WakeOfInferno;
