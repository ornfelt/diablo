const Enchant = {
  id: "t1r4c3",
  name: "Enchant",
  description: "Temporarily adds Fire damage to a weapon",
  data: {
    "Fire Damage": (slvl, dlvl=[0]) => {
      let dmgMultiplier = dlvl[0] * Enchant.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(1.5*slvl + 6.5);
      let max = Math.floor(2.5*slvl + 7.5);
      if (slvl > 28) { min = Math.floor(9.5*slvl - 141.5); max = Math.floor(10.5*slvl - 140.5); }
      if (slvl > 22) { min = Math.floor(7.5*slvl - 85.5); max = Math.floor(8.5*slvl - 84.5); }
      if (slvl > 16) { min = Math.floor(5.5*slvl - 41.5); max = Math.floor(6.5*slvl - 40.5); }
      if (slvl > 8) { min = Math.floor(3.5*slvl - 9.5); max = Math.floor(4.5*slvl - 8.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 24+slvl,
    "Attack Rating": slvl => 11 + 9*slvl,
    "Duration": slvl => 120 + 24*slvl
  },
  dependencies: [
      {
        id: "t1r1c3",
        name: "Warmth",
        description: "+{V}% Fire Damage per level",
        value: 9
      }
    ]
};

export default Enchant;
