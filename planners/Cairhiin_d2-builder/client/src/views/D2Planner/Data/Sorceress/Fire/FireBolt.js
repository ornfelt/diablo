const FireBolt = {
  id: "t1r1c2",
  name: "Fire Bolt",
  description: "Creates a bolt of fire",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * FireBolt.dependencies[0].value + dlvl[1] * FireBolt.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(1.5*slvl + 1.5);
      let max = Math.floor(1.5*slvl + 4.5);
      if (slvl > 28) { min = Math.floor(27 * slvl - 648.5); max = Math.floor(28*slvl - 653.5) }
      if (slvl > 22) { min = Math.floor(9 * slvl - 144.5); max = Math.floor(10*slvl - 149.5) }
      if (slvl > 16) { min = Math.floor(4 * slvl - 34.5); max = Math.floor(5*slvl - 39.5) }
      if (slvl > 8) { min = Math.floor(2 * slvl - 2.5); max = Math.floor(3*slvl - 7.5) }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 2.5
  },
  dependencies: [
      {
        id: "t1r3c2",
        name: "Fire Ball",
        description: "+{V}% Fire Damage per level",
        value: 16
      },
      {
        id: "t1r5c2",
        name: "Meteor",
        description: "+{V}% Fire Damage per level",
        value: 16
      }
    ]
};

export default FireBolt;
