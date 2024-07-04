const PoisonJavelin = {
  id: "t3r2c3",
  name: "Poison Javelin",
  description: "Causes thrown javelins to leave a trail of poison and deal extra poison damage",
  data: {
    "Poison Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * PoisonJavelin.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 16*slvl + 16;
      let max = 16*slvl + 32;
      if (slvl > 28)  { min = 96*slvl - 1616; max = 84*slvl - 1184; }
      if (slvl > 22)  { min = 64*slvl - 720; max = 68*slvl - 736; }
      if (slvl > 16)  { min = 48*slvl - 368; max = 52*slvl - 384; }
      if (slvl > 8) { min = 32*slvl - 112; max = 36*slvl - 128; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Poison Length": slvl => 6 + (2*slvl),
    "Mana Cost": slvl => 	3.75 + (0.25*slvl),
  },
  dependencies: [
    {
      id: "t3r4c3",
      name: "Plague Javelin",
      description: "+{V}% Poison Damage per level",
      value: 12
    }
  ]
};

export default PoisonJavelin;
