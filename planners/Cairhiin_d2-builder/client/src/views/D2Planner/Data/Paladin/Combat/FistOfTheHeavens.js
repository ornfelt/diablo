const FistOfTheHeavens = {
  id: "t1r6c2",
  name: "Fist of the Heavens",
  description: "Calls down a bolt of lightning on the target, and sends out a spray of Holy Bolts",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * FistOfTheHeavens.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (15*slvl) + 135;
      let max = (15*slvl) + 185;
      if (slvl > 28) { min = (65*slvl) - 725; max = (65*slvl) - 675; }
      if (slvl > 22) { min = (55*slvl) - 445; max = (55*slvl) - 395; }
      if (slvl > 16) { min = (45*slvl) - 225; max = (45*slvl) - 175; }
      if (slvl > 8) { min = (30*slvl) + 15; max = (30*slvl) + 65; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Holy Bolt Magic Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * FistOfTheHeavens.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (6*slvl) + 34;
      let max = (6*slvl) + 44;
      if (slvl > 28) { min = (48*slvl) - 894; max = (48*slvl) - 884; }
      if (slvl > 22) { min = (32*slvl) - 446; max = (32*slvl) - 436; }
      if (slvl > 16) { min = (16*slvl) - 94; max = (16*slvl) - 84; }
      if (slvl > 8) { min = (10*slvl) + 2; max = (10*slvl) + 12; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 25
  },
  dependencies: [
      {
        id: "t1r2c2",
        name: "Holy Bolt",
        description: "+{V}% Magic Damage per level",
        value: 15
      },
      {
        id: "t2r5c2",
        name: "Holy Shock",
        description: "+{V}% Lightning Damage per level",
        value: 7
      }
    ]
};

export default FistOfTheHeavens;
