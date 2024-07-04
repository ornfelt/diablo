const Volcano = {
  id: "t3r5c1",
  name: "Volcano",
  description: "Creates a mini volcano that spurts out fireballs",
  data: {
    "Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Volcano.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl) + 6;
      let max = (2*slvl) + 8;
      if (slvl > 28)  { min = (10*slvl) - 142; max =  (10*slvl) - 140; }
      if (slvl > 22)  { min = (8*slvl) - 86; max = (8*slvl) - 84; }
      if (slvl > 16)  { min = (6*slvl) - 42; max =  (6*slvl) - 40; }
      if (slvl > 8) { min =  (4*slvl) - 10; max =  (4*slvl) - 8; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Fire Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * Volcano.dependencies[1].value +
          dlvl[2] * Volcano.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl) + 6;
      let max = (2*slvl) + 8;
      if (slvl > 28)  { min = (11*slvl) - 170; max =  (13*slvl) - 224; }
      if (slvl > 22)  { min = (8*slvl) - 86; max = (8*slvl) - 84; }
      if (slvl > 16)  { min = (6*slvl) - 42; max =  (6*slvl) - 40; }
      if (slvl > 8) { min =  (4*slvl) - 10; max =  (4*slvl) - 8; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Duration": () => '6 seconds',
    "Mana Cost": () => 25
  },
  dependencies: [
    {
      id: "t3r2c1",
      name: "Molten Boulder",
      description: "+{V}% Damage per level",
      value: 12
    },
    {
      id: "t3r3c1",
      name: "Fissure",
      description: "+{V}% Fire Damage per level",
      value: 12
    },
    {
      id: "t3r6c1",
      name: "Armageddon",
      description: "+{V}% Fire Damage per level",
      value: 12
    }
  ]
};

export default Volcano;
