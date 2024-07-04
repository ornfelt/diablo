const PlagueJavelin = {
  id: "t3r4c3",
  name: "Plague Javelin",
  description: "Causes a thrown javelin to leave a trail of poison, and a cloud on impact",
  data: {
    "Attack Rating": slvl => `${9*slvl + 21}%`,
    "Poison Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * PlagueJavelin.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 48*slvl + 32;
      let max = 48*slvl + 80;
      if (slvl > 28)  { min = 480*slvl - 9376; max = 480*slvl - 9328; }
      if (slvl > 22)  { min = 320*slvl - 4896; max = 320*slvl - 4848; }
      if (slvl > 16)  { min = 160*slvl - 1376; max = 160*slvl - 1328; }
      if (slvl > 8) { min = 96*slvl - 352; max = 96*slvl - 304; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Poison Length": slvl => Math.floor(0.4*slvl + 2.6),
    "Mana Cost": slvl => 	0.5*slvl + 6.5,
  },
  dependencies: [
    {
      id: "t3r4c3",
      name: "Poison Javelin",
      description: "+{V}% Poison Damage per level",
      value: 10
    }
  ]
};

export default PlagueJavelin;
