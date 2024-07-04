const Shockwave = {
  id: "t2r5c3",
  name: "Shockwave",
  description: "Let loose a roar that stuns surrounding enemies",
  data: {
    "Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * Shockwave.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (3*slvl) + 7;
      let max = (3*slvl) + 17;
      if (slvl > 16)  { min = (7*slvl) - 41; max = (7*slvl) - 31; }
      if (slvl > 8) { min = (5*slvl) - 9; max = (5*slvl) + 1; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Stun Duration": slvl => `${Math.min(0.6*slvl + 1, 10)} seconds`,
    "Mana Cost": () => 7
  },
  dependencies: [
      {
        id: "t2r3c3",
        name: "Maul",
        description: "+{V}% Damage per level",
        value: 5
      }
    ]
};

export default Shockwave;
