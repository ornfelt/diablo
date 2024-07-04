const ChainLightning = {
  id: "t2r4c2",
  name: "Chain Lightning",
  description: "Casts a lightning bolt that jumps through multiple targets",
  data: {
    "Lightning Damage": function(slvl, dlvl = [0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * ChainLightning.dependencies[0].value +
        dlvl[1] * ChainLightning.dependencies[1].value +
        dlvl[2] * ChainLightning.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = 11*slvl + 29
      if (slvl > 16) { max = 15*slvl - 19; }
      if (slvl > 8) { max = 13*slvl + 13 }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl =>8 + slvl,
    "Hits": slvl => Math.floor((25+slvl) / 5)
  },
  dependencies: [
    {
      id: "t2r1c2",
      name: "Charged Bolt",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
    {
      id: "t2r3c1",
      name: "Nova",
      description: "+{V}% Lightning Damage per level",
      value: 4
    },
    {
      id: "t2r3c2",
      name: "Lightning",
      description: "+{V}% Lightning Damage per level",
      value: 4
    }
  ]
};

export default ChainLightning;
