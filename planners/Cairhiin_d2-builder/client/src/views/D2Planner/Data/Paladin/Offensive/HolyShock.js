const HolyShock = {
  id: "t2r5c2",
  name: "Holy Shock",
  description: "Periodically does Lightning damage to enemies within a radius",
  data: {
    "Cold Periodic Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyShock.dependencies[0].value +
        dlvl[1] * HolyShock.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 1;
      let max =  (6*slvl) + 4;
      if (slvl > 28) { max = (15*slvl) - 172; }
      if (slvl > 22) { max = (12*slvl) - 88; }
      if (slvl > 16) { max = (10*slvl) - 44; }
      if (slvl > 8) { max = (8*slvl) - 12; }
      return { min: min, max: dmgMultiplier*max };
    },
    "Cold Weapon Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyShock.dependencies[0].value +
        dlvl[1] * HolyShock.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 1;
      let max = (36*slvl) + 24;
      if (slvl > 28) { max = (90*slvl) - 1032; }
      if (slvl > 22) { max = (72*slvl) - 528; }
      if (slvl > 16) { max = (60*slvl) - 264; }
      if (slvl > 8) { max = (48*slvl) - 72; }
      return { min: min, max: dmgMultiplier*max };
    },
    "Radius": slvl => `${Math.floor(((10 + (2*slvl)) / 3)*10)/10} yards`
  },
  dependencies: [
      {
        id: "t3r3c3",
        name: "Resist Lightning",
        description: "+{V}% Lightning Damage per level",
        value: 12
      },
      {
        id: "t3r6c3",
        name: "Salvation",
        description: "+{V}% Lightning Damage per level",
        value: 4
      }
    ]
};

export default HolyShock;
