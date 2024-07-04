const FistsOfFire = {
  id: "t3r2c1",
  name: "Fists of Fire",
  description: "A fire attack that deals more damage with each charge",
  data: {
    "Attack Rating": slvl => `+${8 + (7*slvl)}%`,
    "Physical damage converted to Fire": slvl => `+${Math.min(3*slvl, 100)}%`,
    "Charge 1 - Fire Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * FistsOfFire.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 5*slvl + 1;
      let max = 5*slvl - 5;
      if (slvl > 28)  { min = 40*slvl - 699; max = 44*slvl - 769; }
      if (slvl > 22)  { min = 30*slvl - 419; max = 33*slvl - 461; }
      if (slvl > 16)  { min = 20*slvl - 199; max = 22*slvl - 219; }
      if (slvl > 8) { min = 10*slvl - 39; max = 11*slvl - 43; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Charge 2 - Fire Damage radius": () => '2 2/3 yards',
    "Charge 3 - Fire Damage per second": function(slvl) {
      let min = 40*slvl + 8;
      let max = 40*slvl + 40;
      if (slvl > 28)  { min = 240*slvl - 3928; max = 256*slvl - 4200; }
      if (slvl > 22)  { min = 176*slvl - 2136	; max = 192*slvl - 2408; }
      if (slvl > 16)  { min = 128*slvl - 1080; max = 136*slvl - 1176; }
      if (slvl > 8) { min = 80*slvl - 312; max = 80*slvl - 280; }
      return { min: min, max: max };
    },
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t3r6c2",
      name: "Phoenix Strike",
      description: "+{V}% Fire Damage per level",
      value: 12
    }
  ]
};

export default FistsOfFire;
