const ChargedBolt = {
  id: "t2r1c2",
  name: "Charged Bolt",
  description: "Fires multiple jumping bolts of electricity that seek their targets",
  data: {
    "Lightning Damage": function(slvl, dlvl = [0]) {
      let dmgMultiplier = dlvl[0] * ChargedBolt.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(0.5*slvl + 1.5);
      let max = Math.floor(0.5*slvl + 3.5);
      if (slvl > 28) { min = Math.floor(2*slvl - 31.5); max = Math.floor(2*slvl - 29.5); }
      if (slvl > 22) { min = Math.floor(1.5*slvl - 17.5); max = Math.floor(1.5*slvl - 17.5); }
      if (slvl > 16) { min = Math.floor(slvl - 6.5); max = Math.floor(slvl - 4.5); }
      if (slvl > 8) { min = Math.floor(0.5*slvl + 1.5); max = Math.floor(7.5*slvl + 4.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Number of Bolts": slvl  => Math.min(2 + slvl, 24),
    "Mana Cost": slvl => 2.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t2r3c2",
        name: "Lightning",
        description: "+{V}% Lightning Damage per level",
        value: 6
      }
    ]
};

export default ChargedBolt;
