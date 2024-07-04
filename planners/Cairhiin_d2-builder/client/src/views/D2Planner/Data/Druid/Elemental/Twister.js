const Twister = {
  id: "t3r4c2",
  name: "Twister",
  description: "Summons three small twisters that deal damage and stun enemies",
  data: {
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * Twister.dependencies[0].value +
          dlvl[1] * Twister.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl) + 4;
      let max = (2*slvl) + 6;
      if (slvl > 28)  { min = (8*slvl) - 107; max =  Math.floor(8.5*slvl - 113); }
      if (slvl > 22)  { min = Math.floor(6.5*slvl - 65); max = (7*slvl) - 71; }
      if (slvl > 16)  { min = (5*slvl) - 32; max =  Math.floor(5.5*slvl - 38); }
      if (slvl > 8) { min =  Math.floor(3.5*slvl - 8); max =  Math.floor(3.5*slvl - 6); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Stun Duration": () => '0.4 seconds',
    "Mana Cost": () => 7
  },
  dependencies: [
      {
        id: "t3r5c2",
        name: "Tornado",
        description: "+{V}% Damage per level",
        value: 10
      },
      {
        id: "t3r6c2",
        name: "Hurricane",
        description: "+{V}% Damage per level",
        value: 10
      }
    ]
};

export default Twister;
