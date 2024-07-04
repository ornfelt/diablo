const FireBall = {
  id: "t1r3c2",
  name: "Fire Ball",
  description: "Creates a ball of fire that explodes on impact",
  data: {
    "Fire Damage": function(slvl, dlvl = [0, 0]) {
      let dmgMultiplier = dlvl[0] * FireBall.dependencies[0].value + dlvl[1] * FireBall.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = Math.floor(6.5*slvl - 0.5);
      let max = Math.floor(7.5*slvl + 6.5);
      if (slvl > 28) { min = Math.floor(19*slvl - 205.5); max = Math.floor(20*slvl - 198.5); }
      if (slvl > 22) { min = Math.floor(16.5*slvl - 135.5); max = Math.floor(17.5*slvl - 128.5); }
      if (slvl > 16) { min = Math.floor(14*slvl - 80.5); max = Math.floor(15*slvl - 73.5); }
      if (slvl > 8) { min = Math.floor(11.5*slvl - 40.5); max = Math.floor(12.5*slvl - 33.5); }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": (slvl) => 4.5 + (0.5*slvl),
    "Radius": () => Math.round(2 + 2/3)
  },
  dependencies: [
      {
        id: "t1r1c2",
        name: "Fire Bolt",
        description: "+{V}% Fire Damage per level",
        value: 14
      },
      {
        id: "t1r5c2",
        name: "Meteor",
        description: "+{V}% Fire Damage per level",
        value: 14
      }
    ]
};

export default FireBall;
