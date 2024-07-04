const WarCry = {
  id: "t3r6c1",
  name: "War Cry",
  description: "Damages and stuns enemies",
  data: {
    "Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * WarCry.dependencies[0].value +
        dlvl[1] * WarCry.dependencies[1].value +
        dlvl[2] * WarCry.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 14 + (6*slvl)	;
      let max = 24 + (6*slvl)	;
      if (slvl > 28)  { min = (10*slvl) - 60; max = (10*slvl) - 50; }
      if (slvl > 22)  { min = (9*slvl) - 32; max = (9*slvl) - 22; }
      if (slvl > 16)  { min = (8*slvl) - 10; max = 8*slvl; }
      if (slvl > 8) { min = 6 + (7*slvl); max = 16 + (7*slvl); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Stun Duration": slvl => `${Math.min(0.8 + (0.2*slvl), 10)} seconds`,
    "Mana Cost": slvl => 9+slvl
  },
  dependencies: [
    {
      id: "t3r1c1",
      name: "Howl",
      description: "+{V}% Damage per level",
      value: 6
    },
    {
      id: "t3r2c1",
      name: "Taunt",
      description: "+{V}% Damage per level",
      value: 6
    },
    {
      id: "t3r4c1",
      name: "Battle Cry",
      description: "+{V}% Damage per level",
      value: 6
    }
  ]
};

export default WarCry;
