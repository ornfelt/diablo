const Hydra = {
  id: "t1r6c3",
  name: "Hydra",
  description: "Creates a multi-headed beast that attacks enemies with bolts of fire",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * Hydra.dependencies[0].value + dlvl[1] * Hydra.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(5.5*slvl + 8.5);
      let max = Math.floor(6.5*slvl + 13);
      if (slvl > 28) { min = Math.floor(13.5*slvl - 139.5); max = Math.floor(14.5*slvl - 135); }
      if (slvl > 22) { min = Math.floor(11.5*slvl - 83.5); max = Math.floor(12.5*slvl - 79); }
      if (slvl > 16) { min = Math.floor(9.5*slvl - 39.5); max = Math.floor(10.5*slvl - 35); }
      if (slvl > 8) { min = Math.floor(7.5*slvl - 7.5); max = Math.floor(8.5*slvl - 3); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => 19.5 + 0.5*slvl,
    "Duration": () => 10
  },
  dependencies: [
      {
        id: "t1r1c2",
        name: "Fire Bolt",
        description: "+{V}% Fire Damage per level",
        value: 3
      },
      {
        id: "t1r3c2",
        name: "Fire Ball",
        description: "+{V}% Fire Damage per level",
        value: 3
      }
    ]
};

export default Hydra;
