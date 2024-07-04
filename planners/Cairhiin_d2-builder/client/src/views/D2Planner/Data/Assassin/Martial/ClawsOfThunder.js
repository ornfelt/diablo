const ClawsOfThunder = {
  id: "t3r4c1",
  name: "Claws of Thunder",
  description: "An attack that deals lightning damage and stores a charge",
  data: {
    "Attack Rating": slvl => `+${8 + (7*slvl)}%`,
    "Charge 1 - Lightning Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * ClawsOfThunder.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 20*slvl + 60;
      if (slvl > 28)  { max = 100*slvl - 1420; }
      if (slvl > 22)  { max = 80*slvl - 860; }
      if (slvl > 16)  { max = 60*slvl - 420; }
      if (slvl > 8) { max = 40*slvl - 100; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Charge 2 - Nova Damage": function(slvl, dlvl=[0]) {
      let max = 15*slvl + 15;
      if (slvl > 28)  { max = 65*slvl - 1005; }
      if (slvl > 22)  { max = 45*slvl - 445; }
      if (slvl > 16)  {max = 35*slvl - 225; }
      if (slvl > 8) { max = 25*slvl - 65; }
      return { min: 1, max: max };
    },
    "Charge 3 - Charged Bolt Damage": function(slvl) {
      let max = 20*slvl + 20;
      if (slvl > 28)  { max = 100*slvl - 1460; }
      if (slvl > 22)  { max = 80*slvl - 900; }
      if (slvl > 16)  { max = 60*slvl - 460; }
      if (slvl > 8) { max = 40*slvl - 140; }
      return { min: 1, max: max };
    },
    "Mana Cost": () => 4
  },
  dependencies: [
    {
      id: "t3r6c2",
      name: "Phoenix Strike",
      description: "+{V}% Lightning Damage per level",
      value: 8
    }
  ]
};

export default ClawsOfThunder;
