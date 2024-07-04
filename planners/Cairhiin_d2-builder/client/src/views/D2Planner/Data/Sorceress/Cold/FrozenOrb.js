const FrozenOrb = {
  id: "t3r6c1",
  name: "Frozen Orb",
  description: "A pulsating orb that shreds an area with ice bolts",
  data: {
    "Cold Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * FrozenOrb.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 10*slvl + 30;
      let max = Math.floor(10.5*slvl + 34.5);
      if (slvl > 28)  { min = 15*slvl - 43; max = Math.floor(15.5*slvl - 38.5); }
      if (slvl > 22)  { min = Math.floor(14.5*slvl - 29); max = Math.floor(15*slvl - 24.5); }
      if (slvl > 16)  { min = 14*slvl - 18; max = Math.floor(14.5*slvl - 13.5); }
      if (slvl > 8) { min = 12*slvl + 14	; max = Math.floor(12.5*slvl + 18.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Duration": () => 4,
    "Cold Duration": slvl => (175 + (25*slvl)) / 25,
    "Mana Cost": slvl => 24.5 + (0.5*slvl)
  },
  dependencies: [
      {
        id: "t3r1c2",
        name: "Ice Bolt",
        description: "+{V}% Cold Damage per level",
        value: 2
      }
    ]
};

export default FrozenOrb;
