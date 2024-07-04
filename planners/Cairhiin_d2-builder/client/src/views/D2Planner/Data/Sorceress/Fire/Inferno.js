const Inferno = {
  id: "t1r2c1",
  name: "Inferno",
  description: "Creates a spout of flame that burns the enemies",
  data: {
    "Average Fire Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * Inferno.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 96*slvl + 32;
      let max = 96*slvl + 160;
      if (slvl > 28) { min = 144*slvl - 960; max = 144*slvl - 864; }
      if (slvl > 22) { min = 128*slvl - 512; max = 132*slvl - 416; }
      if (slvl > 16) { min = 112*slvl - 160; max = 116*slvl - 64; }
      if (slvl > 8) { min = 104*slvl - 32; max = 108*slvl + 64; }
      return { min: dmgMultiplier*(min) * 25/256, max: dmgMultiplier*(max) * 25/256 };
    },
    "Mana Cost": slvl => Math.floor((35+slvl) * 25/128),
    "Range": slvl => Math.floor(((17 + (3*slvl) ) / 4) * 2/3)
  },
  dependencies: [
      {
        id: "t1r3c2",
        name: "Warmth",
        description: "+{V}% Fire Damage per level",
        value: 13
      }
    ]
};

export default Inferno;
