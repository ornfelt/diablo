const HolyFreeze = {
  id: "t2r4c2",
  name: "Holy Freeze",
  description: "Periodically slows enemies nearby and deals Cold damage",
  data: {
    "Cold Periodic Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyFreeze.dependencies[0].value +
        dlvl[1] * HolyFreeze.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = slvl + 1;
      let max =  slvl + 2;
      if (slvl > 28) { min = (5*slvl) - 73; max = (5*slvl) - 72; }
      if (slvl > 22) { min = (4*slvl) - 45; max = (4*slvl) - 44; }
      if (slvl > 16) { min = (3*slvl) - 23; max = (3*slvl) - 22; }
      if (slvl > 8) { min = (2*slvl) - 7; max = (2*slvl) - 6; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Cold Weapon Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyFreeze.dependencies[0].value +
        dlvl[1] * HolyFreeze.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (5*slvl) + 5;
      let max =  (5*slvl) + 10;
      if (slvl > 28) { min = (25*slvl) - 365; max = (25*slvl) - 360; }
      if (slvl > 22) { min = (20*slvl) - 225; max = (20*slvl) - 220; }
      if (slvl > 16) { min = (15*slvl) - 115; max = (15*slvl) - 110; }
      if (slvl > 8) { min = (10*slvl) - 35; max = (10*slvl) - 30; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Enemies Slowed": slvl => `${Math.min(25 + Math.round(35*((110*slvl)/(slvl+6))/100), 60)}%`,
    "Radius": slvl => `${Math.floor(((10 + (2*slvl)) / 3)*10)/10} yards`
  },
  dependencies: [
      {
        id: "t3r2c3",
        name: "Resist Cold",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r6c3",
        name: "Salvation",
        description: "+{V}% Cold Damage per level",
        value: 7
      }
    ]
};

export default HolyFreeze;
