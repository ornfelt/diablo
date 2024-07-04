const BladesOfIce = {
  id: "t3r5c1",
  name: "Blades of Ice",
  description: "An attack that chills an enemy",
  data: {
    "Attack Rating": slvl => `+${8 + (7*slvl)}%`,
    "Charge 1 - Cold Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * BladesOfIce.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (8*slvl) + 7;
      let max = (8*slvl) + 27;
      if (slvl > 28)  { min = (40*slvl) - 669; max = (42*slvl) - 681; }
      if (slvl > 22)  { min = (30*slvl) - 389; max = (32*slvl) - 401; }
      if (slvl > 16)  { min = (20*slvl) - 169; max = (22*slvl) - 181; }
      if (slvl > 8) { min = (10*slvl) - 9; max = (10*slvl) + 11; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Charge 2 - Cold Duration": slvl => Math.floor((90 + 10*slvl)/25),
    "Charge 3 - Freeze Duration": slvl => Math.floor((90 + 10*slvl)/25),
    "Mana Cost": () => 3
  },
  dependencies: [
    {
      id: "t3r6c2",
      name: "Phoenix Strike",
      description: "+{V}% Fire Damage per level",
      value: 8
    }
  ]
};

export default BladesOfIce;
