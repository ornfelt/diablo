const Sanctuary = {
  id: "t2r5c3",
  name: "Sanctuary",
  description: "Damages and does knockback to the Undead",
  data: {
    "Magic Damage to Undead": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * Sanctuary.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 4*slvl + 4;
      let max =  4*slvl + 12;
      if (slvl > 28) { min = 6*slvl - 40; max = 7*slvl - 40; }
      if (slvl > 16) { min = 5*slvl - 12	; max = 6*slvl - 12	; }
      if (slvl > 8) { max = 5*slvl + 4; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Damage to Undead": slvl => `+${30*slvl + 120}%`,
    "Attack Rating against Undead": slvl => `+${50*slvl + 50}`,
    "Radius": slvl => `${Math.floor(((8 + (2*slvl)) / 3)*10)/10} yards`
  },
  dependencies: [
      {
        id: "t3r3c1",
        name: "Cleansing",
        description: "+{V}% Magic Damage to Undead per level",
        value: 7
      }
    ]
};

export default Sanctuary;
