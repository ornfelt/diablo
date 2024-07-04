const HolyFire = {
  id: "t2r2c2",
  name: "Holy Fire",
  description: "Periodically does Fire Damage to nearby enemies",
  data: {
    "Fire Periodic Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyFire.dependencies[0].value +
        dlvl[1] * HolyFire.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(0.5*slvl + 0.5);
      let max =  Math.floor(0.5*slvl + 2.5);
      if (slvl > 28) { min = Math.floor(3.5*slvl - 61.5); max = Math.floor(3.5*slvl - 59.5); }
      if (slvl > 22) { min = Math.floor(2.5*slvl - 33.5); max = Math.floor(2.5*slvl - 31.5); }
      if (slvl > 16) { min = Math.floor(1.5*slvl - 11.5); max = Math.floor(1.5*slvl - 9.5); }
      if (slvl > 8) { min = Math.floor(slvl-3.5); max = Math.floor(slvl-1.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Fire Weapon Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyFire.dependencies[0].value +
        dlvl[1] * HolyFire.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (3*slvl) + 3;
      let max =  (3*slvl) + 15;
      if (slvl > 28) { min = (21*slvl) - 369; max = (21*slvl) - 357; }
      if (slvl > 22) { min = (15*slvl) - 201; max = (15*slvl) - 189; }
      if (slvl > 16) { min = (9*slvl) - 69; max = (9*slvl) - 57; }
      if (slvl > 8) { min = (6*slvl) - 21; max = (6*slvl) - 9; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Radius": slvl => `${Math.floor(((10 + (2*slvl)) / 3)*10)/10} yards`
  },
  dependencies: [
      {
        id: "t3r1c3",
        name: "Resist Fire",
        description: "+{V}% Fire Damage per level",
        value: 18
      },
      {
        id: "t3r6c3",
        name: "Salvation",
        description: "+{V}% Fire Damage per level",
        value: 6
      }
    ]
};

export default HolyFire;
